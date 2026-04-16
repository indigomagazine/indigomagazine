# How to Add a New Article

This guide explains the step-by-step process for adding a new article to a specific issue.

## 1. Create Article Components
**Location:** `src/components/IssueArticles/`

To keep our codebase organized, all layout and structural components for your article should be placed here.

1. Navigate to the folder of the issue you are working on (e.g., `src/components/IssueArticles/serial`). If the issue folder doesn't exist, create it.
2. Inside the issue folder, **create a new folder specifically for your article** (e.g., `myArticleName`).
3. Inside your new article folder, add or create your React component and CSS files. Make sure to follow standard component hierarchy practices.
4. You should have one main page component that acts as the root entry point for your article. This will be the component you import and render when setting up your route in Step 2.

## 2. Create the Article Route
**Location:** `src/routes/Issues/`

We use `@tanstack/react-router` for routing. Once your components are built, you need to create a route file so the article can be accessed on the site.

1. Navigate to the corresponding issue folder under routes (e.g., `src/routes/Issues/serial`).
2. **Create a new `.jsx` file** for your route. The name of the file dictates the URL path. (e.g., `my-article.jsx` maps to `/Issues/serial/my-article`).
3. Copy the routing template below and update the paths and component names to match your new article:

```jsx
import { createFileRoute } from "@tanstack/react-router";
// 1. Import your main article component from the components folder
import ArticlePage from "../../../components/IssueArticles/[IssueName]/[ArticleFolder]/[ArticlePage]";

// 2. Set the exact route path matching where this file is placed
export const Route = createFileRoute("/Issues/[IssueName]/[article-file-name]")({
  component: RouteComponent,
});

// 3. Render your component
function RouteComponent() {
  return <ArticlePage />;
}
```

## 3. Add Article to the Issue Data File
**Location:** `src/data/issues/`

Finally, to make your article visible on the actual issue page index, you need to add an entry to the issue's data array.

1. Navigate to `src/data/issues/` and find the data file corresponding to your issue (e.g., `andScene.js` or `serial.js`).
2. Add a new object for your article to the top of the exported array.
3. Use the following format for your new entry:

```javascript
    {
        type: "issue",
        title: "Your Article Title",
        description: "Short description or issue name",
        image: "/path/to/your/cover/image.jpg", // Can be external or local
        path: "/Issues/[issue-name]/[article-file-name]",
        // The 'to' field must match the route path you created in Step 2
        to: "/Issues/[issue-name]/[article-file-name]",
        coverPos: "center center",
    },
```

### Summary Outline
- Add components in `src/components/IssueArticles/<issue>/<article>/<MainPage>.jsx`
- Add route in `src/routes/Issues/<issue>/<article-name>.jsx`
- Add data entry in `src/data/issues/<issue>.js`

You should now be able to view your newly added article on the issue page!
