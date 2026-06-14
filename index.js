#!/usr/bin/env node

const {
  loadEnv
} = require("./config/env");

const {
  commitCommand
} = require("./cli/commit");

const {
  readmeCommand
} = require("./commands/readme");

async function bootstrap() {
  await loadEnv();

  const command =
    process.argv[2];

  switch (command) {
    case "commit":
      await commitCommand();
      break;

    case "readme":
      await readmeCommand();
      break;

    default:
      console.log(`
Usage:

aic commit
aic readme
`);
  }
}

bootstrap();