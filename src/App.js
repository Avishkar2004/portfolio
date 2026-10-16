import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  MotionConfig,
} from "framer-motion";
import Intro from "./components/Intro";
import NavBar from "./components/NavBar";
import SmoothScroll from "./components/SmoothScroll";
import ScrollProgress from "./components/ScrollProgress";
import { pageTransition } from "./animations/variants";
import "./App.css";
import "./styles/Global.css";

// Everything below the hero ships as separate chunks so the first screen
// only waits on the code it needs. They start downloading straight away.
const About = React.lazy(() => import("./components/About"));
const Projects = React.lazy(() => import("./components/Projects"));
const Skills = React.lazy(() => import("./components/skills"));
const Experience = React.lazy(() => import("./components/Experience"));
const Contact = React.lazy(() => import("./components/Contact"));
const Credits = React.lazy(() => import("./components/Credits"));
const ProjectCommitsPage = React.lazy(() =>
  import("./components/ProjectCommitsPage")
);
const NotFound = React.lazy(() => import("./components/NotFound"));
// Vercel's beacons aren't needed to paint anything; keep them out of the
// first chunk.
const Analytics = React.lazy(() =>
  import("@vercel/analytics/react").then((mod) => ({ default: mod.Analytics }))
);
const SpeedInsights = React.lazy(() =>
  import("@vercel/speed-insights/react").then((mod) => ({
    default: mod.SpeedInsights,
  }))
);

// A URL like /#contact has no target until its lazy section arrives, so the
// browser's own jump misses it. Poll briefly for the target, then jump.
function ScrollToHash() {
  React.useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return undefined;
    let tries = 0;
    let timer;
    const jump = () => {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView();
      else if (tries++ < 30) timer = setTimeout(jump, 100);
    };
    jump();
    return () => clearTimeout(timer);
  }, []);
  return null;
}

function PortfolioHome() {
  return (
    <>
      <Intro />
      {/* One boundary per section: each mounts as soon as its own chunk
          arrives, in small commits rather than one long main-thread task. */}
      <React.Suspense fallback={null}>
        <About />
      </React.Suspense>
      <React.Suspense fallback={null}>
        <Projects />
      </React.Suspense>
      <React.Suspense fallback={null}>
        <Skills />
      </React.Suspense>
      <React.Suspense fallback={null}>
        <Experience />
      </React.Suspense>
      <React.Suspense fallback={null}>
        <Contact />
      </React.Suspense>
      <React.Suspense fallback={null}>
        <Credits />
      </React.Suspense>
      <ScrollToHash />
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    // initial={false}: no fade-in on first load (it held back the first
    // paint); route changes still animate.
    <AnimatePresence mode="wait" initial={false}>
      <m.div
        key={location.pathname}
        initial={pageTransition.initial}
        animate={pageTransition.animate}
        exit={pageTransition.exit}
      >
        <React.Suspense fallback={null}>
          <Switch location={location}>
            <Route
              path="/project/:projectId/commits"
              component={ProjectCommitsPage}
            />
            <Route exact path="/">
              <NavBar />
              <div id="content">
                <PortfolioHome />
              </div>
            </Route>
            <Route component={NotFound} />
          </Switch>
        </React.Suspense>
      </m.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    // LazyMotion + domAnimation: the lighter framer-motion feature set (no
    // layout/drag). `strict` throws if any full `motion.*` component sneaks in.
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <SmoothScroll>
          <div className="App">
            <React.Suspense fallback={null}>
              <Analytics />
              <SpeedInsights />
            </React.Suspense>
            <ScrollProgress />
            <AnimatedRoutes />
          </div>
        </SmoothScroll>
      </MotionConfig>
    </LazyMotion>
  );
}

export default App;
