const ora = require("ora");

function createSpinner(text) {
  return ora({
    text,
    spinner: "dots"
  });
}

module.exports = {
  createSpinner
};