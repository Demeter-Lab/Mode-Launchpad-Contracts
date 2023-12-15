const hre = require("hardhat");

async function main() {
  console.log("Deploying Factory contract....");
  const factory = await hre.ethers.deployContract("LaunchPadFactoryNoSFS", []);
  await factory.deployed();

  console.log(`Factory contract deployed to: \nAddress: ${factory.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
