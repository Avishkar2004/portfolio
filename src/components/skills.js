import React from "react";
import { motion } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  viewportOnce,
  EASE,
} from "../animations/variants";
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

const META = {
  languages: { label: "Languages", icon: "💻", level: 0.9 },
  frontend: { label: "Frontend", icon: "🎨", level: 0.95 },
  backend: { label: "Backend", icon: "⚙️", level: 0.9 },
  devOps: { label: "DevOps & Deployment", icon: "🚀", level: 0.8 },
  other: { label: "Tools & Concepts", icon: "🧰", level: 0.85 },
};

const Skills = () => {
  return (
    <div id="skills">
      <div className="section-header">
        <span className="section-title">/ skills</span>
      </div>
      <div className="about-content">
        <motion.div
          className="skills-grid"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {Object.entries(skills).map(([category, skillList]) => {
            const meta = META[category] || { label: category, icon: "✨", level: 0.8 };
            return (
              <motion.div key={category} className="skill-category" variants={fadeUp}>
                <div className="category-header">
                  <h3 className="category-title">{meta.label}</h3>
                  <div className="category-icon">{meta.icon}</div>
                </div>
                <p className="skill-text">{skillList.join(", ")}</p>
                <div className="skill-bar" aria-hidden="true">
                  <motion.span
                    className="skill-bar__fill"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: meta.level }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
