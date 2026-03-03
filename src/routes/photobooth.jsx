import { useState, useRef, useEffect, useCallback } from "react";
import Taskbar from "../components/Home/Taskbar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/photobooth")({
    component: RouteComponent,
    });

/* ── Google Fonts injected once ── */
const FontLink = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
  return null;
};

/* ─────────────────────────────────────────
   FRAME DESIGN CONFIGS
   All the same dimensions — only visual
   styling differs between designs.
   Swap out colors/borders/fonts later.
───────────────────────────────────────── */
const SLOT_W = 200;
const SLOT_H = 200;
const STRIP_W = 300;

const FRAME_DESIGNS = {
  design1: {
    label: "Design 1",
    stripBg: "#7a0c0c",
    slotBg: "#1a0000",
    titleColor: "#e8c4b8",
    titleFont: "'Great Vibes', cursive",
    gap: 10,
    padding: "14px 12px",
  },
  design2: {
    label: "Design 2",
    stripBg: "#7a0c0c",
    slotBg: "#1a0000",
    titleColor: "#e8c4b8",
    titleFont: "'Great Vibes', cursive",
    gap: 10,
    padding: "14px 12px",
  },
  design3: {
    label: "Design 3",
    stripBg: "#7a0c0c",
    slotBg: "#1a0000",
    titleColor: "#e8c4b8",
    titleFont: "'Great Vibes', cursive",
    gap: 10,
    padding: "14px 12px",
  },
};

/* ─────────────────────────────────────────
   PhotoStrip — shared display component
───────────────────────────────────────── */
function PhotoStrip({ design, slots, id, extraStyle = {} }) {
  const cfg = FRAME_DESIGNS[design] || FRAME_DESIGNS.design1;

  return (
    <div
      id={id}
      style={{
        background: cfg.stripBg,
        width: STRIP_W,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: cfg.padding,
        gap: cfg.gap,
        flexShrink: 0,
        ...extraStyle,
      }}
    >
      <span
        style={{
          fontFamily: cfg.titleFont,
          color: cfg.titleColor,
          fontSize: STRIP_W * 0.115,
          letterSpacing: "0.02em",
          width: "100%",
          textAlign: "center",
          lineHeight: 1.1,
        }}
      >
        And Scene...
      </span>

      {slots.map((slot, i) => (
        <div
          key={i}
          style={{
            width: SLOT_W,
            height: SLOT_H,
            background: cfg.slotBg,
            overflow: "hidden",
            flexShrink: 0,
            position: "relative",
          }}
        >
          {slot}
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   PAGE 1 — Design Select
══════════════════════════════════════════ */
function PageSelect({ onStart }) {
  const [selected, setSelected] = useState(null);

  const placeholderSlots = [
    <div style={{ width: "100%", height: "100%", background: "#3a1010" }} />,
    <div style={{ width: "100%", height: "100%", background: "#2e0d0d" }} />,
    <div style={{ width: "100%", height: "100%", background: "#3a1010" }} />,
  ];

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Select a Frame</h2>

      <div
        style={{
          display: "flex",
          gap: 36,
          alignItems: "flex-start",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {Object.entries(FRAME_DESIGNS).map(([key, cfg]) => (
          <div
            key={key}
            onClick={() => setSelected(key)}
            style={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              transition: "transform 0.22s ease",
              transform:
                selected === key
                  ? "translateY(-8px) scale(1.04)"
                  : "translateY(0) scale(1)",
              outline:
                selected === key
                  ? "3px solid #4aa3c8"
                  : "3px solid transparent",
              outlineOffset: 5,
            }}
          >
            <PhotoStrip design={key} slots={placeholderSlots} />
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                color: selected === key ? "#8b0000" : "#777",
                fontSize: "0.9rem",
                transition: "color 0.2s",
              }}
            >
              {cfg.label}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => selected && onStart(selected)}
        style={{
          ...styles.btn,
          marginTop: 48,
          opacity: selected ? 1 : 0.3,
          cursor: selected ? "pointer" : "default",
          fontSize: "1.5rem",
          padding: "12px 52px",
          transition: "opacity 0.2s, transform 0.2s",
        }}
      >
        Start Shooting →
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════
   PAGE 2 — Capture
══════════════════════════════════════════ */
function PageCapture({ design, onDone }) {
  const videoRefs = useRef([null, null, null]);
  const canvasRefs = useRef([null, null, null]);
  const streamRef = useRef(null);

  const [snaps, setSnaps] = useState([null, null, null]);
  const [activeSlot, setActiveSlot] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [isBusy, setIsBusy] = useState(false);
  const [flash, setFlash] = useState(false);
  const [camError, setCamError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 1280 } },
          audio: false,
        });
        streamRef.current = s;
        videoRefs.current.forEach((vid) => {
          if (vid) vid.srcObject = s;
        });
      } catch {
        setCamError(true);
      }
    })();
    return () => streamRef.current?.getTracks().forEach((t) => t.stop());
  }, []);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const doFlash = () =>
    new Promise((res) => {
      setFlash(true);
      setTimeout(() => { setFlash(false); res(); }, 180);
    });

  const captureSlot = useCallback((slotIdx) => {
    const video = videoRefs.current[slotIdx];
    const canvas = canvasRefs.current[slotIdx];
    if (!video || !canvas) return null;
    canvas.width = SLOT_W * 3;
    canvas.height = SLOT_H * 3;
    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.restore();
    return canvas.toDataURL("image/png");
  }, []);

  const startSequence = async () => {
    if (isBusy) return;
    setIsBusy(true);
    const captured = [null, null, null];

    for (let i = 0; i < 3; i++) {
      setActiveSlot(i);
      for (let c = 3; c >= 1; c--) {
        setCountdown(c);
        await delay(900);
      }
      setCountdown(null);
      await doFlash();
      captured[i] = captureSlot(i);
      setSnaps([captured[0], captured[1], captured[2]]);
      await delay(350);
    }

    setActiveSlot(null);
    setIsBusy(false);
    await delay(400);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    onDone(captured, design);
  };

  const slots = [0, 1, 2].map((i) => {
    const snap = snaps[i];
    const isActive = activeSlot === i;

    return (
      <div key={i} style={{ position: "relative", width: "100%", height: "100%" }}>
        <canvas ref={(el) => (canvasRefs.current[i] = el)} style={{ display: "none" }} />

        <video
          ref={(el) => {
            videoRefs.current[i] = el;
            if (el && streamRef.current) el.srcObject = streamRef.current;
          }}
          autoPlay
          playsInline
          muted
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: "scaleX(-1)",
            opacity: snap ? 0 : 1,
          }}
        />

        {snap && (
          <img
            src={snap}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        )}

        {isActive && countdown !== null && (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(90,8,8,0.55)",
            fontFamily: "'Great Vibes', cursive",
            fontSize: SLOT_H * 0.55,
            color: "white",
            textShadow: "0 2px 12px rgba(0,0,0,0.5)",
            pointerEvents: "none", zIndex: 2,
          }}>
            {countdown}
          </div>
        )}

        {isActive && (
          <div style={{
            position: "absolute", inset: 0,
            boxShadow: "inset 0 0 0 3px #f0d4b0",
            pointerEvents: "none", zIndex: 3,
          }} />
        )}
      </div>
    );
  });

  return (
    <div style={styles.page}>
      {flash && (
        <div style={{
          position: "fixed", inset: 0,
          background: "white", opacity: 0.92,
          zIndex: 9999, pointerEvents: "none",
        }} />
      )}

      <PhotoStrip design={design} slots={slots} />

      {camError && (
        <p style={{ color: "#8b0000", fontStyle: "italic", marginTop: 16, fontFamily: "'Cormorant Garamond', serif" }}>
          Camera access required — please allow permissions and refresh.
        </p>
      )}

        {!isBusy && (
          <>
            <CameraButton onClick={startSequence} />
            <p style={{
              fontFamily: "'Great Vibes', cursive",
              color: "#8b0000",
              fontSize: "1.9rem",
              marginTop: 10,
              animation: "pulse 2s ease-in-out infinite",
            }}>
              Click to capture!
            </p>
            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.45}}`}</style>
          </>
        )}
      </div>
    );
  }

/* ══════════════════════════════════════════
   PAGE 3 — Result
══════════════════════════════════════════ */
function PageResult({ snaps, design, onRetake }) {
  const cfg = FRAME_DESIGNS[design] || FRAME_DESIGNS.design1;

  const slots = snaps.map((src, i) => (
    <img
      key={i}
      src={src || ""}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  ));

  const saveToDevice = async () => {
    const padX = 16;
    const padY = 14;
    const gap = cfg.gap;
    const titleH = 34;
    const scale = 3;
    const W = STRIP_W * scale;
    const H =
      padY * 2 * scale +
      titleH * scale +
      3 * SLOT_H * scale +
      2 * gap * scale;

    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = cfg.stripBg;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = cfg.titleColor;
    ctx.font = `${STRIP_W * 0.115 * scale}px ${cfg.titleFont}`;
    ctx.textAlign = "center";
    ctx.fillText("And Scene...", W / 2, padY * scale + titleH * scale * 0.78);

    for (let i = 0; i < 3; i++) {
      if (!snaps[i]) continue;
      const img = new Image();
      img.src = snaps[i];
      await new Promise((res) => { img.onload = res; });
      const x = padX * scale;
      const y = padY * scale + titleH * scale + i * (SLOT_H * scale + gap * scale);
      ctx.drawImage(img, x, y, SLOT_W * scale, SLOT_H * scale);
    }

    const link = document.createElement("a");
    link.download = "photobooth-strip.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div style={{ ...styles.page, position: "relative" }}>
      {/* Blue corner decorations */}
      {[
        { top: 16, left: 16, borderWidth: "3px 0 0 3px" },
        { top: 16, right: 16, borderWidth: "3px 3px 0 0" },
        { bottom: 16, left: 16, borderWidth: "0 0 3px 3px" },
        { bottom: 16, right: 16, borderWidth: "0 3px 3px 0" },
      ].map((s, i) => (
        <div
          key={i}
          style={{
            position: "fixed",
            width: 52,
            height: 52,
            borderColor: "#4aa3c8",
            borderStyle: "solid",
            opacity: 0.65,
            ...s,
          }}
        />
      ))}

      <PhotoStrip design={design} slots={slots} />

      <div style={{ display: "flex", gap: 44, marginTop: 32 }}>
        <ActionButton icon={<SaveIcon />} label="Save to device" onClick={saveToDevice} />
        <ActionButton icon={<CameraIcon />} label="Retake Photos" onClick={onRetake} />
      </div>
    </div>
  );
}

/* ── Shared UI atoms ── */
function CameraButton({ onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        marginTop: 20,
        background: hover ? "#7a0c0c" : "none",
        border: "2px solid #7a0c0c",
        color: hover ? "white" : "#7a0c0c",
        width: 54,
        height: 54,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.2s",
        padding: 10,
      }}
    >
      <CameraIcon />
    </button>
  );
}

function ActionButton({ icon, label, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        background: hover ? "#7a0c0c" : "none",
        border: "1.5px solid #7a0c0c",
        color: hover ? "white" : "#7a0c0c",
        padding: "12px 18px",
        cursor: "pointer",
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "0.88rem",
        letterSpacing: "0.05em",
        minWidth: 100,
        transition: "all 0.2s",
      }}
    >
      <span style={{ width: 26, height: 26, display: "flex" }}>{icon}</span>
      {label}
    </button>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="100%" height="100%">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="100%" height="100%">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}

/* ── Global style constants ── */
const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "40px 20px",
    width: "100%",
    background: "#d5d5d5",
  },
  heading: {
    fontFamily: "'Great Vibes', cursive",
    color: "#8b0000",
    fontSize: "clamp(2.2rem, 6vw, 3.4rem)",
    marginBottom: 40,
    textAlign: "center",
  },
  btn: {
    background: "#7a0c0c",
    color: "#f0ddd8",
    border: "none",
    fontFamily: "'Great Vibes', cursive",
    cursor: "pointer",
    letterSpacing: "0.04em",
  },
};

/* ══════════════════════════════════════════
   ROOT APP
══════════════════════════════════════════ */
function RouteComponent(){
  const [page, setPage] = useState("select");
  const [design, setDesign] = useState(null);
  const [snaps, setSnaps] = useState([null, null, null]);

  const handleStart = (selectedDesign) => {
    setDesign(selectedDesign);
    setSnaps([null, null, null]);
    setPage("capture");
  };

  const handleDone = (captured, usedDesign) => {
    setSnaps(captured);
    setDesign(usedDesign);
    setPage("result");
  };

  const handleRetake = () => {
    setPage("select");
  };

  return (
    <>
      <FontLink />
      <div style={{ background: "#d5d5d5", minHeight: "100vh" }}>
        {page === "select" && <PageSelect onStart={handleStart} />}
        {page === "capture" && (
          <PageCapture key={design} design={design} onDone={handleDone} />
        )}
        {page === "result" && (
          <PageResult snaps={snaps} design={design} onRetake={handleRetake} />
        )}
      </div>
    </>
  );
}