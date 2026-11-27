// Parsing, validation, and conversion for article submissions.
// Spec: docs/proposals/RD - Article Submission and Publishing Pipeline.md (sections 8 and 9).
// Zero dependencies on purpose: this runs in plain Node with no install step.

export const SUPPORTED_LAYOUTS = ['standard'];
export const REQUIRED_FIELDS = ['title', 'slug', 'author', 'category', 'date', 'summary'];
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const CDN_PREFIX = 'https://cdn.indigomagazinetx.com/';
const IMAGE_LINE = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/;

/**
 * Splits a submission into front matter and body, and parses the front matter.
 * Supports `key: value` pairs (optionally quoted) and `key:` followed by `  - item` lines.
 * Returns { frontMatter, body, bodyStartLine, errors }.
 */
export function parseSubmission(text) {
  const errors = [];
  const lines = text.replace(/\r\n/g, '\n').split('\n');

  if (lines[0]?.trim() !== '---') {
    errors.push({ line: 1, message: 'Submission must start with a front matter block (---).' });
    return { frontMatter: {}, body: text, bodyStartLine: 1, errors };
  }

  const end = lines.indexOf('---', 1);
  if (end === -1) {
    errors.push({ line: 1, message: 'Front matter block is not closed with ---.' });
    return { frontMatter: {}, body: '', bodyStartLine: lines.length + 1, errors };
  }

  const frontMatter = {};
  let currentListKey = null;

  for (let i = 1; i < end; i++) {
    const raw = lines[i];
    const lineNo = i + 1;
    if (!raw.trim() || raw.trim().startsWith('#')) continue;

    const listItem = raw.match(/^\s+-\s+(.*)$/);
    if (listItem && currentListKey) {
      frontMatter[currentListKey].push(unquote(stripComment(listItem[1])));
      continue;
    }

    const pair = raw.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/);
    if (!pair) {
      errors.push({ line: lineNo, message: `Could not read front matter line: "${raw.trim()}".` });
      currentListKey = null;
      continue;
    }

    const [, key, rawValue] = pair;
    const value = stripComment(rawValue).trim();
    if (value === '') {
      frontMatter[key] = [];
      currentListKey = key;
    } else {
      frontMatter[key] = unquote(value);
      currentListKey = null;
    }
  }

  // Empty list keys with no items are treated as absent.
  for (const key of Object.keys(frontMatter)) {
    if (Array.isArray(frontMatter[key]) && frontMatter[key].length === 0) delete frontMatter[key];
  }

  return {
    frontMatter,
    body: lines.slice(end + 1).join('\n'),
    bodyStartLine: end + 2,
    errors,
  };
}

function stripComment(value) {
  // A '#' starts a comment only when it is preceded by whitespace and outside quotes.
  let inQuotes = false;
  for (let i = 0; i < value.length; i++) {
    const ch = value[i];
    if (ch === '\\' && inQuotes && i + 1 < value.length) {
      i++;
      continue;
    }
    if (ch === '"') inQuotes = !inQuotes;
    if (ch === '#' && !inQuotes && i > 0 && /\s/.test(value[i - 1])) {
      return value.slice(0, i).trimEnd();
    }
  }
  return value;
}

function unquote(value) {
  const trimmed = value.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.length >= 2) {
    return trimmed.slice(1, -1).replace(/\\(["\\])/g, '$1');
  }
  if (trimmed.startsWith("'") && trimmed.endsWith("'") && trimmed.length >= 2) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

/**
 * Converts the Markdown body into the content blocks the renderer already understands.
 * Supported: `## Heading`, paragraphs, image lines, and consecutive image lines (gallery).
 * Anything else is reported with its line number instead of being dropped silently.
 * Returns { blocks, errors }.
 */
export function convertBody(body, bodyStartLine = 1) {
  const blocks = [];
  const errors = [];
  const lines = body.split('\n');

  let paragraph = [];
  let paragraphStart = 0;
  let imageRun = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: 'text', value: paragraph.join(' ').trim() });
      paragraph = [];
    }
  };
  const flushImages = () => {
    if (imageRun.length === 1) {
      blocks.push(imageRun[0]);
    } else if (imageRun.length > 1) {
      blocks.push({
        type: 'gallery',
        images: imageRun.map(({ url, caption }) => ({ url, caption })),
      });
    }
    imageRun = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const lineNo = bodyStartLine + i;

    if (line === '') {
      flushParagraph();
      flushImages();
      continue;
    }

    if (line.startsWith('# ')) {
      errors.push({ line: lineNo, message: 'Use "## " for section headings. "# " is reserved for the title.' });
      continue;
    }

    if (line.startsWith('## ')) {
      flushParagraph();
      flushImages();
      blocks.push({ type: 'heading', value: line.slice(3).trim() });
      continue;
    }

    const image = line.match(IMAGE_LINE);
    if (image) {
      flushParagraph();
      const [, alt, url, caption] = image;
      if (!alt.trim()) {
        errors.push({ line: lineNo, message: 'Image is missing alt text: ![describe the image](url).' });
      }
      imageRun.push({ type: 'image', url, alt: alt.trim(), ...(caption ? { caption } : {}) });
      continue;
    }

    if (/^(\||<|```|>|[-*+]\s|\d+\.\s)/.test(line)) {
      errors.push({
        line: lineNo,
        message: `Unsupported Markdown: "${line.slice(0, 40)}". Use plain paragraphs, "## " headings, and images.`,
      });
      continue;
    }

    flushImages();
    if (paragraph.length === 0) paragraphStart = lineNo;
    paragraph.push(line);
  }

  flushParagraph();
  flushImages();

  if (blocks.length === 0) {
    errors.push({ line: paragraphStart || bodyStartLine, message: 'Body has no content.' });
  }

  return { blocks, errors };
}

/**
 * Validates one submission against RD section 8.
 * Input: { folderName, text, existingSlugs: Set<string> }
 * Returns { errors, warnings, article } where article is the Article JSON (only if no errors).
 */
export function validateSubmission({ folderName, text, existingSlugs = new Set() }) {
  const errors = [];
  const warnings = [];
  const { frontMatter, body, bodyStartLine, errors: parseErrors } = parseSubmission(text);
  errors.push(...parseErrors);

  for (const field of REQUIRED_FIELDS) {
    if (!frontMatter[field] || typeof frontMatter[field] !== 'string') {
      errors.push({ line: 0, message: `Required front matter field is missing: "${field}".` });
    }
  }

  const { slug, date, layout = 'standard', summary } = frontMatter;

  if (slug) {
    if (!SLUG_PATTERN.test(slug)) {
      errors.push({ line: 0, message: `Slug "${slug}" must be lowercase letters, digits, and hyphens.` });
    }
    if (existingSlugs.has(slug)) {
      errors.push({ line: 0, message: `An article with slug "${slug}" already exists.` });
    }
    if (folderName !== slug) {
      errors.push({ line: 0, message: `Folder name "${folderName}" must match slug "${slug}".` });
    }
  }

  if (date && (!DATE_PATTERN.test(date) || Number.isNaN(Date.parse(date)))) {
    errors.push({ line: 0, message: `Date "${date}" must use YYYY-MM-DD.` });
  }

  if (!SUPPORTED_LAYOUTS.includes(layout)) {
    errors.push({
      line: 0,
      message: `Layout "${layout}" is not supported yet. Supported: ${SUPPORTED_LAYOUTS.join(', ')}.`,
    });
  }

  if (summary && summary.length > 300) {
    warnings.push({ line: 0, message: `Summary is ${summary.length} characters. Keep it under 300.` });
  }

  const { blocks, errors: bodyErrors } = convertBody(body, bodyStartLine);
  errors.push(...bodyErrors);

  const formatted = blocks.filter((b) => b.type === 'text' && /\*\*|__|\[[^\]]*\]\([^)]*\)/.test(b.value));
  if (formatted.length) {
    warnings.push({
      line: 0,
      message: 'Bold, italic, or links are not rendered yet and will show as plain text. Remove the formatting marks.',
    });
  }

  for (const block of blocks.flatMap((b) => (b.type === 'gallery' ? b.images : [b]))) {
    if (block.url && !(block.url.startsWith(CDN_PREFIX) || block.url.startsWith('/assets/'))) {
      errors.push({
        line: 0,
        message: `Image URL "${block.url}" must be a CDN link (${CDN_PREFIX}...) or start with /assets/.`,
      });
    }
  }

  if (!frontMatter.coverImage) {
    warnings.push({ line: 0, message: 'No coverImage set. The hub card will use a default image.' });
  }

  const article = errors.length
    ? undefined
    : buildArticle(frontMatter, blocks);

  return { errors, warnings, article };
}

/** Builds the Article JSON in the shape src/services/api.ts expects. */
export function buildArticle(frontMatter, blocks) {
  const article = {
    id: '',
    slug: frontMatter.slug,
    title: frontMatter.title,
    author: frontMatter.author,
    category: frontMatter.category,
    summary: frontMatter.summary,
    date: frontMatter.date,
    layout: frontMatter.layout ?? 'standard',
  };
  for (const key of ['designers', 'photographers', 'graphics', 'coverImage']) {
    if (frontMatter[key]) article[key] = frontMatter[key];
  }
  article.content = blocks;
  return article;
}

/** Builds the entry for src/data/articles/articles-summary.json (RD section 9.3). */
export function buildSummaryEntry(article) {
  const entry = {
    slug: article.slug,
    title: article.title,
    author: article.author,
    category: article.category,
    summary: article.summary,
    date: article.date,
  };
  if (article.coverImage) entry.coverImage = article.coverImage;
  return entry;
}

/** Renders a readable VALIDATION.md for reviewers (RD section 6, step 2). */
export function renderValidationReport({ folderName, errors, warnings }) {
  const status = errors.length ? 'Needs fixes' : 'Ready for review';
  const lines = [`# Validation report: ${folderName}`, '', `**Status:** ${status}`, ''];

  if (errors.length) {
    lines.push('## Errors (must fix)', '');
    for (const e of errors) lines.push(`- ${e.line ? `Line ${e.line}: ` : ''}${e.message}`);
    lines.push('');
  }
  if (warnings.length) {
    lines.push('## Warnings (optional)', '');
    for (const w of warnings) lines.push(`- ${w.line ? `Line ${w.line}: ` : ''}${w.message}`);
    lines.push('');
  }
  if (!errors.length && !warnings.length) lines.push('No problems found.', '');

  return lines.join('\n');
}
