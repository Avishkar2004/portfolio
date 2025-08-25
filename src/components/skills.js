import React from "react";
import FadeInSection from "./FadeInSection";
import "../styles/Skills.css";

export const skills = {
  languages: ["JavaScript", "TypeScript", "Python", "SQL"],
  frontend: [
    "HTML",
    "CSS",
    "React.js",
    "Next.js",
    "Tailwind CSS",
    "Bootstrap",
    "Radix UI",
    "React Native",
    "WordPress",
    "Chart.js",
  ],
  backend: [
    "Node.js",
    "Express.js",
    "MySQL",
    "MongoDB",
    "MongoDB Atlas",
    "Redis",
    "REST APIs",
    "Socket.io",
    "JWT",
    "Nodemailer",
    "Twilio",
  ],
  devOps: ["Docker", "Git", "GitHub", "CI/CD", "Vercel", "OAuth (Google, GitHub)"],
  other: [
    "Zustand",
    "Postman",
    "Clerk",
    "Prisma",
    "Cloudinary",
    "System Design",
    "LLD",
    "HLD",
    "Gemini AI",
    "Data Structures & Algorithms",
  ],
};

const Skills = () => {
  return (
    <FadeInSection>
      <div id="skills">
        <div className="section-header">
          <span className="section-title">/ skills</span>
        </div>
        <div className="about-content">
          <div className="skills-grid">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="skill-category">
                <div className="category-header">
                  <h3 className="category-title">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h3>
                  <div className="category-icon">
                    {getCategoryIcon(category)}
                  </div>
                </div>
                <div className="skill-list">
                  {skillList.map((skill) => (
                    <div key={skill} className="skill-item">
                      <span className="skill-icon">{getSkillIcon(skill)}</span>
                      <span className="skill-name">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeInSection>
  );
};

const getCategoryIcon = (category) => {
  const icons = {
    languages: "💻",
    frontend: "🎨",
    backend: "⚙️",
    devOps: "🚀",
    other: "🧰",
  };
  return icons[category] || "✨";
};

const getSkillIcon = (skill) => {
  const icons = {
    JavaScript: "📜",
    TypeScript: "📘",
    Python: "🐍",
    HTML: "🌐",
    CSS: "🎨",
    SQL: "🗄️",
    "React.js": "⚛️",
    "Next.js": "▲",
    "Tailwind CSS": "🎯",
    Bootstrap: "🎨",
    "Radix UI": "🎭",
    "React Native": "📱",
    WordPress: "📝",
    "Chart.js": "📈",
    "Node.js": "🟢",
    "Express.js": "🚂",
    MySQL: "🐬",
    MongoDB: "🍃",
    "MongoDB Atlas": "🗺️",
    Redis: "🔴",
    "REST APIs": "🔌",
    "Socket.io": "🔌",
    JWT: "🔐",
    Nodemailer: "✉️",
    Twilio: "📞",
    Docker: "🐳",
    Git: "📦",
    GitHub: "🐙",
    "CI/CD": "🏁",
    Vercel: "▲",
    "System Design": "🏗️",
    LLD: "🧩",
    HLD: "🗺️",
    Zustand: "🧠",
    Postman: "📮",
    Clerk: "🪪",
    Prisma: "🔷",
    Cloudinary: "☁️",
    "Data Structures & Algorithms": "📊",
    "Gemini AI": "🤖",
  };
  return icons[skill] || "✨";
};

export default Skills;
