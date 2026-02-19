import React, { useState } from 'react';

const TITLE_SVG = '/assets/articles/indigovalentinesphotos/HowToRuinAFirstDate.svg';
const TITLE_TEXT = 'How To Ruin A First Date!';

export const ValentinesTitleBlock = ({ author }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <header className="block-valentines-title">
      {!imgError ? (
        <img
          src={TITLE_SVG}
          alt={TITLE_TEXT}
          className="valentines-title-svg"
          onError={() => setImgError(true)}
        />
      ) : (
        <h1 className="valentines-title-fallback">{TITLE_TEXT}</h1>
      )}
      <div className="article-meta">
        {author && <p className="article-author">Written by {author}</p>}
      </div>
    </header>
  );
};
