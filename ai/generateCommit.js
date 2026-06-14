const {
  buildPrompt
} = require("./prompt");

const {
  generateCommit
} = require("./nvidia");

function truncateDiff(diff) {
  const MAX_DIFF_SIZE = 12000;

  if (
    diff.length <= MAX_DIFF_SIZE
  ) {
    return diff;
  }

  return diff.slice(
    0,
    MAX_DIFF_SIZE
  );
}

async function generateAICommit(
  diff,
  files
) {
  const truncatedDiff =
    truncateDiff(diff);

  const prompt = buildPrompt(
    truncatedDiff,
    files
  );

  return generateCommit(prompt);
}

module.exports = {
  generateAICommit
};