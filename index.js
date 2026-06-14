#!/usr/bin/env node

const {
  loadEnv
} = require("./config/env");

const {
  commitCommand
} = require("./cli/commit");

async function bootstrap() {
  await loadEnv();

  const command =
    process.argv[2];

  switch (command) {
    case "commit":
      await commitCommand();
      break;

    default:
      console.log(`
Usage:

aic commit
`);
  }
}

bootstrap();