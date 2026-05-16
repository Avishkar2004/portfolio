import React from "react";
import { Route, Switch } from "react-router-dom";
import Intro from "./components/Intro";
import Experience from "./components/Experience";
import About from "./components/About";
import Projects from "./components/Projects";
import Credits from "./components/Credits";
import NavBar from "./components/NavBar";
import Skills from "./components/skills";
import ProjectCommitsPage from "./components/ProjectCommitsPage";
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

function App() {
  return (
    <div className="App">
      <Analytics />
      <SpeedInsights />

      <Switch>
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
    </div>
  );
}

export default App;
