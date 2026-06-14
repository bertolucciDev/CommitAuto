const {
  createSpinner
} = require("../cli/spinner");

const {
  stageAll
} = require("../git/add");

const {
  createCommit
} = require("../git/commit");

const {
  syncBranch
} = require("../git/sync");

const {
  getCurrentBranch
} = require("../git/push");

const simpleGit =
  require("simple-git");

const git = simpleGit();

async function releaseCommand() {
  const spinner =
    createSpinner(
      "Creating release..."
    );

  spinner.start();

  try {
    await stageAll();

    await createCommit(
      "chore(release): prepare release"
    );

    const tags =
      await git.tags();

    const latest =
      tags.latest || "0.0.0";

    const parts =
      latest.split(".");

    const nextVersion = `${
      parts[0]
    }.${parts[1]}.${
      Number(parts[2]) + 1
    }`;

    await git.addTag(
      `v${nextVersion}`
    );

    const branch =
      await getCurrentBranch();

    await syncBranch(
      branch
    );

    await git.pushTags(
      "origin"
    );

    spinner.succeed(
      `Release v${nextVersion} created successfully.`
    );
  } catch (error) {
    spinner.fail(
      "Failed to create release."
    );

    console.error(
      error.message
    );
  }
}

module.exports = {
  releaseCommand
};