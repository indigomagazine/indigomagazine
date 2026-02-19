import { Link } from '@tanstack/react-router';
import { HubCard } from './HubCard';
import Taskbar from '../../Home/Taskbar';
import articlesSvg from '../../../assets/logos/Articles.svg';
import './ArticlesHub.css';


export const ArticlesHub = ({ posts }) => {
    return (
        <div className="articles-page-wrapper">
            <Taskbar darkIcons={true} />

            <div className="articles-hub-container max-w-7xl mx-auto p-8 pt-32 relative z-10">
                <header className="mb-24 flex flex-col items-center justify-center text-center space-y-6 articles-hub-header">
                    <img
                        src={articlesSvg}
                        alt="Articles"
                        className="h-10 md:h-14 w-auto svg-black"
                    />

                    <hr className="hub-separator" />
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-x-10 gap-y-20">
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            to="/articles/$articleSlug"
                            params={{ articleSlug: post.slug }}
                            className="no-underline text-inherit group block h-full"
                        >
                            <HubCard post={post} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
