import React, { useMemo } from 'react';
import { ImageWithExtensionFallback } from './ImageWithExtensionFallback';

function renderSlotContent(item, key) {
  if (item.type === 'text') {
    return (
      <div key={key} className="hscroll-gallery-text-blurb">
        {item.value}
      </div>
    );
  }
  return (
    <div key={key} className="hscroll-gallery-item">
      <ImageWithExtensionFallback url={item.url} alt={item.alt || ''} />
    </div>
  );
}

export const ValentinesHScrollGalleryBlock = ({ images, textBlurb }) => {
  const items = useMemo(() => {
    const imgs = images || [];
    const textItem = textBlurb ? { type: 'text', value: textBlurb } : null;

    if (!textItem) return imgs.map((img) => ({ type: 'image', ...img }));
    if (imgs.length === 0) return [textItem];

    // Content-based position: varied per gallery, stable on re-render
    const key = `${textBlurb}|${imgs.map((i) => i.url).join(',')}`;
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i);
      hash |= 0;
    }
    const position = Math.abs(hash) % (imgs.length + 1);
    const result = imgs.map((img) => ({ type: 'image', ...img }));
    result.splice(position, 0, textItem);
    return result;
  }, [textBlurb, images]);

  if (items.length === 0) return null;

  return (
    <div className="block-valentines-hscroll-gallery">
      <div className="hscroll-gallery-inner">
        {items.map((item, idx) => renderSlotContent(item, idx))}
      </div>
    </div>
  );
};
