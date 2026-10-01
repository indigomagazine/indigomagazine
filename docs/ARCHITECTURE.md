# Codebase Architecture

Overview of the Indigo Magazine frontend architecture, directory structure, and core design patterns.

---

## Technology Stack

- **Core Framework:** React 19 with Vite
- **Routing:** TanStack Router (`@tanstack/react-router`) with file-based routing and automatic route tree generation
- **Styling:** Tailwind CSS v4 paired with scoped vanilla CSS files
- **Package Management:** pnpm

---

## Directory Structure

```text
indigomagazine/
├── docs/                 # Documentation, guides, and technical proposals
│   ├── guides/           # Walkthroughs for adding content and building components
│   ├── ARCHITECTURE.md   # Architectural overview and codebase breakdown
│   └── README.md         # Documentation index
├── public/               # Static assets served as-is (icons, fonts, legacy html)
├── src/
│   ├── assets/           # Local static images, graphics, and SVGs
│   ├── components/       # Reusable UI elements and feature components
│   │   ├── Analytics/    # Google Analytics tracking and telemetry
│   │   ├── Articles/     # Template rendering engine for data-driven articles
│   │   ├── Home/         # Homepage sections (Hero, Carousel, News ticker)
│   │   ├── IssueArticles/# Custom page components for magazine issue articles
│   │   └── Quiz/         # Interactive magazine quiz features
│   ├── data/             # Static JSON and JS data sources
│   │   ├── issues/       # Metadata arrays for each published issue
│   │   ├── posts/        # JSON blocks and Markdown files for data-driven articles
│   │   ├── hero-config.json
│   │   └── featured-promo.json
│   ├── routes/           # File-based route definitions (TanStack Router)
│   │   ├── Issues/       # Issue index pages and individual issue article routes
│   │   ├── __root.jsx    # Root application layout wrapping all pages
│   │   └── index.jsx     # Homepage route
│   ├── services/         # TypeScript API contracts and block type definitions
│   ├── styles/           # Global stylesheets and page-specific styles
│   ├── routeTree.gen.ts  # Auto-generated route tree (do not edit manually)
│   └── main.jsx          # Application entry point mounting React and TanStack Router
├── index.html            # Main HTML shell
├── package.json          # Project dependencies and run scripts
└── vite.config.js        # Vite build and plugin configuration
```

---

## Routing System

Routing is handled by `@tanstack/react-router` using file-based routing inside `src/routes/`:

- **Root Layout (`src/routes/__root.jsx`):** Wraps all pages with global providers and the `<AnalyticsTracker />`.
- **Top-Level Pages:** Files like `src/routes/about.jsx`, `src/routes/newsletter.jsx`, and `src/routes/visual-arts.jsx` map directly to `/about`, `/newsletter`, and `/visual-arts`.
- **Automatic Generation:** When running `pnpm dev`, Vite watches `src/routes/` and regenerates `src/routeTree.gen.ts`. Never edit `routeTree.gen.ts` directly.
- **Route Definitions:** Each route file uses `createFileRoute` and exports a `RouteComponent` rendering the corresponding UI component.

---

## Dual Article Systems

The codebase contains two distinct article architectures:

### Custom Issue Articles
- **Location:** `src/components/IssueArticles/<issue-name>/`
- **Purpose:** Bespoke, interactive web experiences built specifically for themed magazine issues (*And Scene*, *Serial*, *Reminiscence*, etc.).
- **Mechanism:** Each article has its own React component hierarchy and a matching route file in `src/routes/Issues/<issue-name>/`.
- **Guide:** See [HOW_TO_ADD_ISSUE_ARTICLES.md](./guides/HOW_TO_ADD_ISSUE_ARTICLES.md).

### Data-Driven Articles
- **Location:** `src/data/posts/` and `src/components/Articles/`
- **Purpose:** Standard web articles, essays, and stories that do not require writing custom React code.
- **Mechanism:** Content is stored as JSON containing sequential blocks (`heading`, `text`, `image`, `gallery`). The rendering engine maps these blocks to preset templates (`standard`, `editorial`, `valentines`).
- **Guide:** See [HOW_TO_ADD_ARTICLES.md](./guides/HOW_TO_ADD_ARTICLES.md).

---

## Managing Data

Rather than relying on an external backend database, storing content statically:

- **Issue Metadata (`src/data/issues/`):** Contains files like `andScene.js` and `serial.js`. Each file exports an array of article cards with titles, CDN cover image links, and route paths.
- **Promos and Banners (`src/data/featured-promo.json`, `src/data/hero-config.json`):** Configures featured carousel items and hero section banners dynamically.
- **Media Hosting:** Large assets and photography are hosted on the Indigo CDN (`https://cdn.indigomagazinetx.com/`) to keep bundle sizes lean.

---

## Styling Approach

- **Tailwind CSS v4:** Used across common components and layouts for utility-first styling.
- **Custom CSS:** Used heavily in issue articles for interactive animations, custom cursors, keyframe sequences, and bespoke aesthetics.
- **Global Styles:** `src/index.css` and `src/styles/style.css` define base resets, variables, and typography.

---

## Development Workflow

1. Installing dependencies:
   ```bash
   pnpm install
   ```
2. Running the local development server:
   ```bash
   pnpm dev
   ```
3. Building for production:
   ```bash
   pnpm build
   ```
4. Running the linter:
   ```bash
   pnpm lint
   ```
