const {
  confirm
} = require("@inquirer/prompts");

async function confirmCommit(
  message
) {
  return confirm({
    message: `Confirm commit?\n\n${message}`
  });
}

module.exports = {
  confirmCommit
};