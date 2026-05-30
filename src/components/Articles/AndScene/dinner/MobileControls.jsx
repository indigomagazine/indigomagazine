import { useEffect, useRef, useState } from "react";

const JOYSTICK_RADIUS = 60;
const KNOB_RADIUS = 24;

function isMobileDevice() {
  if (typeof window === "undefined") return false; // ← add this line
  return (
    /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
      navigator.userAgent,
    ) || window.matchMedia("(pointer: coarse)").matches
  );
}

function clampToCircle(dx, dy, radius) {
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist <= radius) return { x: dx, y: dy };
  const scale = radius / dist;
  return { x: dx * scale, y: dy * scale };
}

function Joystick({ onMove, style }) {
  const baseRef = useRef(null);
  const activeTouch = useRef(null);
  const originRef = useRef({ x: 0, y: 0 });
  const [knob, setKnob] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = baseRef.current;

    function onTouchStart(e) {
      if (activeTouch.current !== null) return;
      const t = e.changedTouches[0];
      activeTouch.current = t.identifier;
      const rect = el.getBoundingClientRect();
      originRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      e.preventDefault();
      e.stopPropagation(); // prevent this touch from reaching the look area
    }

    function onTouchMove(e) {
      for (const t of e.changedTouches) {
        if (t.identifier !== activeTouch.current) continue;
        const dx = t.clientX - originRef.current.x;
        const dy = t.clientY - originRef.current.y;
        const clamped = clampToCircle(dx, dy, JOYSTICK_RADIUS - KNOB_RADIUS);
        setKnob(clamped);
        onMove(
          clamped.x / (JOYSTICK_RADIUS - KNOB_RADIUS),
          -clamped.y / (JOYSTICK_RADIUS - KNOB_RADIUS),
        );
        e.preventDefault();
      }
    }

    function onTouchEnd(e) {
      for (const t of e.changedTouches) {
        if (t.identifier !== activeTouch.current) continue;
        activeTouch.current = null;
        setKnob({ x: 0, y: 0 });
        onMove(0, 0);
      }
    }

    el.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [onMove]);

  return (
    <div
      ref={baseRef}
      style={{
        width: JOYSTICK_RADIUS * 2,
        height: JOYSTICK_RADIUS * 2,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.15)",
        border: "2px solid rgba(255,255,255,0.35)",
        position: "relative",
        touchAction: "none",
        ...style,
      }}
    >
      <div
        style={{
          width: KNOB_RADIUS * 2,
          height: KNOB_RADIUS * 2,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.55)",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(calc(-50% + ${knob.x}px), calc(-50% + ${knob.y}px))`,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

function LookArea({ onLook }) {
  const activeTouch = useRef(null);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function onTouchStart(e) {
      for (const t of e.changedTouches) {
        if (activeTouch.current !== null) continue;
        // Only track touches that start on the right half of the screen
        if (t.clientX < window.innerWidth / 3) continue;
        activeTouch.current = t.identifier;
        lastPos.current = { x: t.clientX, y: t.clientY };
      }
    }

    function onTouchMove(e) {
      for (const t of e.changedTouches) {
        if (t.identifier !== activeTouch.current) continue;
        const dx = t.clientX - lastPos.current.x;
        const dy = t.clientY - lastPos.current.y;
        lastPos.current = { x: t.clientX, y: t.clientY };
        onLook(dx, dy);
        e.preventDefault();
      }
    }

    function onTouchEnd(e) {
      for (const t of e.changedTouches) {
        if (t.identifier === activeTouch.current) {
          activeTouch.current = null;
        }
      }
    }

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [onLook]);

  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: 0,
        width: "50%",
        height: "100%",
        touchAction: "none",
      }}
    />
  );
}

export default function MobileControls({
  sendMessage,
  gameObjectName = "Main Camera",
}) {
  const [visible] = useState(() => isMobileDevice());

  if (!visible) return null;

  function handleMove(x, y) {
    sendMessage(gameObjectName, "ReceiveMoveInput", `${x},${y}`);
  }

  function handleLook(dx, dy) {
    sendMessage(gameObjectName, "ReceiveLookInput", `${dx},${dy}`);
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 40,
          pointerEvents: "auto",
        }}
      >
        <Joystick onMove={handleMove} />
      </div>

      <div style={{ pointerEvents: "auto" }}>
        <LookArea onLook={handleLook} />
      </div>
    </div>
  );
}
