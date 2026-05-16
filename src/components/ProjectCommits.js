import React from "react";

function formatCommitDate(isoDate) {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const ProjectCommits = ({ commits }) => {
  if (!commits || commits.length === 0) return null;

  return (
    <ul className="commits-list commits-list-page">
      {commits.map((commit) => (
        <li key={commit.url || commit.sha} className="commit-item">
          <a
            className="commit-link"
            href={commit.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="commit-sha">{commit.sha}</span>
            <span className="commit-message">{commit.message}</span>
          </a>
          <time className="commit-date" dateTime={commit.date}>
            {formatCommitDate(commit.date)}
          </time>
        </li>
      ))}
    </ul>
  );
};

export default ProjectCommits;
