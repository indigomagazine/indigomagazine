// IndigoLiveTemplate.jsx
import React, { useRef, useState, useEffect, useCallback } from "react";
import styles from "./IndigoLiveTemplate.module.css";
import Taskbar from "../../Home/Taskbar";

// ─── Shared Video Player ─────────────────────────────────────────
const VideoPlayer = ({ src, poster, className, thumbClass }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const hideTimer = useRef(null);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    setCurrentTime(v.currentTime);
    setProgress((v.currentTime / v.duration) * 100 || 0);
  };

  const handleLoaded = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleSeek = (e) => {
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * v.duration;
  };

  const handleVolume = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) videoRef.current.volume = val;
    setMuted(val === 0);
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 2500);
  }, []);

  const handleMouseLeave = () => {
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 800);
  };

  return (
    <div
      className={`${styles.videoContainer} ${thumbClass || ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className={`${styles.videoEl} ${className || ""}`}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoaded}
        onEnded={() => setPlaying(false)}
        playsInline
        onClick={handlePlayPause}
      />

      {/* Big play overlay — only when paused */}
      {!playing && (
        <div className={styles.bigPlayOverlay} onClick={handlePlayPause}>
          <div className={styles.playIcon} />
        </div>
      )}

      {/* Hover control bar */}
      <div className={`${styles.controlBar} ${showControls ? styles.controlBarVisible : ""}`}>
        {/* Progress bar */}
        <div className={styles.progressBar} onClick={handleSeek}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>

        <div className={styles.controlRow}>
          {/* Play/Pause */}
          <button className={styles.controlBtn} onClick={handlePlayPause} aria-label={playing ? "Pause" : "Play"}>
            {playing ? (
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <polygon points="5,3 19,12 5,21"/>
              </svg>
            )}
          </button>

          {/* Time */}
          <span className={styles.timeDisplay}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Mute */}
          <button className={styles.controlBtn} onClick={toggleMute} aria-label="Mute">
            {muted || volume === 0 ? (
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0017 19.73L19.73 22 21 20.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
              </svg>
            )}
          </button>

          {/* Volume slider */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={muted ? 0 : volume}
            onChange={handleVolume}
            className={styles.volumeSlider}
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  );
};

// ─── HERO ────────────────────────────────────────────────────────
const IndigoLiveHero = ({ block }) => {
  return (
    <div className={styles.heroSection}>
      <div className={styles.heroImageWrapper}>
        <img src={block.heroImage} alt={block.heroImageAlt} className={styles.heroImage} />
      </div>

      <div className={styles.heroBody}>
        <div className={styles.heroThumbWrapper}>
          {block.videoUrl ? (
            <VideoPlayer
              src={block.videoUrl}
              poster={block.videoThumbnail}
              thumbClass={styles.heroVideoContainer}
            />
          ) : (
            <div className={styles.heroVideoContainer}>
              {block.videoThumbnail && (
                <img src={block.videoThumbnail} alt="Video thumbnail" className={styles.videoEl} />
              )}
              <div className={styles.bigPlayOverlay}>
                <div className={styles.playIcon} />
              </div>
            </div>
          )}
        </div>

        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>{block.title}</h1>
          <p className={styles.heroIntro}>{block.intro}</p>
        </div>
      </div>
    </div>
  );
};

// ─── INTERVIEW ───────────────────────────────────────────────────
const InterviewBlock = ({ block }) => (
  <div className={styles.interviewBlock}>
    {block.lines.map((line, index) => (
      <p key={index} className={styles.interviewLine}>
        <span className={styles.speaker}>{line.speaker}:</span>
        {line.text}
      </p>
    ))}
  </div>
);

// ─── IMAGE / VIDEO BLOCK ─────────────────────────────────────────
const isVideo = (url) => url && /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);

const ImageBlock = ({ block }) => (
  <div className={styles.imageBlock}>
    <div className={styles.imageWrapper}>
      {isVideo(block.url) ? (
        <VideoPlayer src={block.url} poster={block.poster} />
      ) : (
        <img src={block.url} alt={block.alt} className={styles.articleImage} />
      )}
    </div>
    {block.caption && <p className={styles.caption}>{block.caption}</p>}
  </div>
);

// ─── CREDITS ─────────────────────────────────────────────────────
const CreditsBlock = ({ block }) => (
  <div className={styles.creditsBlock}>
    {block.collaboration && <p>In Collaboration with: {block.collaboration}</p>}
    {block.writtenBy && <p>Written by; {block.writtenBy}</p>}
    {block.photosBy && <p>Photos by: {block.photosBy}</p>}
    {block.graphicsBy && <p>Graphics by: {block.graphicsBy}</p>}
    {block.designedBy && <p>Designed by: {block.designedBy}</p>}
  </div>
);

// ─── MAIN TEMPLATE ───────────────────────────────────────────────
export default function IndigoLiveTemplate({ article }) {
  const renderBlock = (block, index) => {
    switch (block.type) {
      case "indigoLiveHero":   return <IndigoLiveHero key={index} block={block} />;
      case "interview":        return <InterviewBlock key={index} block={block} />;
      case "image":            return <ImageBlock key={index} block={block} />;
      case "indigoLiveCredits":return <CreditsBlock key={index} block={block} />;
      default:                 return null;
    }
  };

  return (
    <>
      <Taskbar darkIcons={true} />
      <div className={styles.wrapper}>
        {article.content.map((block, index) => renderBlock(block, index))}
      </div>
    </>
  );
}