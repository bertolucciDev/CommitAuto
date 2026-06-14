const simpleGit =
  require("simple-git");

const git = simpleGit();

async function addOrigin(
  repositoryUrl
) {
  await git.addRemote(
    "origin",
    repositoryUrl
  );
}

module.exports = {
  addOrigin
};