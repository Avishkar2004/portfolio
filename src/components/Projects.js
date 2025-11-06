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
      YesITryMe: {
        desc:
          "A full-stack MLM & e-commerce platform (Jan–Jun 2025) with 120-level commission distribution, real-time analytics dashboard, automated wallets, KYC workflows, and secure payment validation. Optimized MongoDB performance by 70% with indexing and delivered end-to-end SaaS solution.",
        techStack:
          "React.js, Node.js, Express.js, MongoDB, Tailwind CSS, Chart.js, JWT, Cloudinary, Twilio, Nodemailer, Vercel, MongoDB Atlas",
        domain: "https://www.yesitryme.com",
      },
      "Chatbot AI": {
        desc:
          "Production-ready multi-project AI chatbot with secure JWT auth, Redis caching & rate limits, and robust Groq LLM integration for fast, reliable chat.",
        techStack:
          "React 18, React Router, Context API, Tailwind CSS, Axios, Framer Motion, GSAP, Node.js, Express 5, MongoDB, MongoDB Atlas (Cloud), Mongoose, Redis (Cloud), JWT, express-validator, express-rate-limit, CORS, morgan, Groq SDK, Vercel",
        GithubRepository: "https://github.com/Avishkar2004/Chatbot-AI",
        domain: "https://chat-bot-ai-v6fl.vercel.app/",
      },
      // Hydrorich: {
      //   desc:
      //     "An intelligent agriculture support system with real-time messaging, AI-driven responses, secure auth, and fully containerized deployment.",
      //   techStack:
      //     "React, TypeScript, JavaScript, Zustand, Tailwind CSS, Chart.js, Node.js, Express.js, Socket.IO, Redis, Docker, Google Gen AI",
      //   GithubRepository: {},
      //   domain: "https://hydrorich-client.vercel.app/",
      // },
      Scrapie: {
        desc:
          "A modern SaaS platform using Next.js and AI to generate, organize, and manage creative workflows with authentication and state management.",
        techStack:
          "TypeScript, Next.js, Clerk, Generative AI, Prisma, React Query",
        GithubRepository: "https://github.com/Avishkar2004/scapeflow",
        domain: "https://scrapie-green.vercel.app",
      },
      Whiteboard: {
        desc:
          "A real-time collaborative whiteboard application built with React, Node.js, Express, MongoDB, Redis, and Socket.IO. This project allows users to register, log in, create and share whiteboards, and collaborate in real time.",
        techStack:
          "React, Vite, Zustand, TailwindCSS, Axios, Socket.IO-client, Node.js, Express, MongoDB (Mongoose), Redis, Socket.IO Vercel (client & server), MongoDB Atlas, Redis Cloud",
        GithubRepository:
          "https://github.com/Avishkar2004/Whiteboard-Collaborate-Create",
        domain: "https://whiteboard-collaborate-create.vercel.app/",
      },
      "Artistly.com": {
        desc:
          "Modern platform for booking performing artists. Built with Next.js, React, and Tailwind CSS. Demo uses mock data. Not real-time.",
        techStack:
          "Next.js 14, TypeScript, Tailwind CSS, ShadCN, Radix UI, React Hook Form, Yup, Lucide React, Vercel",
        GithubRepository: "https://github.com/Avishkar2004/Artistly",
        domain: "https://artistly-lime.vercel.app/",
      },
      Facilink: {
        desc:
          "Facilink is a basic full-stack website built with React, Node.js, Express, and MongoDB. It’s fully responsive, works smoothly on mobile and desktop. The site runs on facilink.in with a clean UI built using Tailwind CSS.",
        techStack:
          "JavaScript, Node.js, Express.js, MongoDB, MongoDB Atlas (Cloud), React, Tailwind CSS, Vercel",
        GithubRepository: "https://github.com/Avishkar2004/deploy_Facilink",
        domain: "https://facilink.in",
      },
      Greenyogagro: {
        desc:
          "A responsive website for a green yoga and agriculture brand, designed for seamless performance across devices using WordPress.",
        techStack: "WordPress, PHP, MySQL, HTML5, CSS3, JavaScript",
        GithubRepository: "",
        domain: "https://greenyogagro.com",
      },

      "E-Commerce Platform": {
        desc:
          "A full-stack e-commerce app with JWT auth, real-time cart, AI-powered product reviews, and robust backend features.",
        techStack:
          "React, Tailwind CSS, Socket.io, Node.js, Express.js, MySQL, Redis, Docker, Google OAuth, GitHub OAuth, Gemini AI",
        GithubRepository: "https://github.com/Avishkar2004/Agriculture_website",
        domain: "",
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
                      githubLink={projects[key]["GithubRepository"]}
                      openLink={projects[key]["domain"]}
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
