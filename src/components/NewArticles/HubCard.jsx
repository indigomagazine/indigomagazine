import React from 'react';

export function HubCard({ post }) {
  return (
    <div className="hub-card border border-zinc-200 p-5 rounded hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all cursor-pointer h-full flex flex-col bg-white group">
      <div className="aspect-[16/10] bg-zinc-100 rounded overflow-hidden mb-4">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-300 font-mono text-[10px] uppercase tracking-widest bg-zinc-50 border border-zinc-100">
            No Cover Image
          </div>
        )}
      </div>

      <div className="flex-grow">
        <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-500 uppercase">
          {post.category}
        </span>
        <h2 className="text-xl font-bold mt-1 text-zinc-900 group-hover:text-indigo-600 transition-colors tracking-tight">
          {post.title}
        </h2>
        <p className="text-sm text-zinc-500 mt-2 line-clamp-3 leading-relaxed font-serif italic">
          {post.summary}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-50 flex justify-between items-center text-[10px] font-mono text-zinc-400 uppercase tracking-tighter">
        <span>{post.author}</span>
        <span>{post.date}</span>
      </div>
    </div>
  );
}
