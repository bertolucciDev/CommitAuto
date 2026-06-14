const simpleGit =
  require("simple-git");

const git = simpleGit();

async function getCurrentBranch() {
  const branch =
    await git.branch();

  return branch.current;
}

async function checkoutBranch(
  branchName
) {
  const branches =
    await git.branch();

  const exists =
    branches.all.includes(
      branchName
    );

  if (exists) {
    await git.checkout(
      branchName
    );

    return;
  }

  await git.checkoutLocalBranch(
    branchName
  );
}

async function publishBranch(
  branchName
) {
  await git.push([
    "-u",
    "origin",
    branchName
  ]);
}

module.exports = {
  publishBranch,
  getCurrentBranch,
  checkoutBranch
};