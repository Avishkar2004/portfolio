import React from "react";
import "../styles/About.css";
import FadeInSection from "./FadeInSection";
import { Stagger, StaggerItem } from "./Stagger";

const tech_stack = [
  // Core Languages & Fundamentals
  "JavaScript (ES6+)",
  "TypeScript",
  "Python",
  "SQL",
  "HTML5",
  "CSS3",
  "DSA",
  "System Design (LLD & HLD)",

  // Frontend
  "React.js",
  "Next.js",
  "React Native",
  "Tailwind CSS",
  "Bootstrap",
  "Radix UI",
  "Framer Motion",
  "Chart.js",
  "WordPress",

  // State Management
  "React Redux",
  "Zustand",

  // Backend
  "Node.js",
  "Express.js",
  "REST APIs",
  "Socket.io",
  "JWT Auth",
  "Kafka",

  // Databases
  "MongoDB",
  "MongoDB Atlas",
  "MySQL",
  "Prisma ORM",
  "Redis",

  // DevOps & Deployment
  "Git & GitHub",
  "Docker",
  "CI/CD",
  "AWS",
  "Vercel",

  // Cloud & Tools
  "Cloudinary",
  "Nodemailer",
  "Twilio",
  "Postman",
  "Clerk",
  "OAuth (Google, GitHub)",

  // AI & Emerging Tech
  "Gemini AI",
];

export default function About() {
  return (
    <div id="about">
      <FadeInSection>
        <div className="section-header ">
          <span className="section-title">/ about me</span>
        </div>
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
            {"Here are some technologies I have been working with:"}
            <Stagger as="ul" className="tech-stack" stagger={0.035}>
              {tech_stack.map((tech_item) => (
                <StaggerItem as="li" small key={tech_item}>
                  {tech_item}
                </StaggerItem>
              ))}
            </Stagger>
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
