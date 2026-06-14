const fs = require("node:fs/promises");

const dotenv = require("dotenv");

const {
  password
} = require("@inquirer/prompts");

const {
  AIC_DIR,
  ENV_FILE
} = require("./paths");

async function loadEnv() {
  dotenv.config({
    path: ENV_FILE
  });

  if (
    process.env.NVIDIA_API_KEY
  ) {
    return;
  }

  const apiKey = await password({
    message:
      "What is your NVIDIA API key?",

    validate(value) {
      if (
        !value.startsWith("nvapi-")
      ) {
        return "Invalid NVIDIA API key";
      }

      return true;
    }
  });

  await fs.mkdir(AIC_DIR, {
    recursive: true
  });

  await fs.writeFile(
    ENV_FILE,
    `NVIDIA_API_KEY=${apiKey}\n`
  );

  process.env.NVIDIA_API_KEY =
    apiKey;

  console.log(
    "API key saved successfully."
  );
}

module.exports = {
  loadEnv
};