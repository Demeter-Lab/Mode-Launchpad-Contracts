const hre = require("hardhat");

async function main() {
  const factory = await hre.ethers.deployContract("LaunchPadFactory", []);
  console.log("Deploying Factory contract....");
  await factory.waitForDeployment();

  console.log(`Factory contract deployed to: \nAddress: ${factory.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
