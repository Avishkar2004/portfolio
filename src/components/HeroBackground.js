import React from "react";
import "../styles/HeroBackground.css";

/**
 * Low-CPU animated hero backdrop: three slow-drifting blurred blobs over a
 * faint grid. Pure CSS keyframes on transform/opacity only — no canvas, no
 * per-frame JS — so it stays at 60fps and is cheap on mobile. Lazy-loaded
 * (see Intro.js) and decorative, so hidden from assistive tech. Reduced-motion
 * users get a static gradient (animations paused via CSS media query).
 */
export default function HeroBackground() {
  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-bg__grid" />
      <span className="hero-bg__blob hero-bg__blob--1" />
      <span className="hero-bg__blob hero-bg__blob--2" />
      <span className="hero-bg__blob hero-bg__blob--3" />
      <div className="hero-bg__vignette" />
    </div>
  );
}
