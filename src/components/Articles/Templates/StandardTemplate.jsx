import React from 'react';
import { TextBlock } from '../Renderer/blocks/TextBlock';
import { HeadingBlock } from '../Renderer/blocks/HeadingBlock';
import { ImageBlock } from '../Renderer/blocks/ImageBlock';
import { GalleryBlock } from '../Renderer/blocks/GalleryBlock';

import '../../../styles/articles/look-standard.css';

export function StandardTemplate({ article }) {
    return (
        <div className="look-standard">
            <article className="article-container">
                <header className="article-header">


                    <div className="article-meta">
                        <h1 className="article-title">{article.title}</h1>
                        {article.author && <span className="article-author">By {article.author}</span>}
                        {article.date && <span className="article-date">{article.date}</span>}
                    </div>
                    <hr className="title-divider" />
                </header>

                <main>
                    {article.content.map((block, index) => {
                        switch (block.type) {
                            case 'text':
                                return <TextBlock key={index} value={block.value} />;
                            case 'heading':
                                return <HeadingBlock key={index} value={block.value} />;
                            case 'image':
                                return <ImageBlock key={index} {...block} />;
                            case 'gallery':
                                return <GalleryBlock key={index} images={block.images} />;
                            default:
                                return null;
                        }
                    })}
                </main>
            </article>
        </div>
    );
}
