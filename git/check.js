const simpleGit =
  require("simple-git");

const git = simpleGit();

async function isGitRepo() {
  return git.checkIsRepo();
}

module.exports = {
  isGitRepo
};