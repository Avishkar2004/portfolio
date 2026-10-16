import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import "../styles/Intro.css";
import MagneticButton from "./MagneticButton";
import { EASE } from "../animations/variants";

// Lazy-load the animated backdrop so it never blocks first paint.
const HeroBackground = React.lazy(() => import("./HeroBackground"));

// The status badge. Swap for e.g. { label: "Open to", what: "new roles", href: "mailto:…" }.
const NOW = {
  label: "Currently building",
  what: "yesitryme.com",
  href: "https://www.yesitryme.com",
};

const NAME = "Avishkar";

// Kerning that's lost when the name is split into per-letter spans
// (measured from Instrument Serif), applied back per letter index.
const KERN = { 0: "-0.048em", 4: "-0.006em", 5: "-0.022em" };

// Where each letter drifts to as the hero scrolls away: [y, rotate in deg].
const SCATTER = [
  ["-0.3em", -9],
  ["0.18em", 6],
  ["-0.12em", -4],
  ["0.38em", 11],
  ["-0.24em", -7],
  ["0.1em", 5],
  ["-0.42em", -12],
  ["0.22em", 8],
];

const titleContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};
const nameContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055 } },
};
// Each letter rises out of its own clip mask.
const letterReveal = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 1, ease: EASE } },
};
const kicker = {
  hidden: { opacity: 0, y: 12 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};
const bodyContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.75 } },
};
const bodyItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// Hold the reveal until the display font is in, so the giant name never
// paints in the fallback font and then jumps. Capped so a slow network
// can't hide the hero.
function useFontReady(family, timeout = 1000) {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    if (!document.fonts) {
      setReady(true);
      return undefined;
    }
    let cancelled = false;
    const done = () => !cancelled && setReady(true);
    document.fonts.load(`1em "${family}"`).then(done, done);
    const timer = setTimeout(done, timeout);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [family, timeout]);
  return ready;
}

function LocalTime() {
  const format = React.useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
      }),
    []
  );
  const [now, setNow] = React.useState(() => format.format(new Date()));
  React.useEffect(() => {
    const id = setInterval(() => setNow(format.format(new Date())), 15000);
    return () => clearInterval(id);
  }, [format]);
  return <time>{now} IST</time>;
}

function Letter({ char, index, progress, reduce }) {
  const [dy, turn] = SCATTER[index % SCATTER.length];
  const y = useTransform(progress, [0, 1], ["0em", dy]);
  const rotate = useTransform(progress, [0, 1], [0, turn]);
  const kern = KERN[index];
  return (
    <motion.span
      className="intro-letter"
      style={reduce ? { marginRight: kern } : { y, rotate, marginRight: kern }}
    >
      <motion.span className="intro-letter-inner" variants={letterReveal}>
        {char}
      </motion.span>
    </motion.span>
  );
}

const ArrowIcon = () => (
  <svg
    className="intro-contact__arrow"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function Intro() {
  const reduce = useReducedMotion();
  const fontReady = useFontReady("Instrument Serif");
  const state = fontReady ? "visible" : "hidden";
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
        <motion.div
          className="intro-topline"
          variants={kicker}
          custom={0}
          initial="hidden"
          animate={state}
        >
          <a
            className="intro-badge"
            href={NOW.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="intro-badge__dot" aria-hidden="true" />
            {NOW.label} <strong>{NOW.what}</strong>
            <span aria-hidden="true">↗</span>
          </a>
          <span className="intro-meta">
            Pune, India <span aria-hidden="true">·</span> <LocalTime />
          </span>
        </motion.div>

        <motion.h1
          className="intro-title"
          variants={titleContainer}
          initial="hidden"
          animate={state}
          aria-label="hi, Avishkar here."
        >
          {/* Shrink-wraps the name so "here." ends where the name ends. */}
          <span className="intro-title-inner">
            <motion.span
              className="intro-kicker"
              variants={kicker}
              custom={0}
              aria-hidden="true"
            >
              hi,
            </motion.span>
            <motion.span
              className="intro-name"
              variants={nameContainer}
              aria-hidden="true"
            >
              {NAME.split("").map((char, i) => (
                <Letter
                  key={i}
                  char={char}
                  index={i}
                  progress={scrollYProgress}
                  reduce={reduce}
                />
              ))}
            </motion.span>
            <motion.span
              className="intro-kicker intro-kicker--end"
              variants={kicker}
              custom={0.55}
              aria-hidden="true"
            >
              here.
            </motion.span>
          </span>
        </motion.h1>

        <motion.div
          className="intro-bottom"
          variants={bodyContainer}
          initial="hidden"
          animate={state}
        >
          <div className="intro-copy">
            <motion.p className="intro-subtitle" variants={bodyItem}>
              I create stuff sometimes.
            </motion.p>
            <motion.p className="intro-desc" variants={bodyItem}>
              I'm a software engineer from Pune, India. As a Full Stack Web
              Developer, I am driven by a passion for innovation and a keen eye
              for detail. With a solid foundation in both frontend and backend
              development, I bring a holistic approach to every project,
              seamlessly integrating design and functionality to create
              immersive digital experiences.
            </motion.p>
          </div>
          <motion.div className="intro-cta-row" variants={bodyItem}>
            <MagneticButton
              href="mailto:avishkarkakde2004@gmail.com"
              className="intro-contact"
            >
              Say hi!
              <ArrowIcon />
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
