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

const {
  releaseCommand
} = require("./commands/release");

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

    case "release":
      await releaseCommand();
      break;

    default:
      console.log(`
AI Commit CLI

Usage:

aic commit
aic commit --auto
aic commit --auto --no-push
aic commit --amend

aic readme
aic readme --template modern

aic release
`);
  }
}

bootstrap();