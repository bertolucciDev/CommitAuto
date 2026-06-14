const fs = require("node:fs/promises");

const path = require("node:path");

const simpleGit =
  require("simple-git");

const git = simpleGit();

async function createReadme(
  projectName
) {
  const readmePath =
    path.join(
      process.cwd(),
      "README.md"
    );

  const content =
    `# ${projectName}\n`;

  await fs.writeFile(
    readmePath,
    content
  );
}

async function initializeRepository(
  projectName,
  repositoryUrl
) {
  const isRepo =
    await git.checkIsRepo();

  if (!isRepo) {
    await git.init();
  }

  await createReadme(
    projectName
  );

  await git.add("README.md");

  await git.commit(
    "first commit"
  );

  await git.branch([
    "-M",
    "main"
  ]);

  const remotes =
    await git.getRemotes(true);

  const hasOrigin =
    remotes.some(
      (remote) =>
        remote.name === "origin"
    );

  if (!hasOrigin) {
    await git.addRemote(
      "origin",
      repositoryUrl
    );
  }

  await git.push([
    "-u",
    "origin",
    "main"
  ]);
}

module.exports = {
  initializeRepository
};