const { ethers } = require("hardhat");
const {
  abi: LaunchPadABI,
} = require("../../artifacts/contracts/Launchpad.sol/Launchpad.json");
const {
  MODE_TESTNET_TOKEN_CA,
  SEPOLIA_TESTNET_TOKEN_CA,
} = require("../../constants/constants");

const padAddress = "0xceb09DCdd87476946221a5AE56f20Fdda377BB08";

// [VIEW FUNCTION]

// getisSaleDurationElapsed
async function getisSaleDurationElapsed() {
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
// function to buy tokens [Participate in the launch pad]
async function callBuyTokens(amount) {
  try {
    const [signer] = await hre.ethers.getSigners();

    // instantialize the Launchpad contract
    const LaunchpadContract = new ethers.Contract(
      padAddress,
      LaunchPadABI,
      signer
    );

    // Convert amount to ethers and calculate the equivalent value
    console.log("Calling BuyTokens...");

    // const amountInWei = await ethers.utils.parseEther(amount).toString();
    const buyTokens = await LaunchpadContract.buyTokens(1, {
      value: "10",
    });
    await buyTokens.wait(1);

    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
}
callBuyTokens(1);

/**
 *  funtion for a user to claim available Tokens gotten from the pool
 */
async function callClaimTokens() {
  try {
    const [signer] = await hre.ethers.getSigners();

    // instantialize the Launchpad contract
    const LaunchpadContract = new ethers.Contract(
      padAddress,
      LaunchPadABI,
      signer
    );

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
async function callStartSale() {
  try {
    const [signer] = await hre.ethers.getSigners();

    // instantialize the Launchpad contract
    const LaunchpadContract = new ethers.Contract(
      padAddress,
      LaunchPadABI,
      signer
    );

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
async function callStopSale() {
  try {
    const [signer] = await hre.ethers.getSigners();

    // instantialize the Launchpad contract
    const LaunchpadContract = new ethers.Contract(
      padAddress,
      LaunchPadABI,
      signer
    );

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
async function callWithdrawFunds() {
  try {
    const [signer] = await hre.ethers.getSigners();

    // instantialize the Launchpad contract
    const LaunchpadContract = new ethers.Contract(
      padAddress,
      LaunchPadABI,
      signer
    );

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
 * @notice [ONLY CONTRACT OWNER CAN CALL]
 */
async function callWithdrawUnsoldTokens() {
  try {
    const [signer] = await hre.ethers.getSigners();

    // instantialize the Launchpad contract
    const LaunchpadContract = new ethers.Contract(
      padAddress,
      LaunchPadABI,
      signer
    );

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
