import React, { useState, useCallback } from 'react';

// Fallbacks: jpg <-> JPG <-> png <-> PNG (try all variants)
const EXTENSION_ALTERNATIVES = ['.jpg', '.JPG', '.png', '.PNG'];

function getFallbackUrl(url, fallbackIndex) {
  const match = url.match(/\.(jpg|JPG|png|PNG)(?=\?|$)/i);
  if (!match) return null;
  const currentExt = match[1];
  const alts = EXTENSION_ALTERNATIVES.filter((ext) => ext.toLowerCase() !== currentExt.toLowerCase());
  if (fallbackIndex >= alts.length) return null;
  return url.replace(new RegExp(`\\.${currentExt}(?=\\?|$)`, 'i'), alts[fallbackIndex]);
}

export const ImageWithExtensionFallback = ({ url, alt = '' }) => {
  const [imgSrc, setImgSrc] = useState(url);
  const [fallbackIndex, setFallbackIndex] = useState(0);

  React.useEffect(() => {
    setImgSrc(url);
    setFallbackIndex(0);
  }, [url]);

  const handleError = useCallback(() => {
    const altUrl = getFallbackUrl(url, fallbackIndex);
    if (altUrl) {
      setFallbackIndex((i) => i + 1);
      setImgSrc(altUrl);
    }
  }, [url, fallbackIndex]);

  return <img src={imgSrc} alt={alt} onError={handleError} />;
};
