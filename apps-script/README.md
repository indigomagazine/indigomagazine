# Submissions by Google Form: Setup

Writers submit articles through a Google Form linked to a Google Sheet. An Apps Script turns each response into a folder in Google Drive with the text, images, and a validation report, and logs the status and folder link back into the Sheet. A developer approves the submission locally, and pushing the approved folder publishes it through `.github/workflows/publish-articles.yml`.

Design: `docs/proposals/RD - Article Submission and Publishing Pipeline.md`.
Writer instructions: `docs/guides/SUBMISSION_TEMPLATE.md`.

Approval happens on a developer's machine for now. Approving directly from Drive/Sheets is an open requirement (RD section 12).

---

## 1. Create the Drive Folder

1. In Google Drive, create a folder named **Indigo Writing**.
2. Inside it, create a folder named **blogs**.
3. Open **blogs** and copy its ID from the address bar (the long string after `/folders/`).
4. Share **Indigo Writing** with the writing team and officers.

## 2. Create the Google Form and Linked Sheet

Create a Google Form named **Indigo Article Submission** with these questions (matching the question titles below):

| Question title | Type | Required |
| --- | --- | --- |
| `Title` | Short answer | Yes |
| `Author` | Short answer | Yes |
| `Category` | Dropdown (Culture, Campus Life, Valentine, indiGO LIVE!, etc.) | Yes |
| `Summary` | Paragraph (validation: max 300 characters) | Yes |
| `Date` | Short answer (`YYYY-MM-DD`, optional) | No |
| `Designers` | Short answer | No |
| `Photographers` | Short answer | No |
| `Graphics` | Short answer | No |
| `Cover Image` | File upload (1 image) or Short answer (filename) | No |
| `Images` | File upload (allow multiple images) | No |
| `Article Body` | Paragraph | No (required if no Document uploaded) |
| `Document` | File upload (`.docx`, `.txt`, `.md`, Google Doc) | No |

1. In Form **Settings > Responses**, turn on **Collect email addresses** if you want to enforce an allowlist via `WRITER_EMAILS`.
2. In the **Responses** tab, click **Link to Sheets** to create the linked response Sheet.

## 3. Attach the Apps Script

1. Open the linked Google Sheet and click **Extensions > Apps Script**. Name the project "Indigo Submissions".
2. Delete the default `Code.gs` contents. Create `Submissions.gs` and paste in `apps-script/Submissions.gs`.
3. Open **Project Settings** (gear icon) and tick **Show "appsscript.json" manifest file in editor**. Replace `appsscript.json` with `apps-script/appsscript.json`.
4. In **Services** (left sidebar, `+`), confirm **Drive API** version **v3** is listed.

## 4. Set Script Properties

In **Project Settings > Script properties > Add script property**:

| Property | Required | Value |
| --- | --- | --- |
| `ROOT_FOLDER_ID` | Yes | The ID of the **blogs** folder from step 1 |
| `WRITER_EMAILS` | No | Comma-separated allowlist of writer emails, e.g. `a@x.com,b@x.com`. Leave unset to accept anyone who can access the Form. |

The script does not need a GitHub token. It never writes to the repo.

## 5. Run Setup Once

1. In the Apps Script editor, select **setup** and click **Run**.
2. Approve the requested permissions (Google Sheets, Drive, Docs).
3. Check the log for `Setup complete.`

Running `setup` creates **blogs > 01-submitted**, adds tracking columns (`Slug`, `Status`, `Folder`, `Validation`) to the Sheet, and installs the `onFormSubmit` trigger.

## 6. Test with One Submission

1. Submit a short test article through the Google Form.
2. Check the linked Sheet: `Slug`, `Status`, `Folder`, and `Validation` populate automatically.
3. Open the folder link in **blogs > 01-submitted**. Confirm `submission.md`, `images/`, `form-response.json`, and `VALIDATION.md` exist.

## 7. Approve and Publish (Developer)

On a machine with this repo:

1. Download the submission folder from Drive into `blogs/01-submitted/` in the repo using the slug as the folder name.
2. Approve it locally:

   ```powershell
   npm run approve -- my-article-slug
   ```

3. If validation fails, review the printed errors and `VALIDATION.md`, fix the submission, and run the command again.
4. Commit and push:

   ```powershell
   git add blogs public/assets/articles
   git commit -m "Approve submission: my-article-slug"
   git push
   ```

5. The **Publish approved articles** workflow runs on the push, writes the article JSON and hub summary entry, verifies the build, archives to `blogs/04-published/`, and redeploys the site.

## Troubleshooting

- **Nothing happens after submitting:** Open **Executions** in the Apps Script editor to inspect errors.
- **"Missing script property":** Confirm `ROOT_FOLDER_ID` is set in step 4.
- **Row shows `Rejected`:** The submitting email is not in `WRITER_EMAILS`.
- **`npm run approve` says the slug already exists:** Check `blogs/03-approved/` and `blogs/04-published/`.
- **Publish workflow fails:** Check the Actions tab and the updated `VALIDATION.md` in `blogs/03-approved/`.

## Tests

Run the helper and pipeline tests in Node without Google services:

```powershell
pnpm run test:submissions
```
