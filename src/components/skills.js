import React from "react";
import FadeInSection from "./FadeInSection";
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
  ],

  backend: [
    "Node.js",
    "Express.js",
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

const Skills = () => {
  return (
    <FadeInSection>
      <div id="skills">
        <div className="section-header">
          <span className="section-title">/ skills</span>
        </div>
        <div className="about-content">
          <div className="skills-grid">
            {Object.entries(skills).map(([category, skillList]) => {
              const label =
                category === "languages"
                  ? "Languages"
                  : category === "frontend"
                  ? "Frontend"
                  : category === "backend"
                  ? "Backend"
                  : category === "devOps"
                  ? "DevOps & Deployment"
                  : "Tools & Concepts";

              return (
                <div key={category} className="skill-category">
                  <div className="category-header">
                    <h3 className="category-title">{label}</h3>
                    <div className="category-icon">
                      {getCategoryIcon(category)}
                    </div>
                  </div>
                  <p className="skill-text">{skillList.join(", ")}</p>
                </div>
              );
            })}
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

export default Skills;
