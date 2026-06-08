// Shared Framer Motion variants + easing tokens.
// Everything here animates ONLY transform / opacity to stay on the GPU (60fps).
// Reduced-motion is handled globally via <MotionConfig reducedMotion="user">,
// which neutralises transform/opacity tweens for users who ask for less motion.

// A calm, premium ease (similar to easeOutQuint).
export const EASE = [0.16, 1, 0.3, 1];
export const EASE_SOFT = [0.25, 0.4, 0.25, 1];

// Spring used for hover/tap interactions on cards + buttons.
export const SPRING = { type: "spring", stiffness: 260, damping: 22, mass: 0.7 };

// Fade + slide up — the workhorse reveal.
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

// Smaller travel, used for dense lists (tech stack, skill chips).
export const fadeUpSmall = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

// Container that staggers its children when it scrolls into view.
export const staggerContainer = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

// Hero word reveal — each word slides up from behind a clip mask.
export const wordReveal = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.8, ease: EASE },
  },
};

// Shared viewport config for whileInView reveals.
export const viewportOnce = { once: true, amount: 0.2 };

// Page transition used with AnimatePresence between routes.
export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3, ease: EASE } },
};
