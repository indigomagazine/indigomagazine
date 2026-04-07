# How to Upload and Use Article Images in the Indigo Magazine CDN

This document outlines the process for uploading article images to our shared media system and using them in the Indigo Magazine website. The system is designed to be simple and centralized: all images are uploaded to Box, automatically synced to our CDN, and then referenced via URL in your code.

---

## Overview of the Process

1. Upload images to the shared Box folder using the correct structure
2. Ensure proper naming conventions for files and folders
3. Wait for the sync process to upload images to the CDN
4. Reference the image using the CDN URL in your code

---

## 1. Upload Images to Box

All images must be uploaded to the shared Box folder under the following structure:

```
indigo magazine/
  indigomedia/
    articlephotos/
      {article-name}/
        {issue-name}/
          your-image-files
```

### Example:

```
indigo magazine/indigomedia/articlephotos/not/disconnect/ninaa.jpg
```

**Note:** Only upload images into the correct article and issue folder. Do not upload files outside of this structure.

---

## 2. Follow Naming Conventions

To ensure consistency and prevent broken links, all file and folder names must follow these rules:

* Use lowercase only
* Do not use spaces
* Hyphens are allowed and recommended
* Avoid special characters

### Examples

| Incorrect               | Correct        |
| ----------------------- | -------------- |
| Disconnect From The Not | disconnect     |
| NinaA.JPG               | ninaa.jpg      |
| My Image (1).png        | my-image-1.png |

**Note:** File paths are case-sensitive. Any mismatch will result in broken images on the site.

---

## 3. Sync to CDN

After uploading images to Box:

The sync system will automatically:

* Fetch images from the Box folder
* Upload them to the CDN bucket
* Preserve the same folder structure

No manual action is required from developers during this step.

---

## 4. CDN URL Structure

All images are served from the CDN using the following format:

```
https://cdn.indigomagazinetx.com/articlephotos/{article-name}/{issue-name}/{filename}
```

### Example

If your file is stored in Box as:

```
indigo magazine/indigomedia/articlephotos/not/disconnect/ninaa.jpg
```

Then the CDN URL will be:

```
https://cdn.indigomagazinetx.com/articlephotos/not/disconnect/ninaa.jpg
```

---

## 5. Use Images in Code

Once the image is available on the CDN, you can reference it directly in your code.


### React Example

```jsx
<img src="https://cdn.indigomagazinetx.com/articlephotos/not/disconnect/ninaa.jpg" />
```

**Note:** Always verify that the image loads in the browser before committing your code.

---

## 6. Updating or Replacing Images

If you need to update an image:

* Replace the file in the same Box folder using the exact same filename
* The sync process will overwrite the existing file in the CDN

If you change the filename, you must also update the URL in your code.

---

## 7. Important Guidelines

### Do

* Upload images to the correct article and issue folder
* Use consistent and clean file names
* Use hyphens instead of spaces when needed
* Optimize images before uploading (prefer `.webp` when possible)
* Verify CDN links before publishing

### Do Not

* Upload files outside the defined folder structure
* Use spaces or uppercase letters in file names
* Rename files after they are already used in code
* Upload duplicate files with inconsistent naming

---

## 8. Troubleshooting

### Image Not Loading

Check:

* File path matches exactly (case-sensitive)
* File exists in the correct Box folder
* CDN URL is correct

### Delay in Image Availability

* The sync process may take a short amount of time to reflect new uploads

---

## 9. Summary Checklist

* Are images uploaded to the correct Box folder (`indigo magazine/indigomedia/articlephotos/`)?
* Are `article-name` and `issue-name` folders correct and consistent?
* Are all file names lowercase with no spaces?
* Does the CDN URL match the expected structure?
* Does the image load correctly in the browser?

Once these steps are complete, your images are ready to be used in the article system.

