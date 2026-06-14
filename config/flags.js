const flags = {
  auto:
    process.argv.includes(
      "--auto"
    ),

  noPush:
    process.argv.includes(
      "--no-push"
    ),

  amend:
    process.argv.includes(
      "--amend"
    )
};

module.exports = flags;