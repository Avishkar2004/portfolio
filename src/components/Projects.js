import React from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useScroll,
  useVelocity,
  useReducedMotion,
} from "framer-motion";
import "../styles/Projects.css";
import FolderOpenRoundedIcon from "@material-ui/icons/FolderOpenRounded";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ExternalLinks from "./ExternalLinks";
import { fadeUp, staggerContainer, viewportOnce, SPRING } from "../animations/variants";
import projects from "../data/projects.json";
import projectCommits from "../data/project-commits.json";

function getCommitsLink(projectName) {
  const commits = projectCommits[projectName];
  if (!commits || commits.length === 0) return "";
  return `/project/${encodeURIComponent(projectName)}/commits`;
}

// Single card: reveals on scroll (variants), lifts on hover, tilts toward the
// cursor in 3D, and presses in on tap. All transform-only → GPU friendly.
function ProjectCard({ name, project }) {
  const reduce = useReducedMotion();
  const ref = React.useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  // Raw pixel position for the cursor-tracking spotlight.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), SPRING);
  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${mx}px ${my}px, rgba(100, 255, 218, 0.16), transparent 65%)`;

  const handleMove = (e) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };
  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.li
      ref={ref}
      className="projects-card"
      variants={fadeUp}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={reduce ? undefined : { scale: 1.03, y: -8 }}
      whileTap={{ scale: 0.98 }}
      transition={SPRING}
      style={
        reduce
          ? undefined
          : { rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }
      }
    >
      {!reduce && (
        <motion.div
          className="card-spotlight"
          aria-hidden="true"
          style={{ background: spotlight }}
        />
      )}
      <div className="card-header">
        <div className="folder-icon">
          <FolderOpenRoundedIcon style={{ fontSize: 35 }} />
        </div>
        <ExternalLinks
          githubLink={project["GithubRepository"]}
          openLink={project["domain"]}
          commitsLink={getCommitsLink(name)}
        />
      </div>

      <div className="card-title">{name}</div>
      <div className="card-desc">{project["desc"]}</div>
      <div className="card-tech">{project["techStack"]}</div>
    </motion.li>
  );
}

export default function Projects() {
  const reduce = useReducedMotion();
  // Grid leans into your scroll speed — fast flick = bigger skew, settles via spring.
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 350 });
  const skewY = useTransform(smoothVelocity, [-2500, 2500], [-5, 5], { clamp: true });

  return (
    <div id="projects">
      <div className="section-header ">
        <span className="section-title">/ pet projects</span>
      </div>

      <div className="project-container">
        <motion.ul
          className="projects-grid"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          style={reduce ? undefined : { skewY }}
        >
          {Object.keys(projects).map((key) => (
            <ProjectCard key={key} name={key} project={projects[key]} />
          ))}
        </motion.ul>
      </div>
    </div>
  );
}
