import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "../animations/variants";
import "../styles/Skills.css";

export const skills = {
  languages: ["JavaScript", "TypeScript", "Python", "SQL"],

  frontend: [
    "HTML5",
    "CSS3",
    "React.js",
    "Next.js",
    "React Native",
    "Tailwind CSS",
    "Bootstrap",
    "Radix UI",
    "Framer Motion",
    "WordPress",
    "Chart.js",
    "React Redux",
    "Jest",
  ],

  backend: [
    "Node.js",
    "Express.js",
    "GraphQL",
    "MySQL",
    "MongoDB",
    "MongoDB Atlas",
    "Redis",
    "Prisma ORM",
    "REST APIs",
    "Socket.io",
    "JWT Auth",
    "Kafka",
    "Nodemailer",
    "Twilio",
  ],

  devOps: [
    "Docker",
    "Git",
    "GitHub",
    "CI/CD",
    "AWS (EC2, S3, Lambda, IAM)",
    "Vercel",
    "OAuth (Google, GitHub)",
  ],

  other: [
    "Zustand",
    "Postman",
    "Clerk",
    "Cloudinary",
    "System Design",
    "LLD",
    "HLD",
    "Gemini AI",
    "Data Structures & Algorithms",
  ],
};

const LABELS = {
  languages: "Languages",
  frontend: "Frontend",
  backend: "Backend",
  devOps: "DevOps & Deployment",
  other: "Tools & Concepts",
};

// The headline tools that scroll past in the marquee.
const MARQUEE = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "Redis",
  "Socket.io",
  "Docker",
  "AWS",
  "Tailwind CSS",
  "Framer Motion",
];

const pad = (n) => String(n).padStart(2, "0");

const Skills = () => {
  return (
    <div id="skills">
      <div className="section-header">
        <span className="section-index">03</span>
        <h2 className="section-title">Skills</h2>
      </div>

      {/* Decorative — the full, accessible list is below. Two copies so the
          loop is seamless at translateX(-50%). */}
      <div className="skills-marquee" aria-hidden="true">
        <div className="skills-marquee__track">
          {[0, 1].map((copy) => (
            <span className="skills-marquee__group" key={copy}>
              {MARQUEE.map((name) => (
                <span key={name}>
                  {name}
                  <span className="skills-marquee__sep">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <motion.div
        className="skills-groups"
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {Object.entries(skills).map(([category, list], i) => (
          <motion.div className="skill-group" key={category} variants={fadeUp}>
            <h3 className="skill-group__title">
              <span className="project-index">{pad(i + 1)}</span>
              {LABELS[category] || category}
            </h3>
            <ul className="tech-chips">
              {list.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Skills;
