const simpleGit =
  require("simple-git");

const git = simpleGit();

async function getGitDiff() {
  return git.diff([
    "--staged"
  ]);
}

module.exports = {
  getGitDiff
};