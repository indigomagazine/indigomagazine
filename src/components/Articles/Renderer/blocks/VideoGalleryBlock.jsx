import React, { useRef, useEffect } from 'react';

export const VideoGalleryBlock = ({ url }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  if (!url) return null;

  return (
    <div className="block-video-gallery">
      <video
        ref={videoRef}
        src={url}
        autoPlay
        loop
        muted
        playsInline
        className="video-gallery-video"
      />
    </div>
  );
};
