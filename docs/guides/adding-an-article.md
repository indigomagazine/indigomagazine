# How to Add a New Article

This guide explains the step-by-step process for adding a new article to a specific issue.

## 1. Create Article Components
**Location:** `src/components/IssueArticles/`

To keep our codebase organized, all layout and structural components for your article should be placed here.

1. Navigate to the folder of the issue you are working on (e.g., `src/components/IssueArticles/serial`). If the issue folder doesn't exist, create it.
2. Inside the issue folder, **create a new folder specifically for your article** (e.g., `myArticleName`).
3. Inside your new article folder, create your React components and CSS files. Typically, you will start with a main page component:
   - Example: `MyArticlePage.jsx`
   - Example: `myArticleName.css`
4. Assemble your layout. You can build your article by referencing or reusing templates from `src/components/IssueArticles/shared/` or other existing articles in the issue.

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

### Summary Outline
- Add components in `src/components/IssueArticles/<issue>/<article>/<MainPage>.jsx`
- Add route in `src/routes/Issues/<issue>/<article-name>.jsx`

You should now be able to view your newly added article!
