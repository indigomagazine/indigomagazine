import { createFileRoute } from '@tanstack/react-router';
import { getAllArticlePosts } from '../../services/api';
import { ArticlesHub } from '../../components/Articles/Hub/ArticlesHub';

export const Route = createFileRoute('/articles/')({
  // THE BRAIN: Fetch metadata for all available articles
  loader: async () => {
    return await getAllArticlePosts();
  },
  component: ArticlesHubPage,
});

function ArticlesHubPage() {
  const posts = Route.useLoaderData();

  console.log("article post: ", posts);

  return <ArticlesHub posts={posts} />;
}
