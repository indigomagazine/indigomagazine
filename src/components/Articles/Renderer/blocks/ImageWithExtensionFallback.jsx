import React, { useState, useCallback } from 'react';

const EXTENSION_ALTERNATIVES = {
  jpg: ['.JPG', '.png', '.PNG'],
  JPG: ['.jpg', '.png', '.PNG'],
  png: ['.PNG', '.jpg', '.JPG'],
  PNG: ['.png', '.jpg', '.JPG'],
};

function getFallbackUrl(url, fallbackIndex) {
  const match = url.match(/\.(jpg|JPG|png|PNG)$/i);
  if (!match) return null;
  const ext = match[1];
  const alts = EXTENSION_ALTERNATIVES[ext];
  if (!alts || fallbackIndex >= alts.length) return null;
  return url.replace(new RegExp(`\\.${ext}$`, 'i'), alts[fallbackIndex]);
}

export const ImageWithExtensionFallback = ({ url, alt = '' }) => {
  const [imgSrc, setImgSrc] = useState(url);
  const [fallbackIndex, setFallbackIndex] = useState(0);

  const handleError = useCallback(() => {
    const altUrl = getFallbackUrl(url, fallbackIndex);
    if (altUrl) {
      setFallbackIndex((i) => i + 1);
      setImgSrc(altUrl);
    }
  }, [url, fallbackIndex]);

  return <img src={imgSrc} alt={alt} onError={handleError} />;
};
