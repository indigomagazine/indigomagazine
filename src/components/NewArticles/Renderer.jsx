import React from 'react';

export function Renderer({ data }) {
  // This is the "Template" - right now it's just raw data
  return (
    <div className="p-10 border-4 border-dashed border-zinc-200">
      <p className="text-xs font-mono text-zinc-400 mb-4">
        DEBUG: Engine successfully passed data for: {data.slug}
      </p>
      
      <h1 className="text-4xl font-bold">{data.title}</h1>
      <p className="italic text-zinc-600">By {data.author}</p>
      
      <div className="mt-8 text-lg leading-relaxed">
        {data.content}
      </div>
    </div>
  );
}