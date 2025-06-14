import React from "react";
import FadeInSection from "./FadeInSection";
import "../styles/Skills.css";

export const skills = {
  languages: ["JavaScript", "TypeScript", "Python", "HTML", "CSS", "SQL"],
  frontend: [
    "React.js",
    "Next.js",
    "Tailwind CSS",
    "Bootstrap",
    "Radix UI",
    "React Native",
    "WordPress",
    "Zustand",
  ],
  backend: [
    "Node.js",
    "Express.js",
    "MySQL",
    "MongoDB",
    "Redis",
    "REST APIs",
    "Socket.io",
    "Prisma",
    "Clerk",
  ],
  devOps: ["Docker", "Git", "GitHub", "OAuth (Google, GitHub)"],
  architecture: ["System Design", "Low-Level Design", "High-Level Design"],
  csFundamentals: ["Data Structures & Algorithms"],
  aiTools: ["Gemini AI"],
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
    architecture: "🏗️",
    csFundamentals: "📚",
    aiTools: "🤖",
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
    "Node.js": "🟢",
    "Express.js": "🚂",
    MySQL: "🐬",
    MongoDB: "🍃",
    Redis: "🔴",
    "REST APIs": "🔌",
    "Socket.io": "🔌",
    Docker: "🐳",
    Git: "📦",
    GitHub: "🐙",
    "System Design": "🏗️",
    "Data Structures & Algorithms": "📊",
    "Gemini AI": "🤖",
  };
  return icons[skill] || "✨";
};

export default Skills;
