// Run with: node --test scripts/tests/apps-script.test.mjs
// Loads apps-script/Submissions.gs into a sandbox and tests its pure helpers.
// Drive and Sheets calls are not exercised here; they need a live Google account.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
import vm from 'node:vm';
import { parseSubmission } from '../lib/submission.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(here, '..', '..', 'apps-script', 'Submissions.gs'), 'utf8');
const sandbox = { Logger: { log() {} } };
vm.createContext(sandbox);
vm.runInContext(source, sandbox);
const api = (name) => sandbox[name];

test('normalizes Google Form namedValues into structured submission fields', () => {
  const parse = api('parseFormValues_');
  const result = parse({
    Timestamp: ['11/26/2026 14:30:00'],
    'Email Address': ['jane@example.com'],
    'Article Title': ['How To Ruin A First Date!'],
    Author: ['Jane Writer'],
    Category: ['Culture'],
    Summary: ['A short blurb.'],
    Date: ['2026-11-26'],
    Designers: ['Sam Designer'],
    'Cover Image': ['https://drive.google.com/open?id=1AbCdEfGhIjKlMnOpQrStUv'],
    Images: ['https://drive.google.com/open?id=1AbCdEfGhIjKlMnOpQrStUv, https://drive.google.com/file/d/2XyZaBcDeFgHiJkLmNoPqRs/view'],
    'Article Body': ['First paragraph.\r\n\r\n## Heading\r\n\r\nSecond paragraph.'],
  });
  assert.equal(result.title, 'How To Ruin A First Date!');
  assert.equal(result.author, 'Jane Writer');
  assert.equal(result.email, 'jane@example.com');
  assert.equal(result.category, 'Culture');
  assert.equal(result.summary, 'A short blurb.');
  assert.equal(result.date, '2026-11-26');
  assert.equal(result.designers, 'Sam Designer');
  assert.ok(result.body.includes('## Heading'));
  assert.ok(!result.body.includes('\r'));
});

test('extracts deduplicated Drive file IDs from Google Form upload URLs', () => {
  const extract = api('extractDriveFileIds_');
  const raw = [
    'https://drive.google.com/open?id=1AbCdEfGhIjKlMnOpQrStUv',
    'https://drive.google.com/file/d/2XyZaBcDeFgHiJkLmNoPqRs/view?usp=drive_link',
    'https://drive.google.com/open?id=1AbCdEfGhIjKlMnOpQrStUv',
  ].join(', ');
  assert.deepEqual([...extract(raw)], ['1AbCdEfGhIjKlMnOpQrStUv', '2XyZaBcDeFgHiJkLmNoPqRs']);
  assert.deepEqual([...extract('plain-filename.jpg')], []);
  assert.deepEqual([...extract('')], []);
});

test('slugifies titles and makes unique slugs when taken', () => {
  const slug = api('slugify_');
  const unique = api('uniqueSlug_');
  assert.equal(slug('How To Ruin A First Date!'), 'how-to-ruin-a-first-date');
  assert.equal(slug('Café Señor — Part 2'), 'cafe-senor-part-2');
  assert.equal(slug('!!!'), 'submission');
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

test('escapes double quotes in front matter so the Node validator round-trips cleanly', () => {
  const md = api('buildSubmissionMarkdown_')(
    {
      title: 'A "Quoted" Title',
      slug: 'a-quoted-title',
      author: 'Jane',
      category: 'Culture',
      date: '2026-11-20',
      summary: 'Blurb with "quotes" inside.',
      layout: 'standard',
      coverImage: '/assets/articles/a-quoted-title/cover.jpg',
    },
    'Body paragraph.',
  );
  assert.ok(md.startsWith('---\ntitle: "A \\"Quoted\\" Title"\n'));
  const parsed = parseSubmission(md);
  assert.deepEqual(parsed.errors, []);
  assert.equal(parsed.frontMatter.title, 'A "Quoted" Title');
  assert.equal(parsed.frontMatter.summary, 'Blurb with "quotes" inside.');
  assert.equal(parsed.frontMatter.coverImage, '/assets/articles/a-quoted-title/cover.jpg');
});

test('light validation passes a complete submission and does not warn on cover image usage', () => {
  const validate = api('lightValidate_');
  const good = [
    '---',
    'title: "A \\"Good\\" Title"',
    'slug: good',
    'author: Jane',
    'category: Culture',
    'date: 2026-11-20',
    'summary: "Fine."',
    'layout: standard',
    'coverImage: "/assets/articles/good/cover.jpg"',
    '---',
    '',
    'Opening text.',
    '',
    '## Section',
    '',
    '![A plate](/assets/articles/good/plate.jpg)',
  ].join('\n');
  const ok = validate(good, 'good', ['plate.jpg', 'cover.jpg']);
  assert.equal(ok.errors.length, 0);
  assert.equal(ok.warnings.length, 0);

  const bad = good.replace('category: Culture\n', '').replace('![A plate]', '![]').replace('## Section', '# Section');
  const report = validate(bad, 'good', ['plate.jpg', 'cover.jpg']);
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
