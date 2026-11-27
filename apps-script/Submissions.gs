/**
 * Indigo Magazine: article submissions by Google Form (Google Apps Script). Intake only.
 *
 * Flow (see docs/proposals/RD - Article Submission and Publishing Pipeline.md):
 *   1. Writers submit the Google Form linked to a Google Sheet. onFormSubmit(e) turns each
 *      response into a folder in Drive under 01-submitted/ (submission.md, images/,
 *      form-response.json, VALIDATION.md) and logs status + folder link back to the Sheet.
 *   2. A developer downloads the folder and runs `npm run approve -- <slug>` locally. That checks
 *      the submission, moves it into blogs/03-approved/, removes Drive-only metadata, and copies
 *      the images into the site.
 *   3. Pushing blogs/03-approved/ starts the GitHub Action that publishes the article.
 *
 * Approval inside Drive/Sheets is not automated yet (open requirement, RD section 12).
 * This script never talks to GitHub, so it needs no repo token.
 *
 * Setup: see apps-script/README.md. Script properties are listed below.
 * Everything here is plain JavaScript: no build step, no npm packages.
 */

// Script properties (Project Settings > Script properties):
//   ROOT_FOLDER_ID   Required. Drive folder "blogs" that holds the 01-submitted folder.
//   WRITER_EMAILS    Optional. Comma-separated allowlist of writer emails. When omitted,
//                    every form submission is accepted (rely on Form access controls).

const SUBMITTED = '01-submitted';
const SUPPORTED_LAYOUTS = ['standard'];
const TRACKING_HEADERS = ['Slug', 'Status', 'Folder', 'Validation'];

// Maps normalized (lowercase, trimmed) Form question titles to internal field names.
const FIELD_ALIASES = {
  title: 'title',
  'article title': 'title',
  author: 'author',
  'author name': 'author',
  'writer name': 'author',
  'email address': 'email',
  email: 'email',
  category: 'category',
  summary: 'summary',
  date: 'date',
  'publish date': 'date',
  designers: 'designers',
  photographers: 'photographers',
  graphics: 'graphics',
  layout: 'layout',
  'cover image': 'coverImage',
  'cover image filename': 'coverImage',
  coverimage: 'coverImage',
  'article body': 'body',
  body: 'body',
  article: 'body',
  document: 'docUrls',
  'article document': 'docUrls',
  images: 'imageUrls',
  photos: 'imageUrls',
  timestamp: 'timestamp',
};

// ---------- Setup and triggers ----------

/** Run once from the linked Sheet after setting script properties. */
function setup() {
  ensureSubmittedFolder_();
  ensureTrackingColumns_(SpreadsheetApp.getActiveSpreadsheet().getActiveSheet());
  installTriggers_();
  Logger.log('Setup complete.');
}

function installTriggers_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const existing = ScriptApp.getProjectTriggers().map((t) => t.getHandlerFunction());
  if (existing.indexOf('onFormSubmit') === -1) {
    ScriptApp.newTrigger('onFormSubmit').forSpreadsheet(ss).onFormSubmit().create();
  }
}

function ensureSubmittedFolder_() {
  const root = DriveApp.getFolderById(getProp_('ROOT_FOLDER_ID'));
  const it = root.getFoldersByName(SUBMITTED);
  return it.hasNext() ? it.next() : root.createFolder(SUBMITTED);
}

function ensureTrackingColumns_(sheet) {
  const lastCol = Math.max(sheet.getLastColumn(), 1);
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map((h) => String(h).trim());
  const cols = {};
  let nextCol = lastCol + 1;
  for (const name of TRACKING_HEADERS) {
    const idx = headers.indexOf(name);
    if (idx !== -1) {
      cols[name] = idx + 1;
    } else {
      sheet.getRange(1, nextCol).setValue(name);
      cols[name] = nextCol;
      nextCol++;
    }
  }
  return cols;
}

// ---------- Intake: Google Form to Drive ----------

/** Turns each new Google Form response into a folder in 01-submitted. Runs on trigger. */
function onFormSubmit(e) {
  const sheet = e && e.range ? e.range.getSheet() : SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const row = e && e.range ? e.range.getRow() : sheet.getLastRow();
  const cols = ensureTrackingColumns_(sheet);
  const parsed = parseFormValues_((e && e.namedValues) || {});

  const allowed = allowedEmails_();
  if (allowed.length > 0 && (!parsed.email || allowed.indexOf(parsed.email.toLowerCase()) === -1)) {
    writeTrackingRow_(sheet, row, cols, {
      slug: '',
      status: 'Rejected',
      folder: '',
      validation: 'Sender not in WRITER_EMAILS allowlist.',
    });
    Logger.log('Ignored submission from non-allowlisted sender: ' + (parsed.email || '(none)'));
    return;
  }

  try {
    const submitted = ensureSubmittedFolder_();
    const result = createSubmissionFromForm_(parsed, submitted);
    const summary = result.report.errors.length
      ? result.report.errors.length + ' error(s), ' + result.report.warnings.length + ' warning(s)'
      : result.report.warnings.length
        ? 'OK (' + result.report.warnings.length + ' warning(s))'
        : 'OK';
    writeTrackingRow_(sheet, row, cols, {
      slug: result.slug,
      status: result.report.errors.length ? 'Needs fixes' : 'Ready for review',
      folder: result.folderUrl,
      validation: summary,
    });
  } catch (err) {
    writeTrackingRow_(sheet, row, cols, {
      slug: '',
      status: 'Error',
      folder: '',
      validation: String(err),
    });
    Logger.log('Could not create submission "' + parsed.title + '": ' + err);
  }
}

function writeTrackingRow_(sheet, row, cols, values) {
  sheet.getRange(row, cols.Slug).setValue(values.slug);
  sheet.getRange(row, cols.Status).setValue(values.status);
  sheet.getRange(row, cols.Folder).setValue(values.folder);
  sheet.getRange(row, cols.Validation).setValue(values.validation);
}

function createSubmissionFromForm_(parsed, submitted) {
  const title = parsed.title || 'Untitled submission';
  let body = parsed.body || '';

  // Optional uploaded document (.docx, .txt, .md, or Google Doc) when body is left blank.
  const docIds = extractDriveFileIds_(parsed.docUrls);
  if (!body.trim() && docIds.length) {
    body = driveFileToText_(DriveApp.getFileById(docIds[0]));
  }

  const slug = uniqueSlug_(slugify_(title), slugsInUse_(submitted));
  const articleFolder = submitted.createFolder(slug);
  const imagesFolder = articleFolder.createFolder('images');

  // Collect uploaded images from both the Images upload field and an optional Cover Image upload URL.
  const coverIds = extractDriveFileIds_(parsed.coverImage);
  const imageIds = Array.from(new Set([...extractDriveFileIds_(parsed.imageUrls), ...coverIds]));
  const renamed = [];
  for (const id of imageIds) {
    const file = DriveApp.getFileById(id);
    const original = file.getName();
    const safe = safeImageName_(original);
    file.makeCopy(safe, imagesFolder);
    renamed.push({ id, original, safe });
  }
  body = rewriteImageRefs_(body, renamed, slug);

  const date = parsed.date || Utilities.formatDate(new Date(), 'America/Chicago', 'yyyy-MM-dd');
  const frontMatter = {
    title,
    slug,
    author: parsed.author || '',
    category: parsed.category || '',
    date,
    summary: parsed.summary || '',
    layout: parsed.layout || 'standard',
  };
  for (const key of ['designers', 'photographers', 'graphics']) {
    if (parsed[key]) frontMatter[key] = parsed[key];
  }

  if (parsed.coverImage) {
    if (coverIds.length) {
      const match = renamed.find((r) => r.id === coverIds[0]);
      if (match) frontMatter.coverImage = '/assets/articles/' + slug + '/' + match.safe;
    } else {
      const match = renamed.find((r) => r.original.toLowerCase() === parsed.coverImage.toLowerCase());
      frontMatter.coverImage = match ? '/assets/articles/' + slug + '/' + match.safe : parsed.coverImage;
    }
  }

  const text = buildSubmissionMarkdown_(frontMatter, body);
  articleFolder.createFile('submission.md', text, MimeType.PLAIN_TEXT);
  // Raw form metadata stays in Drive only. Approval strips it before committing to the repo.
  articleFolder.createFile('form-response.json', JSON.stringify(parsed, null, 2), MimeType.PLAIN_TEXT);

  const imageNames = renamed.map((r) => r.safe);
  const report = lightValidate_(text, slug, imageNames);
  articleFolder.createFile('VALIDATION.md', renderReport_(slug, report), MimeType.PLAIN_TEXT);
  Logger.log('Created submission ' + slug + (report.errors.length ? ' (needs fixes)' : ' (ready for review)'));
  return { slug, folderUrl: articleFolder.getUrl(), report };
}

// ---------- Pure helpers (also exercised by apps-script tests in Node) ----------

/** Normalizes e.namedValues ({ "Question Title": ["Answer"] }) into structured fields. */
function parseFormValues_(namedValues) {
  const out = {
    title: '',
    author: '',
    email: '',
    category: '',
    summary: '',
    date: '',
    designers: '',
    photographers: '',
    graphics: '',
    layout: '',
    coverImage: '',
    body: '',
    imageUrls: '',
    docUrls: '',
    timestamp: '',
  };
  for (const rawKey of Object.keys(namedValues || {})) {
    const field = FIELD_ALIASES[String(rawKey).trim().toLowerCase()];
    if (!field) continue;
    const rawVal = namedValues[rawKey];
    const value = Array.isArray(rawVal) ? rawVal.join(', ') : String(rawVal || '');
    out[field] = value.replace(/\r\n/g, '\n').trim();
  }
  return out;
}

/** Extracts Drive file IDs from Google Form file upload URLs (comma-separated). */
function extractDriveFileIds_(value) {
  if (!value) return [];
  const ids = [];
  const seen = new Set();
  for (const part of String(value).split(',')) {
    const s = part.trim();
    if (!s) continue;
    const m = s.match(/[?&]id=([A-Za-z0-9_-]{10,})/) || s.match(/\/d\/([A-Za-z0-9_-]{10,})/);
    if (m && !seen.has(m[1])) {
      seen.add(m[1]);
      ids.push(m[1]);
    }
  }
  return ids;
}

function slugify_(text) {
  const slug = String(text)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
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

/** Escapes backslashes, double quotes, and newlines for double-quoted YAML front matter strings. */
function escapeFrontMatterValue_(value) {
  return String(value)
    .replace(/\r?\n/g, ' ')
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"');
}

function unescapeFrontMatterValue_(value) {
  const trimmed = String(value).trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.length >= 2) {
    return trimmed.slice(1, -1).replace(/\\(["\\])/g, '$1');
  }
  if (trimmed.startsWith("'") && trimmed.endsWith("'") && trimmed.length >= 2) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function buildSubmissionMarkdown_(fm, body) {
  const lines = ['---'];
  for (const key of ['title', 'slug', 'author', 'category', 'date', 'summary', 'layout', 'designers', 'photographers', 'graphics', 'coverImage']) {
    if (fm[key] === undefined) continue;
    lines.push(key + ': "' + escapeFrontMatterValue_(fm[key]) + '"');
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
    const m = line.match(/^([A-Za-z]+):\s*(.*)$/);
    if (m) fm[m[1]] = unescapeFrontMatterValue_(m[2]);
  }

  for (const key of ['title', 'slug', 'author', 'category', 'date', 'summary']) {
    if (!fm[key]) errors.push({ message: 'Missing "' + key + '". Fill in the matching question on the form.' });
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
        errors.push({ message: 'Image "' + img[2] + '" was not found in the uploaded files.' });
      } else {
        used.push(img[2].slice(prefix.length));
      }
    }
    if (/\*\*|__/.test(t)) warnings.push({ message: 'Bold or italic marks will show as plain text. Remove them.' });
  }
  if (!hasBody) errors.push({ message: 'The article has no text.' });

  for (const name of imageNames || []) {
    if (used.indexOf(name) === -1 && fm.coverImage !== '/assets/articles/' + folderName + '/' + name) {
      warnings.push({ message: 'Uploaded image "' + name + '" is not used in the article.' });
    }
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

// ---------- Drive utilities ----------

function driveFileToText_(file) {
  const mime = file.getMimeType();
  if (mime === MimeType.GOOGLE_DOCS) {
    return plainTextToParagraphs_(DocumentApp.openById(file.getId()).getBody().getText());
  }
  if (mime === MimeType.PLAIN_TEXT || /\.(txt|md)$/i.test(file.getName())) {
    return file.getBlob().getDataAsString();
  }
  const meta = { name: 'tmp-' + file.getName(), mimeType: MimeType.GOOGLE_DOCS };
  const doc = Drive.Files.create(meta, file.getBlob());
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
  const raw = PropertiesService.getScriptProperties().getProperty('WRITER_EMAILS');
  if (!raw) return [];
  return raw.split(',').map((e) => e.trim().toLowerCase()).filter(Boolean);
}

function getProp_(key) {
  const value = PropertiesService.getScriptProperties().getProperty(key);
  if (!value) throw new Error('Missing script property: ' + key);
  return value;
}
