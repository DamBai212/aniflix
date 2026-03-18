const supportedMajor = 14;
const currentMajor = Number(process.versions.node.split('.')[0]);

if (currentMajor !== supportedMajor) {
  console.error(
    `AniFlix requires Node ${supportedMajor}.x. Current version: ${process.version}. Run \`nvm use\` to switch to ${supportedMajor}.15.0.`
  );
  process.exit(1);
}
