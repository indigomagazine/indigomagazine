import React from 'react';

export const TitleBlock = ({ category, title, subtitle, author, date }) => {
    return (
        <header className="block-title">

            <h1 className="article-title">{title}</h1>

            <div className="article-meta">
                {author && <p className="article-author">By {author}</p>}
                {date && <p className="article-date">{date}</p>}
            </div>
            <hr className="title-divider" />
        </header>
    );
};
