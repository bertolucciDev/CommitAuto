const fs =
  require("node:fs/promises");

const path =
  require("node:path");

async function readPackageJson() {
  try {
    const packagePath =
      path.join(
        process.cwd(),
        "package.json"
      );

    const content =
      await fs.readFile(
        packagePath,
        "utf-8"
      );

    return JSON.parse(content);
  } catch {
    return null;
  }
}

async function readProjectStructure() {
  try {
    const files =
      await fs.readdir(
        process.cwd()
      );

    return files.join("\n");
  } catch {
    return "";
  }
}

module.exports = {
  readPackageJson,
  readProjectStructure
};