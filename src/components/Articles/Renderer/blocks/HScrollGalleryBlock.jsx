import React from 'react';
import { ImageWithExtensionFallback } from './ImageWithExtensionFallback';

export const HScrollGalleryBlock = ({ images }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="block-hscroll-gallery">
      <div className="hscroll-gallery-inner">
        {images.map((img, idx) => (
          <div key={idx} className="hscroll-gallery-item">
            <ImageWithExtensionFallback
              url={img.url}
              alt={img.alt || ''}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
