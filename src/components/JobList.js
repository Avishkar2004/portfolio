import React from "react";
import { m, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { fadeUp, viewportOnce } from "../animations/variants";

const experienceItems = {
  "YesITryMe Marketing LLP": {
    jobTitle: "Full Stack Developer @",
    duration: "AUG 2025 - PRESENT · Remote",
    desc: [
      "Owned end-to-end development of a production platform, translating business requirements into scalable technical solutions and release-ready features.",
      "Designed core data flows for user onboarding, referral tracking, commissions, and rewards with a strong focus on data integrity and fraud prevention.",
      "Built internal admin tools and monitoring dashboards to track system health, user activity, and revenue flow, enabling faster operational decisions.",
      "Handled production deployments, environment configuration, and post-release issue resolution while iterating rapidly based on real user feedback.",
    ],
  },
  "Techstar Solution Pvt Ltd": {
    jobTitle: "Full Stack Developer Intern @",
    duration: "JAN 2025 - JUN 2025",
    desc: [
      "Contributed to the design and development of scalable web applications using React, Tailwind CSS, Socket.io, Node.js, Express.js, MySQL, Redis, Docker, AWS, Google OAuth, GitHub OAuth, Gemini AI, and Vercel.",
      "Collaborated with the backend team to build RESTful APIs following MVC architecture and integrated third-party services like Cloudinary and AWS.",
      "Optimized frontend components for performance and responsiveness across different devices using Tailwind CSS and Framer Motion.",
      "Participated actively in daily stand-ups, sprint planning, and code reviews to ensure high-quality deliverables and continuous improvement. ",
    ],
  },
};

// Vertical timeline. The accent line down the left draws itself as the
// section scrolls through the viewport.
const JobList = () => {
  const reduce = useReducedMotion();
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="timeline" ref={ref}>
      <div className="timeline__rail" aria-hidden="true">
        <m.div
          className="timeline__progress"
          style={{ scaleY: reduce ? 1 : progress }}
        />
      </div>
      <ol className="timeline__list">
        {Object.entries(experienceItems).map(([company, job]) => (
          <m.li
            className="timeline__item"
            key={company}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <span className="timeline__dot" aria-hidden="true" />
            <p className="joblist-duration">{job.duration}</p>
            <h3 className="timeline__role">
              <span className="joblist-job-title">{job.jobTitle} </span>
              <span className="joblist-job-company">{company}</span>
            </h3>
            <ul className="job-description">
              {job.desc.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </m.li>
        ))}
      </ol>
    </div>
  );
};

export default JobList;
