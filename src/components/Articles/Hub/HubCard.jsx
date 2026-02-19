import React from 'react';
import './HubCard.css';

export function HubCard({ post }) {
  // Design features: Poster style, white border, stylized author signature.

  return (
    <div className="hub-card-container group">
      {/* Image Container */}
      <div className="hub-card-image-wrapper">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="hub-card-image"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-100 text-zinc-400 font-serif italic text-lg">
            Ind.
          </div>
        )}
      </div>

      {/* Text Content Area */}
      <div className="hub-card-content">

        <div className="hub-card-metadata">
          <span className="hub-card-author">{post.author}</span>
          <span className="hub-card-date">{post.date}</span>
        </div>

        {/* Title */}
        <h2 className="hub-card-title">
          {post.title}
        </h2>

        {/* Summary */}
        {post.summary && (
          <p className="hub-card-summary">
            {post.summary}
          </p>
        )}

        {/* Metadata Footer */}


      </div>
    </div>
  );
}
