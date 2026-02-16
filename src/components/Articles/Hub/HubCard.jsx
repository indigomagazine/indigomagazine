import React from 'react';
import './HubCard.css';

export function HubCard({ post }) {
  // SVG Proportions: 640x980 total. Image ~532x709 (approx 72% height).
  // Design features: Serif typography, clean layout, "poster" style.

  return (
    <div className="hub-card-container group">
      {/* Image Container */}
      <div className="hub-card-image-wrapper">
        <div className="hub-card-image-inner">
          <div className="hub-card-image-clip">
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
        </div>
      </div>

      {/* Text Content Area */}
      <div className="hub-card-content">

        {/* Sub-data / Issue Date */}
        <div className="hub-card-metadata">
          <span>{post.author}</span>
          <span className="hub-card-dot"></span>
          <span>{post.date}</span>
        </div>

        {/* Category / Sub-header - User commented this out, keeping it commented but using CSS classes 
        <div className="hub-card-category-hidden">
          <span className="inline-block text-[10px] tracking-[0.25em] uppercase font-sans text-zinc-500 transform translate-y-0 transition-transform duration-500 group-hover:-translate-y-full">
            {post.category || 'Editorial'}
          </span>
          <span className="inline-block text-[10px] tracking-[0.25em] uppercase font-sans text-indigo-600 transform translate-y-full transition-transform duration-500 absolute left-0 right-0 group-hover:translate-y-0">
            Read Story
          </span>
        </div> */}

        {/* Title */}
        <h2 className="hub-card-title">
          {post.title}
        </h2>

      </div>
    </div>
  );
}
