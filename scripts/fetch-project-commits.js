const fs = require("fs");
const path = require("path");

const COMMITS_PER_REPO = 5;
const ROOT = path.join(__dirname, "..");
const PROJECTS_PATH = path.join(ROOT, "src", "data", "projects.json");
const OUTPUT_PATH = path.join(ROOT, "src", "data", "project-commits.json");

function parseGithubRepo(url) {
  if (!url || typeof url !== "string") return null;
  try {
    const { hostname, pathname } = new URL(url.trim());
    if (hostname !== "github.com") return null;
    const [owner, repo] = pathname.replace(/^\/+|\/+$/g, "").split("/");
    if (!owner || !repo) return null;
    return { owner, repo };
  } catch {
    return null;
  }
}

function getHeaders() {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "avi-portfolio-build",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

function mapCommit(item) {
  return {
    sha: item.sha.slice(0, 7),
    message: (item.commit.message || "").split("\n")[0].trim(),
    date: item.commit.author?.date || item.commit.committer?.date,
    url: item.html_url,
  };
}

async function fetchCommits(owner, repo) {
  const headers = getHeaders();
  const params = new URLSearchParams({
    per_page: String(COMMITS_PER_REPO),
  });
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/commits?${params}`;
  const response = await fetch(apiUrl, { headers });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `GitHub API ${response.status} for ${owner}/${repo}: ${body.slice(0, 200)}`
    );
  }

  const data = await response.json();
  return Array.isArray(data) ? data.map(mapCommit) : [];
}

async function main() {
  const projects = JSON.parse(fs.readFileSync(PROJECTS_PATH, "utf8"));
  const output = {};
  const errors = [];

  for (const [projectName, project] of Object.entries(projects)) {
    const repo = parseGithubRepo(project.GithubRepository);

    if (!repo) {
      output[projectName] = [];
      continue;
    }

    try {
      output[projectName] = await fetchCommits(repo.owner, repo.repo);
      console.log(
        `✓ ${projectName}: ${output[projectName].length} commit(s) from ${repo.owner}/${repo.repo}`
      );
    } catch (error) {
      errors.push(`${projectName}: ${error.message}`);
      output[projectName] = [];
      console.warn(`✗ ${projectName}: ${error.message}`);
    }
  }

  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`Wrote ${OUTPUT_PATH}`);

  if (errors.length) {
    console.warn(
      "\nSome repos failed to fetch. Build will continue with empty commit lists for those projects."
    );
    console.warn("Set GITHUB_TOKEN for higher rate limits if you hit 403/429.\n");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
