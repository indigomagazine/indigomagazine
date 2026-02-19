import React from 'react';

export const ImageBlock = ({ url, caption, alt }) => (
    <figure className="block-image">
        <img
            src={url}
            alt={alt || "Article visual"}
        />
        {caption && (
            <figcaption>
                {caption}
            </figcaption>
        )}
    </figure>
);
