import { createFileRoute, Link } from '@tanstack/react-router';
import { getAllArticlePosts } from '../../services/api'; 
import { HubCard } from '../../components/NewArticles/HubCard';

export const Route = createFileRoute('/articles/')({
  // THE BRAIN: Fetch metadata for all available articles
  loader: async () => {
    return await getAllArticlePosts();
  },
  component: ArticlesHubPage,
});
function ArticlesHubPage() {
  const posts = Route.useLoaderData();

  console.log("article post: ", posts );

  return (
    <div className="articles-hub-container max-w-7xl mx-auto p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold uppercase tracking-tighter">Articles</h1>
        <p className="text-zinc-500 font-mono text-sm">The latest from the writing department</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link 
            key={post.id} 
            to="/articles/$articleSlug" 
            params={{ articleSlug: post.slug }}
            className="no-underline text-inherit group"
          >
            <HubCard post={post} />
          </Link>
        ))}
      </div>
    </div>
  );
}
