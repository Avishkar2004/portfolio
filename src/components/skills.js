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

const META = {
  languages: { label: "Languages", icon: "💻" },
  frontend: { label: "Frontend", icon: "🎨" },
  backend: { label: "Backend", icon: "⚙️" },
  devOps: { label: "DevOps & Deployment", icon: "🚀" },
  other: { label: "Tools & Concepts", icon: "🧰" },
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
            const meta = META[category] || { label: category, icon: "✨" };
            return (
              <motion.div key={category} className="skill-category" variants={fadeUp}>
                <div className="category-header">
                  <h3 className="category-title">{meta.label}</h3>
                  <div className="category-icon">{meta.icon}</div>
                </div>
                <p className="skill-text">{skillList.join(", ")}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
