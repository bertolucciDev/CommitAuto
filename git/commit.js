const simpleGit =
  require("simple-git");

const git = simpleGit();

async function createCommit(
  message
) {
  return git.commit(message);
}

module.exports = {
  createCommit
};