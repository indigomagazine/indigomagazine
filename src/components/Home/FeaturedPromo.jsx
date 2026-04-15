import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { HubCard } from '../Articles/Hub/HubCard';
import articlesData from '../../data/articles-summary.json';
import featuredPromoConfig from '../../data/featured-promo.json';

export const FeaturedPromo = ({ theme }) => {
    const navigate = useNavigate();
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const renderContent = () => {
        switch (featuredPromoConfig.activePromo) {
            case 'article': {
                let postToRender;
                if (featuredPromoConfig.targetId === 'latest') {
                    postToRender = [...articlesData].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
                } else {
                    postToRender = articlesData.find(article => article.slug === featuredPromoConfig.targetId) || articlesData[0];
                }

                return (
                    <section ref={sectionRef} className={`quiz-promo-section ${isVisible ? 'is-visible' : ''}`} style={{ paddingBottom: '2rem' }}>
                        <h2 className="quiz-main-title" style={{ marginBottom: '1.5rem' }}>
                            <span>{featuredPromoConfig.title}</span>
                        </h2>
                        <div className="quiz-line-black" style={{ marginBottom: '3rem' }}></div>

                        {postToRender && (
                            postToRender.path ? (
                                <a
                                    href={postToRender.path}
                                    className="no-underline text-inherit group block mx-auto"
                                    style={{ maxWidth: '450px', width: '100%', textAlign: 'left' }}
                                >
                                    <HubCard post={postToRender} />
                                </a>
                            ) : (
                                <Link
                                    to="/articles/$articleSlug"
                                    params={{ articleSlug: postToRender.slug }}
                                    className="no-underline text-inherit group block mx-auto"
                                    style={{ maxWidth: '450px', width: '100%', textAlign: 'left' }}
                                >
                                    <HubCard post={postToRender} />
                                </Link>
                            )
                        )}
                    </section>
                );
            }

            case 'issue': {
                // Framework for when issues roll out
                return (
                    <section ref={sectionRef} className={`quiz-promo-section ${isVisible ? 'is-visible' : ''}`} style={{ paddingBottom: '2rem' }}>
                        <h2 className="quiz-main-title" style={{ marginBottom: '1.5rem' }}>
                            <span>{featuredPromoConfig.title}</span>
                        </h2>
                        <div className="quiz-line-black" style={{ marginBottom: '3rem' }}></div>
                        <p style={{ color: theme === 'dark' ? 'white' : 'black' }}>Stay tuned for the newest semester release...</p>
                    </section>
                );
            }

            case 'quiz': {
                return (
                    <section ref={sectionRef} className={`quiz-promo-section ${isVisible ? 'is-visible' : ''}`}>
                        {/* Using split allowing the title to be split across two lines if separated by a pipe character | */}
                        <h2 className="quiz-main-title">
                            {featuredPromoConfig.title.includes('|') ? (
                                <>
                                    <span>{featuredPromoConfig.title.split('|')[0]}</span>
                                    <br className="desktop-only" />
                                    <span>{featuredPromoConfig.title.split('|')[1]}</span>
                                </>
                            ) : (
                                <span>{featuredPromoConfig.title}</span>
                            )}
                        </h2>
                        <div className="quiz-line-black"></div>

                        <button
                            className="quiz-take-button"
                            onClick={() => {
                                import("../../analytics").then(({ trackEvent }) => {
                                    trackEvent("Promo", "Start", "Homepage Button");
                                    navigate({ to: `/${featuredPromoConfig.targetId}` }); // e.g. targetId = "quiz"
                                });
                            }}
                        >
                            {featuredPromoConfig.actionText}
                        </button>
                    </section>
                );
            }

            default:
                return null;
        }
    };

    return renderContent();
};
