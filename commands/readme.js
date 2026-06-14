const fs =
  require("node:fs/promises");

const path =
  require("node:path");

const {
  createSpinner
} = require("../cli/spinner");

const {
  readPackageJson,
  readProjectStructure
} = require("../utils/files");

const {
  generateReadme
} = require("../ai/generateReadme");

const {
  getTemplate
} = require("../templates");

async function readmeCommand() {
  const spinner =
    createSpinner(
      "Generating professional README..."
    );

  spinner.start();

  try {
    const packageJson =
      await readPackageJson();

    const structure =
      await readProjectStructure();

    const templateArg =
      process.argv.includes(
        "--template"
      )
        ? process.argv[
            process.argv.indexOf(
              "--template"
            ) + 1
          ]
        : "modern";

    const template =
      getTemplate(
        templateArg
      );

    const readme =
      await generateReadme({
        packageJson,
        structure,
        template
      });

    const readmePath =
      path.join(
        process.cwd(),
        "README.md"
      );

    await fs.writeFile(
      readmePath,
      readme
    );

    spinner.succeed(
      `README generated using "${templateArg}" template.`
    );
  } catch (error) {
    spinner.fail(
      "Failed to generate README."
    );

    console.error(error);
  }
}

module.exports = {
  readmeCommand
};