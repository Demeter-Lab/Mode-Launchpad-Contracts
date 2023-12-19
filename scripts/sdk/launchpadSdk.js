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

// launchapd address sample
const padAddress = "0xceb09DCdd87476946221a5AE56f20Fdda377BB08";

// [VIEW FUNCTION]

//
/**
 * getisSaleDurationElapsed is a helper function
 * @param {*} LaunchpadContract the launchpad contract instance
 * @returns {boolean} true or false if sale duration is over
 */
async function getisSaleDurationElapsed(LaunchpadContract) {
  try {
    const [signer] = await hre.ethers.getSigners();

    // instantialize the Launchpad contract
    const LaunchpadContract = new ethers.Contract(
      padAddress,
      LaunchPadABI,
      signer
    );

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
 * @param {*} amount is the amount of tokens to be purchased
 * @notice ENSURE Launchpad HAS ENOUGH TOKEN BALANCE
 * @returns true if the purchase is successful and false if not
 */
async function callBuyTokens(amount) {
  try {
    const [signer] = await hre.ethers.getSigners();

    // instantialize the Launchpad contract
    const LaunchpadContract = new ethers.Contract(
      padAddress,
      LaunchPadABI,
      signer
    );

    // instantialize the factory contract
    const FactoryContract = new ethers.Contract(
      SEPOLIA_LAUNCHPAD_FACTORY_CA,
      FactoryABI,
      signer
    );

    // Convert amount to ethers and calculate the equivalent value
    console.log("Calling BuyTokens...");

    // calculating the tokenPrice proportionate to the price of one token in Ether
    const tokenPrice = await FactoryContract.getTokenPrice(padAddress);

    // conert token amount to wei
    const amountInWei = await ethers.utils.parseEther(amount.toString());
    const valueInWei = amountInWei.mul(tokenPrice);

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
callBuyTokens(1);

/**
 * funtion for a user to claim available Tokens gotten from the pool
 * @param {*} LaunchpadContract the launchpad contract instance
 * @returns {boolean} true or false if claim is successful or not
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
 * @param {*} LaunchpadContract the launchpad contract instance
 * @returns {boolean} true or false if sale is started or not
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
/**
 * function to startSale
 * @notice [ONLY CONTRACT OWNER CAN CALL]
 * @param {*} LaunchpadContract the launchpad contract instance
 * @returns {boolean} true or false if sale is stopped or active
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
 * function to withdraw funds [ONLY CONTRACT OWNER CAN CALL]
 * @param {*} LaunchpadContract the launchpad contract instance
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

/**
 *  function to withdraw unsold tokens
 * @param {*} LaunchpadContract the launchpad contract instance
 * @notice [ONLY CONTRACT OWNER CAN CALL]
 * @returns {boolean} true or false if withdrawal is successful or not
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
