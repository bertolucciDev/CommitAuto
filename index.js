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

    case "--help":
    case "-h":
    default:
      console.log(`
AI Commit CLI

Usage:

aic commit

aic readme

aic readme --template modern

aic readme --template minimal

aic readme --template enterprise

aic readme --template open-source
`);
  }
}

bootstrap();