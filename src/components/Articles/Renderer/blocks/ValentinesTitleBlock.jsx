import React from 'react';

export const ValentinesTitleBlock = ({ author }) => {
  return (
    <header className="block-valentines-title">
      <img
        src="/assets/articles/indigovalentinesphotos/How%20To%20Ruin%20A%20First%20Date.svg"
        alt="How To Ruin A First Date"
        className="valentines-title-svg"
      />
      <div className="article-meta">
        {author && <p className="article-author">Written by {author}</p>}
      </div>
    </header>
  );
};
