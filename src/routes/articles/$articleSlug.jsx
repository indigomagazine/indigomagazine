// src/routes/dispatch/$articleSlug.jsx
import { createFileRoute } from '@tanstack/react-router';
import { Renderer } from '../../components/NewArticles/Renderer';
import { getArticle } from '../../services/api';

export const Route = createFileRoute('/articles/$articleSlug')({
  // The Loader: This is the critical part
  loader: async ({ params }) => {
    const data = await getArticle(params.articleSlug);
    
    // If no article is found, TanStack will throw to the errorComponent
    if (!data) throw new Error('Post not found');
    
    return data;
  },
  
  component: () => {
    const article = Route.useLoaderData();
    console.log("Loaded article: ", article );
    return <Renderer article={article} />;
  },
  
  // Custom loading state specifically for the dynamic feed
  pendingComponent: () => <div className="p-20 text-center animate-pulse">Fetching story...</div>,
});