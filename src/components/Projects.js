import React from "react";
import "../styles/Projects.css";
import FolderOpenRoundedIcon from "@material-ui/icons/FolderOpenRounded";
import FadeInSection from "./FadeInSection";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ExternalLinks from "./ExternalLinks";

class Projects extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
      activeKey: "1",
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey,
    });
  }
  render() {
    const projects = {
      Hydrorich: {
        desc:
          "An intelligent agriculture support system with real-time messaging, AI-driven responses, secure auth, and fully containerized deployment.",
        techStack:
          "React, TypeScript, JavaScript, Zustand, Tailwind CSS, Chart.js, Node.js, Express.js, Socket.IO, Redis, Docker, Google Gen AI",
        link: {
          frontend: "https://github.com/Avishkar2004/Hydrorich-client",
          backend: "https://github.com/Avishkar2004/Hydrorich-server",
        },
        open: "https://hydrorich-client.vercel.app/",
      },
      Scrapie: {
        desc:
          "A modern SaaS platform using Next.js and AI to generate, organize, and manage creative workflows with authentication and state management.",
        techStack:
          "TypeScript, Next.js, Clerk, Generative AI, Prisma, React Query",
        link: "https://github.com/Avishkar2004/scapeflow",
        open: "https://scrapie-green.vercel.app",
      },
      Facilink: {
        desc:
          "A full-stack real-time communication platform for task management, team collaboration, and instant messaging with notifications.",
        techStack:
          "JavaScript, Node.js, Express.js, MongoDB, React, Tailwind CSS",
        link: "https://github.com/Avishkar2004/deploy_Facilink",
        open: "https://facilink.in",
      },
      Greenyogagro: {
        desc:
          "A responsive website for a green yoga and agriculture brand, designed for seamless performance across devices using WordPress.",
        techStack: "WordPress, PHP, MySQL, HTML5, CSS3, JavaScript",
        link: "https://greenyogagro.com",
        open: "https://greenyogagro.com",
      },

      "E-Commerce Platform": {
        desc:
          "A full-stack e-commerce app with JWT auth, real-time cart, AI-powered product reviews, and robust backend features.",
        techStack:
          "React, Tailwind CSS, Socket.io, Node.js, Express.js, MySQL, Redis, Docker, Google OAuth, GitHub OAuth, Gemini AI",
        link: "https://github.com/Avishkar2004/Agriculture_website",
        open: "",
      },
    };

    return (
      <div id="projects">
        <div className="section-header ">
          <span className="section-title">/ pet projects</span>
        </div>

        <div className="project-container">
          <ul className="projects-grid">
            {Object.keys(projects).map((key, i) => (
              <FadeInSection delay={`${i + 1}00ms`}>
                <li className="projects-card">
                  <div className="card-header">
                    <div className="folder-icon">
                      <FolderOpenRoundedIcon
                        style={{ fontSize: 35 }}
                      ></FolderOpenRoundedIcon>
                    </div>
                    <ExternalLinks
                      githubLink={projects[key]["link"]}
                      openLink={projects[key]["open"]}
                    ></ExternalLinks>
                  </div>

                  <div className="card-title">{key}</div>
                  <div className="card-desc">{projects[key]["desc"]}</div>
                  <div className="card-tech">{projects[key]["techStack"]}</div>
                </li>
              </FadeInSection>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Projects;
