const {
  createSpinner
} = require("./spinner");

const {
  confirmCommit
} = require("./prompts");

const {
  getGitDiff
} = require("../git/diff");

const {
  getStagedFiles
} = require("../git/staged");

const {
  createCommit
} = require("../git/commit");

const {
  isGitRepo
} = require("../git/check");

const {
  generateAICommit
} = require("../ai/generateCommit");

async function commitCommand() {
  const spinner = createSpinner(
    "Analyzing git changes..."
  );

  spinner.start();

  try {
    const repo =
      await isGitRepo();

    if (!repo) {
      spinner.fail(
        "Current directory is not a Git repository."
      );

      return;
    }

    const diff =
      await getGitDiff();

    const files =
      await getStagedFiles();

    if (!diff.trim()) {
      spinner.fail(
        "No staged changes found."
      );

      return;
    }

    const message =
      await generateAICommit(
        diff,
        files
      );

    spinner.succeed(
      "Commit generated successfully!"
    );

    console.log("\n");
    console.log(message);
    console.log("\n");

    const accepted =
      await confirmCommit(message);

    if (!accepted) {
      console.log(
        "Commit canceled."
      );

      return;
    }

    await createCommit(message);

    console.log(
      "Commit created successfully."
    );
  } catch (error) {
    spinner.fail(
      "Error generating commit."
    );

    console.error(error);
  }
}

module.exports = {
  commitCommand
};