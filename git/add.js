const simpleGit =
  require("simple-git");

const git = simpleGit();

async function stageAll() {
  await git.add(".");
}

module.exports = {
  stageAll
};