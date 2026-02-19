import React from 'react';

export const ArticleHeaderBlock = ({ title, author, date }) => {
    return (
        <header className="article-header">
            <h1 className="text-black">{title}</h1>
            <div className="article-meta">
                {author && <span className="article-author">By {author}</span>}
                {date && <span className="article-date">{date}</span>}
            </div>
            <hr className="title-divider" />
        </header>
    );
};
