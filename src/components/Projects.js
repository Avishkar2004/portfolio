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
      "E-Commerce Platform": {
        desc:
          "A production-ready full-stack e-commerce application featuring user authentication (JWT), dynamic product browsing, cart management, search functionality, and AI-powered reviews integrated with Gemini AI.",
        techStack:
          "React, Tailwind CSS, Socket.io, Node.js, Express.js, MySQL, Redis, Docker, Google OAuth, GitHub OAuth, Gemini AI",
        link: "https://github.com/Avishkar2004/Agriculture_website",
        open: "",
      },
      Facilink: {
        desc:
          "A full-stack real-time communication platform designed for task management, team collaboration, and instant messaging with notification support.",
        techStack:
          "JavaScript, Node.js, Express.js, MongoDB, React, Tailwind CSS",
        link: "https://github.com/Avishkar2004/deploy_Facilink",
        open: "https://facilink.in/",
      },
      Scrapie: {
        desc:
          "A modern SaaS platform built with Next.js and AI integration, enabling users to generate, organize, and manage creative workflows powered by generative AI.",
        techStack:
          "TypeScript, Next.js, Clerk, Generative AI, Prisma, React Query",
        link: "https://github.com/Avishkar2004/scapeflow",
        open: "",
      },
      Greenyogagro: {
        desc:
          "A comprehensive website for a green yoga and agriculture company built with WordPress. responsive design for seamless experience across all devices.",
        techStack:
          "WordPress, WooCommerce, PHP, MySQL, HTML5, CSS3, JavaScript",
        link: "https://greenyogagro.com/",
        open: "https://greenyogagro.com/",
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
