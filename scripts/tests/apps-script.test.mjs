// Run with: node --test scripts/tests/apps-script.test.mjs
// Loads apps-script/Submissions.gs into a sandbox and tests its pure helpers.
// Drive, Gmail, and GitHub calls are not exercised here; they need a live Google account.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
import vm from 'node:vm';

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(here, '..', '..', 'apps-script', 'Submissions.gs'), 'utf8');
const sandbox = { Logger: { log() {} } };
vm.createContext(sandbox);
vm.runInContext(source, sandbox);
const api = (name) => sandbox[name];

test('parses sender names and bare addresses', () => {
  const parse = api('parseSender_');
  assert.deepEqual({ ...parse('Jane Writer <jane@example.com>') }, { name: 'Jane Writer', email: 'jane@example.com' });
  assert.deepEqual({ ...parse('"Doe, Sam" <sam@example.com>') }, { name: 'Doe, Sam', email: 'sam@example.com' });
  assert.deepEqual({ ...parse('plain@example.com') }, { name: '', email: 'plain@example.com' });
});

test('reads leading metadata lines and drops quoted replies', () => {
  const parse = api('parseEmailBody_');
  const result = parse([
    'Category: Culture',
    'Summary: A short blurb.',
    'Date: 2026-11-20',
    '',
    'First paragraph.',
    '',
    '## Heading',
    '',
    '> quoted old text',
    'On Tue, someone wrote:',
    'old reply',
  ].join('\n'));
  assert.equal({ ...result.meta }.category, 'Culture');
  assert.equal({ ...result.meta }.summary, 'A short blurb.');
  assert.equal({ ...result.meta }.date, '2026-11-20');
  assert.ok(result.body.startsWith('First paragraph.'));
  assert.ok(result.body.includes('## Heading'));
  assert.ok(!result.body.includes('quoted old text'));
  assert.ok(!result.body.includes('old reply'));
});

test('a "Summary:" line inside the body is not metadata', () => {
  const result = api('parseEmailBody_')('Opening line.\nSummary: this stays in the body.');
  assert.deepEqual({ ...result.meta }, {});
  assert.ok(result.body.includes('Summary: this stays in the body.'));
});

test('cleans subject prefixes and slugifies titles', () => {
  const clean = api('cleanSubject_');
  const slug = api('slugify_');
  assert.equal(clean('Re: Submission: How To Ruin A First Date!'), 'How To Ruin A First Date!');
  assert.equal(clean(''), 'Untitled submission');
  assert.equal(slug('How To Ruin A First Date!'), 'how-to-ruin-a-first-date');
  assert.equal(slug('Café Señor — Part 2'), 'cafe-senor-part-2');
  assert.equal(slug('!!!'), 'submission');
});

test('makes unique slugs when the name is taken', () => {
  const unique = api('uniqueSlug_');
  assert.equal(unique('my-piece', new Set()), 'my-piece');
  assert.equal(unique('my-piece', new Set(['my-piece'])), 'my-piece-2');
  assert.equal(unique('my-piece', new Set(['my-piece', 'my-piece-2'])), 'my-piece-3');
});

test('renames images to safe names and rewrites references to asset paths', () => {
  const safe = api('safeImageName_');
  assert.equal(safe('Dinner Photo (1).JPG'), 'dinner-photo-1.jpg');
  const rewrite = api('rewriteImageRefs_');
  const body = 'Text.\n\n![A plate](Dinner Photo (1).JPG "Caption")\n\n![Dog](dog.png)';
  const renamed = [
    { original: 'Dinner Photo (1).JPG', safe: 'dinner-photo-1.jpg' },
    { original: 'dog.png', safe: 'dog.png' },
  ];
  const out = rewrite(body, renamed, 'my-piece');
  assert.ok(out.includes('![A plate](/assets/articles/my-piece/dinner-photo-1.jpg "Caption")'));
  assert.ok(out.includes('![Dog](/assets/articles/my-piece/dog.png)'));
});

test('paragraphs from a document are separated by blank lines', () => {
  const out = api('plainTextToParagraphs_')('First line.\nSecond line.\n\n\nThird.');
  assert.equal(out, 'First line.\n\nSecond line.\n\nThird.');
});

test('builds submission.md that the Node validator can read', () => {
  const md = api('buildSubmissionMarkdown_')(
    { title: 'A "Quoted" Title', slug: 'a-quoted-title', author: 'Jane', category: 'Culture', date: '2026-11-20', summary: 'Blurb.', layout: 'standard' },
    'Body paragraph.',
  );
  assert.ok(md.startsWith('---\ntitle: "A "Quoted" Title"\n'));
  assert.ok(md.includes('\n---\n\nBody paragraph.'));
});

test('light validation passes a complete submission and reports the missing pieces', () => {
  const validate = api('lightValidate_');
  const good = [
    '---',
    'title: "Good"',
    'slug: good',
    'author: Jane',
    'category: Culture',
    'date: 2026-11-20',
    'summary: "Fine."',
    'layout: standard',
    '---',
    '',
    'Opening text.',
    '',
    '## Section',
    '',
    '![A plate](/assets/articles/good/plate.jpg)',
  ].join('\n');
  // Arrays from the sandbox are a different realm, so compare lengths rather than deepEqual.
  const ok = validate(good, 'good', ['plate.jpg']);
  assert.equal(ok.errors.length, 0);
  assert.equal(ok.warnings.filter((w) => !/cover image/.test(w.message)).length, 0);

  const bad = good.replace('category: Culture\n', '').replace('![A plate]', '![]').replace('## Section', '# Section');
  const report = validate(bad, 'good', ['plate.jpg']);
  const messages = report.errors.map((e) => e.message).join('\n');
  assert.match(messages, /Missing "category"/);
  assert.match(messages, /missing its description/);
  assert.match(messages, /"# " is reserved/);
});

test('light validation flags a folder that does not match the slug and unused images', () => {
  const validate = api('lightValidate_');
  const text = '---\ntitle: "T"\nslug: t\nauthor: A\ncategory: C\ndate: 2026-01-01\nsummary: "S"\n---\n\nHello.\n';
  const report = validate(text, 'other-folder', ['extra.jpg']);
  assert.ok(report.errors.some((e) => /does not match slug/.test(e.message)));
  assert.ok(report.warnings.some((w) => /extra\.jpg/.test(w.message)));
});
