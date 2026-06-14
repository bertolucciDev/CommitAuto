const simpleGit =
  require("simple-git");

const git = simpleGit();

async function hasOrigin() {
  const remotes =
    await git.getRemotes(true);

  return remotes.some(
    (remote) =>
      remote.name === "origin"
  );
}

module.exports = {
  hasOrigin
};