import React from 'react';

// --- Sub-Components ---

const TextBlock = ({ value }) => (
  <div className="max-w-2xl mx-auto my-8">
    <p className="font-serif text-xl leading-relaxed text-zinc-900 selection:bg-indigo-100">
      {value}
    </p>
  </div>
);

const ImageBlock = ({ url, caption, alt }) => (
  <figure className="my-12 w-full">
    <img 
      src={url} 
      alt={alt || "Article visual"} 
      className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
    />
    {caption && (
      <figcaption className="mt-3 text-xs uppercase tracking-widest text-zinc-500 font-sans italic">
        {caption}
      </figcaption>
    )}
  </figure>
);

const GalleryBlock = ({ images }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-12">
    {images.map((img, idx) => (
      <div key={idx} className="aspect-[3/4] overflow-hidden">
        <img src={img.url} className="w-full h-full object-cover" alt="" />
      </div>
    ))}
  </div>
);

// --- Main Renderer ---

export function Renderer({ article }) {
  if (!article) return null;

  return (
    <article className="max-w-5xl mx-auto px-6 py-20">
      {/* Header Section */}
      <header className="mb-16 border-b border-zinc-200 pb-12">
        <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-4 block">
          {article.category}
        </span>
        <h1 className="font-serif text-6xl md:text-8xl font-medium tracking-tighter mb-8 leading-none">
          {article.title}
        </h1>
        <div className="flex justify-between items-end">
          <p className="font-serif italic text-xl">By {article.author}</p>
          <p className="text-xs font-mono text-zinc-400">{article.date}</p>
        </div>
      </header>

      {/* Dynamic Content Sections */}
      <main>
        {article.content.map((block, index) => {
          switch (block.type) {
            case 'text':
              return <TextBlock key={index} value={block.value} />;
            case 'image':
              return <ImageBlock key={index} {...block} />;
            case 'gallery':
              return <GalleryBlock key={index} images={block.images} />;
            default:
              return null;
          }
        })}
      </main>
    </article>
  );
}