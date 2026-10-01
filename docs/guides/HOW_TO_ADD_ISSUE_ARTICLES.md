# Scaffolding Issue Articles

Adding a custom article to an issue involves three main steps: creating your component folder, setting up the route, and registering your article in the issue list.

---

## Folder Naming Rules

Your component folder name under `src/components/IssueArticles/<issue>/` does not need to match your route URL.

- TanStack Router determines the URL strictly from the file location and name in `src/routes/Issues/<issue>/`.
- The component folder in `src/components/IssueArticles/<issue>/` is simply where your React code and CSS live.

For example:
- Component folder: `src/components/IssueArticles/andscene/mold-spore-rejuvenation/` -> Route file: `src/routes/Issues/andscene/moldspore.jsx` -> URL: `/Issues/andscene/moldspore`
- Component folder: `src/components/IssueArticles/andscene/alice/` -> Route file: `src/routes/Issues/andscene/ruminatingchimera.jsx` -> URL: `/Issues/andscene/ruminatingchimera`

While naming does not need to match, using clear and descriptive names helps team members navigate the code easily.

---

## 1. Creating Article Components

**Location:** `src/components/IssueArticles/<issue-name>/`

All React code, CSS files, and local assets for your article live inside this folder.

1. Opening the folder for your target issue (for example, `src/components/IssueArticles/andscene/`).
2. Creating a new folder for your article (for example, `my-article/`).
3. Adding your main entry component (such as `MyArticle.jsx`) along with any styling files (like `MyArticle.css`).
4. Exporting your main article component as the default export.

---

## 2. Setting Up the Route

**Location:** `src/routes/Issues/<issue-name>/`

Routing uses `@tanstack/react-router`. The filename you choose here dictates the exact browser URL.

1. Opening the corresponding issue folder in routes (for example, `src/routes/Issues/andscene/`).
2. Creating a new `.jsx` file named after your URL slug (for example, `my-article.jsx`, which maps to `/Issues/andscene/my-article`).
3. Adding the route boilerplate and importing your component:

```jsx
import { createFileRoute } from "@tanstack/react-router";
import MyArticle from "../../../components/IssueArticles/<issue-name>/<my-article-folder>/MyArticle";

export const Route = createFileRoute("/Issues/<issue-name>/my-article")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MyArticle />;
}
```

> **Note on routing:** Always preserve the capital `I` in `/Issues/<issue-name>/<route-name>` to match TanStack Router configuration.

---

## 3. Registering Issue Data

**Location:** `src/data/issues/`

To display your article card on the issue cover or carousel page, register it in the issue data file.

1. Opening the data file for your issue (for example, `src/data/issues/andScene.js`).
2. Adding a new entry object to the array:

```javascript
{
  type: "issue",
  title: "Article Title",
  description: "Issue Name or Short Subtitle",
  image: "https://cdn.indigomagazinetx.com/articlephotos/.../cover.jpg",
  path: "/Issues/<issue-name>/my-article",
  to: "/Issues/<issue-name>/my-article",
  coverPos: "center center",
},
```

---

## 4. Verifying Changes

1. Running the dev server:
   ```bash
   pnpm dev
   ```
2. TanStack Router automatically sregenerates `src/routeTree.gen.ts`.
3. Navigating to `http://localhost:5173/Issues/<issue-name>` to see your card, or visiting `http://localhost:5173/Issues/<issue-name>/my-article` directly.
