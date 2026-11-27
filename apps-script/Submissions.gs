/**
 * Indigo Magazine: article submissions by email (Google Apps Script). Intake only.
 *
 * Flow (see docs/proposals/RD - Article Submission and Publishing Pipeline.md):
 *   1. Writers email the submissions address. processNewEmails() turns each email into a
 *      folder in Drive under 01-submitted/ (submission.md, images/, email.txt, VALIDATION.md).
 *   2. A developer downloads the folder and runs `npm run approve -- <slug>` locally. That checks
 *      the submission, copies it into blogs/03-approved/, and copies the images into the site.
 *   3. Pushing blogs/03-approved/ starts the GitHub Action that publishes the article.
 *
 * Approval inside Drive is not automated yet (open requirement, RD section 12).
 * This script never talks to GitHub, so it needs no repo token.
 *
 * Setup: see apps-script/README.md. Script properties are listed below.
 * Everything here is plain JavaScript: no build step, no npm packages.
 */

// Script properties required (Project Settings > Script properties):
//   ROOT_FOLDER_ID   Drive folder "blogs" that holds the 01-submitted folder
//   WRITER_EMAILS    Comma-separated allowlist of writers and reviewers
//   INTAKE_ADDRESS   The submissions address (for example submissions@your-domain)

const SUBMITTED = '01-submitted';

const PROCESSED_LABEL = 'Submissions/Processed';
const REJECTED_LABEL = 'Submissions/Rejected';
const META_KEYS = ['category', 'summary', 'date', 'designers', 'photographers', 'graphics', 'coverImage', 'layout'];
const SUPPORTED_LAYOUTS = ['standard'];

// ---------- Setup and triggers ----------

/** Run once after setting script properties. Creates the folder and the 15-minute trigger. */
function setup() {
  ensureSubmittedFolder_();
  installTriggers_();
  Logger.log('Setup complete.');
}

function installTriggers_() {
  const existing = ScriptApp.getProjectTriggers().map((t) => t.getHandlerFunction());
  if (existing.indexOf('processNewEmails') === -1) {
    ScriptApp.newTrigger('processNewEmails').timeBased().everyMinutes(15).create();
  }
}

function ensureSubmittedFolder_() {
  const root = DriveApp.getFolderById(getProp_('ROOT_FOLDER_ID'));
  const it = root.getFoldersByName(SUBMITTED);
  return it.hasNext() ? it.next() : root.createFolder(SUBMITTED);
}

// ---------- Intake: email to Drive ----------

/** Turns new submission emails into folders in 01-submitted. Runs on a trigger. */
function processNewEmails() {
  const submitted = ensureSubmittedFolder_();
  const allowed = allowedEmails_();
  const processed = getOrCreateLabel_(PROCESSED_LABEL);
  const rejected = getOrCreateLabel_(REJECTED_LABEL);
  const query = 'to:' + getProp_('INTAKE_ADDRESS') + ' -label:"' + PROCESSED_LABEL + '"';

  for (const thread of GmailApp.search(query, 0, 30)) {
    const msg = thread.getMessages()[0];
    const sender = parseSender_(msg.getFrom());
    thread.addLabel(processed);

    if (allowed.indexOf(sender.email.toLowerCase()) === -1) {
      thread.addLabel(rejected);
      Logger.log('Ignored submission from non-allowlisted sender: ' + sender.email);
      continue;
    }

    try {
      createSubmissionFromMessage_(msg, sender, submitted);
    } catch (err) {
      Logger.log('Could not create submission "' + msg.getSubject() + '": ' + err);
    }
  }
}

function createSubmissionFromMessage_(msg, sender, submitted) {
  const title = cleanSubject_(msg.getSubject());
  const parsed = parseEmailBody_(msg.getPlainBody());
  const attachments = msg.getAttachments();
  const imageFiles = attachments.filter((f) => f.getContentType().indexOf('image/') === 0);
  const docFiles = attachments.filter((f) => /\.(docx|txt|md)$/i.test(f.getName()));

  let body = parsed.body;
  if (!body.trim() && docFiles.length) {
    body = docToText_(docFiles[0]);
  }

  const slug = uniqueSlug_(slugify_(title), slugsInUse_(submitted));
  const articleFolder = submitted.createFolder(slug);
  const imagesFolder = articleFolder.createFolder('images');

  // Store images with safe names and point the body at the future asset path.
  const renamed = [];
  for (const file of imageFiles) {
    const safe = safeImageName_(file.getName());
    imagesFolder.createFile(file.copyBlob().setName(safe));  // Gmail attachments expose copyBlob(), not getBlob()
    renamed.push({ original: file.getName(), safe });
  }
  body = rewriteImageRefs_(body, renamed, slug);

  const date = parsed.meta.date || Utilities.formatDate(msg.getDate(), 'America/Chicago', 'yyyy-MM-dd');
  const frontMatter = {
    title,
    slug,
    author: sender.name || sender.email,
    category: parsed.meta.category || '',
    date,
    summary: parsed.meta.summary || '',
    layout: parsed.meta.layout || 'standard',
  };
  for (const key of ['designers', 'photographers', 'graphics']) {
    if (parsed.meta[key]) frontMatter[key] = parsed.meta[key];
  }
  if (parsed.meta.coverImage) {
    // CoverImage in the email is an attached filename. Point it at the future asset path.
    const match = renamed.find((r) => r.original.toLowerCase() === parsed.meta.coverImage.toLowerCase());
    frontMatter.coverImage = match ? '/assets/articles/' + slug + '/' + match.safe : parsed.meta.coverImage;
  }

  const text = buildSubmissionMarkdown_(frontMatter, body);
  articleFolder.createFile('submission.md', text, MimeType.PLAIN_TEXT);
  // The original email stays in Drive only. Approval does not copy it into the repo.
  articleFolder.createFile('email.txt', 'From: ' + msg.getFrom() + '\nSubject: ' + msg.getSubject() + '\n\n' + parsed.raw, MimeType.PLAIN_TEXT);

  const imageNames = renamed.map((r) => r.safe);
  const report = lightValidate_(text, slug, imageNames);
  articleFolder.createFile('VALIDATION.md', renderReport_(slug, report), MimeType.PLAIN_TEXT);
  Logger.log('Created submission ' + slug + (report.errors.length ? ' (needs fixes)' : ' (ready for review)'));
}

// ---------- Pure helpers (also exercised by apps-script tests in Node) ----------

/** "Name <email@x.com>" or "email@x.com" -> { name, email }. */
function parseSender_(from) {
  const m = String(from).match(/^\s*"?([^"<]*?)"?\s*<([^>]+)>\s*$/);
  if (m) return { name: m[1].trim(), email: m[2].trim() };
  return { name: '', email: String(from).trim() };
}

/** Leading "Key: value" lines become metadata. The rest is the body. Quoted replies are dropped. */
function parseEmailBody_(text) {
  const raw = String(text).replace(/\r\n/g, '\n');
  const lines = raw.split('\n');
  const meta = {};
  let i = 0;
  while (i < lines.length && lines[i].trim() === '') i++;
  while (i < lines.length) {
    const m = lines[i].match(/^\s*([A-Za-z]+)\s*:\s*(.*)$/);
    const key = m && META_KEYS.find((k) => k.toLowerCase() === m[1].toLowerCase());
    if (!key) break;
    meta[key] = m[2].trim();
    i++;
  }

  const body = [];
  for (; i < lines.length; i++) {
    const line = lines[i];
    if (/^On .+wrote:\s*$/.test(line.trim()) || /^-{2,}\s*Original Message/i.test(line.trim())) break;
    if (line.trim().startsWith('>')) continue;
    body.push(line);
  }
  return { meta, body: body.join('\n').trim(), raw };
}

/** Subject to title: drops "Re:", "Fwd:", and "Submission:" prefixes. */
function cleanSubject_(subject) {
  let s = String(subject || '').trim();
  let previous;
  do {
    previous = s;
    s = s.replace(/^(re|fwd?|submission|article)\s*:\s*/i, '');
  } while (s !== previous);
  return s || 'Untitled submission';
}

function slugify_(text) {
  const slug = String(text)
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/, '');
  return slug || 'submission';
}

function uniqueSlug_(base, taken) {
  if (!taken.has(base)) return base;
  let n = 2;
  while (taken.has(base + '-' + n)) n++;
  return base + '-' + n;
}

function safeImageName_(name) {
  const dot = name.lastIndexOf('.');
  const ext = dot > 0 ? name.slice(dot + 1).toLowerCase().replace(/[^a-z0-9]/g, '') : 'jpg';
  const base = dot > 0 ? name.slice(0, dot) : name;
  return slugify_(base) + '.' + ext;
}

/** Replaces ![alt](original-name) with ![alt](/assets/articles/<slug>/<safe-name>), keeping any caption. */
function rewriteImageRefs_(body, renamed, slug) {
  let out = body;
  for (const { original, safe } of renamed) {
    const escaped = original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp('\\]\\(\\s*' + escaped + '(\\s+"[^"]*")?\\s*\\)', 'gi');
    out = out.replace(pattern, (match, caption) => '](/assets/articles/' + slug + '/' + safe + (caption || '') + ')');
  }
  return out;
}

/** Google Doc text -> paragraphs separated by blank lines (so each paragraph becomes a text block). */
function plainTextToParagraphs_(text) {
  return String(text)
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l !== '')
    .join('\n\n');
}

function buildSubmissionMarkdown_(fm, body) {
  const lines = ['---'];
  for (const key of ['title', 'slug', 'author', 'category', 'date', 'summary', 'layout', 'designers', 'photographers', 'graphics', 'coverImage']) {
    if (fm[key] === undefined) continue;
    lines.push(key + ': "' + String(fm[key]).replace(/\n/g, ' ') + '"');
  }
  lines.push('---', '', body.trim(), '');
  return lines.join('\n');
}

/** Light checks that run in Apps Script so reviewers see problems early. The Node validator is authoritative at approval. */
function lightValidate_(text, folderName, imageNames) {
  const errors = [];
  const warnings = [];
  const lines = String(text).replace(/\r\n/g, '\n').split('\n');
  const end = lines.indexOf('---', 1);
  if (lines[0] !== '---' || end === -1) {
    return { errors: [{ message: 'Front matter block is missing.' }], warnings };
  }

  const fm = {};
  for (const line of lines.slice(1, end)) {
    const m = line.match(/^([A-Za-z]+):\s*"?(.*?)"?\s*$/);
    if (m) fm[m[1]] = m[2];
  }

  for (const key of ['title', 'slug', 'author', 'category', 'date', 'summary']) {
    if (!fm[key]) errors.push({ message: 'Missing "' + key + '". Add it to the top of the email (for example "' + key.charAt(0).toUpperCase() + key.slice(1) + ': ...").' });
  }
  if (fm.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fm.slug)) errors.push({ message: 'Slug "' + fm.slug + '" is not valid.' });
  if (fm.slug && fm.slug !== folderName) errors.push({ message: 'Folder name "' + folderName + '" does not match slug "' + fm.slug + '".' });
  if (fm.date && !/^\d{4}-\d{2}-\d{2}$/.test(fm.date)) errors.push({ message: 'Date "' + fm.date + '" must use YYYY-MM-DD.' });
  if (fm.layout && SUPPORTED_LAYOUTS.indexOf(fm.layout) === -1) errors.push({ message: 'Layout "' + fm.layout + '" is not supported yet.' });
  if (fm.summary && fm.summary.length > 300) warnings.push({ message: 'Summary is longer than 300 characters.' });
  if (!fm.coverImage) warnings.push({ message: 'No cover image set. The hub card will use a default image.' });

  const used = [];
  let hasBody = false;
  for (const line of lines.slice(end + 1)) {
    const t = line.trim();
    if (!t) continue;
    hasBody = true;
    if (/^#\s/.test(t)) errors.push({ message: 'Use "## " for section headings. "# " is reserved for the title.' });
    else if (/^(\||<|```|>|[-*+]\s|\d+\.\s)/.test(t)) errors.push({ message: 'Unsupported formatting: "' + t.slice(0, 40) + '". Use plain paragraphs, "## " headings, and images.' });
    const img = t.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)$/);
    if (img) {
      if (!img[1].trim()) errors.push({ message: 'An image is missing its description (the text in square brackets).' });
      const prefix = '/assets/articles/' + folderName + '/';
      if (img[2].indexOf(prefix) !== 0) {
        errors.push({ message: 'Image "' + img[2] + '" was not found in the attachments.' });
      } else {
        used.push(img[2].slice(prefix.length));
      }
    }
    if (/\*\*|__/.test(t)) warnings.push({ message: 'Bold or italic marks will show as plain text. Remove them.' });
  }
  if (!hasBody) errors.push({ message: 'The article has no text.' });

  for (const name of imageNames || []) {
    if (used.indexOf(name) === -1) warnings.push({ message: 'Attached image "' + name + '" is not used in the article.' });
  }
  return { errors, warnings };
}

function renderReport_(slug, report) {
  const lines = ['# Validation report: ' + slug, '', '**Status:** ' + (report.errors.length ? 'Needs fixes' : 'Ready for review'), ''];
  if (report.errors.length) {
    lines.push('## Errors (must fix)', '');
    report.errors.forEach((e) => lines.push('- ' + e.message));
    lines.push('');
  }
  if (report.warnings.length) {
    lines.push('## Warnings (optional)', '');
    report.warnings.forEach((w) => lines.push('- ' + w.message));
    lines.push('');
  }
  if (!report.errors.length && !report.warnings.length) lines.push('No problems found.', '');
  return lines.join('\n');
}

// ---------- Drive and Gmail utilities ----------

function docToText_(attachment) {
  const meta = { name: 'tmp-' + attachment.getName(), mimeType: MimeType.GOOGLE_DOCS };
  const doc = Drive.Files.create(meta, attachment.copyBlob());
  try {
    return plainTextToParagraphs_(DocumentApp.openById(doc.id).getBody().getText());
  } finally {
    DriveApp.getFileById(doc.id).setTrashed(true);
  }
}

function slugsInUse_(submitted) {
  const taken = new Set();
  const it = submitted.getFolders();
  while (it.hasNext()) taken.add(it.next().getName());
  return taken;
}

function allowedEmails_() {
  return getProp_('WRITER_EMAILS').split(',').map((e) => e.trim().toLowerCase()).filter(Boolean);
}

function getOrCreateLabel_(name) {
  return GmailApp.getUserLabelByName(name) || GmailApp.createLabel(name);
}

function getProp_(key) {
  const value = PropertiesService.getScriptProperties().getProperty(key);
  if (!value) throw new Error('Missing script property: ' + key);
  return value;
}
