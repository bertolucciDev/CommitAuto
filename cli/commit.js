const {
  createSpinner
} = require("./spinner");

const {
  confirmCommit,
  confirmStageAll,
  confirmPublish,
  askProjectName,
  askRepositoryUrl,
  askBranchName
} = require("./prompts");

const {
  initializeRepository
} = require("../git/bootstrap");

const {
  hasOrigin
} = require("../git/remote");

const {
  stageAll
} = require("../git/add");

const {
  syncBranch
} = require("../git/sync");

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
  getCurrentBranch,
  checkoutBranch
} = require("../git/push");

const {
  generateAICommit
} = require("../ai/generateCommit");

async function commitCommand() {
  const spinner =
    createSpinner(
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

    let diff =
      await getGitDiff();

    let files =
      await getStagedFiles();

    if (!diff.trim()) {
      spinner.stop();

      const shouldStage =
        await confirmStageAll();

      if (!shouldStage) {
        console.log(
          "No staged changes found."
        );

        return;
      }

      const stageSpinner =
        createSpinner(
          "Staging files..."
        );

      stageSpinner.start();

      await stageAll();

      stageSpinner.succeed(
        "Files staged successfully."
      );

      diff =
        await getGitDiff();

      files =
        await getStagedFiles();

      if (!diff.trim()) {
        console.log(
          "No changes found."
        );

        return;
      }

      spinner.start();
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
      await confirmCommit(
        message
      );

    if (!accepted) {
      console.log(
        "Commit canceled."
      );

      return;
    }

    const commitSpinner =
      createSpinner(
        "Creating commit..."
      );

    commitSpinner.start();

    await createCommit(
      message
    );

    commitSpinner.succeed(
      "Commit created successfully."
    );

    const shouldPublish =
      await confirmPublish();

    if (!shouldPublish) {
      return;
    }

    const currentBranch =
      await getCurrentBranch();

    const branchName =
      await askBranchName(
        currentBranch
      );

    const originExists =
      await hasOrigin();

    if (!originExists) {
      const projectName =
        await askProjectName();

      const repositoryUrl =
        await askRepositoryUrl();

      const bootstrapSpinner =
        createSpinner(
          "Initializing repository..."
        );

      bootstrapSpinner.start();

      await initializeRepository(
        projectName,
        repositoryUrl
      );

      bootstrapSpinner.succeed(
        "Repository initialized successfully."
      );

      return;
    }

    const syncSpinner =
      createSpinner(
        "Syncing branch..."
      );

    syncSpinner.start();

    await checkoutBranch(
      branchName
    );

    await syncBranch(
      branchName
    );

    syncSpinner.succeed(
      `Branch "${branchName}" synced successfully.`
    );

  } catch (error) {
    console.log("\n");

    console.error(
      error.message
    );
  }
}

module.exports = {
  commitCommand
};