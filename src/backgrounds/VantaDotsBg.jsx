import React, { useRef, useEffect } from "react";

// VantaDotsBG.jsx
// React component for Vanta.js DOTS background.
// - Dynamically loads Three.js and Vanta Dots only if needed
// - Avoids duplicate script injection
// - Exposes props for customization (colors, size, spacing, interactivity)
// - Proper cleanup on unmount to avoid memory leaks

const SCRIPT_URLS = {
  three: "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js",
  vantaDots: "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.dots.min.js",
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

export default function VantaDotsBG({
  interactive = false,
  className = "",
  style = {},
  color = 0xf2801d,
  color2 = 0xfa8620,
  backgroundColor = 0x202020,
  size = 2.8,
  spacing = 31.0,
  scale = 1.0,
  scaleMobile = 1.0,
  minHeight = 200.0,
  minWidth = 200.0,
  onError = (err) => console.error("Vanta Dots load error:", err),
}) {
  const ref = useRef(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const setup = async () => {
      try {
        if (!window.THREE) await loadScriptOnce(SCRIPT_URLS.three);
        if (!window.VANTA || !window.VANTA.DOTS) await loadScriptOnce(SCRIPT_URLS.vantaDots);

        if (!mounted) return;

        if (vantaRef.current && vantaRef.current.destroy) {
          try { vantaRef.current.destroy(); } catch (e) {}
          vantaRef.current = null;
        }

        vantaRef.current = window.VANTA.DOTS({
          el: ref.current,
          mouseControls: interactive,
          touchControls: interactive,
          gyroControls: false,
          minHeight,
          minWidth,
          scale,
          scaleMobile,
          color,
          color2,
          backgroundColor,
          size,
          spacing,
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
    color,
    color2,
    backgroundColor,
    size,
    spacing,
    scale,
    scaleMobile,
    minHeight,
    minWidth,
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
<VantaDotsBG interactive={false} color={0xf2801d} color2={0xfa8620} backgroundColor={0x202020} size={2.8} spacing={31} />

// Interactive (captures mouse/touch):
<VantaDotsBG interactive={true} size={3.5} spacing={24} />

Notes:
- This component dynamically injects external scripts; if you use server-side rendering (Next.js etc.) import dynamically with ssr: false to avoid referencing window on the server.
- Short hex forms (like 0xf2801d) are accepted, but for clarity use full 0xRRGGBB values e.g. 0xF2801D.
- For production stability, pin the Vanta package to a specific version instead of @latest or bundle the Vanta file with your assets.
*/
