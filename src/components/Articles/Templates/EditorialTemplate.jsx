import React from 'react';
import { TextBlock } from '../Renderer/blocks/TextBlock';
import { ImageBlock } from '../Renderer/blocks/ImageBlock';
import { GalleryBlock } from '../Renderer/blocks/GalleryBlock';
//This template uses the editorial style
import '../../../styles/articles/look-editorial.css';

// Used by Renderer.jsx
export function EditorialTemplate({ article }) {
    return (
        <div className="look-editorial">
            <article className="article-container">
                <header className="article-header">
                    <span className="article-category">{article.category}</span>
                    <h1 className="article-title">{article.title}</h1>
                    <div className="article-meta">
                        <p className="article-author">{article.author}</p>
                        <p className="article-date">{article.date}</p>
                    </div>
                </header>

                <main>
                    {article.content.map((block, index) => {
                        switch (block.type) {
                            case 'text':
                                return <TextBlock key={index} value={block.value} />;
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
