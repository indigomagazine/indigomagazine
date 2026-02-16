import { Link } from '@tanstack/react-router';
import { HubCard } from './HubCard';

export const ArticlesHub = ({ posts }) => {
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
};
