import React from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import ProjectCommits from "./ProjectCommits";
import projects from "../data/projects.json";
import projectCommits from "../data/project-commits.json";
import "../styles/ProjectCommitsPage.css";

const ProjectCommitsPage = () => {
  const { projectId } = useParams();
  const projectName = decodeURIComponent(projectId);
  const project = projects[projectName];
  const commits = projectCommits[projectName] || [];

  if (!project) {
    return (
      <div className="App">
        <NavBar />
        <main className="commits-page">
          <Link className="commits-back" to="/#projects">
            ← back to projects
          </Link>
          <p className="commits-empty">Project not found.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      <NavBar />
      <main className="commits-page">
        <Link className="commits-back" to="/#projects">
          ← back to projects
        </Link>
        <div className="commits-page-header">
          <span className="section-title">/ {projectName}</span>
          <h1 className="commits-page-title">commit history</h1>
          {project.GithubRepository && (
            <a
              className="commits-repo-link"
              href={project.GithubRepository}
              target="_blank"
              rel="noopener noreferrer"
            >
              view repository on GitHub →
            </a>
          )}
        </div>
        {commits.length > 0 ? (
          <ProjectCommits commits={commits} />
        ) : (
          <p className="commits-empty">No commits available for this project.</p>
        )}
      </main>
    </div>
  );
};

export default ProjectCommitsPage;
