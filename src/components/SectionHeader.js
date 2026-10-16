import React from "react";
import { m } from "framer-motion";
import { EASE, wordReveal, viewportOnce } from "../animations/variants";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const indexFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};
// The rule draws out from the title once the words have landed.
const ruleDraw = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1, ease: EASE, delay: 0.25 } },
};

/**
 * Numbered section heading: the index fades in, each word of the title rises
 * out of its own clip mask, then the hairline rule draws across.
 */
export default function SectionHeader({ index, title }) {
  const words = title.split(" ");
  return (
    <m.div
      className="section-header"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <m.span className="section-index" variants={indexFade}>
        {index}
      </m.span>
      <h2 className="section-title" aria-label={title}>
        {words.map((word, i) => (
          // The space must sit outside the inline-block mask, or it collapses.
          <React.Fragment key={i}>
            {i > 0 && " "}
            <span className="section-word" aria-hidden="true">
              <m.span className="section-word-inner" variants={wordReveal}>
                {word}
              </m.span>
            </span>
          </React.Fragment>
        ))}
      </h2>
      <m.span
        className="section-rule"
        variants={ruleDraw}
        aria-hidden="true"
      />
    </m.div>
  );
}
