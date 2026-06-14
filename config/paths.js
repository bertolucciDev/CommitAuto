const os = require("node:os");

const path = require("node:path");

const AIC_DIR = path.join(
  os.homedir(),
  ".aic"
);

const ENV_FILE = path.join(
  AIC_DIR,
  ".env"
);

module.exports = {
  AIC_DIR,
  ENV_FILE
};