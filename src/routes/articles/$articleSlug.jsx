import { createFileRoute } from '@tanstack/react-router';
import { Renderer } from '../../components/Articles/Renderer/Renderer';
import { getArticle } from '../../services/api';

export const Route = createFileRoute('/articles/$articleSlug')({
  loader: async ({ params }) => {
    const data = await getArticle(params.articleSlug);
    if (!data) throw new Error('Post not found');
    return data;
  },
  component: () => {
    const article = Route.useLoaderData();
    return <Renderer article={article} />;
  },
  errorComponent: () => (
    <div className="max-w-4xl mx-auto p-20 text-center">
      <h1 className="text-2xl font-bold text-zinc-400 uppercase tracking-tighter">Article not found</h1>
      <p className="mt-4 text-zinc-500">The story you're looking for doesn't exist or is currently being edited.</p>
    </div>
  ),
  pendingComponent: () => (
    <div className="max-w-5xl mx-auto px-6 py-20 animate-pulse">
      <div className="h-4 w-24 bg-zinc-100 mb-4"></div>
      <div className="h-20 w-full bg-zinc-100 mb-8"></div>
      <div className="h-4 w-48 bg-zinc-100 mb-16"></div>
      <div className="space-y-4">
        <div className="h-4 w-full bg-zinc-50"></div>
        <div className="h-4 w-full bg-zinc-50"></div>
        <div className="h-4 w-3/4 bg-zinc-50"></div>
      </div>
    </div>
  ),
});
