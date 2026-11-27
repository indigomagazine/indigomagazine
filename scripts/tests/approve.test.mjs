// Run with: node --test scripts/tests/approve.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, readdir, rm, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { approveSubmission } from '../approve-submission.mjs';

const SUBMISSION = (slug) => `---
title: "Approve Me"
slug: ${slug}
author: Jane Writer
category: Culture
date: 2026-11-26
summary: "A summary."
coverImage: /assets/articles/${slug}/photo.jpg
---

Opening paragraph.

![A photo](/assets/articles/${slug}/photo.jpg "Caption")
`;

async function setup(slug, { text = SUBMISSION(slug), withImage = true, withEmail = true } = {}) {
  const base = await mkdtemp(join(tmpdir(), 'approve-'));
  const root = join(base, 'blogs');
  const posts = join(base, 'posts');
  const publicDir = join(base, 'public');
  const src = join(root, '01-submitted', slug);
  await mkdir(join(src, 'images'), { recursive: true });
  await mkdir(posts, { recursive: true });
  await writeFile(join(src, 'submission.md'), text);
  if (withImage) await writeFile(join(src, 'images', 'photo.jpg'), 'fake-bytes');
  if (withEmail) {
    await writeFile(join(src, 'email.txt'), 'From: jane@example.com');
    await writeFile(join(src, 'form-response.json'), '{"email":"jane@example.com"}');
  }
  return { base, root, posts, publicDir, src };
}

test('approves a valid submission: moves it, drops Drive-only metadata, copies images to the site', async () => {
  const env = await setup('approve-me');
  try {
    const result = await approveSubmission({ slug: 'approve-me', root: env.root, posts: env.posts, publicDir: env.publicDir });
    assert.equal(result.ok, true);

    const approved = join(env.root, '03-approved', 'approve-me');
    const files = await readdir(approved);
    assert.ok(files.includes('submission.md'));
    assert.ok(!files.includes('email.txt'), 'original email must not be kept in the approved folder');
    assert.ok(!files.includes('form-response.json'), 'raw form metadata must not be kept in the approved folder');
    await access(join(env.publicDir, 'assets', 'articles', 'approve-me', 'photo.jpg'));
    assert.deepEqual(await readdir(join(env.root, '01-submitted')), []);
  } finally {
    await rm(env.base, { recursive: true, force: true });
  }
});

test('refuses an invalid submission and leaves it where it is', async () => {
  const text = SUBMISSION('bad-one').replace('author: Jane Writer\n', '');
  const env = await setup('bad-one', { text });
  try {
    const result = await approveSubmission({ slug: 'bad-one', root: env.root, posts: env.posts, publicDir: env.publicDir });
    assert.equal(result.ok, false);
    assert.ok(result.errors.some((e) => /"author"/.test(e.message)));
    assert.ok((await readdir(env.src)).includes('submission.md'));
    assert.ok((await readFile(join(env.src, 'VALIDATION.md'), 'utf8')).includes('Needs fixes'));
    await assert.rejects(access(join(env.root, '03-approved', 'bad-one')));
  } finally {
    await rm(env.base, { recursive: true, force: true });
  }
});

test('refuses when a referenced image is missing from the images folder', async () => {
  const env = await setup('no-image', { withImage: false });
  try {
    const result = await approveSubmission({ slug: 'no-image', root: env.root, posts: env.posts, publicDir: env.publicDir });
    assert.equal(result.ok, false);
    assert.ok(result.errors.some((e) => /photo\.jpg.*not in the images folder/.test(e.message)));
  } finally {
    await rm(env.base, { recursive: true, force: true });
  }
});

test('refuses to approve the same slug twice', async () => {
  const env = await setup('twice');
  try {
    await approveSubmission({ slug: 'twice', root: env.root, posts: env.posts, publicDir: env.publicDir });
    await mkdir(join(env.root, '01-submitted', 'twice'), { recursive: true });
    await writeFile(join(env.root, '01-submitted', 'twice', 'submission.md'), SUBMISSION('twice'));
    await assert.rejects(
      approveSubmission({ slug: 'twice', root: env.root, posts: env.posts, publicDir: env.publicDir }),
      /already exists/,
    );
  } finally {
    await rm(env.base, { recursive: true, force: true });
  }
});
