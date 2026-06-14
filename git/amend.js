const simpleGit =
  require("simple-git");

const git = simpleGit();

async function amendCommit(
  message
) {
  await git.commit(
    message,
    undefined,
    {
      "--amend": true
    }
  );
}

module.exports = {
  amendCommit
};