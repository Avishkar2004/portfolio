import React from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { SPRING } from "../animations/variants";

/**
 * A button/link that gently follows the cursor while hovered (magnetic effect)
 * and scales on hover/tap. Falls back to a plain motion element when the user
 * prefers reduced motion. Uses transform only.
 *
 * Pass `as="a"` (default) plus href, or any other tag via `as`.
 */
export default function MagneticButton({
  children,
  className,
  as = "a",
  strength = 0.4,
  ...rest
}) {
  const reduce = useReducedMotion();
  const ref = React.useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);

  const handleMove = (e) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Comp = motion[as] || motion.a;

  return (
    <Comp
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={reduce ? undefined : { x: sx, y: sy }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={SPRING}
      {...rest}
    >
      {children}
    </Comp>
  );
}
