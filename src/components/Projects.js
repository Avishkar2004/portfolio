import React from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import "../styles/Projects.css";
import ExternalLinks from "./ExternalLinks";
import {
  EASE,
  fadeUp,
  staggerContainer,
  viewportOnce,
  viewportOnceTall,
  SPRING,
} from "../animations/variants";
import projects from "../data/projects.json";
import projectCommits from "../data/project-commits.json";

// The first projects in projects.json get large feature cards; the rest
// form a numbered index that expands on click.
const FEATURED_COUNT = 2;
// How many technologies a collapsed index row shows before "+N".
const PREVIEW_TECH = 3;

const monthYear = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  year: "numeric",
});

const pad = (n) => String(n).padStart(2, "0");
const techList = (project) => project.techStack.split(/,\s*/).filter(Boolean);

function getCommitsLink(projectName) {
  const commits = projectCommits[projectName];
  if (!commits || commits.length === 0) return "";
  return `/project/${encodeURIComponent(projectName)}/commits`;
}

function lastUpdated(projectName) {
  const commits = projectCommits[projectName];
  if (!commits || commits.length === 0) return null;
  const latest = commits.map((c) => c.date).sort().pop();
  return monthYear.format(new Date(latest));
}

function TechChips({ items }) {
  return (
    <ul className="tech-chips">
      {items.map((tech) => (
        <li key={tech}>{tech}</li>
      ))}
    </ul>
  );
}

function Links({ name, project }) {
  return (
    <ExternalLinks
      githubLink={project["GithubRepository"]}
      openLink={project["domain"]}
      commitsLink={getCommitsLink(name)}
    />
  );
}

// Large card: reveals on scroll, tilts toward the cursor in 3D and carries a
// cursor-tracking spotlight. Transform-only motion → GPU friendly.
function FeatureCard({ name, project, index }) {
  const reduce = useReducedMotion();
  const ref = React.useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [0, 1], [4, -4]), SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-4, 4]), SPRING);
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mx}px ${my}px, var(--accent-soft), transparent 65%)`;
  const updated = lastUpdated(name);

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
      className="feature-card"
      variants={fadeUp}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={
        reduce
          ? undefined
          : { rotateX, rotateY, transformPerspective: 1200, transformStyle: "preserve-3d" }
      }
    >
      {!reduce && (
        <motion.div
          className="card-spotlight"
          aria-hidden="true"
          style={{ background: spotlight }}
        />
      )}
      <div className="feature-card__top">
        <span className="project-index">{pad(index + 1)} — Featured</span>
        <Links name={name} project={project} />
      </div>
      <h3 className="feature-card__title">{name}</h3>
      <p className="feature-card__desc">{project["desc"]}</p>
      <TechChips items={techList(project)} />
      {updated && <span className="project-updated">Updated {updated}</span>}
    </motion.li>
  );
}

function IndexRow({ name, project, index, open, onToggle }) {
  const tech = techList(project);
  const updated = lastUpdated(name);
  const panelId = `project-panel-${index}`;
  const more = tech.length - PREVIEW_TECH;

  return (
    <motion.li className={`index-row${open ? " is-open" : ""}`} variants={fadeUp}>
      <button
        type="button"
        className="index-row__head"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="project-index">{pad(index + 1)}</span>
        <span className="index-row__name">{name}</span>
        <span className="index-row__tech">
          {tech.slice(0, PREVIEW_TECH).join(" · ")}
          {more > 0 ? ` +${more}` : ""}
        </span>
        <span className="index-row__toggle" aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            className="index-row__panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="index-row__body">
              <p>{project["desc"]}</p>
              <TechChips items={tech} />
              <div className="index-row__meta">
                {updated && (
                  <span className="project-updated">Updated {updated}</span>
                )}
                <Links name={name} project={project} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export default function Projects() {
  const entries = Object.entries(projects);
  const featured = entries.slice(0, FEATURED_COUNT);
  const rest = entries.slice(FEATURED_COUNT);
  const [openName, setOpenName] = React.useState(null);

  return (
    <div id="projects">
      <div className="section-header">
        <span className="section-index">02</span>
        <h2 className="section-title">Selected work</h2>
      </div>

      <motion.ul
        className="feature-grid"
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {featured.map(([name, project], i) => (
          <FeatureCard key={name} name={name} project={project} index={i} />
        ))}
      </motion.ul>

      <motion.ul
        className="project-index-list"
        variants={staggerContainer(0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnceTall}
      >
        {rest.map(([name, project], i) => (
          <IndexRow
            key={name}
            name={name}
            project={project}
            index={i + FEATURED_COUNT}
            open={openName === name}
            onToggle={() =>
              setOpenName((current) => (current === name ? null : name))
            }
          />
        ))}
      </motion.ul>
    </div>
  );
}
