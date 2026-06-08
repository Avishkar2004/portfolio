import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Intro from "./components/Intro";
import Experience from "./components/Experience";
import About from "./components/About";
import Projects from "./components/Projects";
import Credits from "./components/Credits";
import NavBar from "./components/NavBar";
import Skills from "./components/skills";
import ProjectCommitsPage from "./components/ProjectCommitsPage";
import SmoothScroll from "./components/SmoothScroll";
import ScrollProgress from "./components/ScrollProgress";
import { pageTransition } from "./animations/variants";
import "./App.css";
import "./styles/Global.css";
import "rsuite/dist/styles/rsuite-default.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function PortfolioHome() {
  return (
    <>
      <Intro />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Credits />
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={pageTransition.initial}
        animate={pageTransition.animate}
        exit={pageTransition.exit}
      >
        <Switch location={location}>
          <Route
            path="/project/:projectId/commits"
            component={ProjectCommitsPage}
          />
          <Route path="/">
            <NavBar />
            <div id="content">
              <PortfolioHome />
            </div>
          </Route>
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <div className="App">
          <Analytics />
          <SpeedInsights />
          <ScrollProgress />
          <AnimatedRoutes />
        </div>
      </SmoothScroll>
    </MotionConfig>
  );
}

export default App;
