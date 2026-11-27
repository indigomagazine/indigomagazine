#!/usr/bin/env node
// Publishes approved submissions: converts them to article JSON, updates the hub summary,
// optionally runs a build check, and archives the folder to 04-published.
// Usage: node scripts/publish-articles.mjs [--root <blogs dir>] [--posts <posts dir>]
//          [--summary <summary json>] [--build] [--build-cmd "<command>"]
// Defaults: --root ./blogs  --posts ./src/data/posts  --summary ./src/data/articles/articles-summary.json
//           --build-cmd "npm run build" (used only with --build)
// Spec: docs/proposals/RD - Article Submission and Publishing Pipeline.md (sections 6 and 10).
// This script does not commit. The scheduled GitHub Action (M3) will commit what it produces.

import { readdir, readFile, writeFile, mkdir, rename, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { validateSubmission, buildSummaryEntry, renderValidationReport } from './lib/submission.mjs';

const execAsync = promisify(exec);

const APPROVED = '03-approved';
const PUBLISHED = '04-published';

export function parseArgs(argv) {
  const args = {
    root: 'blogs',
    posts: 'src/data/posts',
    summary: 'src/data/articles/articles-summary.json',
    build: false,
    buildCmd: 'npm run build',
  };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--root') args.root = argv[++i];
    else if (argv[i] === '--posts') args.posts = argv[++i];
    else if (argv[i] === '--summary') args.summary = argv[++i];
    else if (argv[i] === '--build') args.build = true;
    else if (argv[i] === '--build-cmd') args.buildCmd = argv[++i];
  }
  return args;
}

async function listSubfolders(dir) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory()).map((e) => e.name);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

async function existingSlugs(postsDir) {
  const files = await readdir(postsDir);
  return new Set(files.filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -'.json'.length)));
}

/**
 * Publishes every folder in <root>/03-approved. Returns one result per folder:
 * { folderName, status: 'published' | 'invalid' | 'build-failed', errors, warnings }.
 * Failed folders stay in 03-approved. Only successful ones move to 04-published.
 */
export async function publishApproved({ root, posts, summary, build, buildCmd }) {
  const approvedDir = join(resolve(root), APPROVED);
  const publishedDir = join(resolve(root), PUBLISHED);
  const postsDir = resolve(posts);
  const summaryPath = resolve(summary);
  const results = [];

  const folders = await listSubfolders(approvedDir);
  if (folders.length === 0) return results;

  const slugs = await existingSlugs(postsDir);
  const originalSummary = await readFile(summaryPath, 'utf8');
  const summaryList = JSON.parse(originalSummary);
  // Text of the summary file as of the last successful publish. Rollback restores this.
  let lastGoodSummary = originalSummary;

  for (const folderName of folders) {
    const folderPath = join(approvedDir, folderName);
    let text;
    try {
      text = await readFile(join(folderPath, 'submission.md'), 'utf8');
    } catch {
      const errors = [{ line: 0, message: 'No submission.md found in this folder.' }];
      await writeFile(join(folderPath, 'VALIDATION.md'), renderValidationReport({ folderName, errors, warnings: [] }));
      results.push({ folderName, status: 'invalid', errors, warnings: [] });
      continue;
    }

    const { errors, warnings, article } = validateSubmission({ folderName, text, existingSlugs: slugs });
    await writeFile(join(folderPath, 'VALIDATION.md'), renderValidationReport({ folderName, errors, warnings }));
    if (errors.length) {
      results.push({ folderName, status: 'invalid', errors, warnings });
      continue;
    }

    // Write the article JSON and the hub summary entry. Keep the originals for rollback.
    const articlePath = join(postsDir, `${article.slug}.json`);
    const nextSummary = [buildSummaryEntry(article), ...summaryList];
    await writeFile(articlePath, `${JSON.stringify(article, null, 2)}\n`);
    await writeFile(summaryPath, `${JSON.stringify(nextSummary, null, 2)}\n`);

    if (build) {
      try {
        await execAsync(buildCmd, { cwd: process.cwd() });
      } catch (err) {
        // Roll back this article only. Earlier articles in this run stay published.
        await rm(articlePath, { force: true });
        await writeFile(summaryPath, lastGoodSummary);
        const message = `Build failed with "${buildCmd}": ${(err.stderr || err.message || '').toString().trim().split('\n').slice(-3).join(' ')}`;
        const failed = [{ line: 0, message }];
        await writeFile(join(folderPath, 'VALIDATION.md'), renderValidationReport({ folderName, errors: failed, warnings }));
        results.push({ folderName, status: 'build-failed', errors: failed, warnings });
        continue;
      }
    }

    // Archive the submission. Nothing is deleted.
    await mkdir(publishedDir, { recursive: true });
    await rename(folderPath, join(publishedDir, folderName));
    slugs.add(article.slug);
    summaryList.unshift(buildSummaryEntry(article));
    lastGoodSummary = `${JSON.stringify(nextSummary, null, 2)}\n`;
    results.push({ folderName, status: 'published', errors: [], warnings, articlePath });
  }

  return results;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  let results;
  try {
    results = await publishApproved(args);
  } catch (err) {
    console.error(`Publish stopped: ${err.message}`);
    process.exitCode = 1;
    return;
  }

  if (results.length === 0) {
    console.log(`Nothing to publish in ${join(args.root, APPROVED)}.`);
    return;
  }
  for (const r of results) {
    console.log(`${r.status.padEnd(14)} ${r.folderName}`);
    for (const e of r.errors) console.log(`    ${e.line ? `line ${e.line}: ` : ''}${e.message}`);
  }
  if (results.some((r) => r.status !== 'published')) process.exitCode = 1;
}

// Run only when executed directly, not when imported by tests.
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main();
}
