const { ethers } = require("hardhat");
const {
  abi: LaunchPadABI,
} = require("../../artifacts/contracts/Launchpad.sol/Launchpad.json");
const {
  abi: FactoryABI,
} = require("../../artifacts/contracts/LaunchPadFactoryNoSFS.sol/LaunchPadFactoryNoSFS.json");
const {
  MODE_TESTNET_TOKEN_CA,
  SEPOLIA_TESTNET_TOKEN_CA,
  SEPOLIA_LAUNCHPAD_FACTORY_CA,
} = require("../../constants/constants");

// launchpad address sample
const padAddress = "0x1e911c06B7572982216B73ab310fdD2A354aE845";

// [VIEW FUNCTION]

//
/**
 * getisSaleDurationElapsed is a helper function
 * @param {*} LaunchpadContract the launchpad contract instance
 * @returns {boolean} true or false if sale duration is over
 */
async function getisSaleDurationElapsed(LaunchpadContract) {
  try {
    // call the getisSaleDurationElapsed function on the factory contract
    console.log("Calling isSaleDurationElapsed...");

    const isSaleDurationElapsed =
      await LaunchpadContract.isSaleDurationElapsed();

    console.log(isSaleDurationElapsed);
    return isSaleDurationElapsed;
  } catch (err) {
    console.log(err.message);
  }
}
// getisSaleDurationElapsed();

// **************** WRITABLE FUNCTIONS ************************** //

// buyTokens
/**
 * function to buy tokens [Participate in the launch pad
 * @param LaunchpadContract launchpadContract instance
 * @param FactoryContract Factory Contract instance
 * @param {*} amount is the amount of tokens to be purchased
 * @notice ENSURE Launchpad HAS ENOUGH TOKEN BALANCE
 * @returns true if the purchase is successful and false if not
 */
async function callBuyTokens(LaunchpadContract, FactoryContract, amount) {
  try {
    // Convert amount to ethers and calculate the equivalent value
    console.log("Calling BuyTokens...");

    // calculating the tokenPrice proportionate to the price of one token in Ether
    const tokenPrice = await FactoryContract.getPadPrice(padAddress);

    // conert token amount to wei
    const amountInWei = await ethers.utils.parseEther(amount.toString());
    const valueInWei = amountInWei.mul(tokenPrice);
    // .div(ethers.BigNumber.from("10").pow("18"));

    console.log(amountInWei.toString(), valueInWei);

    // Call the buyTokens function on the Launchpad contract
    const buyTokens = await LaunchpadContract.buyTokens(amountInWei, {
      value: valueInWei,
    });
    await buyTokens.wait(1);

    console.log("Purchase successful!");

    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
}
// callBuyTokens(1);

/**
 *  funtion for a user to claim available Tokens gotten from the pool
 */
async function callClaimTokens(LaunchpadContract) {
  try {
    console.log("Calling claimTokens...");

    const claimTokens = await LaunchpadContract.claimTokens();
    await claimTokens.wait(1);

    console.log("Tokens claimed!");
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
}

// **************** RESTRICTED FUNCTIONS ************************** //
/**
 * function to startSale
 * @notice [ONLY CONTRACT OWNER CAN CALL]
 */
async function callStartSale(LaunchpadContract) {
  try {
    console.log("Calling Start sale...");

    const startSale = await LaunchpadContract.startSale();
    await startSale.wait(1);

    console.log("Sale Started");
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
}
// callStartSale();

/**
 * function to stop sale
 * @notice [ONLY CONTRACT OWNER CAN CALL]
 */
async function callStopSale(LaunchpadContract) {
  try {
    console.log("Calling StopSale...");

    const stopSale = await LaunchpadContract.stopSale();
    await stopSale.wait(1);

    console.log("Sale Stopped");
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
}
// callStopSale();

/**
 *  function to withdraw funds [ONLY CONTRACT OWNER CAN CALL]
 * @notice [ONLY CONTRACT OWNER CAN CALL]
 */
async function callWithdrawFunds(LaunchpadContract) {
  try {
    console.log("Calling withdraw funds...");

    const withdrawFunds = await LaunchpadContract.withdrawFunds();
    withdrawFunds.wait(1);

    console.log("Funds successfully withdrawn...");
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
}
// callWithdrawFunds();

/**
 *  function to withdraw unsold tokens
 * @notice [ONLY CONTRACT OWNER CAN CALL]
 */
async function callWithdrawUnsoldTokens(LaunchpadContract) {
  try {
    console.log("Calling withdrawUnsoldTokens...");

    const withdrawUnsoldTokens = await LaunchpadContract.withdrawUnsoldTokens();
    await withdrawUnsoldTokens.wait(1);

    console.log("Unsold Tokens successfully withdrawn...");
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
}
