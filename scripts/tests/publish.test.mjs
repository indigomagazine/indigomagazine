// Run with: node --test scripts/tests/publish.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { publishApproved } from '../publish-articles.mjs';

const SUBMISSION = (slug, title) => `---
title: "${title}"
slug: ${slug}
author: Jane Writer
category: Culture
date: 2026-11-26
summary: "Summary for ${title}."
coverImage: https://cdn.indigomagazinetx.com/articlephotos/${slug}/issue/cover.jpg
---

Opening paragraph for ${title}.

## Section

![A photo](https://cdn.indigomagazinetx.com/articlephotos/${slug}/issue/1.jpg)
`;

const EXISTING_SUMMARY = [
  { slug: 'older-article', title: 'Older', author: 'A', category: 'Culture', summary: 's', date: '2025-01-01' },
];

/** Creates a temp blogs/ root, a posts dir with one existing article, and a summary file. */
async function setup() {
  const base = await mkdtemp(join(tmpdir(), 'publish-'));
  const root = join(base, 'blogs');
  const posts = join(base, 'posts');
  const summary = join(base, 'articles-summary.json');
  await mkdir(join(root, '01-submitted'), { recursive: true });
  await mkdir(join(root, '03-approved'), { recursive: true });
  await mkdir(posts, { recursive: true });
  await writeFile(join(posts, 'older-article.json'), '{}');
  await writeFile(summary, JSON.stringify(EXISTING_SUMMARY, null, 2) + '\n');
  return { base, root, posts, summary };
}

async function addApproved(root, slug, text) {
  const dir = join(root, '03-approved', slug);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'submission.md'), text);
  return dir;
}

test('publishes an approved folder: writes JSON, prepends summary, archives the folder', async () => {
  const env = await setup();
  try {
    await addApproved(env.root, 'new-article', SUBMISSION('new-article', 'New Article'));

    const results = await publishApproved({ root: env.root, posts: env.posts, summary: env.summary, build: false });
    assert.equal(results.length, 1);
    assert.equal(results[0].status, 'published');

    const article = JSON.parse(await readFile(join(env.posts, 'new-article.json'), 'utf8'));
    assert.equal(article.slug, 'new-article');
    assert.equal(article.layout, 'standard');
    assert.equal(article.content[0].type, 'text');

    const summaryList = JSON.parse(await readFile(env.summary, 'utf8'));
    assert.equal(summaryList.length, 2);
    assert.equal(summaryList[0].slug, 'new-article', 'newest article goes first');
    assert.equal(summaryList[0].coverImage, 'https://cdn.indigomagazinetx.com/articlephotos/new-article/issue/cover.jpg');
    assert.equal(summaryList[1].slug, 'older-article');

    assert.deepEqual(await readdir(join(env.root, '03-approved')), []);
    const archived = await readdir(join(env.root, '04-published', 'new-article'));
    assert.ok(archived.includes('submission.md'));
    assert.ok(archived.includes('VALIDATION.md'));
  } finally {
    await rm(env.base, { recursive: true, force: true });
  }
});

test('an invalid approved submission is not published and stays in 03-approved', async () => {
  const env = await setup();
  try {
    const dir = await addApproved(env.root, 'bad-article', SUBMISSION('bad-article', 'Bad').replace('author: Jane Writer\n', ''));

    const results = await publishApproved({ root: env.root, posts: env.posts, summary: env.summary, build: false });
    assert.equal(results[0].status, 'invalid');
    assert.ok(results[0].errors.some((e) => /"author"/.test(e.message)));
    assert.deepEqual(await readdir(env.posts), ['older-article.json']);
    assert.ok((await readFile(join(dir, 'VALIDATION.md'), 'utf8')).includes('Needs fixes'));
  } finally {
    await rm(env.base, { recursive: true, force: true });
  }
});

test('a failed build rolls back the JSON and summary and keeps the folder approved', async () => {
  const env = await setup();
  try {
    const before = await readFile(env.summary, 'utf8');
    const dir = await addApproved(env.root, 'build-breaker', SUBMISSION('build-breaker', 'Breaker'));

    const results = await publishApproved({
      root: env.root,
      posts: env.posts,
      summary: env.summary,
      build: true,
      buildCmd: 'node -e "process.exit(1)"',
    });
    assert.equal(results[0].status, 'build-failed');
    assert.deepEqual(await readdir(env.posts), ['older-article.json'], 'article JSON was removed');
    assert.equal(await readFile(env.summary, 'utf8'), before, 'summary restored exactly');
    assert.ok((await readFile(join(dir, 'VALIDATION.md'), 'utf8')).includes('Build failed'));
    assert.ok((await readdir(join(env.root, '03-approved'))).includes('build-breaker'));
  } finally {
    await rm(env.base, { recursive: true, force: true });
  }
});

test('running again after a successful publish publishes nothing new', async () => {
  const env = await setup();
  try {
    await addApproved(env.root, 'once-only', SUBMISSION('once-only', 'Once'));
    await publishApproved({ root: env.root, posts: env.posts, summary: env.summary, build: false });

    const second = await publishApproved({ root: env.root, posts: env.posts, summary: env.summary, build: false });
    assert.deepEqual(second, []);
    const summaryList = JSON.parse(await readFile(env.summary, 'utf8'));
    assert.equal(summaryList.filter((a) => a.slug === 'once-only').length, 1);
  } finally {
    await rm(env.base, { recursive: true, force: true });
  }
});
