import React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import "../styles/Intro.css";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import MagneticButton from "./MagneticButton";
import { EASE, wordReveal } from "../animations/variants";

// Lazy-load the animated backdrop so it never blocks first paint.
const HeroBackground = React.lazy(() => import("./HeroBackground"));

// Heading words; flag the name so it gets the accent colour.
const HEADING = [
  { text: "hi,", accent: false },
  { text: "Avishkar", accent: true },
  { text: "here.", accent: false },
];

// Each word sits behind a clip mask and slides up — staggered for the
// classic "line reveal" feel. Whole sequence lands well under ~1.2s.
const headingContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

// Subheading / description / CTA fade + slide up after the heading.
const bodyContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.55 } },
};
const bodyItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function Intro() {
  const reduce = useReducedMotion();
  const heroRef = React.useRef(null);
  // Progress from 0 (hero pinned) to 1 (hero fully scrolled away).
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  // Content drifts up + fades; backdrop drifts the other way → parallax depth.
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <div id="intro" ref={heroRef}>
      <motion.div
        className="hero-bg-parallax"
        style={reduce ? undefined : { y: bgY }}
      >
        <React.Suspense fallback={null}>
          <HeroBackground />
        </React.Suspense>
      </motion.div>

      <motion.div
        className="intro-content"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.h1
          className="intro-title"
          variants={headingContainer}
          initial="hidden"
          animate="visible"
          aria-label="hi, Avishkar here."
        >
          {HEADING.map((word, i) => (
            <span className="intro-word" key={i} aria-hidden="true">
              <motion.span
                className={`intro-word-inner${word.accent ? " intro-name" : ""}`}
                variants={wordReveal}
              >
                {word.text}
              </motion.span>
              {i < HEADING.length - 1 ? " " : ""}
            </span>
          ))}
        </motion.h1>

        <motion.div variants={bodyContainer} initial="hidden" animate="visible">
          <motion.div className="intro-subtitle" variants={bodyItem}>
            I create stuff sometimes.
          </motion.div>
          <motion.div className="intro-desc" variants={bodyItem}>
            I'm a software engineer from Pune, India. As a Full Stack Web
            Developer, I am driven by a passion for innovation and a keen eye for
            detail. With a solid foundation in both frontend and backend
            development, I bring a holistic approach to every project, seamlessly
            integrating design and functionality to create immersive digital
            experiences.
          </motion.div>
          <motion.div className="intro-cta-row" variants={bodyItem}>
            <MagneticButton
              href="mailto:avishkarkakde2004@gmail.com"
              className="intro-contact"
            >
              <EmailRoundedIcon />
              {" Say hi!"}
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
