import React, { useRef, useEffect } from "react";

// VantaRingsBG.jsx
// Improved React component for Vanta.js RINGS background.
// - Dynamically loads Three.js and Vanta Rings only if needed
// - Prevents duplicate script injection
// - Exposes props for customization (colors, scale, interactivity)
// - Proper cleanup on unmount to avoid memory leaks

const SCRIPT_URLS = {
  three: "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js",
  vantaRings: "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.rings.min.js",
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

export default function VantaRingsBG({
  interactive = false,
  className = "",
  style = {},
  backgroundColor = 0x0f70d2, // consider using full 0xRRGGBB values (e.g. 0x0F70D2)
  color = 0x83e80e,
  scale = 1.0,
  scaleMobile = 1.0,
  minHeight = 200.0,
  minWidth = 200.0,
  onError = (err) => console.error("Vanta Rings load error:", err),
}) {
  const ref = useRef(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const setup = async () => {
      try {
        if (!window.THREE) await loadScriptOnce(SCRIPT_URLS.three);
        if (!window.VANTA || !window.VANTA.RINGS) await loadScriptOnce(SCRIPT_URLS.vantaRings);

        if (!mounted) return;

        if (vantaRef.current && vantaRef.current.destroy) {
          try { vantaRef.current.destroy(); } catch (e) {}
          vantaRef.current = null;
        }

        vantaRef.current = window.VANTA.RINGS({
          el: ref.current,
          mouseControls: interactive,
          touchControls: interactive,
          gyroControls: false,
          minHeight,
          minWidth,
          scale,
          scaleMobile,
          backgroundColor,
          color,
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
  }, [interactive, backgroundColor, color, scale, scaleMobile, minHeight, minWidth]);

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

// Non-interactive (click-through background):
<VantaRingsBG interactive={false} backgroundColor={0x0f70d2} color={0x83e80e} />

// Interactive (captures mouse/touch to rotate/animate):
<VantaRingsBG interactive={true} scale={1.0} scaleMobile={1.0} />

Notes:
- If you render on the server (Next.js or similar), render this component only on the client (dynamic import with ssr: false) because it references window.
- Prefer full hex values (0xRRGGBB) for clarity. Shorter forms are interpreted but less obvious.
- For production stability, pin the Vanta package to a specific version instead of @latest or bundle the Vanta file with your assets.
*/
