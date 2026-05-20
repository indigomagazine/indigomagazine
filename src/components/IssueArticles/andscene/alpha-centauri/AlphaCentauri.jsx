// AndsceneTemplate.jsx
// Drop into: src/components/Articles/Templates/AndsceneTemplate.jsx
//
// In src/components/Articles/Renderer/Renderer.jsx add:
//   import { AndsceneTemplate } from '../Templates/AndsceneTemplate';
//   andscene: AndsceneTemplate,   ← inside the templates object
//
// In andscene.json set: "layout": "andscene"
//
// Assets go in public/assets/articles/andscene/
// Fonts (Staystaystay.ttf, AquilineTwo.ttf) go in public/fonts/
import { createPortal } from "react-dom";

import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

// ─── Asset paths (all from public/) ──────────────────────────────────────────
import TICK_SOUND from "./tick.m4a";
const FRONT_1      = "https://cdn.indigomagazinetx.com/articlephotos/andscene/alpha-centauri/postcard-front1.png";
const FRONT_2      = "https://cdn.indigomagazinetx.com/articlephotos/andscene/alpha-centauri/postcard-front2.png";
const BACK_2       = "https://cdn.indigomagazinetx.com/articlephotos/andscene/alpha-centauri/postcard-back2.png";
const BACK_3       = "https://cdn.indigomagazinetx.com/articlephotos/andscene/alpha-centauri/postcard-back3.png";
const BG_DRAWER    = "https://cdn.indigomagazinetx.com/articlephotos/andscene/alpha-centauri/drawer-interior.jpg";
const BG_TITLECARD = "https://cdn.indigomagazinetx.com/articlephotos/andscene/alpha-centauri/cover-photo.jpg";
const ENV_1        = "https://cdn.indigomagazinetx.com/articlephotos/andscene/alpha-centauri/envelope1.png";
const ENV_2        = "https://cdn.indigomagazinetx.com/articlephotos/andscene/alpha-centauri/envelope2.png";
const ENV_4        = "https://cdn.indigomagazinetx.com/articlephotos/andscene/alpha-centauri/envelope4.png";
const PEN          = "https://cdn.indigomagazinetx.com/articlephotos/andscene/alpha-centauri/drawer-pen.PNG";
const CLOCK        = "https://cdn.indigomagazinetx.com/articlephotos/andscene/alpha-centauri/drawer-clock.PNG";
const coin2 = "https://cdn.indigomagazinetx.com/articlephotos/andscene/alpha-centauri/coin2.png";
const coinSprawl = "https://cdn.indigomagazinetx.com/articlephotos/andscene/alpha-centauri/coin-group.png"


const GALLERY_IMAGES = [
  { src: ("https://cdn.indigomagazinetx.com/articlephotos/andscene/alpha-centauri/img-gallery1.JPG"),  rotation: -4 },
  { src: ("https://cdn.indigomagazinetx.com/articlephotos/andscene/alpha-centauri/img-gallery3.jpg"),  rotation: -2 },
  { src: ("https://cdn.indigomagazinetx.com/articlephotos/andscene/alpha-centauri/img-gallery4.jpg"),  rotation:  2 },
  { src: ("https://cdn.indigomagazinetx.com/articlephotos/andscene/alpha-centauri/img-gallery5.jpg"),  rotation: -4 },
  { src: ("https://cdn.indigomagazinetx.com/articlephotos/andscene/alpha-centauri/img-gallery6.jpg"),  rotation:  1 },
  { src: ("https://cdn.indigomagazinetx.com/articlephotos/andscene/alpha-centauri/img-gallery7.jpg"),  rotation: -2 },
  { src: ("https://cdn.indigomagazinetx.com/articlephotos/andscene/alpha-centauri/img-gallery8.jpg"),  rotation:  2 },
  { src: ("https://cdn.indigomagazinetx.com/articlephotos/andscene/alpha-centauri/img-gallery9.jpg"),  rotation: -4 },
  { src: ("https://cdn.indigomagazinetx.com/articlephotos/andscene/alpha-centauri/img-gallery10.jpg"), rotation:  1 },
  { src: ("https://cdn.indigomagazinetx.com/articlephotos/andscene/alpha-centauri/img-gallery11.jpg"), rotation: -2 },
];

const FADE_DURATION = 350;

// ─── Session storage ──────────────────────────────────────────────────────────
function loadVisited() {
  try { return JSON.parse(sessionStorage.getItem("andscene_visited") || "[]"); }
  catch { return []; }
}
function saveVisited(v) {
  try { sessionStorage.setItem("andscene_visited", JSON.stringify(v)); } catch {}
}

// ─── Scoped CSS injected once via useEffect ───────────────────────────────────
const ANDSCENE_CSS = `
  @font-face {
    font-family: 'Staystaystay';
    src: url('/fonts/Staystaystay.ttf') format('truetype');
  }
  @font-face {
    font-family: 'AquilineTwo', cursive;
    src: url('/fonts/AquilineTwo.ttf') format('truetype');
  }

  .as-bg { position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;pointer-events:none; }
  .as-vignette { position:absolute;inset:0;z-index:1;pointer-events:none; }
  .as-vignette::after { content:"";position:absolute;inset:0;box-shadow:inset 0 0 100px rgba(0,0,0,1.5);pointer-events:none; }

  /* home */
  .as-home-root { width:100vw;height:100vh;overflow:hidden;display:flex;justify-content:center;align-items:center;background:#000; }
  .as-home-frame { position:relative;width:min(100vw,calc(100vh*3/2));height:min(100vh,calc(100vw*2/3));aspect-ratio:3/2;flex-shrink:0; }
  .as-home-frame img { position:absolute;inset:0;width:100%;height:100%;object-fit:fill; }
  .as-home-hitbox { position:absolute;top:35.5%;left:20.5%;width:8%;height:16.5%; }
  .as-intro { position:fixed;inset:0;background:black;display:flex;align-items:center;justify-content:center;z-index:9999;opacity:1;transition:opacity 1s ease; }
  .as-intro--fade { opacity:0;pointer-events:none; }
  .as-intro-text { color:white;font-family:'AquilineTwo',cursive;font-size:clamp(2.5rem,8vw,6rem);font-weight:normal;letter-spacing:0.08em;animation:as-textin 0.8s ease 0.3s both; }
  .as-frame--hidden { opacity:0; }
  .as-frame--visible { opacity:1;transition:opacity 0.8s ease; }
  @keyframes as-textin { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
 
  .as-home-hitbox { 
    position: absolute; 
    top: 35.5%; 
    left: 20.5%; 
    width: 8%; 
    height: 16.5%; 
    /* Ensure the glow isn't cut off by parent containers */
    overflow: visible; 
    z-index: 10;
  }

  /* sprawl */
  .as-sprawl-root { width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;background:#1a1a1a;overflow:hidden; }
  .as-sprawl-frame { position:relative;width:90vw;max-width:450px;aspect-ratio:9/16;box-shadow:0 0 50px rgba(0,0,0,0.5);overflow:hidden; }
  .as-envelope { position:absolute;height:auto;transition:transform 0.2s ease,filter 0.3s ease;z-index:10; }
  .as-envelope.locked { filter:brightness(0.55) saturate(0.4);cursor:not-allowed; }
  .as-envelope.unlocked { cursor:pointer; }
  @keyframes as-wiggle {
    0%   { transform:var(--bt) translateX(0); }
    15%  { transform:var(--bt) translateX(-8px) rotate(-2deg); }
    35%  { transform:var(--bt) translateX(8px) rotate(2deg); }
    55%  { transform:var(--bt) translateX(-6px) rotate(-1deg); }
    75%  { transform:var(--bt) translateX(6px) rotate(1deg); }
    90%  { transform:var(--bt) translateX(-2px); }
    100% { transform:var(--bt) translateX(0); }
  }
  .as-envelope.shaking { animation:as-wiggle 0.5s ease; }
  @media(max-width:600px){
    .as-envelope { width:62%!important; }
    .as-sprawl-frame { width:100vw;max-width:100vw;aspect-ratio:auto;height:100vh; }
  }

  /* gallery */
  .as-gallery-page {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: #000;
    overflow: hidden;
  }
  .as-gallery-wrap { position: relative; z-index: 2; display: flex; align-items: center; gap: 40px; }
  .as-gallery-bg {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; opacity: 0.5; z-index: 0;
  }
  .as-pile { position:relative;width:min(60vw,500px);height:clamp(320px,72vh,650px);display:flex;align-items:center;justify-content:center;z-index:2; }
  .as-photo { position:absolute;background:#fff8f0;padding:14px;box-shadow:8px 8px 8px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-width:100%;max-height:100%;width:auto;height:auto; }
  .as-photo img { display:block;max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;flex:1;min-height:0; }
  .as-back-left  { max-width:85%;max-height:85%;transform:rotate(-10deg) translate(-18px,8px);z-index:1; }
  .as-back-right { max-width:85%;max-height:85%;transform:rotate(8deg) translate(18px,8px);z-index:1; }
  .as-front-photo { transform:rotate(-2deg);z-index:2;transition:transform 0.3s ease; }
  .as-front-photo:hover { transform:rotate(0deg) scale(1.02); }
  .as-arrow { background:transparent;border:2px solid white;border-radius:50%;width:48px;height:48px;font-size:20px;color:white;cursor:pointer;flex-shrink:0;transition:background 0.2s ease;z-index:10; }
  .as-arrow:hover { background:#eee; }
  .as-nav-btn { background:none;border:1px solid rgba(255,255,255,0.3);color:rgba(255,255,255,0.7);padding:10px 28px;border-radius:4px;cursor:pointer;font-size:13px;letter-spacing:0.1em;transition:border-color 0.2s,color 0.2s; }
  .as-nav-btn:hover { border-color:rgba(255,255,255,0.8);color:#fff; }
  @media(max-width:600px){
    .as-gallery-wrap { flex-direction:column;gap:16px; }
    .as-pile { order:1;width:85vw;height:clamp(280px,60vh,500px); }
    .as-arrow { order:2;width:44px;height:44px;font-size:18px; }
  }

  /* postcards shared */
  .pc1-root, .pc2-root {
    width: 100vw; height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #000; overflow: hidden;
  }

  .pc1-frame, .pc2-frame {
    position: relative; width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
  }

  .background-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }
  .vignette { position: absolute; inset: 0; box-shadow: inset 0 0 150px rgba(0,0,0,0.9); z-index: 1; pointer-events: none; }

  .pc1-container-overlay, .pc2-container-overlay {
    position: relative; z-index: 2; display: flex; flex-direction: column;
    align-items: center; gap: 20px; width: 100%;
  }

  .pc1-scene, .pc2-scene { width: 80vw; max-width: 800px; aspect-ratio: 3/2; perspective: 1200px; }
  .pc1-inner, .pc2-inner { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1); }
  .pc1-inner.flipped, .pc2-inner.flipped { transform: rotateY(180deg); }
  .pc1-face, .pc2-face { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 4px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
  .pc1-back, .pc2-back { transform: rotateY(180deg); position: relative; }

  /* TEXT OVERLAYS - This is what was missing */
  .pc2-message-side {
    position: absolute; top: 25%; left: 5%; width: 42%; height: 70%;
    display: flex; flex-direction: column;
  }
  .pc1-message-container {
    position: absolute;
    top: 26%; /* Slightly higher to maximize vertical space */
    left: 6%;
    width: 42%; /* Slightly wider to keep lines from wrapping too early */
    height: 72%; /* Increased height to use more of the card face */
    overflow-y: auto; /* Adds a scrollbar ONLY if text somehow still exceeds space */
    scrollbar-width: none; /* Hides scrollbar for Firefox */
    display: flex;
    align-items: flex-start;
  }
  pc1-message-container::-webkit-scrollbar {
    display: none; /* Hides scrollbar for Chrome/Safari */
  }

  .pc1-address-container {
    position: absolute;
    top: 45%;
    left: 55%;
    width: 38%;
  }

  .pc2-address-side {
    position: absolute; top: 40%; left: 52%; width: 42%; height: 50%;
    display: flex; flex-direction: column; justify-content: center;
  }
  .pc1-address-container {
    position: absolute;
    top: 48%;
    left: 55%;
    width: 38%;
  }
  .pc1-text-content, .pc2-trusted-text, .pc2-email-input {
    font-family: 'StayStayStay' !important;
    color: #2c2c2c;
    line-height: 1.2; 
    font-size: clamp(0.7rem, 1.2vw, 1.05rem);
    margin: 0;
    white-space: pre-wrap; /* Preserves your line breaks */
  }

  .pc1-text-content {
    font-family: 'StayStayStay' !important;
    color: #2c2c2c;
    /* Adjusted line-height and tighter clamp for mobile fitting */
    line-height: 1.15; 
    font-size: clamp(0.55rem, 1.1vw, 0.95rem); 
    margin: 0;
    white-space: pre-wrap;
    width: 100%;
  }

  
  .pc2-email-input {
    border: none;
    background: transparent;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    width: 100%;
    outline: none;
    padding-bottom: 5px;
  }

  .pc2-interactive-overlay { position: absolute; inset: 0; z-index: 5; }
  .pc1-hint, .pc2-hint { color: rgba(255,255,255,0.6); font-size: 0.9rem; }
  .pc1-btn, .pc2-btn { background: transparent; border: 1px solid white; color: white; padding: 8px 16px; cursor: pointer; transition: 0.3s; margin: 0 5px; }
  .pc1-btn:hover, .pc2-btn:hover { background: white; color: black; }

  .pc2-controls {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 10;
  }

  .pc2-hint {
    color: rgba(255, 255, 255, 0.5);
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.85rem;
    margin-bottom: 15px;
    letter-spacing: 1px;
  }

  .pc2-btn {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.8);
    color: white;
    padding: 10px 20px;
    font-family: 'Times New Roman', serif;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
  }

  .pc2-btn:hover:not(:disabled) {
    background: white;
    color: black;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
  }

  .pc2-btn:disabled {
    opacity: 0.5;
    cursor: wait;
  }

  .pc2-status {
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.8rem;
    text-transform: lowercase;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }
  /* Mobile Overrides */
  @media (max-width: 600px) {
    /* Lower the Gallery Button */
    .as-gallery-page {
      padding-bottom: 30px; /* Gives space from the bottom edge */
    }
    .as-gallery-wrap {
      flex-direction: column;
      gap: 20px;
      margin-top: 40px; /* Pushes the arrows and pile further down */
    }
  
    .as-pile {
      order: 1;
      width: 85vw;
      height: clamp(280px, 60vh, 500px);
      margin-top: 20px; /* Extra spacing to lower the photos specifically */
    }
  
    .as-nav-btn {
      margin-top: 40px; /* Ensures the close button stays clear of the pile */
    }
    .pc1-text-content {
      /* Force a smaller size on mobile to ensure the poem fits the container */
      font-size: 0.50rem !important; 
      line-height: 1.1;
    }
    
    .pc1-message-container {
      top: 27%;
      height: 75%;
    }

    /* Cohesive Postcard Buttons on Mobile */
    .pc2-controls {
      margin-top: 5px;
      width: 100%;
    }

    .pc2-button-group {
      gap: 8px !important;
    }

    .pc1-btn, .pc2-btn {
      padding: 8px 14px;
      font-size: 0.8rem;
    }

    /* Ensure card doesn't squish */
    .pc1-scene, .pc2-scene {
      width: 96vw !important;
      aspect-ratio: 3/2;
    }
  }

  .pc1-btn, .pc2-btn, .as-nav-btn {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.6);
    color: white;
    padding: 10px 22px;
    font-family: 'Times New Roman', serif;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
    letter-spacing: 0.05em;
    text-transform: none;
    border-radius: 0; /* Keeps the sharp look */
  }

  .pc1-btn:hover, .pc2-btn:hover, .as-nav-btn:hover {
    background: white;
    color: black;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
    border-color: white;
  }

`;

// ═══════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function IntroOverlay({ onDone }) {
  const [phase, setPhase] = useState("visible");
  useEffect(() => {
    const h = setTimeout(() => setPhase("fading"), 1800);
    const d = setTimeout(() => onDone(), 2800);
    return () => { clearTimeout(h); clearTimeout(d); };
  }, []);
  return (
    <div className={`as-intro${phase === "fading" ? " as-intro--fade" : ""}`}>
      <span className="as-intro-text">A letter ?</span>
    </div>
  );
}

function Home({ navigate }) {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="as-home-root">
      {!introDone && <IntroOverlay onDone={() => setIntroDone(true)} />}
      <div className={`as-home-frame ${introDone ? "as-frame--visible" : "as-frame--hidden"}`}>
        <img alt="" src={BG_TITLECARD} />
        <div className="as-home-hitbox">
          {/* Your new Glow component replaces the old placeholder div */}
          <MailboxGlow navigate={navigate} />
        </div>
      </div>
    </div>
  );
}

function MailboxGlow({ navigate }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.preventDefault();
        navigate("/letter_sprawl");
      }}
      href="/letter_sprawl"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(217,217,217,0)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        border: isHovered 
          ? "0.5px solid rgba(255,255,255,0.8)" 
          : "0.5px solid rgba(255,255,255,0)",
        cursor: "pointer",
        boxShadow: isHovered
          ? "0px 5px 15px 15px rgba(101, 181, 143, 0.7)" 
          : "0px 5px 4px 10px rgba(101, 181, 143, 0.4)",
      }}
    />
  );
}
function isUnlocked(route, visited) {
  if (route === "/gallery")    return true;
  if (route === "/postcard_1") return true;
  if (route === "/postcard_2") return visited.includes(1);
  return false;
}

function LetterSprawl({ navigate, visited }) {
  const [shakingIndex, setShakingIndex] = useState(null);
  const envelopes = [
    { route: "/gallery",    image: ENV_4, alt: "Envelope to gallery",    style: { top:"65%", left:"10%", width:"60%", transform:"rotate(-10deg)" } },
    { route: "/postcard_1", image: ENV_1, alt: "Envelope to postcard 1", style: { top:"3%",  left:"10%", width:"60%", transform:"rotate(8deg)"   } },
    { route: "/postcard_2", image: ENV_2, alt: "Envelope to postcard 2", style: { top:"33%", left:"26%", width:"60%", transform:"rotate(-5deg)"  } },
  ];
  const handleClick = (i, env) => {
    if (isUnlocked(env.route, visited)) { navigate(env.route); }
    else { setShakingIndex(i); setTimeout(() => setShakingIndex(null), 500); }
  };
  return (
    <div className="as-sprawl-root">
      <div className="as-sprawl-frame">
        <img src={PEN}   alt="" style={{ position:"absolute", top:"33%", left:"12%", width:"3%",  zIndex:3, pointerEvents:"none", opacity:0.85, transform:"rotate(10deg)"  }} />
        <img src={CLOCK} alt="" style={{ position:"absolute", top:"18%", left:"72%", width:"20%", zIndex:3, pointerEvents:"none", opacity:0.85, transform:"rotate(-5deg)" }} />
        <img
        src={coinSprawl}
        alt=""
        style={{
          position: "absolute",
          top: "82%",
          left: "80%",
          width: "18%",
          zIndex: 3,
          pointerEvents: "none",   
          opacity: 0.85,
          transform: "rotate(-40deg)"
          
        }}
      />
      <img
        src={coin2}
        alt=""
        style={{
          position: "absolute",
          top: "79%",
          left: "73%",
          width: "6%",
          zIndex: 3,
          pointerEvents: "none",   
          opacity: 0.85,
          transform: "rotate(-40deg)"
          
        }}
      />
        <img alt="" src={BG_DRAWER} className="as-bg" />
        <div className="as-vignette" />
        {envelopes.map((env, i) => {
          const unlocked = isUnlocked(env.route, visited);
          const shaking  = shakingIndex === i;
          return (
            <img key={i} src={env.image} alt={env.alt}
              onClick={() => handleClick(i, env)}
              className={["as-envelope", unlocked ? "unlocked" : "locked", shaking ? "shaking" : ""].join(" ")}
              style={{ ...env.style, zIndex:1, "--bt": env.style.transform }}
              onMouseEnter={(e) => { if (unlocked) e.currentTarget.style.transform = `${env.style.transform} scale(1.05)`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = env.style.transform; }}
            />
          );
        })}
      </div>
    </div>
  );
}

function Gallery({ navigate }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);

  const handlePrev = () => setCurrentIndex((p) => (p === 0 ? GALLERY_IMAGES.length - 1 : p - 1));
  const handleNext = () => setCurrentIndex((p) => (p === GALLERY_IMAGES.length - 1 ? 0 : p + 1));

  const prevIndex = (currentIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
  const nextIndex = (currentIndex + 1) % GALLERY_IMAGES.length;

  return (
    <div className="as-gallery-page">
      {/* ADD THIS LINE HERE */}
      <img src={BG_DRAWER} className="as-gallery-bg" alt="" />
      <div className="as-vignette" />

      <div className="as-gallery-wrap">
        <button className="as-arrow" onClick={handlePrev}>&#8592;</button>
        
        <div 
          className="as-pile"
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const delta = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(delta) > 40) delta < 0 ? handleNext() : handlePrev();
            touchStartX.current = null;
          }}
        >
          <div className="as-photo as-back-left">  <img src={GALLERY_IMAGES[prevIndex].src} alt="prev" /></div>
          <div className="as-photo as-back-right"> <img src={GALLERY_IMAGES[nextIndex].src} alt="next" /></div>
          <div className="as-photo as-front-photo"><img src={GALLERY_IMAGES[currentIndex].src} alt={`Gallery image ${currentIndex + 1}`} /></div>
        </div>

        <button className="as-arrow" onClick={handleNext}>&#8594;</button>
      </div>

      <button className="as-nav-btn" style={{ position: 'relative', zIndex: 1 }} onClick={() => navigate("/letter_sprawl")}>
        Close envelope?
      </button>
    </div>
  );
}



// ─── Postcard 1 (Restored Address/Message layout) ───────────────────────────
function Postcard({ navigate, frontSrc, backSrc, onVisit }) {
  const [flipped, setFlipped] = useState(false);
  useEffect(() => { if (onVisit) onVisit(); }, [onVisit]);

  return (
    <div className="pc1-root">
      <div className="pc1-frame">
        <img alt="" src={BG_DRAWER} className="background-img" />
        <div className="vignette" />
        <div className="pc1-container-overlay">
          <div className="pc1-scene" onClick={() => setFlipped(!flipped)} style={{ cursor: "pointer" }}>
            <div className={`pc1-inner${flipped ? " flipped" : ""}`}>
              <div className="pc1-face pc1-front">
                <img src={frontSrc} alt="Postcard front" />
              </div>
              <div className="pc1-face pc1-back">
                <img src={backSrc} alt="Postcard back" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div className="pc1-message-container">
                <p className="pc1-text-content">
                    To my dearest ...,<br />
                    When I wrap myself in you, I see stolen segments of a stiffened skull.<br />
                    There's a sunken spine that rests between both blades of your shoulders, growing anxiously heavier the deeper you exhale.<br />
                    As your lungs spread, pressing against your ribs, your heart stretches and extends itself for room.<br />
                    room to rest,<br />
                    room to retract,<br />
                    room to stay simple.<br />
                    Your stillness summons me here from time to time.<br />
                    I spend an instant sitting, uncoiling, and sinking myself into your heartstrings.<br />
                    Their thinning echoes ripple through mine, vibrating through my bones.<br />
                    I'm left here, dissolving into you.<br />
                    I'm here, deep enough to surrender who I am into more than a hollow space.<br />
                    I'm here, soft enough for your silent strings to seap into<br />
                    Always, ...
                  </p>
                </div>
                <div className="pc1-address-container">
                  <p className="pc1-text-content">I don't know...</p>
                </div>
              </div>
            </div>
          </div>
          <p className="pc1-hint">{flipped ? "click to flip back" : "click to flip"}</p>
          <button className="pc1-btn" onClick={() => navigate("/letter_sprawl")}>Close envelope?</button>
        </div>
      </div>
    </div>
  );
}

// ─── Postcard 2 (Restored Interactive Side) ──────────────────────────────────
function Postcard2({ navigate, frontSrc, backSrc, onVisit }) {
  const [flipped, setFlipped] = useState(false);
  const [addressee, setAddressee] = useState("");
  const [sendStatus, setSendStatus] = useState(null);
  const inputRef = useRef(null);

  const TRUSTED_MESSAGE = `To my dearest ...,\nI'm here, soft enough for your silent strings to seep into.`;

  useEffect(() => {
    if (onVisit) onVisit();
  }, [onVisit]);

  // ADD THIS FUNCTION HERE:
  const handleSend = async (e) => {
    e.stopPropagation(); // Prevents the card from flipping when clicking send
    if (!addressee) { setSendStatus("empty"); return; }
    
    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addressee)) { 
      setSendStatus("invalid"); 
      return; 
    }
    
    setSendStatus("sending");
    try {
      await emailjs.send(
        "service_6jrxfw4", 
        "template_gevmw7f", 
        { to_email: addressee, message: TRUSTED_MESSAGE }, 
        "U9QOKr57xM2RL6Kln"
      );
      setSendStatus("sent");
      setAddressee("");
      setTimeout(() => setSendStatus(null), 5000);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setSendStatus("error");
    }
  };

  const handleFlip = (e) => {
    // Prevent flipping if clicking the input or the send button
    if (e.target.closest(".pc2-email-input") || e.target.closest(".pc2-btn")) return;
    setFlipped(!flipped);
  };

  return (
    <div className="pc2-root">
      <div className="pc2-frame">
        <img alt="" src={BG_DRAWER} className="background-img" />
        <div className="vignette" />
        <div className="pc2-container-overlay">
          <div className="pc2-scene">
            <div className={`pc2-inner${flipped ? " flipped" : ""}`} onClick={() => setFlipped(!flipped)} style={{ cursor: "pointer" }}>
              <div className="pc2-face pc2-front">
                <img src={frontSrc} alt="Postcard front" draggable={false} />
              </div>
              <div className="pc2-face pc2-back">
                <img src={backSrc} alt="Postcard back" />
                <div className="pc2-interactive-overlay">
                  <div className="pc2-message-side">
                    <p className="pc2-trusted-text">{TRUSTED_MESSAGE}</p>
                  </div>
                  <div className="pc2-address-side">
                    <input
                      ref={inputRef}
                      className="pc2-email-input"
                      type="email"
                      placeholder="Enter recipient email..."
                      value={addressee}
                      onClick={(e) => { e.stopPropagation(); inputRef.current?.focus(); }}
                      onChange={(e) => setAddressee(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pc2-controls">
            <p className="pc2-hint">
              {flipped ? "The ink is ready..." : "Click to Flip"}
            </p>

            {sendStatus && (
              <p 
                className="pc2-status" 
                style={{ color: sendStatus === 'sent' ? '#b5e48c' : '#ff8787', marginBottom: '10px' }}
              >
                {sendStatus === "empty" ? "Please enter an email." :
                sendStatus === "invalid" ? "Enter a valid email address." :
                sendStatus === "sending" ? "Sending..." :
                sendStatus === "sent" ? "Postcard sent successfully!" : "Failed to send."}
              </p>
            )}

            <div className="pc2-button-group" style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              {flipped && (
                <button 
                  className="pc2-btn" 
                  onClick={handleSend} 
                  disabled={sendStatus === "sending"}
                >
                  {sendStatus === "sending" ? "..." : "Send Postcard"}
                </button>
              )}
              
              <button className="pc2-btn" onClick={() => navigate("/letter_sprawl")}>
                Close envelope?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT TEMPLATE
// ═══════════════════════════════════════════════════════════════════════════════
export default function AlphaCentauri (){
  const [page,    setPage]    = useState("/");
  const [visited, setVisited] = useState(loadVisited);
  const [fading,  setFading]  = useState(false);
  const audioRef = useRef(null);

  // Inject CSS once
  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-andscene", "1");
    style.textContent = ANDSCENE_CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Audio — starts on first user interaction
  useEffect(() => {
    const audio = new Audio(TICK_SOUND);
    audio.loop = true;
    audio.volume = 1.0; // Bumped for testing
    audioRef.current = audio;
  
    const start = () => {
      // Some browsers need a fresh play() call inside the listener
      audio.play()
        .then(() => console.log("Success"))
        .catch(e => console.log("Still blocked:", e));
  
      window.removeEventListener("click", start);
      window.removeEventListener("touchstart", start);
    };
  
    window.addEventListener("click", start);
    window.addEventListener("touchstart", start);
  
    return () => {
      audio.pause();
      window.removeEventListener("click", start);
      window.removeEventListener("touchstart", start);
    };
  }, []);

  const navigate = (path) => {
    if (fading) return;
    setFading(true);
    setTimeout(() => { setPage(path); setFading(false); }, FADE_DURATION);
  };

  const markVisited = (num) => {
    setVisited((prev) => {
      if (prev.includes(num)) return prev;
      const next = [...prev, num];
      saveVisited(next);
      return next;
    });
  };

  const renderPage = () => {
    switch (page) {
      case "/letter_sprawl": return <LetterSprawl navigate={navigate} visited={visited} />;
      case "/gallery":       return <Gallery      navigate={navigate} />;
      case "/postcard_1":    return <Postcard     navigate={navigate} frontSrc={FRONT_1} backSrc={BACK_2} onVisit={() => markVisited(1)} />;
      case "/postcard_2":    return <Postcard2    navigate={navigate} frontSrc={FRONT_2} backSrc={BACK_3} onVisit={() => markVisited(2)} />;
      default:               return <Home         navigate={navigate} />;
    }
  };

  return (
    <>
      {renderPage()}
      <div style={{
        position:"fixed", inset:0, background:"#000",
        opacity:     fading ? 0.6 : 0,
        pointerEvents: fading ? "all" : "none",
        transition:  `opacity ${FADE_DURATION}ms ease`,
        zIndex:      9999,
      }} />
    </>
  );
}