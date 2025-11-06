import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";

class ExternalLinks extends React.Component {
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
    const isValidUrl = (url) => typeof url === "string" && url.trim().length > 0;
    const hasGithub = isValidUrl(this.props.githubLink);
    const hasOpen = isValidUrl(this.props.openLink);
    return (
      <span className="external-links">
        {hasGithub && (
          <a
            className="github-icon"
            href={this.props.githubLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon
              style={{
                fontSize: 20,
                color: "var(--lightest-slate)",
              }}
            ></GitHubIcon>
          </a>
        )}
        {hasOpen && (
          <a
            className="open-icon"
            href={this.props.openLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <OpenInBrowserIcon
              style={{
                fontSize: 25,
                color: "var(--lightest-slate)",
              }}
            ></OpenInBrowserIcon>
          </a>
        )}
      </span>
    );
  }
}

export default ExternalLinks;
