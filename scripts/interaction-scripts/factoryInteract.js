const { ethers } = require("hardhat");
const {
  abi: FactoryABI,
} = require("../../artifacts/contracts/LaunchPadFactory.sol/LaunchPadFactory.json");

const {
  LAUNCHPAD_FACTORY_CA,
  DEVPAD_TOKEN_CA,
} = require("../../constants/constants");

const padAddress = "0x1e911c06B7572982216B73ab310fdD2A354aE845";

// function to deploy/create a new LaunchPad
/**
 *
 * @param {*} tokenAddress ERC20 token to be launched in the pad
 * @param {*} price price at which token is to be sold [etehr equivalent]
 * @param {*} minInvestment soft cap for the launchpad [in ETH value: 0.1, 0.01, 1, etc ]
 * @param {*} maxInvestment hard cap for the launchpad [in ETH value: 0.1, 0.01, 1, etc ]
 * @param {*} poolName launchpad name
 * @param {*} durationInDays number of days to run launchpad
 */
async function deployNewLaunchPad(
  owner,
  tokenAddress,
  _price,
  _minInvestment,
  _maxInvestment,
  poolName,
  durationInDays
) {
  try {
    // convert the inputed amounts to 18 decimals
    const price = ethers.utils.parseUnits(_price.toString(), 18);
    const minInvestment = ethers.utils.parseUnits(
      _minInvestment.toString(),
      18
    );
    const maxInvestment = ethers.utils.parseUnits(
      _maxInvestment.toString(),
      18
    );

    const [signer] = await hre.ethers.getSigners();

    console.log(_price, minInvestment, maxInvestment);

    // instantialize the factory contract
    const FactoryContract = new ethers.Contract(
      LAUNCHPAD_FACTORY_CA,
      FactoryABI,
      signer
    );

    console.log("Deploying LaunchPad.......");

    // call the deploy function on the factory contract
    const deployLaunchPad = await FactoryContract.deploy(
      owner,
      tokenAddress,
      price,
      minInvestment,
      maxInvestment,
      poolName,
      durationInDays
    );

    await deployLaunchPad.wait(1);

    console.log(deployLaunchPad.hash);
  } catch (err) {
    console.error(err.message);
  }
}

// deployNewLaunchPad(
//   "0x1339514086Fc15C5e38AF4E0407C469Ca3911992",
//   DEVPAD_TOKEN_CA,
//   0.0000268157,
//   0.0225,
//   0.148,
//   "Launch Mode",
//   30
// );
// deployNewLaunchPad(
//   "0x1339514086Fc15C5e38AF4E0407C469Ca3911992",
//   "0x444978D057Cf41a9E44e213FE65f2989766374cd",
//   0.00043277,
//   0.0021663,
//   0.0021663,
//   "Dev Pad Demo",
//   1
// );
// deployNewLaunchPad(
//   "0x1339514086Fc15C5e38AF4E0407C469Ca3911992",
//   "0xF01A21A3dfadC00d343bE31f2C3Af90697c89400",
//   0.00005196852,
//   0.256,
//   0.045,
//   "Astro Pluto",
//   30
// );

async function getPadAddress(padNumber) {
  try {
    const [signer] = await hre.ethers.getSigners();

    // instantialize the factory contract
    const FactoryContract = new ethers.Contract(
      LAUNCHPAD_FACTORY_CA,
      FactoryABI,
      signer
    );
    console.log("Getting pad address...");

    // call the getPadAddress function on the factory contract
    const padAddress = await FactoryContract.getPadAddress(padNumber);

    console.log(padAddress);
    return padAddress;
  } catch (err) {
    console.log(err.message);
  }
}
getPadAddress(3);

async function getNoOfLaunchPads() {
  try {
    const [signer] = await hre.ethers.getSigners();

    // instantialize the factory contract
    const FactoryContract = new ethers.Contract(
      LAUNCHPAD_FACTORY_CA,
      FactoryABI,
      signer
    );
    console.log("Fetching No of Launchpads...");

    // call the getNoOfLaunchPads function on the factory contract
    const totalNoOfPads = await FactoryContract.getNoOfLaunchPads();
    await totalNoOfPads;

    console.log(Number(totalNoOfPads));
    return Number(totalNoOfPads);
  } catch (err) {
    console.error(err.message);
  }
}
// getNoOfLaunchPads();

async function getPadName(padAddress) {
  try {
    const [signer] = await hre.ethers.getSigners();

    // instantialize the factory contract
    const FactoryContract = new ethers.Contract(
      LAUNCHPAD_FACTORY_CA,
      FactoryABI,
      signer
    );

    console.log("Fetching PadName.......");

    // call the getPadName function on the factory contract
    const padName = await FactoryContract.getPadName(padAddress);

    console.log(padName);
    return padName;
  } catch (err) {
    console.log(err.message);
  }
}
// getPadName(padAddress);

async function getPadDuration(padAddress) {
  try {
    const [signer] = await hre.ethers.getSigners();

    // instantialize the factory contract
    const FactoryContract = new ethers.Contract(
      LAUNCHPAD_FACTORY_CA,
      FactoryABI,
      signer
    );

    console.log("Fetching PadDuration.......");

    // call the getPadDuration function on the factory contract
    const padDuration = await FactoryContract.getPadDuration(padAddress);
    console.log(padDuration);
    // return padDuration;
  } catch (err) {
    console.log(err.message);
  }
}
// getPadDuration(padAddress);

async function getPadMaxCap(padAddress) {
  try {
    const [signer] = await hre.ethers.getSigners();

    // instantialize the factory contract
    const FactoryContract = new ethers.Contract(
      LAUNCHPAD_FACTORY_CA,
      FactoryABI,
      signer
    );

    console.log("Fetching PadMaxCap.......");

    // call the getPadMaxCap function on the factory contract
    const padMaxCap = await FactoryContract.getPadMaxCap(padAddress);
    console.log(padMaxCap);
    return padMaxCap;
  } catch (err) {
    console.log(err.message);
  }
}
// getPadMaxCap(padAddre0s);

async function getPadMinCap(padAddress) {
  try {
    const [signer] = await hre.ethers.getSigners();

    // instantialize the factory contract
    const FactoryContract = new ethers.Contract(
      LAUNCHPAD_FACTORY_CA,
      FactoryABI,
      signer
    );

    console.log("Fetching PadMinCap.......");

    // call the getPadMinCap function on the factory contract
    const padMinCap = await FactoryContract.getPadMinCap(padAddress);
    console.log(padMinCap);
    return padMinCap;
  } catch (err) {
    console.log(err.message);
  }
}
// getPadMinCap(padAddress);

async function getUnsoldTokensAmount(padAddress) {
  try {
    const [signer] = await hre.ethers.getSigners();

    // instantialize the factory contract
    const FactoryContract = new ethers.Contract(
      LAUNCHPAD_FACTORY_CA,
      FactoryABI,
      signer
    );

    console.log("Fetching PadMinCap.......");

    // call the getPadMinCap function on the factory contract
    const padMinCap = await FactoryContract.getPadMinCap(padAddress);
    console.log(padMinCap);
    return padMinCap;
  } catch (err) {
    console.log(err.message);
  }
}
// getUnsoldTokensAmount(padAddress);

async function getUserTokenPurchase(padAddress) {
  try {
    const [signer] = await hre.ethers.getSigners();

    // instantialize the factory contract
    const FactoryContract = new ethers.Contract(
      LAUNCHPAD_FACTORY_CA,
      FactoryABI,
      signer
    );

    console.log("Fetching amount Of Tokens Purchased By User.......");

    // call the getUserTokenPurchase function on the factory contract
    const amountOfTokensPurchasedByUser =
      await FactoryContract.getUserTokenPurchase(padAddress);
    console.log(amountOfTokensPurchasedByUser);
    return amountOfTokensPurchasedByUser;
  } catch (err) {
    console.log(err.message);
  }
}
// getUserTokenPurchase(padAddress);

async function getPadPrice(padAddress) {
  try {
    const [signer] = await hre.ethers.getSigners();

    // instantialize the factory contract
    const FactoryContract = new ethers.Contract(
      LAUNCHPAD_FACTORY_CA,
      FactoryABI,
      signer
    );

    console.log("Fetching PadPrice.......");

    // call the getPadPrice function on the factory contract
    const padPrice = await FactoryContract.getPadPrice(padAddress);
    console.log(padPrice);
    return padPrice;
  } catch (err) {
    console.log(err.message);
  }
}
// getPadPrice(padAddress);

async function getPadContractBalance(padAddress) {
  try {
    const [signer] = await hre.ethers.getSigners();

    // instantialize the factory contract
    const FactoryContract = new ethers.Contract(
      LAUNCHPAD_FACTORY_CA,
      FactoryABI,
      signer
    );

    console.log("Fetching PadContractBalance.......");

    // call the getPadContractBalance function on the factory contract
    const padContractBalance = await FactoryContract.getPadContractBalance(
      padAddress
    );
    console.log(padContractBalance);
    return padContractBalance;
  } catch (err) {
    console.log(err.message);
  }
}
// getPadContractBalance(padAddress);

// getPadSaleStatus
async function getPadSaleStatus() {
  try {
    const [signer] = await hre.ethers.getSigners();

    // instantialize the factory contract
    const FactoryContract = new ethers.Contract(
      LAUNCHPAD_FACTORY_CA,
      FactoryABI,
      signer
    );

    // call the getpadSaleStatus function on the factory contract
    console.log("Calling padSaleStatus...");
    const padSaleStatus = await FactoryContract.getPadSaleStatus(padAddress);

    console.log(padSaleStatus);
    return padSaleStatus;
  } catch (err) {
    console.log(err.message);
  }
}
// getPadSaleStatus(padAddress);

module.exports = {};
