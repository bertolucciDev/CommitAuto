const {
  buildReadmePrompt
} = require("./readmePrompt");

const {
  generateCommit
} = require("./nvidia");

async function generateReadme({
  packageJson,
  structure,
  template
}) {
  const prompt =
    buildReadmePrompt({
      packageJson,
      structure,
      template
    });

  return generateCommit(prompt);
}

module.exports = {
  generateReadme
};