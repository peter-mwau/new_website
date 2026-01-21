import React, { useRef, useEffect } from "react";

// VantaHaloBG.jsx
// React component for Vanta.js HALO background.
// - Dynamically loads Three.js and Vanta HALO only if needed
// - Prevents duplicate script injection
// - Exposes props for baseColor, backgroundColor, amplitudeFactor, offsets and interactivity
// - Proper cleanup on unmount

const SCRIPT_URLS = {
  three: "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js",
  vantaHalo: "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js",
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

export default function VantaHaloBG({
  interactive = true,
  className = "",
  style = {},
  baseColor = 0x072366,
  backgroundColor = 0x0e164a,
  amplitudeFactor = 1.2,
  xOffset = 0.05,
  yOffset = 0.05,
  size = 1.1,
  scale = 1.0,
  minHeight = 200.0,
  minWidth = 200.0,
  onError = (err) => console.error("Vanta Halo load error:", err),
}) {
  const ref = useRef(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const setup = async () => {
      try {
        if (!window.THREE) await loadScriptOnce(SCRIPT_URLS.three);
        if (!window.VANTA || !window.VANTA.HALO) await loadScriptOnce(SCRIPT_URLS.vantaHalo);

        if (!mounted) return;

        if (vantaRef.current && vantaRef.current.destroy) {
          try { vantaRef.current.destroy(); } catch (e) {}
          vantaRef.current = null;
        }

        vantaRef.current = window.VANTA.HALO({
          el: ref.current,
          mouseControls: interactive,
          touchControls: interactive,
          gyroControls: false,
          minHeight,
          minWidth,
          baseColor,
          backgroundColor,
          amplitudeFactor,
          xOffset,
          yOffset,
          size,
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
  }, [interactive, baseColor, backgroundColor, amplitudeFactor, xOffset, yOffset, size, scale, minHeight, minWidth]);

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
<VantaHaloBG interactive={false} baseColor={0x072366} backgroundColor={0x0e164a} />
*/
