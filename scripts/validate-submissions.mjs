#!/usr/bin/env node
// Validates article submissions and writes a VALIDATION.md report into each folder.
// Usage: node scripts/validate-submissions.mjs [--root <blogs dir>] [--posts <posts dir>]
// Defaults: --root ./blogs  --posts ./src/data/posts
// Spec: docs/proposals/RD - Article Submission and Publishing Pipeline.md (section 6, step 2).

import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateSubmission, renderValidationReport } from './lib/submission.mjs';

const SUBMITTED_FOLDER = '01-submitted';

export function parseArgs(argv) {
  const args = { root: 'blogs', posts: 'src/data/posts' };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--root') args.root = argv[++i];
    else if (argv[i] === '--posts') args.posts = argv[++i];
  }
  return args;
}

async function listSubfolders(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

async function existingSlugs(postsDir) {
  const files = await readdir(postsDir);
  return new Set(files.filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -'.json'.length)));
}

/** Validates every submission folder under <root>/01-submitted. Returns a results array. */
export async function validateAll({ root, posts }) {
  const submittedDir = join(resolve(root), SUBMITTED_FOLDER);
  const slugs = await existingSlugs(resolve(posts));
  const results = [];

  for (const folderName of await listSubfolders(submittedDir)) {
    const folderPath = join(submittedDir, folderName);
    const submissionPath = join(folderPath, 'submission.md');

    try {
      await stat(submissionPath);
    } catch {
      const errors = [{ line: 0, message: 'No submission.md found in this folder.' }];
      await writeFile(join(folderPath, 'VALIDATION.md'), renderValidationReport({ folderName, errors, warnings: [] }));
      results.push({ folderName, errors, warnings: [], article: undefined });
      continue;
    }

    const text = await readFile(submissionPath, 'utf8');
    const { errors, warnings, article } = validateSubmission({ folderName, text, existingSlugs: slugs });
    await writeFile(join(folderPath, 'VALIDATION.md'), renderValidationReport({ folderName, errors, warnings }));
    results.push({ folderName, errors, warnings, article });
  }

  return results;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  let results;
  try {
    results = await validateAll(args);
  } catch (err) {
    console.error(`Could not read ${join(args.root, SUBMITTED_FOLDER)}: ${err.message}`);
    process.exitCode = 1;
    return;
  }

  if (results.length === 0) {
    console.log(`No submissions found in ${join(args.root, SUBMITTED_FOLDER)}.`);
    return;
  }

  for (const r of results) {
    const state = r.errors.length ? `FAILED (${r.errors.length} error${r.errors.length === 1 ? '' : 's'})` : 'OK';
    console.log(`${state.padEnd(22)} ${r.folderName}`);
    for (const e of r.errors) console.log(`    error: ${e.line ? `line ${e.line}: ` : ''}${e.message}`);
    for (const w of r.warnings) console.log(`    warn:  ${e2s(w)}`);
  }
}

const e2s = (w) => `${w.line ? `line ${w.line}: ` : ''}${w.message}`;

// Run only when executed directly, not when imported by tests.
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main();
}
