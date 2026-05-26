import { createFileRoute } from "@tanstack/react-router";
import { Unity, useUnityContext } from "react-unity-webgl";
import React, { useState, useEffect } from "react";
// @ts-ignore
import MobileControls from "../../../components/Articles/AndScene/dinner/MobileControls";

export const Route = createFileRoute("/Issues/andscene/dinner")({
  component: Home,
});

function isMobile() {
  if (typeof window === "undefined") return false;
  return (
    /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
      navigator.userAgent,
    ) || window.matchMedia("(pointer: coarse)").matches
  );
}

function useIsPortrait() {
  const [portrait, setPortrait] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(orientation: portrait)").matches
      : false,
  );
  useEffect(() => {
    const mq = window.matchMedia("(orientation: portrait)");
    const handler = (e) => setPortrait(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return portrait;
}

function RotatePrompt() {
  return (
    <div className="bg-black w-full min-h-screen flex flex-col items-center justify-center gap-6">
      <img
        src="unity/rotation.png"
        alt="Rotate Device"
        className="w-24 h-24 animate-tilt grayscale invert brightness-200"
        style={{ animation: "tilt 1.6s ease-in-out infinite" }}
      />
      <p className="text-white text-lg font-medium tracking-wide">
        Rotate your device and unmute your device to play
      </p>

      <style>{`
  @keyframes tilt {
    0%   { transform: rotate(0deg); }
    50%  { transform: rotate(-90deg); }
    100% { transform: rotate(-90deg); }
  }
`}</style>
    </div>
  );
}

function Home() {
  const { unityProvider, sendMessage } = useUnityContext({
    loaderUrl: "/assets/andscene/dinner/Build/unity.loader.js",
    dataUrl: "/assets/andscene/dinner/Build/unity.data",
    frameworkUrl: "/assets/andscene/dinner/Build/unity.framework.js",
    codeUrl: "/assets/andscene/dinner/Build/unity.wasm",
  });

  const [devicePixelRatio, setDevicePixelRatio] = useState(() =>
    typeof window !== "undefined" ? window.devicePixelRatio : 1,
  );

  const isPortrait = useIsPortrait();
  const mobile = isMobile();

  useEffect(
    function () {
      const updateDevicePixelRatio = function () {
        setDevicePixelRatio(window.devicePixelRatio);
      };
      const mediaMatcher = window.matchMedia(
        `screen and (resolution: ${devicePixelRatio}dppx)`,
      );
      mediaMatcher.addEventListener("change", updateDevicePixelRatio);
      return function () {
        mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
      };
    },
    [devicePixelRatio],
  );

  if (mobile && isPortrait) return <RotatePrompt />;

  return (
    <div className="bg-black w-full h-screen relative overflow-hidden">
      <Unity
        unityProvider={unityProvider}
        // devicePixelRatio={devicePixelRatio}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
      <MobileControls sendMessage={sendMessage} gameObjectName="Main Camera" />
    </div>
  );
}
