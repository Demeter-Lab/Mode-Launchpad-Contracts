const { ethers } = require("ethers");
const {
  abi: FactoryABI,
} = require("../../artifacts/contracts/LaunchPadFactory.sol/LaunchPadFactory.json");
const { LAUNCHPAD_FACTORY_CA } = require("../../constants/constants");

const padAddress = "";

// function to deploy/create a new LaunchPad
/**
 *
 * @param {*} tokenAddress ERC20 token to be launched in the pad
 * @param {*} price price at which token is to be sold
 * @param {*} minInvestment
 * @param {*} maxInvestment
 * @param {*} poolName
 * @param {*} durationInDays
 */
async function deployNewLaunchPad(
  tokenAddress,
  price,
  minInvestment,
  maxInvestment,
  poolName,
  durationInDays
) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();

  // instantialize the factory contract
  const FactoryContract = new ethers.Contract(
    LAUNCHPAD_FACTORY_CA,
    FactoryABI,
    signer
  );

  // call the deploy function on the factory contract
  const deployLaunchPad = await FactoryContract.deploy(
    tokenAddress,
    price,
    minInvestment,
    maxInvestment,
    poolName,
    durationInDays
  );

  console.log("Deploying LaunchPad.......");
  await deployLaunchPad.wait();

  console.log(deployLaunchPad.target);
}

get;

async function getPadName(padAddress) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();

  // instantialize the factory contract
  const FactoryContract = new ethers.Contract(
    LAUNCHPAD_FACTORY_CA,
    FactoryABI,
    signer
  );

  console.log("Fetching PadName.......");

  // call the getPadName function on the factory contract
  const padName = await FactoryContract.getPadName(padAddress);
  await padName.wait();

  console.log(padName);
  return padName;
}

async function getPadDuration(padAddress) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();

  // instantialize the factory contract
  const FactoryContract = new ethers.Contract(
    LAUNCHPAD_FACTORY_CA,
    FactoryABI,
    signer
  );

  console.log("Fetching PadDuration.......");

  // call the getPadDuration function on the factory contract
  const padDuration = await FactoryContract.getPadDuration(padAddress);
  await padDuration.wait();

  console.log(padDuration);
  return padDuration;
}

async function getPadMaxCap(padAddress) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();

  // instantialize the factory contract
  const FactoryContract = new ethers.Contract(
    LAUNCHPAD_FACTORY_CA,
    FactoryABI,
    signer
  );

  console.log("Fetching PadMaxCap.......");

  // call the getPadMaxCap function on the factory contract
  const padMaxCap = await FactoryContract.getPadMaxCap(padAddress);
  await padMaxCap.wait();

  console.log(padMaxCap);
  return padMaxCap;
}

async function getPadMinCap(padAddress) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();

  // instantialize the factory contract
  const FactoryContract = new ethers.Contract(
    LAUNCHPAD_FACTORY_CA,
    FactoryABI,
    signer
  );

  console.log("Fetching PadMinCap.......");

  // call the getPadMinCap function on the factory contract
  const padMinCap = await FactoryContract.getPadMinCap(padAddress);
  await padMinCap.wait();

  console.log(padMinCap);
  return padMinCap;
}

async function getUnsoldTokensAmount(padAddress) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();

  // instantialize the factory contract
  const FactoryContract = new ethers.Contract(
    LAUNCHPAD_FACTORY_CA,
    FactoryABI,
    signer
  );

  console.log("Fetching PadMinCap.......");

  // call the getPadMinCap function on the factory contract
  const padMinCap = await FactoryContract.getPadMinCap(padAddress);
  await padMinCap.wait();

  console.log(padMinCap);
  return padMinCap;
}

async function getUserTokenPurchase(padAddress) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();

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
  await amountOfTokensPurchasedByUser.wait();

  console.log(amountOfTokensPurchasedByUser);
  return amountOfTokensPurchasedByUser;
}

async function getPadPrice(padAddress) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();

  // instantialize the factory contract
  const FactoryContract = new ethers.Contract(
    LAUNCHPAD_FACTORY_CA,
    FactoryABI,
    signer
  );

  console.log("Fetching PadPrice.......");

  // call the getPadPrice function on the factory contract
  const padPrice = await FactoryContract.getPadPrice(padAddress);
  await padPrice.wait();

  console.log(padPrice);
  return padPrice;
}

async function getPadContractBalance(padAddress) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();

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
  await padContractBalance.wait();

  console.log(padContractBalance);
  return padContractBalance;
}

module.exports = {};
