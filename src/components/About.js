import React from "react";
import SectionHeader from "./SectionHeader";
import "../styles/About.css";
import FadeInSection from "./FadeInSection";

// The tools I reach for most; the full list lives in the Skills section.
const CORE_STACK = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "MongoDB",
  "Redis",
  "Docker",
  "AWS",
];

export default function About() {
  return (
    <div id="about">
      <FadeInSection>
        <SectionHeader index="01" title="About me" />
        <div className="about-content">
          <div className="about-description">
            <p>
              I worked as a <b>Full Stack Developer (Intern)</b> at{" "}
              <a href="https://techstarsolution-77061.web.app/">
                Techstar Solution Pvt Ltd
              </a>{" "}
              from <b>Jan 2025</b> to <b>Jun 2025</b>. I have recently completed
              my
              <b> Bachelor of Science</b> in <b>Computer Science</b> at
              <a href="https://www.indraraj.in/"> Indraraj College, Sillod</a>{" "}
              under
              <a href="https://bamu.ac.in/">
                {" "}
                Dr. Babasaheb Ambedkar Marathwada University (BAMU)
              </a>
              .
            </p>
            <p>
              Technologies I work with most: {CORE_STACK.join(", ")}. The
              full list is under <a href="#skills">Skills</a>.
            </p>
            <p>
              Outside of work, I'm interested in following developments in
              science. I also play a lot of video games and occasionally enjoy
              reading books.
            </p>
          </div>
          <div className="about-image">
            <img alt="Avishkar Kakde" src={"/assets/me.jpeg"} />
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}
