import React from "react";
import { motion } from "framer-motion";
import { EASE, viewportOnce } from "../animations/variants";

// Parses the legacy delay prop ("100ms", "200ms", 0.3) into seconds.
function parseDelay(delay) {
  if (delay == null) return 0;
  if (typeof delay === "number") return delay;
  const ms = parseFloat(String(delay));
  if (Number.isNaN(ms)) return 0;
  return String(delay).includes("ms") ? ms / 1000 : ms;
}

/**
 * Drop-in replacement for the old IntersectionObserver fade.
 * Same API (`children`, `delay`) but powered by Framer Motion's whileInView,
 * so it shares the project's easing + reduced-motion handling and only ever
 * animates transform/opacity.
 */
export default function FadeInSection({ children, delay, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease: EASE, delay: parseDelay(delay) }}
    >
      {children}
    </motion.div>
  );
}
