const {
  confirm,
  input
} = require("@inquirer/prompts");

async function confirmCommit(
  message
) {
  return confirm({
    message: `Confirm commit?\n\n${message}`
  });
}

async function confirmStageAll() {
  return confirm({
    message:
      "Stage all changes automatically?"
  });
}

async function confirmPublish() {
  return confirm({
    message:
      "Publish branch to origin?"
  });
}

async function askRepositoryUrl() {
  return input({
    message:
      "Repository URL:",

    validate(value) {
      if (!value.trim()) {
        return "Repository URL is required.";
      }

      return true;
    }
  });
}

async function askBranchName(
  currentBranch
) {
  return input({
    message: "Branch name:",

    default: currentBranch,

    validate(value) {
      if (!value.trim()) {
        return "Branch name is required.";
      }

      return true;
    }
  });
}

module.exports = {
  confirmCommit,
  confirmStageAll,
  confirmPublish,
  askRepositoryUrl,
  askBranchName
};