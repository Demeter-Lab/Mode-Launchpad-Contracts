/**
 * sample pad address deployed on sepolia
 */
const padAddress = "0x71B7319466efB8c0Ed8f9C8E0565fB44F7688453";

// function to deploy/create a new LaunchPad
/**
 *
 * @param {*} FactoryContract PASS THE INSTANTIALIZED Factory as an argument
 * @param {*} tokenAddress ERC20 token to be launched in the pad
 * @param {*} price price at which token is to be sold
 * @param {*} minInvestment soft cap for the launchpad
 * @param {*} maxInvestment hard cap for the launchpad
 * @param {*} poolName launchpad name
 * @param {*} durationInDays number of days to run launchpad
 */
async function deployNewLaunchPad(
  FactoryContract,
  tokenAddress,
  price,
  minInvestment,
  maxInvestment,
  poolName,
  durationInDays
) {
  try {
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
    await deployLaunchPad.wait(1);

    console.log(deployLaunchPad.hash);
  } catch (err) {
    console.error(err.message);
  }
}

async function getPadAddress(FactoryContract, padNumber) {
  try {
    // call the getPadAddress function on the factory contract
    const padAddress = await FactoryContract.getPadAddress(padNumber);

    console.log(padAddress);
    return padAddress;
  } catch (err) {
    console.log(err.message);
  }
}

async function getNoOfLaunchPads(FactoryContract) {
  try {
    console.log("Fetching No of Launchpads");

    // call the getNoOfLaunchPads function on the factory contract
    const totalNoOfPads = await FactoryContract.getNoOfLaunchPads();
    // await totalNoOfPads;

    console.log("Log:", totalNoOfPads);
    return totalNoOfPads;
  } catch (err) {
    console.error(err.message);
  }
}

async function getPadName(FactoryContract, padAddress) {
  try {
    console.log("Fetching PadName.......");

    // call the getPadName function on the factory contract
    const padName = await FactoryContract.getPadName(padAddress);

    console.log(padName);
    return padName;
  } catch (err) {
    console.log(err.message);
  }
}

async function getPadDuration(FactoryContract, padAddress) {
  try {
    console.log("Fetching PadDuration.......");

    // call the getPadDuration function on the factory contract
    const padDuration = await FactoryContract.getPadDuration(padAddress);
    console.log(padDuration);
    // return padDuration;
  } catch (err) {
    console.log(err.message);
  }
}

async function getPadMaxCap(FactoryContract, padAddress) {
  try {
    console.log("Fetching PadMaxCap.......");

    // call the getPadMaxCap function on the factory contract
    const padMaxCap = await FactoryContract.getPadMaxCap(padAddress);
    console.log(padMaxCap);
    return padMaxCap;
  } catch (err) {
    console.log(err.message);
  }
}

async function getPadMinCap(FactoryContract, padAddress) {
  try {
    console.log("Fetching PadMinCap.......");

    // call the getPadMinCap function on the factory contract
    const padMinCap = await FactoryContract.getPadMinCap(padAddress);
    console.log(padMinCap);
    return padMinCap;
  } catch (err) {
    console.log(err.message);
  }
}

async function getUnsoldTokensAmount(FactoryContract, padAddress) {
  try {
    console.log("Fetching PadMinCap.......");

    // call the getPadMinCap function on the factory contract
    const padMinCap = await FactoryContract.getPadMinCap(padAddress);
    console.log(padMinCap);
    return padMinCap;
  } catch (err) {
    console.log(err.message);
  }
}

async function getUserTokenPurchase(FactoryContract, padAddress) {
  try {
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

async function getPadPrice(FactoryContract, padAddress) {
  try {
    console.log("Fetching PadPrice.......");

    // call the getPadPrice function on the factory contract
    const padPrice = await FactoryContract.getPadPrice(padAddress);
    console.log(padPrice);
    return padPrice;
  } catch (err) {
    console.log(err.message);
  }
}

async function getPadContractBalance(FactoryContract, padAddress) {
  try {
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

module.exports = {};
