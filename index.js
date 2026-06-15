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

aic sentinel on

aic commit
aic commit --auto
aic commit --auto --no-push
aic commit --amend

aic readme

===Templates===

aic readme --template modern
aic readme --template enterprise
aic readme --template open-source
aic readme --template minimal

===============

aic release
`);
  }
}

bootstrap();