#!/usr/bin/env node
// Approves one submission locally. Developers run this after downloading a folder from Drive.
// Usage: npm run approve -- <slug> [--from 01-submitted] [--root blogs] [--posts src/data/posts] [--public public]
//
// What it does:
//   1. Validates <root>/<from>/<slug>/submission.md with the same rules the publisher uses.
//   2. Moves the folder to <root>/03-approved/<slug>/ and deletes email.txt (the original email is never committed).
//   3. Copies the images into <public>/assets/articles/<slug>/ so the site can serve them.
// Then you commit and push. The "Publish approved articles" workflow publishes it.
// Spec: docs/proposals/RD - Article Submission and Publishing Pipeline.md (sections 6 and 12).

import { readdir, readFile, writeFile, rename, mkdir, copyFile, rm, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateSubmission, renderValidationReport } from './lib/submission.mjs';

const APPROVED = '03-approved';

export function parseArgs(argv) {
  const args = { slug: undefined, from: '01-submitted', root: 'blogs', posts: 'src/data/posts', publicDir: 'public' };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--from') args.from = argv[++i];
    else if (a === '--root') args.root = argv[++i];
    else if (a === '--posts') args.posts = argv[++i];
    else if (a === '--public') args.publicDir = argv[++i];
    else if (!a.startsWith('--') && !args.slug) args.slug = a;
  }
  return args;
}

async function existingSlugs(postsDir) {
  const files = await readdir(postsDir);
  return new Set(files.filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -'.json'.length)));
}

/** Returns { ok, errors, warnings, destination }. Nothing is moved when ok is false. */
export async function approveSubmission({ slug, from = '01-submitted', root = 'blogs', posts = 'src/data/posts', publicDir = 'public' }) {
  if (!slug) throw new Error('Give the slug of the submission, for example: npm run approve -- my-article');

  const sourceDir = join(resolve(root), from, slug);
  const destDir = join(resolve(root), APPROVED, slug);
  const submissionPath = join(sourceDir, 'submission.md');

  try {
    await stat(submissionPath);
  } catch {
    throw new Error(`No submission.md found at ${submissionPath}`);
  }
  try {
    await stat(destDir);
    throw new Error(`${join(root, APPROVED, slug)} already exists. Approve each slug once.`);
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }

  const text = await readFile(submissionPath, 'utf8');
  const slugs = await existingSlugs(resolve(posts));
  const { errors, warnings } = validateSubmission({ folderName: slug, text, existingSlugs: slugs });

  // Every image the article uses must be in the images folder.
  const imagesDir = join(sourceDir, 'images');
  const available = await readdir(imagesDir).catch(() => []);
  const referenced = [...text.matchAll(new RegExp(`/assets/articles/${slug}/([^)\\s"]+)`, 'g'))].map((m) => m[1]);
  for (const name of new Set(referenced)) {
    if (!available.includes(name)) errors.push({ line: 0, message: `Image "${name}" is referenced but not in the images folder.` });
  }

  await writeFile(join(sourceDir, 'VALIDATION.md'), renderValidationReport({ folderName: slug, errors, warnings }));
  if (errors.length) return { ok: false, errors, warnings };

  await mkdir(resolve(root, APPROVED), { recursive: true });
  await rename(sourceDir, destDir);
  await rm(join(destDir, 'email.txt'), { force: true });

  const siteImages = join(resolve(publicDir), 'assets', 'articles', slug);
  if (available.length) {
    await mkdir(siteImages, { recursive: true });
    for (const name of available) {
      await copyFile(join(destDir, 'images', name), join(siteImages, name));
    }
  }

  return { ok: true, errors, warnings, destination: destDir, siteImages: available.length ? siteImages : undefined };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  let result;
  try {
    result = await approveSubmission(args);
  } catch (err) {
    console.error(err.message);
    process.exitCode = 1;
    return;
  }

  if (!result.ok) {
    console.error(`Not approved: ${args.slug} has errors. See VALIDATION.md in ${join(args.root, args.from, args.slug)}.`);
    for (const e of result.errors) console.error(`  - ${e.line ? `line ${e.line}: ` : ''}${e.message}`);
    process.exitCode = 1;
    return;
  }

  console.log(`Approved ${args.slug}.`);
  console.log(`  moved to ${result.destination}`);
  if (result.siteImages) console.log(`  images copied to ${result.siteImages}`);
  for (const w of result.warnings) console.log(`  warning: ${w.message}`);
  console.log('Next: review the files, then commit and push. The publish workflow runs on push.');
}

// Run only when executed directly, not when imported by tests.
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main();
}
