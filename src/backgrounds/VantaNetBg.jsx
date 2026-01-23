import React, { useRef, useEffect } from "react";

// VantaNetBG.jsx
// React component for Vanta.js NET background.
// - Dynamically loads Three.js and Vanta NET only if needed
// - Prevents duplicate script injection
// - Exposes props for customization and interactivity
// - Proper cleanup on unmount

const SCRIPT_URLS = {
  three: "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js",
  vantaNet: "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js",
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

export default function VantaNetBG({
  interactive = true,
  className = "",
  style = {},
  color = 0x6fb3ff,
  backgroundColor = 0x090c13, 
  points = 9.0,
  maxDistance = 22.0,
  spacing = 18.0,
  scale = 0.5,
  scaleMobile = 1.0,
  minHeight = 200.0,
  minWidth = 200.0,
  onError = (err) => console.error("Vanta Net load error:", err),
}) {
  const ref = useRef(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const setup = async () => {
      try {
        if (!window.THREE) await loadScriptOnce(SCRIPT_URLS.three);
        if (!window.VANTA || !window.VANTA.NET) await loadScriptOnce(SCRIPT_URLS.vantaNet);

        if (!mounted) return;

        if (vantaRef.current && vantaRef.current.destroy) {
          try { vantaRef.current.destroy(); } catch (e) {}
          vantaRef.current = null;
        }

        vantaRef.current = window.VANTA.NET({
          el: ref.current,
          mouseControls: interactive,
          touchControls: interactive,
          gyroControls: false,
          minHeight,
          minWidth,
          scale,
          scaleMobile,
          color,
          backgroundColor,
          points,
          maxDistance,
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
  }, [interactive, color, backgroundColor, points, maxDistance, spacing, scale, scaleMobile, minHeight, minWidth]);

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

/* Usage example:
<VantaNetBG interactive={false} color={0xe83572} backgroundColor={0x261643} points={11} />
*/
