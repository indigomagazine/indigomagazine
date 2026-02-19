import React from 'react';

export const GalleryBlock = ({ images }) => (
    <div className="block-gallery">
        {images.map((img, idx) => (
            <div key={idx} className="gallery-item">
                <img src={img.url} alt={img.caption || ""} />
            </div>
        ))}
    </div>
);
