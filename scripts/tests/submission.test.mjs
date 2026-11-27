// Run with: node --test scripts/tests
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  parseSubmission,
  convertBody,
  validateSubmission,
  buildSummaryEntry,
} from '../lib/submission.mjs';
import { validateAll } from '../validate-submissions.mjs';

const VALID = `---
title: "A Test Article"
slug: a-test-article
author: Jane Writer
category: Culture
date: 2026-11-26
summary: "A short blurb for the hub card."
coverImage: https://cdn.indigomagazinetx.com/articlephotos/a-test-article/issue/cover.jpg
links:
  - https://example.com   # a comment
mentions:
  - Sam Editor
---

An opening paragraph that spans
two source lines.

## First Section

Body text for the first section.

![A street at dusk](https://cdn.indigomagazinetx.com/articlephotos/a-test-article/issue/one.jpg "Dusk on Main")

![Close-up of a sign](https://cdn.indigomagazinetx.com/articlephotos/a-test-article/issue/two.jpg)

Closing paragraph.
`;

test('parses front matter: quoted values, lists, and trailing comments', () => {
  const { frontMatter, errors } = parseSubmission(VALID);
  assert.deepEqual(errors, []);
  assert.equal(frontMatter.title, 'A Test Article');
  assert.equal(frontMatter.summary, 'A short blurb for the hub card.');
  assert.deepEqual(frontMatter.links, ['https://example.com']);
  assert.deepEqual(frontMatter.mentions, ['Sam Editor']);
});

test('reports a submission with no front matter', () => {
  const { errors } = parseSubmission('Just text, no metadata.');
  assert.equal(errors.length, 1);
  assert.match(errors[0].message, /front matter/);
});

test('converts paragraphs, headings, single images, and galleries', () => {
  const { frontMatter, body, bodyStartLine } = parseSubmission(VALID);
  assert.ok(frontMatter);
  const { blocks, errors } = convertBody(body, bodyStartLine);
  assert.deepEqual(errors, []);
  // Images separated by a blank line are separate image blocks; only adjacent lines form a gallery.
  assert.deepEqual(
    blocks.map((b) => b.type),
    ['text', 'heading', 'text', 'image', 'image', 'text'],
  );
});

test('consecutive image lines become one gallery block', () => {
  const body = [
    '![One](https://cdn.indigomagazinetx.com/a/1.jpg)',
    '![Two](https://cdn.indigomagazinetx.com/a/2.jpg)',
  ].join('\n');
  const { blocks, errors } = convertBody(body);
  assert.deepEqual(errors, []);
  assert.equal(blocks.length, 1);
  assert.equal(blocks[0].type, 'gallery');
  assert.equal(blocks[0].images.length, 2);
});

test('a single image becomes an image block with alt and caption', () => {
  const { blocks } = convertBody('![Alt here](/assets/articles/x/1.jpg "Cap")');
  assert.deepEqual(blocks, [{ type: 'image', url: '/assets/articles/x/1.jpg', alt: 'Alt here', caption: 'Cap' }]);
});

test('paragraph lines are joined with spaces', () => {
  const { blocks } = convertBody('first line\nsecond line');
  assert.deepEqual(blocks, [{ type: 'text', value: 'first line second line' }]);
});

test('unsupported Markdown is reported with its line number, not dropped', () => {
  const { errors } = convertBody('Intro.\n\n- a list item\n\n| a | table |', 10);
  assert.equal(errors.length, 2);
  assert.equal(errors[0].line, 12);
  assert.equal(errors[1].line, 14);
});

test('"# " title-level headings are rejected', () => {
  const { errors } = convertBody('# Not allowed here\n\nSome text.');
  assert.equal(errors.length, 1);
  assert.match(errors[0].message, /reserved/);
});

test('parses escaped double quotes in front matter values', () => {
  const text = `---
title: "A \\"Quoted\\" Title #not-a-comment"
slug: a-quoted-title
author: Jane Writer
category: Culture
date: 2026-11-26
summary: "She said \\"hello\\" today." # trailing comment
---

Body text.
`;
  const { frontMatter, errors } = parseSubmission(text);
  assert.deepEqual(errors, []);
  assert.equal(frontMatter.title, 'A "Quoted" Title #not-a-comment');
  assert.equal(frontMatter.summary, 'She said "hello" today.');
});

test('a valid submission produces an article with the expected shape', () => {
  const { errors, warnings, article } = validateSubmission({
    folderName: 'a-test-article',
    text: VALID,
    existingSlugs: new Set(['other-article']),
  });
  assert.deepEqual(errors, []);
  assert.deepEqual(warnings, []);
  assert.equal(article.slug, 'a-test-article');
  assert.equal(article.layout, 'standard');
  assert.equal(article.coverImage, 'https://cdn.indigomagazinetx.com/articlephotos/a-test-article/issue/cover.jpg');
  assert.equal(article.content.length, 6);

  const summary = buildSummaryEntry(article);
  assert.equal(summary.slug, 'a-test-article');
  assert.equal(summary.date, '2026-11-26');
  assert.equal(summary.coverImage, 'https://cdn.indigomagazinetx.com/articlephotos/a-test-article/issue/cover.jpg');
});

test('flags missing required fields, bad slug, bad date, and folder mismatch', () => {
  const text = `---
title: Only a title
slug: Bad_Slug
date: 26/11/2026
summary: x
---

Some body.
`;
  const { errors, article } = validateSubmission({ folderName: 'other-folder', text, existingSlugs: new Set() });
  const messages = errors.map((e) => e.message).join('\n');
  assert.equal(article, undefined);
  assert.match(messages, /field is missing: "author"/);
  assert.match(messages, /field is missing: "category"/);
  assert.match(messages, /Slug "Bad_Slug"/);
  assert.match(messages, /Date "26\/11\/2026"/);
  assert.match(messages, /Folder name "other-folder"/);
});

test('rejects a slug that already exists', () => {
  const { errors } = validateSubmission({
    folderName: 'a-test-article',
    text: VALID,
    existingSlugs: new Set(['a-test-article']),
  });
  assert.ok(errors.some((e) => /already exists/.test(e.message)));
});

test('rejects images without alt text and non-CDN image URLs', () => {
  const text = VALID
    .replace('![A street at dusk]', '![]')
    .replace('https://cdn.indigomagazinetx.com/articlephotos/a-test-article/issue/two.jpg', 'https://example.com/two.jpg');
  const { errors } = validateSubmission({ folderName: 'a-test-article', text, existingSlugs: new Set() });
  const messages = errors.map((e) => e.message).join('\n');
  assert.match(messages, /missing alt text/);
  assert.match(messages, /must be a CDN link/);
});

test('rejects unsupported layouts in the MVP', () => {
  const text = VALID.replace('---\n\nAn opening', 'layout: editorial\n---\n\nAn opening').replace('mentions:\n  - Sam Editor\n', '');
  const { errors } = validateSubmission({ folderName: 'a-test-article', text, existingSlugs: new Set() });
  assert.ok(errors.some((e) => /Layout "editorial" is not supported/.test(e.message)));
});

test('warns about inline formatting and a missing cover image', () => {
  const text = VALID
    .replace(/coverImage:.*\n/, '')
    .replace('Closing paragraph.', 'Closing with **bold** text.');
  const { errors, warnings } = validateSubmission({ folderName: 'a-test-article', text, existingSlugs: new Set() });
  assert.deepEqual(errors, []);
  assert.ok(warnings.some((w) => /Bold, italic, or links/.test(w.message)));
  assert.ok(warnings.some((w) => /No coverImage/.test(w.message)));
});

test('validateAll writes VALIDATION.md into each submitted folder', async () => {
  const root = await mkdtemp(join(tmpdir(), 'blogs-'));
  const posts = await mkdtemp(join(tmpdir(), 'posts-'));
  try {
    const good = join(root, '01-submitted', 'a-test-article');
    const bad = join(root, '01-submitted', 'broken');
    await mkdir(good, { recursive: true });
    await mkdir(bad, { recursive: true });
    await writeFile(join(good, 'submission.md'), VALID);
    await writeFile(join(bad, 'submission.md'), '---\ntitle: x\n---\nbody');
    await mkdir(join(root, '01-submitted', 'no-file'));

    const results = await validateAll({ root, posts });
    assert.equal(results.length, 3);
    const byName = Object.fromEntries(results.map((r) => [r.folderName, r]));
    assert.equal(byName['a-test-article'].errors.length, 0);
    assert.ok(byName.broken.errors.length > 0);
    assert.equal(byName['no-file'].errors[0].message, 'No submission.md found in this folder.');

    const report = await readFile(join(good, 'VALIDATION.md'), 'utf8');
    assert.match(report, /Ready for review/);
    const badReport = await readFile(join(bad, 'VALIDATION.md'), 'utf8');
    assert.match(badReport, /Needs fixes/);
  } finally {
    await rm(root, { recursive: true, force: true });
    await rm(posts, { recursive: true, force: true });
  }
});
