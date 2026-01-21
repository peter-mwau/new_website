import React, { useRef, useEffect } from "react";

// VantaBirdsBG.jsx
// Improved React component for Vanta.js BIRDS background.
// - Dynamically loads Three.js and Vanta Birds only if needed
// - Avoids duplicate script injection
// - Exposes props for customization and interactive control
// - Proper cleanup on unmount

const SCRIPT_URLS = {
  three: "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js",
  vantaBirds: "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js",
};

function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    const existing = Array.from(document.getElementsByTagName("script")).find(
      (s) => s.src && s.src.indexOf(src) !== -1
    );
    if (existing) {
      if (existing.getAttribute("data-loaded") === "true") return resolve(existing);
      existing.addEventListener("load", () => resolve(existing));
      existing.addEventListener("error", (e) => reject(e));
      return;
    }

    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.setAttribute("data-vanta-generated", "true");
    s.addEventListener("load", () => {
      s.setAttribute("data-loaded", "true");
      resolve(s);
    });
    s.addEventListener("error", (e) => reject(e));
    document.body.appendChild(s);
  });
}

export default function VantaBirdsBG({
  interactive = false,
  className = "",
  style = {},
  backgroundColor = 0x0e25, // default taken from your snippet (consider using full hex like 0x00e225)
  color2 = 0x0cfff,
  colorMode = "variance",
  birdSize = 0.8,
  wingSpan = 23.0,
  speedLimit = 6.0,
  separation = 62.0,
  alignment = 62.0,
  cohesion = 1.0,
  onError = (err) => console.error("Vanta Birds load error:", err),
}) {
  const ref = useRef(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const setup = async () => {
      try {
        if (!window.THREE) await loadScriptOnce(SCRIPT_URLS.three);
        if (!window.VANTA || !window.VANTA.BIRDS) await loadScriptOnce(SCRIPT_URLS.vantaBirds);

        if (!mounted) return;

        if (vantaRef.current && vantaRef.current.destroy) {
          try { vantaRef.current.destroy(); } catch (e) {}
          vantaRef.current = null;
        }

        vantaRef.current = window.VANTA.BIRDS({
          el: ref.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: true,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor,
          color2,
          colorMode,
          birdSize,
          wingSpan,
          speedLimit,
          separation,
          alignment,
          cohesion,
        });
      } catch (err) {
        onError(err);
      }
    };

    setup();

    return () => {
      mounted = false;
      if (vantaRef.current && vantaRef.current.destroy) {
        try { vantaRef.current.destroy(); } catch (e) {}
        vantaRef.current = null;
      }
    };
  }, [
    interactive,
    backgroundColor,
    color2,
    colorMode,
    birdSize,
    wingSpan,
    speedLimit,
    separation,
    alignment,
    cohesion,
  ]);

  const containerStyle = {
    position: "fixed",
    zIndex: 0,
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    pointerEvents: interactive ? "auto" : "none",
    transition: "background 0.5s",
    ...style,
  };

  return <div ref={ref} className={className} style={containerStyle} aria-hidden={!interactive} />;
}

/*
Usage examples:

// Passive background (click-through):
<VantaBirdsBG interactive={false} backgroundColor={0xe25} color2={0xcfff} />

// Interactive (captures mouse/touch):
<VantaBirdsBG interactive={true} birdSize={1.2} wingSpan={30} />

Notes:
- If rendering on the server (SSR), only render this on the client (e.g. dynamic import with ssr: false in Next.js).
- The numeric color values in your snippet like 0xe25 and 0xcfff are short hex forms; consider using full 0xrrggbb values for clarity (e.g. 0x00e225).
- For production, pin a Vanta release (avoid @latest) or bundle the Vanta file locally for reproducible builds.
*/
