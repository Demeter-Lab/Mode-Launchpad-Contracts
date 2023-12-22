const { ethers } = require("hardhat");
const {
  abi: LaunchPadABI,
} = require("../../artifacts/contracts/Launchpad.sol/Launchpad.json");
const {
  abi: FactoryABI,
} = require("../../artifacts/contracts/LaunchPadFactory.sol/LaunchPadFactory.json");
const {
  MODE_TESTNET_TOKEN_CA,
  LAUNCHPAD_FACTORY_CA,
} = require("../../constants/constants");

// const LAUNCHPAD_FACTORY_CA = "0xFB7c73CD1282b8BE80190c4454F4322648F056FD";
// const DEVPAD_TOKEN_CA = "0xB7930204734d1c140970D271e64768bA85C40628";
// const padAddress = "0x1e911c06B7572982216B73ab310fdD2A354aE845";
const padAddress = "0x00a92e4d5732994f69B7055C4c0238aFE002b2BA";

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
/**
 * function to buy tokens [Participate in the launch pad
 * @param {*} amountOfEther is the amount of Ether the user intends to send
 * @notice ENSURE Launchpad HAS ENOUGH TOKEN BALANCE
 * @returns true if the purchase is successful and false if not
 */
async function callBuyTokens(amountOfEther) {
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
      LAUNCHPAD_FACTORY_CA,
      FactoryABI,
      signer
    );

    // Convert amount to ethers and calculate the equivalent value
    console.log("Calling BuyTokens...");

    // calculating the tokenPrice proportionate to the price of one token in Ether
    const tokenPrice = await FactoryContract.getPadPrice(padAddress);

    // convert token amount to wei
    const valueInWei = await ethers.utils.parseEther(amountOfEther.toString());
    // const valueInWei = amountInWei.mul(tokenPrice);
    // .div(ethers.BigNumber.from("10").pow("18"));

    console.log(valueInWei);

    // Call the buyTokens function on the Launchpad contract
    const buyTokens = await LaunchpadContract.buyTokens({
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

// async function loopCallBuy() {
//   for (let i = 0; i < 100; i++) {
//     await callBuyTokens(0.0021663);
//   }
// }
// loopCallBuy();

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
// callWithdrawFunds();

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
