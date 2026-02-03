import React from 'react';

export function Renderer({ article }) {
  // This is the "Template" - right now it's just raw article

  console.log("Renderer received article: ", article );
  return (
    <div className="p-10 border-4 border-dashed border-zinc-200">
      {/* <p className="text-xs font-mono text-zinc-400 mb-4">
        DEBUG: Engine successfully passed article for: {article.slug}
      </p> */}
      
      <h1 className="text-4xl font-bold">{article.title}</h1>
      <p className="italic text-zinc-600">By {article.author}</p>
      
      <div className="mt-8 text-lg leading-relaxed">
        {article.content}
      </div>
    </div>
  );
}