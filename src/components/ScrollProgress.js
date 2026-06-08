import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import "../styles/ScrollProgress.css";

/**
 * Thin gradient bar pinned to the top of the viewport that fills as you
 * scroll the page. Driven by scrollYProgress → scaleX (transform only),
 * spring-smoothed so it feels alive. Reduced-motion users still get an
 * accurate (just non-springy) indicator.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
