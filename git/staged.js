const simpleGit =
  require("simple-git");

const git = simpleGit();

async function getStagedFiles() {
  const files = await git.diff([
    "--staged",
    "--name-only"
  ]);

  return files
    .split("\n")
    .map((file) => file.trim())
    .filter(Boolean);
}

module.exports = {
  getStagedFiles
};