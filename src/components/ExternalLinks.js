import React from "react";
import { Link } from "react-router-dom";
import { GitHubIcon, OpenInBrowserIcon, HistoryIcon } from "./Icons";

class ExternalLinks extends React.Component {
  render() {
    const isValidUrl = (url) => typeof url === "string" && url.trim().length > 0;
    const hasGithub = isValidUrl(this.props.githubLink);
    const hasOpen = isValidUrl(this.props.openLink);
    const hasCommits = isValidUrl(this.props.commitsLink);

    return (
      <span className="external-links">
        {hasGithub && (
          <a
            className="github-icon"
            href={this.props.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View repository on GitHub"
          >
            <GitHubIcon
              style={{
                fontSize: 20,
              }}
            />
          </a>
        )}
        {hasCommits && (
          <Link
            className="commits-icon"
            to={this.props.commitsLink}
            aria-label="View commit history"
          >
            <HistoryIcon
              style={{
                fontSize: 22,
              }}
            />
          </Link>
        )}
        {hasOpen && (
          <a
            className="open-icon"
            href={this.props.openLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open live site"
          >
            <OpenInBrowserIcon
              style={{
                fontSize: 25,
              }}
            />
          </a>
        )}
      </span>
    );
  }
}

export default ExternalLinks;
