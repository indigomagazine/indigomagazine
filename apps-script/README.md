# Submissions by Email: Setup

Writers email articles to a submissions address. An Apps Script turns each email into a folder in Google Drive, with the text, the images, and a validation report. A developer approves the submission locally, and pushing the approved folder publishes it through the GitHub Action in `.github/workflows/publish-articles.yml`.

Design: `docs/proposals/RD - Article Submission and Publishing Pipeline.md`.
Writer instructions: `docs/guides/SUBMISSION_TEMPLATE.md`.

Approval happens on a developer's machine for now. Approving inside Drive is an open requirement (RD section 12).

---

## 1. Create the Drive folder

1. In Google Drive, create a folder named **Indigo Writing**.
2. Inside it, create a folder named **blogs**.
3. Open **blogs** and copy its ID from the address bar. It is the long string after `/folders/`.
4. Share **Indigo Writing** with the writing team (Editor for writers).

## 2. Create the Apps Script project

1. Go to <https://script.google.com> and click **New project**. Name it "Indigo Submissions".
2. Delete the default `Code.gs` contents. Create a file `Submissions.gs` and paste in `apps-script/Submissions.gs`.
3. Open **Project Settings** (gear icon) and tick **Show "appsscript.json" manifest file in editor**. Replace the contents of `appsscript.json` with `apps-script/appsscript.json`.
4. In **Services** (left sidebar, `+`), confirm **Drive API** version **v3** is listed.

## 3. Set up the submissions address

1. Choose the address, for example `submissions@your-domain`. A Google Group or a Gmail alias works.
2. Make sure mail to that address lands in the account that owns the Apps Script. A Google Group does this automatically.

## 4. Set script properties

In the Apps Script editor: **Project Settings > Script properties > Add script property**.

| Property | Value |
| --- | --- |
| `ROOT_FOLDER_ID` | The ID of the **blogs** folder from step 1 |
| `INTAKE_ADDRESS` | The submissions address from step 3 |
| `WRITER_EMAILS` | Comma-separated list of writer and reviewer emails, for example `a@x.com,b@x.com` |

The script does not need a GitHub token. It never writes to the repo.

## 5. Run setup once

1. In the editor, select the function **setup** and click **Run**.
2. Approve the permissions when asked (Drive, Gmail).
3. Check the log. You should see "Setup complete."

This creates **blogs > 01-submitted** and a 15-minute trigger that reads new submission emails.

## 6. Test with one submission

1. From an address in `WRITER_EMAILS`, email the submissions address with a short test article (see the writer guide).
2. Wait up to 15 minutes, or run `processNewEmails` from the editor.
3. Check **blogs > 01-submitted**. You should see a folder with `submission.md`, `images/` (if you attached photos), `email.txt`, and `VALIDATION.md`.

## 7. Approve and publish (developer)

On a machine with this repo:

1. Download the submission folder from Drive into `blogs/01-submitted/` in the repo. Use the slug as the folder name.
2. Approve it. This validates it, moves it to `blogs/03-approved/`, and copies its images into `public/assets/articles/`:

   ```powershell
   npm run approve -- my-article-slug
   ```

3. If it fails, the errors are printed and written to `VALIDATION.md`. Fix the submission and run it again.
4. Commit and push:

   ```powershell
   git add blogs public/assets/articles
   git commit -m "Approve submission: my-article-slug"
   git push
   ```

5. The **Publish approved articles** workflow runs on the push. It publishes the article, commits the JSON and the hub entry, and redeploys the site.

Start with a test article. Send real submissions only after the first test works end to end.

## Troubleshooting

- **Nothing happens:** open **Executions** in the Apps Script editor. Errors show there.
- **"Missing script property":** a property in step 4 is not set.
- **Sender ignored:** the sender is not in `WRITER_EMAILS`. Check the `Submissions/Rejected` Gmail label.
- **`npm run approve` says the slug already exists:** that submission was approved before. Check `blogs/03-approved/` and `blogs/04-published/`.
- **Publish workflow fails:** see the Actions tab. The failing folder keeps a `VALIDATION.md` in `blogs/03-approved/`.

## Tests

The helper functions are tested in Node, without Google services:

```powershell
npm run test:submissions
```

## Limits of this first version

- Document headings are not kept.
- Writers are not emailed when the article is approved or published (planned).
- Approval is a developer step. Approving inside Drive is an open requirement.
