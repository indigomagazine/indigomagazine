# RD: Article Submission and Publishing Pipeline

| | |
| --- | --- |
| **Status** | Draft v2 for review (email intake, Google Drive review) |
| **Date** | 2026-11-26 |
| **Source** | Polished from the Drive doc "Proposal - Evolutions for website" (Google Doc `1RznodbUZhHw1ezQRCF1Dpxmy2HAIY1EZik4-6OTCFQo`) and [Proposal - Evolutions for website .md](./Proposal%20-%20Evolutions%20for%20website%20.md) |
| **Owners** | Dev team (implementation), Writing director / officers (approval) |

---

## 1. Summary

Writers email their article to the Indigo Magazine submissions address. The email body or an attached document becomes a submission folder in Google Drive. A reviewer reads the validation report and gives feedback. A developer approves it locally with one command, pushes it, and the existing article components publish it automatically. Approval inside Drive is planned but not implemented (Q10).

Today every article needs a developer to convert text into JSON, register it in the summary file, and deploy. This pipeline removes that bottleneck for standard articles.

## 2. Problem

- Each new article needs a developer to hand-build it. This does not scale when the writing department grows or when writing outside of articles (creative writing, recommendations) increases.
- There is no single, standard place where submissions wait for review. Approved pieces are not archived in a consistent way, so work can be lost when officers change.
- Article content is spread across email, personal files, and the repo.

## 3. Goals and Non-Goals

### Goals
1. Writers can submit an article by email, without touching code.
2. Reviewers can read a validation report and approve a submission by moving a folder in Google Drive.
3. An approved submission becomes a live article automatically, rendered by the existing templates and blocks.
4. Every submission and approval is archived in a predictable structure.
5. Phase 1 is for the writing team only. The same system can open to the public later by changing one allowlist.

### Non-Goals (MVP)
- A website submission form (planned for the public phase, see section 12, Q9).
- Writer accounts, logins, or a member portal (see Q4).
- Peer review workflows, comments, or in-app editing.
- Custom layouts or new React components per article. Standard articles only.
- Replacing the existing issue articles (`src/components/IssueArticles/`). They stay bespoke.
- Box. It is not used anywhere in this pipeline.

## 4. Users and Roles

| Role | What they do | Access |
| --- | --- | --- |
| **Writer** | Emails the submission (text in the body, or a document and images attached) | Sends email from an allowlisted address |
| **Reviewer (officer / management)** | Reads `VALIDATION.md` and gives feedback to the writer | Read access to the Drive folder |
| **Maintainer (developer)** | Downloads submissions, approves them with `npm run approve`, pushes, owns the Apps Script, the GitHub Action, and the templates | Repo, Apps Script project |
| **Reader** | Reads the published article on the website | Public |

## 5. Current State (from the repo)

- **Frontend:** React 19 + Vite, TanStack Router, deployed to GitHub Pages on every push to `main` (`.github/workflows/main.yml`).
- **Data-driven articles:** Article JSON in `src/data/posts/<slug>.json`. Each JSON file has a `layout` (`standard`, `editorial`, `valentines`, `indigo-live`) and a `content` array of blocks. Rendering goes through `src/components/Articles/Renderer/Renderer.jsx`.
- **Hub index:** `src/data/articles/articles-summary.json` lists every article. `src/services/api.ts` loads it.
- **Images:** Article images live under `public/assets/articles/` in the repo, served by the site. The pipeline commits submitted images there.
- **No backend:** The project stores content as static files (`docs/ARCHITECTURE.md`). This RD keeps that model. Static JSON in the repo is the "database" for MVP.
- **Repo is public.** Anything committed to the repo is visible on GitHub. Only approved articles and their images are committed. Original emails stay in Drive.

**Implication:** An approved article becomes a JSON file plus a summary entry, committed to `main`. The existing deploy then publishes it.

## 6. End-to-End Workflow

Two places hold state. Google Drive is where writers and reviewers work. The repo is where the site is built.

```text
Google Drive: Indigo Writing / blogs/
  01-submitted/       Created automatically from each email

Repo (local, then pushed):
  blogs/01-submitted/<slug>/   Downloaded from Drive by the developer
  blogs/03-approved/<slug>/    Written by `npm run approve` (then published by the Action)
  blogs/04-published/<slug>/   Archive, written by the Action
  public/assets/articles/<slug>/  Images, copied by `npm run approve`
```

Each submission folder in Drive:

```text
01-submitted/
  my-article-slug/
    submission.md    Front matter (metadata) and body text, created from the email
    images/          Attached images, renamed to safe names
    email.txt        The original email. Drive only, never committed
    VALIDATION.md    Readable report for reviewers
```

**Steps**

1. **Submit.** A writer emails the submissions address. The subject is the title. Metadata goes on the first lines of the body (see 9.1), then the article text. A document can be attached instead of body text. Images are attached and referenced by filename.
2. **Intake (every 15 minutes).** The Apps Script reads new mail from allowlisted writers, creates the folder above, and writes `VALIDATION.md`. Mail from anyone else is labelled `Submissions/Rejected` and ignored.
3. **Review and approve (developer, for now).** A reviewer reads `VALIDATION.md` and sends feedback to the writer. A developer downloads the folder into `blogs/01-submitted/` and runs `npm run approve -- <slug>`. That validates it again, moves it to `blogs/03-approved/`, deletes the original email, and copies the images into `public/assets/articles/`.
4. **Push.** The developer commits and pushes. The push to `blogs/03-approved/` starts the publish workflow.
5. **Publish (GitHub Action).** The commit to `blogs/03-approved/` starts the workflow. It runs the publisher, which validates again, writes `src/data/posts/<slug>.json`, prepends the hub summary entry, and runs the build. A failed build rolls back that article. The workflow commits the result and triggers the site deploy.
6. **Archive.** `blogs/04-published/` in the repo keeps each published submission. Nothing is deleted.

## 7. Functional Requirements

| ID | Priority | Requirement |
| --- | --- | --- |
| FR-1 | P0 | Submission email format documented for writers (`docs/guides/SUBMISSION_TEMPLATE.md`). |
| FR-2 | P0 | Intake creates a Drive folder per email, with `submission.md`, images, and `VALIDATION.md`. |
| FR-3 | P0 | Only allowlisted senders can submit. Others are ignored and labelled. |
| FR-4 | P0 | Validator checks each submission against section 8 and writes a readable report. Runs at intake (light checks) and at publish (full checks). |
| FR-5 | P0 | Converter maps the Markdown body to the existing blocks: `heading`, `text`, `image`, `gallery` (section 9). |
| FR-6 | P0 | Approved folders are committed to the repo. The Action publishes them, writes the JSON and summary, and runs the build. |
| FR-7 | P0 | Publishing is idempotent. A slug collision is rejected with a report. A failed build rolls back that article. |
| FR-8 | P0 | Only folders in `03-approved/` are published. No other state can publish. |
| FR-9 | P0 | Original emails are never committed to the repo. |
| FR-10 | P1 | Document attachments (`.docx`, Google Docs) are converted to text at intake. Headings in the document are not preserved yet. |
| FR-11 | P1 | Reply to the writer when a submission is received, needs changes, or is published. |
| FR-12 | P1 | Preview of an approved article before it goes live. |
| FR-13 | P2 | Website submission form, for the public phase. |
| FR-14 | P2 | Layouts beyond `standard` through front matter. |

## 8. Validation Rules

A submission fails validation (and is not published) if any of these is true:

- **Required metadata missing:** `title`, `author`, `category`, `date`, `summary`. The title comes from the subject. The author comes from the sender name.
- **Slug** is not lowercase letters, digits, and hyphens, or it already exists in `src/data/posts/`.
- **Date** is not `YYYY-MM-DD`. Defaults to the date the email was sent.
- **Layout** is set and is not supported (only `standard` in MVP).
- **Image** has no description (`alt` text), or it is not one of the attached images.
- **Body** has no text.
- **Unsupported Markdown:** lists, tables, quotes, raw HTML, or a `# ` heading.

Warnings (do not block publishing): summary longer than 300 characters, no cover image, bold or italic marks (not rendered yet), an attached image that is not used.

Intake runs a light version of these checks in Apps Script. The Node validator in `scripts/lib/submission.mjs` is authoritative and runs at publish.

## 9. Data Contract

### 9.1 Email format

```text
Subject: Submission: Your Article Title

Category: Culture
Summary: One or two sentences that describe the article.
Date: 2026-11-26            (optional, defaults to the email's date)
Designers: Name and Name    (optional)
Photographers: Name         (optional)
Graphics: Name              (optional)
CoverImage: photo-1.jpg     (optional: an attached image filename)

Opening paragraph. Leave a blank line between paragraphs.

## A Section Heading

More text.

![Describe the photo](photo-1.jpg "Optional caption")
```

The metadata lines must be at the top of the body. Quoted replies are dropped.

### 9.2 Submission front matter

The intake writes this into `submission.md`:

```yaml
---
title: "Title of the Article"
slug: my-article-slug
author: Writer Name
category: Culture
date: 2026-11-26
summary: "A short blurb of one or two sentences."
layout: standard
coverImage: /assets/articles/my-article-slug/photo-1.jpg
---
```

### 9.3 Body to blocks

| Markdown in body | Block produced | Notes |
| --- | --- | --- |
| `## Heading` | `{ "type": "heading", "value": "Heading" }` | `#` is reserved for the title. |
| Plain paragraph | `{ "type": "text", "value": "..." }` | One block per paragraph. |
| `![alt](url "caption")` | `{ "type": "image", "url", "alt", "caption" }` | `alt` is required. |
| Two or more consecutive image lines | `{ "type": "gallery", "images": [...] }` | Grouping is by consecutive lines. |

The block shapes match `src/services/api.ts` (`ContentBlock`). Unsupported Markdown fails validation with a line number, so nothing is silently dropped.

### 9.4 Output

The publisher writes `src/data/posts/<slug>.json` and prepends an entry to `src/data/articles/articles-summary.json`.

## 10. Technical Design

**Reuse, do not rebuild.** Standard articles render through the existing `StandardTemplate` and blocks. No new React components are needed for MVP.

| Piece | Location | Runs on | Status |
| --- | --- | --- | --- |
| Writer guide | `docs/guides/SUBMISSION_TEMPLATE.md` | Docs | Written (needs update for email format) |
| Email intake | `apps-script/Submissions.gs`, `apps-script/appsscript.json` | Google Apps Script, time trigger | Written. Pure helpers tested in Node. Needs live Google testing |
| Setup guide | `apps-script/README.md` | Docs | Written |
| Validator | `scripts/lib/submission.mjs`, `scripts/validate-submissions.mjs` | Node | Done, 15 tests |
| Developer approval | `scripts/approve-submission.mjs` | Node, run by a developer | Done, 4 tests |
| Publisher | `scripts/publish-articles.mjs` | Node | Done, 4 tests |
| Publish workflow | `.github/workflows/publish-articles.yml` | GitHub Actions | Written. Needs a first real run |
| Site deploy | `.github/workflows/main.yml` | GitHub Actions | Existing. Redeployed by the publish workflow |

**Why this split.** Google Drive gives writers and reviewers a familiar folder interface with no new accounts. Google Apps Script runs inside the Google account the club already uses, with no server to host. The repo stays the single source of truth for published content, and the existing deploy is reused.

**Credentials.** The Apps Script holds no GitHub token. Approval and push happen on a developer's machine with their own git access. The publish workflow uses the built-in `GITHUB_TOKEN`.

**Known limits.**
- Pushes made with `GITHUB_TOKEN` do not start other workflows, so the publish workflow triggers the deploy itself.
- Approval is a developer step (Q10). Writers and reviewers cannot approve in Drive yet.
- The Action reports publish failures in the Actions tab. Writers are not notified automatically yet (FR-11).

## 11. Non-Functional Requirements

- **Security:** Only allowlisted senders can submit. The GitHub token is limited to one repo. Original emails stay in Drive.
- **Privacy:** Writer email addresses never reach the repo or the front matter. The `author` field is the display name only.
- **Reliability:** Sync and publish are retry-safe. A folder that fails stays where it was and is retried on the next run.
- **Performance:** Intake and sync run every 15 minutes. Publish runs on each approval.
- **Accessibility:** Every image needs a description (validation enforces it).
- **Auditability:** Every published article has a git commit. Its submission and validation report stay in `blogs/04-published/`.
- **Maintainability:** Helper logic has tests in `scripts/tests/`.

## 12. Decisions and Open Questions

| ID | Question | Recommendation | Status |
| --- | --- | --- | --- |
| **Q1** | Where do submissions come in and get reviewed? | **Decided: email intake and a Google Drive folder for review.** Box is dropped. | Decided |
| **Q2** | Who may submit and approve? | Allowlist in the `WRITER_EMAILS` script property. Writers and reviewers are on it. | Needs the list of names |
| **Q3** | Commit to `main` directly, or open a pull request for each publish? | Direct commit for the writing-team phase. Approval in Drive is the gate. | Decided |
| **Q4** | Do writers need accounts? | No. Email plus the allowlist is enough for the writing team. | Decided |
| **Q5** | Accept `.docx` directly? | Yes, as text, in FR-10. Headings in the document are not kept yet. | Decided |
| **Q6** | Default layout? | `standard`. | Decided |
| **Q7** | Who answers writers about validation errors? | The reviewer. Writers get the report in Drive. | Decided |
| **Q8** | Which Indigo address receives submissions, and which Google account owns the Apps Script? | Needed for setup. | **Open** (blocking) |
| **Q9** | When the team is ready, open submissions to the public? | Add a website form that posts to the same intake. Change the allowlist to "anyone, with spam checks". | Later |
| **Q10** | How do writers and reviewers approve inside Drive, with an automated publish? | **Open requirement, not implemented.** For now a developer approves locally with `npm run approve`. A Drive-side approval would need a service that commits to the repo, so it is planned for a later phase. | Open |

## 13. Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Email spoofing from an allowlisted address | High | Only allowlisted senders are processed. Reviewers check the content before approving. |
| Bad content published by mistake | High | Approval in Drive is the only gate. Revert through git. |
| Apps Script quotas (Gmail, URL fetch, trigger runs) | Medium | 15-minute schedule, batch limit of 30 emails per run. |
| Script bug writes to the wrong place | Medium | Test the helpers in Node. Run the first batch on a test folder before the real one. |
| Image size and repo growth | Medium | Recommend images under 2 MB. Move to a CDN later if the repo grows. |
| Build breaks from bad JSON | Medium | Build check before commit. Failing articles roll back. |
| Writers use unsupported formatting | Low | Light checks at intake report the problem in `VALIDATION.md`. |

## 14. Success Metrics

- At least one article goes from email to live site with no developer touching the content.
- Median time from approval to live article is under 30 minutes.
- Zero published articles with missing descriptions or broken images.
- Every published article has an archived submission folder.

## 15. Milestones

| Milestone | Deliverable | Status |
| --- | --- | --- |
| **M1** | Validator and converter with tests (15 passing) | Done (not committed) |
| **M2** | Publisher with build check and rollback (4 tests) | Done (not committed) |
| **M3** | Email intake in Apps Script, with helper tests (10 passing). Drive approval sync dropped for now (Q10) | Done (not committed). Needs live Google setup |
| **M4** | Developer approval command (`npm run approve`) and publish GitHub Action | Done (not committed). The Action needs a first real run |
| **M5** | Setup guide and a first end-to-end run with the writing team | Setup guide written. End-to-end run blocked by Q2 and Q8 |
| **M6** | Document attachments, reply emails, preview | Later |
| **M7** | Public phase: website form, public allowlist policy | Later |

## 16. Notes on Existing Docs

These inconsistencies came up during review. They are not part of this RD and should be fixed separately:

- `docs/ARCHITECTURE.md` and `docs/guides/HOW_TO_ADD_ARTICLES.md` place `articles-summary.json` in `src/data/`. The file is at `src/data/articles/articles-summary.json`.
- `docs/guides/HOW_TO_ADD_ARTICLES.md` lists three layouts. The renderer also supports `indigo-live`.
- `src/services/api.ts` comments describe a "Phase 2 (Automation)" step. This RD is that step.
