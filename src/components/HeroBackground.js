import React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import "../styles/HeroBackground.css";

// Spring the lamp uses to trail the cursor — a little lag reads as "light".
const FOLLOW = { stiffness: 90, damping: 22, mass: 0.6 };
const LAMP_RADIUS = 260; // px of grid lit around the cursor
const GLOW_SIZE = 560; // px, diameter of the warm glow under the cursor

/**
 * Hero backdrop: a faint graph-paper grid, with a "desk lamp" that follows
 * the cursor — the grid lines under it light up in the accent colour and a
 * soft warm glow trails behind. Lazy-loaded (see Intro.js) and decorative.
 *
 * The lamp only exists on devices with a real pointer, and never for
 * reduced-motion users; everyone else gets the static grid plus one slow
 * ambient glow. Cursor tracking writes motion values directly (no React
 * re-renders), and the glow moves by transform only.
 */
export default function HeroBackground() {
  const reduce = useReducedMotion();
  const ref = React.useRef(null);
  const [lampOn, setLampOn] = React.useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, FOLLOW);
  const sy = useSpring(y, FOLLOW);
  const litMask = useMotionTemplate`radial-gradient(${LAMP_RADIUS}px circle at ${sx}px ${sy}px, #000, transparent)`;
  const glowX = useTransform(sx, (v) => v - GLOW_SIZE / 2);
  const glowY = useTransform(sy, (v) => v - GLOW_SIZE / 2);

  React.useEffect(() => {
    if (reduce) return undefined;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return undefined;
    }
    let started = false;
    const onMove = (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0) return; // hero scrolled away — don't animate offscreen
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      if (!started) {
        // First move: drop the lamp under the cursor instead of sliding in from 0,0.
        started = true;
        x.jump(px);
        y.jump(py);
        sx.jump(px);
        sy.jump(py);
        setLampOn(true);
        return;
      }
      x.set(px);
      y.set(py);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, x, y, sx, sy]);

  return (
    <div className="hero-bg" ref={ref} aria-hidden="true">
      <span className="hero-bg__ambient" />
      <div className="hero-bg__grid" />
      {lampOn && (
        <>
          <motion.div
            className="hero-bg__glow"
            style={{ x: glowX, y: glowY, width: GLOW_SIZE, height: GLOW_SIZE }}
          />
          <motion.div
            className="hero-bg__grid hero-bg__grid--lit"
            style={{ maskImage: litMask, WebkitMaskImage: litMask }}
          />
        </>
      )}
      <div className="hero-bg__vignette" />
    </div>
  );
}
