import React from "react";
import Lenis from "lenis";

// Module-level handle so any component (e.g. the navbar) can drive the
// same Lenis instance without prop-drilling or context overhead.
let lenisInstance = null;
export const getLenis = () => lenisInstance;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Wraps the app to provide buttery smooth scrolling via Lenis.
 * - Disabled entirely when the user prefers reduced motion (native scroll).
 * - Intercepts in-page anchor links (#about, #projects, ...) so they glide.
 */
export default function SmoothScroll({ children }) {
  React.useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisInstance = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Glide to in-page anchors instead of hard-jumping.
    const onClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return children;
}
