import React from 'react';

export function HubCard({ post }) {
    console.log("hub card post: ", post );
  return (
    <div className="hub-card border border-zinc-200 p-5 rounded hover:bg-zinc-50 transition-all cursor-pointer h-full flex flex-col">
      {/* UI/UX Team can replace this div with a real image component later */}
      <div className="aspect-video bg-zinc-100 rounded mb-4 flex items-center justify-center text-zinc-400 italic">
        Thumbnail Placeholder
      </div>
      
      <div className="flex-grow">
        <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
          {post.category}
        </span>
        <h2 className="text-xl font-semibold mt-1">{post.title}</h2>
        <p className="text-sm text-zinc-600 mt-2 line-clamp-2">{post.summary}</p>
      </div>

      <div className="mt-4 pt-4 border-t border-zinc-100 flex justify-between items-center text-xs text-zinc-400">
        <span>By {post.author}</span>
        <span>{post.date}</span>
      </div>
    </div>
  );
}