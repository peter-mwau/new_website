import React, { useRef, useEffect } from "react";

// VantaGlobeBG.jsx
// Improved React component for Vanta.js Globe background.
// - Dynamically loads Three.js and Vanta only if needed
// - Avoids loading scripts multiple times
// - Provides props for darkMode, interactive (mouse/touch), and simple styling
// - Proper cleanup to avoid memory leaks

const SCRIPT_URLS = {
  three: "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js",
  vantaGlobe: "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js",
};

function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    // If script already present and loaded, resolve immediately
    const existing = Array.from(document.getElementsByTagName("script")).find(
      (s) => s.src && s.src.indexOf(src) !== -1
    );
    if (existing) {
      if (existing.getAttribute("data-loaded") === "true") return resolve(existing);
      // otherwise wait for it to load
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

const isMobile = () => /Mobi|Android/i.test(navigator.userAgent || "");

export default function VantaGlobeBG({
  darkMode = true,
  interactive = true,
  className = "",
  style = {},
  spacing = 18.0,
  points = 8.0,
  size = 1.0,
  showLines = true,
  lineAlpha = 0.85,
  lineColor = 0xf2b705,
  onError = (err) => console.error("Vanta load error:", err),
}) {
  const ref = useRef(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const setup = async () => {
      try {
        // Load Three.js then Vanta Globe (only if not available)
        if (!window.THREE) await loadScriptOnce(SCRIPT_URLS.three);
        if (!window.VANTA || !window.VANTA.GLOBE) await loadScriptOnce(SCRIPT_URLS.vantaGlobe);

        // make sure component still mounted
        if (!mounted) return;

        // Destroy previous effect if any
        if (vantaRef.current) {
          try {
            vantaRef.current.destroy && vantaRef.current.destroy();
          } catch (e) {
            // swallow
          }
          vantaRef.current = null;
        }

        // Decide controls depending on props / device
        const useMouse = interactive;
        const useTouch = interactive;
        // Gyro only sensible on mobile and when interactive
        const useGyro = interactive && isMobile();

        vantaRef.current = window.VANTA.GLOBE({
          el: ref.current,
          mouseControls: useMouse,
          touchControls: useTouch,
          gyroControls: useGyro,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          size,
          color: 0x6fb3ff,
          color2: 0xfffffff,
          backgroundColor: 0x090c13,
          points,
          maxDistance: 22.0,
          spacing,
          showLines,
          lineColor,
          lineAlpha: 0.85,
        });
      } catch (err) {
        onError(err);
      }
    };

    setup();

    // cleanup
    return () => {
      mounted = false;
      if (vantaRef.current && vantaRef.current.destroy) {
        try {
          vantaRef.current.destroy();
        } catch (e) {
          // ignore
        }
        vantaRef.current = null;
      }
    };
    // only re-run when darkMode or interactive changes
  }, [darkMode, interactive, spacing, points, size, showLines, lineAlpha, lineColor]);

  // When interactive is false we keep pointerEvents none so page elements are clickable.
  // When interactive is true, pointerEvents should allow the Vanta canvas to capture mouse/touch.
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

1) Non-interactive (safe to click through):
<VantaGlobeBG darkMode={true} interactive={false} />

2) Interactive (captures mouse/touch for globe rotation):
<VantaGlobeBG darkMode={false} interactive={true} />

Notes & tips:
- This component dynamically injects external scripts. If you render on server (SSR), make sure to only use this on client-side (e.g. lazy load / render inside useEffect wrapper or Next.js dynamic import { ssr: false }).
- Interactive mode enables pointer events for the globe so it will capture mouse/touch; if you need overlays (buttons) in front of the globe, increase the overlay z-index and set their pointer-events accordingly.
- For production you may prefer bundling Three.js and Vanta locally or using a specific pinned Vanta release for reproducible builds.
*/