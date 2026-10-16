import React from "react";
import { useReducedMotion } from "framer-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/[]{}#*+=";
const FRAME_MS = 50; // ~20 updates/s is plenty for the flicker

/**
 * Cycles through `words`, "decoding" each new one: characters flicker
 * through random glyphs and lock in left to right, like text streaming out
 * of a model. Reduced-motion users just see the first word.
 *
 * Writes the text straight to the DOM node (no React re-render per frame),
 * throttled, and skips cycles while it's off-screen.
 *
 * Pass a module-level array for `words` so the effect isn't restarted on
 * every render.
 */
export default function ScrambleText({
  words,
  hold = 2600,
  duration = 700,
  className,
  style,
  ...rest
}) {
  const reduce = useReducedMotion();
  const ref = React.useRef(null);

  React.useEffect(() => {
    const el = ref.current;
    if (reduce || words.length < 2 || !el) return undefined;
    let index = 0;
    let frame;
    let timer;
    let onScreen = true;
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    observer.observe(el);

    const decode = (target) => {
      const start = performance.now();
      let last = 0;
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        if (now - last >= FRAME_MS || progress === 1) {
          last = now;
          const locked = Math.floor(progress * target.length);
          let out = "";
          for (let i = 0; i < target.length; i++) {
            out +=
              i < locked || target[i] === " "
                ? target[i]
                : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
          el.textContent = out;
        }
        if (progress < 1) frame = requestAnimationFrame(tick);
        else timer = setTimeout(next, hold);
      };
      frame = requestAnimationFrame(tick);
    };
    const next = () => {
      if (!onScreen) {
        timer = setTimeout(next, hold);
        return;
      }
      index = (index + 1) % words.length;
      decode(words[index]);
    };

    timer = setTimeout(next, hold);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [reduce, words, hold, duration]);

  return (
    <span ref={ref} className={className} style={style} {...rest}>
      {words[0]}
    </span>
  );
}
