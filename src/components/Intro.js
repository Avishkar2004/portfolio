import React from "react";
import {
  m,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import "../styles/Intro.css";
import MagneticButton from "./MagneticButton";
import ScrambleText from "./ScrambleText";
import { EASE } from "../animations/variants";

// Lazy-load the animated backdrop so it never blocks first paint.
const HeroBackground = React.lazy(() => import("./HeroBackground"));

// The status badge. Swap for e.g. { label: "Open to", what: "new roles", href: "mailto:…" }.
const NOW = {
  label: "Currently building",
  what: "yesitryme.com",
  href: "https://www.yesitryme.com",
};

// What I'm learning in AI right now — cycles in the "Learning AI" pill.
const AI_TOPICS = [
  "LLM apps",
  "RAG",
  "LangChain",
  "on-device ML",
  "prompt design",
  "AI agents",
];
const AI_TOPIC_CHARS = Math.max(...AI_TOPICS.map((t) => t.length));

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
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.35 } },
};
const bodyItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// Hold the reveal until the display font is in, so the giant name never
// paints in the fallback font and then jumps. Capped so a slow network
// can't hide the hero.
function useFontReady(family, timeout = 1200) {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    if (!document.fonts) {
      setReady(true);
      return undefined;
    }
    let finished = false;
    let retry;
    const done = () => {
      if (finished) return;
      finished = true;
      setReady(true);
    };
    // The Google Fonts sheet loads without blocking paint (see index.html).
    // Until it has applied, the family isn't registered and load() resolves
    // with no faces — so retry briefly instead of revealing too early.
    const loadFont = () => {
      if (finished) return;
      document.fonts.load(`1em "${family}"`).then(
        (faces) => (faces.length ? done() : (retry = setTimeout(loadFont, 50))),
        done
      );
    };
    loadFont();
    const timer = setTimeout(done, timeout);
    return () => {
      finished = true;
      clearTimeout(timer);
      clearTimeout(retry);
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
        second: "2-digit",
        timeZone: "Asia/Kolkata",
      }),
    []
  );
  const [now, setNow] = React.useState(() => format.format(new Date()));
  React.useEffect(() => {
    const id = setInterval(() => setNow(format.format(new Date())), 1000);
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
    <m.span
      className="intro-letter"
      style={reduce ? { marginRight: kern } : { y, rotate, marginRight: kern }}
    >
      <m.span className="intro-letter-inner" variants={letterReveal}>
        {char}
      </m.span>
    </m.span>
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
      <m.div
        className="hero-bg-parallax"
        style={reduce ? undefined : { y: bgY }}
      >
        <React.Suspense fallback={null}>
          <HeroBackground />
        </React.Suspense>
      </m.div>

      <m.div
        className="intro-content"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <m.div
          className="intro-topline"
          variants={kicker}
          custom={0}
          initial="hidden"
          animate={state}
        >
          <div className="intro-pills">
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
            <span className="intro-ai">
              <span className="sr-only">
                Learning AI: {AI_TOPICS.join(", ")}
              </span>
              <span className="intro-ai__spark" aria-hidden="true">
                ✦
              </span>
              <span aria-hidden="true">Learning AI ·</span>
              {/* Fixed width (mono font) so the cycling word never shifts layout. */}
              <ScrambleText
                words={AI_TOPICS}
                className="intro-ai__topic"
                aria-hidden="true"
                style={{
                  minWidth: `calc(${AI_TOPIC_CHARS}ch + ${AI_TOPIC_CHARS * 0.08}em)`,
                }}
              />
            </span>
          </div>
          <span className="intro-meta">
            Pune, India <span aria-hidden="true">·</span> <LocalTime />
          </span>
        </m.div>

        <m.h1
          className="intro-title"
          variants={titleContainer}
          initial="hidden"
          animate={state}
          aria-label="hi, Avishkar here."
        >
          {/* Shrink-wraps the name so "here." ends where the name ends. */}
          <span className="intro-title-inner">
            <m.span
              className="intro-kicker"
              variants={kicker}
              custom={0}
              aria-hidden="true"
            >
              hi,
            </m.span>
            <m.span
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
            </m.span>
            <m.span
              className="intro-kicker intro-kicker--end"
              variants={kicker}
              custom={0.55}
              aria-hidden="true"
            >
              here.
            </m.span>
          </span>
        </m.h1>

        <m.div
          className="intro-bottom"
          variants={bodyContainer}
          initial="hidden"
          animate={state}
        >
          <div className="intro-copy">
            <m.p className="intro-subtitle" variants={bodyItem}>
              I create stuff sometimes.
            </m.p>
            <m.p className="intro-desc" variants={bodyItem}>
              I'm a software engineer from Pune, India. As a Full Stack Web
              Developer, I am driven by a passion for innovation and a keen eye
              for detail. With a solid foundation in both frontend and backend
              development, I bring a holistic approach to every project,
              seamlessly integrating design and functionality to create
              immersive digital experiences.
            </m.p>
          </div>
          <m.div className="intro-cta-row" variants={bodyItem}>
            <MagneticButton
              href="#contact"
              className="intro-contact"
            >
              Say hi!
              <ArrowIcon />
            </MagneticButton>
          </m.div>
        </m.div>
      </m.div>
    </div>
  );
}
