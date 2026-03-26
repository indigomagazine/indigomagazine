# How to Add an Article to the Indigo Magazine Article System

This document outlines the process of adding a new article to the Indigo Magazine website. The new article system is designed to be data-driven, meaning **you do not need to create or edit any React component files (.jsx) to publish a new article**. Instead, you will define the article's content and layout using JSON data.

## Overview of the Process
1. Format the article content in Markdown (`.md`).
2. Create an Article JSON file in `src/data/posts/`.
3. Set the article's layout and content blocks.
4. Add the article to the summary list in `src/data/articles-summary.json`.

---

## 1. Prepare the Data (Markdown)
Typically, you will receive or write the article text in a Markdown (`.md`) file. If you receive a doc file, convert it to a markdown file.Save this raw text in the `src/data/posts/` folder (e.g., `src/data/posts/My-New-Article.md`). 

> **Note:** We currently use the Markdown file as a source of truth/reference to easily read the text before converting it into the JSON structure required by the system. (Automated MD to JSON conversion might be introduced in the future).

## 2. Create the Article JSON File
The actual data that the React application uses is stored in a JSON file.
Create a new `.json` file in `src/data/posts/` and name it using the article's "slug" (e.g., `my-new-article.json`). 

Here is the base structure your JSON file must follow:

```json
{
  "id": "",
  "slug": "my-new-article",
  "title": "Title of the Article",
  "author": "Author Name",
  "category": "Category Name",
  "summary": "A short blurb or summary of the article.",
  "date": "2026-03-25",
  "layout": "standard",
  "content": []
}
```

*You can include other optional metadata fields like `"designers"`, `"photographers"`, `"graphics"`, etc., as needed.*

## 3. Specify the Layout
Because the article system is fully dynamic, you **do not create a React file** for your article. The system will automatically generate the UI based on the `"layout"` property in your JSON file.

Currently available layouts (found in `src/components/Articles/Templates/`):
- `"standard"` (Uses `StandardTemplate.jsx`)
- `"valentines"` (Uses `ValentineTemplate.jsx` / `Valentines.jsx`)
- `"editorial"` (Uses `EditorialTemplate.jsx`)

Set `"layout": "standard"` (or your preferred layout), and the system will automatically route and render your article using that template!

## 4. Build the Content Array
The `"content"` array in your JSON file is where the actual article lives. It is composed of "blocks" that the selected template will render sequentially. 

Depending on your layout, the available content blocks differ slightly. For a standard layout, you typically use:

### Text Block
```json
{
  "type": "text",
  "value": "This is a paragraph of text in the article."
}
```

### Heading Block
```json
{
  "type": "heading",
  "value": "Section Title"
}
```

### Image Block
```json
{
  "type": "image",
  "url": "/assets/articles/folder-name/image.jpg",
  "caption": "Optional image caption",
  "alt": "Alt text for accessibility"
}
```

### Gallery Block
```json
{
  "type": "gallery",
  "images": [
    { "url": "/assets/articles/folder-name/1.jpg", "caption": "Image 1" },
    { "url": "/assets/articles/folder-name/2.jpg", "caption": "Image 2" }
  ]
}
```

*Note: Special layouts like `"valentines"` have their own specialized block types (e.g., `"valentinesParagraph"`, `"valentinesHScrollGallery"`).*

> **Need a custom look?** If the existing blocks don't fit your needs or you want to creat your own spin on exisitng one, you can create your own!
> 
> **Brief overview of creating a block:**
> 1. Create a `.jsx` React component in `src/components/Articles/Renderer/blocks/`.
> 2. Update the `ContentBlock` types in `src/services/api.ts`.
> 3. Add your new block to the mapping inside your target Layout Template (e.g., `StandardTemplate.jsx`).
>
> For full, step-by-step instructions on creating new content blocks, as well as how to build entirely new **Layout Templates**, please refer to [HOW_TO_BUILD_LAYOUTS_AND_BLOCKS.md](./HOW_TO_BUILD_LAYOUTS_AND_BLOCKS.md).
## 5. Update the Articles Summary
For the new article to show up on the article page, it must be added to the main index file.

Open `src/data/articles-summary.json` and append a new object to the array:

```json
[
  {
    "slug": "my-new-article",
    "title": "Title of the Article",
    "author": "Author Name",
    "category": "Category Name",
    "summary": "A short blurb or summary of the article.",
    "date": "2026-03-25",
    "coverImage": "/assets/articles/folder-name/cover.jpg"
  }
  // ... existing articles
]
```
*Note: Make sure to add the new article at the top of the array to make it the most recent article.*

## Summary Checklist
- [ ] Is the Markdown `.md` file saved in `src/data/posts/`?
- [ ] Is the data converted into a `{slug}.json` file in `src/data/posts/`?
- [ ] Did you set a valid `"layout"` in the JSON file?
- [ ] Did you populate the `"content"` array with the correct block types?
- [ ] Did you add the article to `src/data/articles-summary.json`?

Once you complete these steps, start your local development server, navigate to the article's URL, and you should see your newly rendered article!
