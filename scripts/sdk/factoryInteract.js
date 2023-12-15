import { ethers } from "ethers";
import { abi as FactoryABI } from "../../artifacts/contracts/LaunchPadFactory.sol/LaunchPadFactory.json";
import { LAUNCHPAD_FACTORY_CA } from "../../constants/constants";

/**
 * deploy
 * getPadName
 * getPadDuration
 * getPadMaxCap
 * getPadMinCap
 * getUnsoldTokensAmount
 * getUserTokenPurchase
 * getPadPrice
 * getPadContractBalance
 */

// function to deploy/create a new LaunchPad
export async function deployNewLaunchPad(
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
  const FactoryContract = new ethers.Contract(TOKEN_CA, FactoryABI, signer);

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

export async function getPadName() {}

export async function getPadDuration() {}

export async function getPadMaxCap() {}

export async function getPadMinCap() {}

export async function getUnsoldTokensAmount() {}

export async function getUserTokenPurchase() {}

export async function getPadPrice() {}

export async function getPadContractBalance() {}
