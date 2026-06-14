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

async function askProjectName() {
  return input({
    message: "Project name:",

    validate(value) {
      if (!value.trim()) {
        return "Project name is required.";
      }

      return true;
    }
  });
}

async function askRepositoryUrl() {
  return input({
    message:
      "GitHub repository URL:",

    validate(value) {
      if (!value.trim()) {
        return "Repository URL is required.";
      }

      const isGitHubUrl =
        value.startsWith(
          "https://github.com/"
        ) ||
        value.startsWith(
          "git@github.com:"
        );

      if (!isGitHubUrl) {
        return "Invalid GitHub repository URL.";
      }

      return true;
    }
  });
}

async function askBranchName(
  currentBranch = "main"
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
  askProjectName,
  askRepositoryUrl,
  askBranchName
};