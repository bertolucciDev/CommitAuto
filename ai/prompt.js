function buildPrompt(
  diff,
  files
) {
  const limitedFiles =
    files.slice(0, 20);

  return `
You are a senior software engineer.

Analyze the git diff and generate a professional Conventional Commit message.

Rules:
- Output ONLY the commit message
- Use english
- Maximum 72 chars
- Use Conventional Commits

Allowed types:
- feat
- fix
- docs
- style
- refactor
- perf
- test
- build
- ci
- chore
- revert
- ui
- deps
- security
- config
- release
- hotfix
- types
- wip
- merge

Changed files:
${limitedFiles.join("\n")}

Git diff:
${diff}
`;
}

module.exports = {
  buildPrompt
};