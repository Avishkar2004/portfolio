import React from "react";
import "../styles/About.css";
import FadeInSection from "./FadeInSection";

class About extends React.Component {
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
    const one = (
      <p>
        I worked as a <b>Full Stack Developer (Intern)</b> at{" "}
        <a href="https://techstarsolution-77061.web.app/">
          Techstar Solution Pvt Ltd
        </a>{" "}
        from <b>Jan 2025</b> to <b>Jun 2025</b>. I have recently completed my
        <b> Bachelor of Science</b> in <b>Computer Science</b> at
        <a href="https://www.indraraj.in/"> Indraraj College, Sillod</a> under
        <a href="https://bamu.ac.in/">
          {" "}
          Dr. Babasaheb Ambedkar Marathwada University (BAMU)
        </a>
        .
      </p>
    );
    const two = (
      <p>
        Outside of work, I'm interested in following developments in science. I
        also play a lot of video games and occasionally enjoy reading books.
      </p>
    );

    const tech_stack = [
      // Core Languages & Fundamentals
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "DSA",
      "System Design",

      // Frontend
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Chart.js",

      // Backend
      "Node.js",
      "Express.js",
      "REST APIs",
      "Socket.io",
      "JWT Auth",

      // Databases
      "MongoDB",
      "MySQL",
      "Prisma ORM",
      "Redis",
      "MongoDB Atlas",

      // DevOps & Deployment
      "Git & GitHub",
      "Docker",
      "Vercel",

      // Cloud & Tools
      "Cloudinary",
      "Nodemailer",

      // AI & Emerging Tech
      "Gemini AI",
    ];

    return (
      <div id="about">
        <FadeInSection>
          <div className="section-header ">
            <span className="section-title">/ about me</span>
          </div>
          <div className="about-content">
            <div className="about-description">
              {[one]}
              {"Here are some technologies I have been working with:"}
              <ul className="tech-stack">
                {tech_stack.map(function (tech_item, i) {
                  return (
                    <FadeInSection delay={`${i + 1}00ms`}>
                      <li>{tech_item}</li>
                    </FadeInSection>
                  );
                })}
              </ul>
              {[two]}
            </div>
            <div className="about-image">
              <img alt="Avishkar Kakde" src={"/assets/me.jpeg"} />
            </div>
          </div>
        </FadeInSection>
      </div>
    );
  }
}

export default About;
