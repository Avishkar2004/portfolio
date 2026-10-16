import React from "react";
import { Link, useLocation } from "react-router-dom";
import { m } from "framer-motion";
import { EASE } from "../animations/variants";
import "../styles/NotFound.css";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const rise = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function NotFound() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    const previous = document.title;
    document.title = "Page not found — Avishkar Kakde";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <main className="notfound">
      <m.div
        className="notfound__inner"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <m.p className="notfound__label" variants={rise}>
          Error 404 · <span className="notfound__path">{pathname}</span>
        </m.p>
        <m.h1 className="notfound__title" variants={rise}>
          Nothing <em>here.</em>
        </m.h1>
        <m.p className="notfound__text" variants={rise}>
          That page doesn't exist, or it moved. The good stuff is back on the
          home page.
        </m.p>
        <m.div variants={rise}>
          <Link to="/" className="notfound__home">
            Back to home
            <svg
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
          </Link>
        </m.div>
      </m.div>
    </main>
  );
}
