// src/services/api.ts

export type ContentBlock =
  | { type: 'text'; value: string }
  | { type: 'image'; url: string; caption?: string; alt?: string }
  | { type: 'gallery'; images: { url: string; caption?: string }[] };

export interface Article {
  id: string;
  slug: string;
  title: string;
  author: string;
  summary: string;
  category: string;
  date: string;
  content: ContentBlock[];
}

export interface ArticleSummaryDTO {
  slug: string;
  title: string;
  summary: string;
  author: string;
  category: string;
  date: string;
  coverImage?: string;
}

// Phase 1, we import the summary directly.
// alot easier for now. 
// For Phase 2 (Automation), this will be fetched from a static asset or API.
// if static asset --> box folder 
// If api --> supabase 
import articleSummaries from '../data/articles-summary.json';

export async function getAllArticlePosts(): Promise<ArticleSummaryDTO[]> {
  // Simulate network latency if desired, but for now just returns JSON
  return articleSummaries;
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  try {
    // Vite supports dynamic imports for JSON. 
    // This ensures only the requested article is loaded (Code Splitting).
    const module = await import(`../data/posts/${slug}.json`);
    return module.default as Article;
  } catch (error) {
    console.error(`Failed to load article: ${slug}`, error);
    return undefined;
  }
}
