const simpleGit =
  require("simple-git");

const git = simpleGit();

async function syncBranch(
  branchName
) {
  try {
    await git.pull(
      "origin",
      branchName,
      {
        "--rebase": "true"
      }
    );
  } catch (error) {
    throw new Error(
      "Failed to sync branch before push."
    );
  }

  try {
    await git.push(
      "origin",
      branchName
    );
  } catch (error) {
    throw new Error(
      "Failed to push branch."
    );
  }
}

module.exports = {
  syncBranch
};