function buildReadmePrompt({
  packageJson,
  structure,
  template
}) {
  return `
You are a senior software engineer.

Generate a COMPLETE professional README.md.

README STYLE:
${template}

Requirements:
- Markdown only
- Professional formatting
- Add realistic sections
- Generate complete content
- No placeholders
- Ready to use

Required sections:
- Title
- Description
- Features
- Technologies
- Installation
- Usage
- Scripts
- Project structure
- Contributing
- License

Project structure:
${structure}

Package.json:
${JSON.stringify(
  packageJson,
  null,
  2
)}
`;
}

module.exports = {
  buildReadmePrompt
};