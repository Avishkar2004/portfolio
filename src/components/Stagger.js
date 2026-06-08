import React from "react";
import { motion } from "framer-motion";
import {
  fadeUp,
  fadeUpSmall,
  staggerContainer,
  viewportOnce,
} from "../animations/variants";

/**
 * A container whose direct <StaggerItem> children reveal one after another
 * when it scrolls into view. Animates transform/opacity only.
 */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
  as = "div",
  amount,
}) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={amount ? { once: true, amount } : viewportOnce}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({ children, className, small = false, as = "div" }) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp className={className} variants={small ? fadeUpSmall : fadeUp}>
      {children}
    </Comp>
  );
}
