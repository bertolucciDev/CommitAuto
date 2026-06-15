const {
    execSync
  } = require("node:child_process");
  
  const os =
    require("node:os");
  
  function hideFolder(
    folderPath
  ) {
    if (
      os.platform() === "win32"
    ) {
      try {
        execSync(
          `attrib +h "${folderPath}"`
        );
      } catch (err) {
        console.log(
          "Failed to hide folder:",
          err.message
        );
      }
    }
  }
  
  module.exports = {
    hideFolder
  };