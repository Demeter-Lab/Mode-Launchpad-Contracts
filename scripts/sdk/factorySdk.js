// sample pad address deployed on sepolia
const padAddress = "0x8b127f3B2f5Ba69e731fa31CBdc03e8C8Fc26D16";

/**
 *
// function to deploy/create a new LaunchPad
/**
 *
 * @param {*} tokenAddress ERC20 token to be launched in the pad
 * @param {*} price price at which token is to be sold [ether equivalent]
 * @param {*} minInvestment soft cap for the launchpad [in ETH value: 0.1, 0.01, 1, etc ]
 * @param {*} maxInvestment hard cap for the launchpad [in ETH value: 0.1, 0.01, 1, etc ]
 * @param {*} poolName launchpad name
 * @param {*} durationInDays number of days to run launchpad
 */
export async function deployNewLaunchPad(
  FactoryContract,
  tokenAddress,
  owner,
  _price,
  _minInvestment,
  _maxInvestment,
  poolName,
  durationInDays
) {
  try {
    // convert the inputed amounts to 18 decimals
    const price = _price * 10 ** 18;
    const minInvestment = _minInvestment * 10 ** 18;
    const maxInvestment = _maxInvestment * 10 ** 18;

    // call the deploy function on the factory contract
    const deployLaunchPad = await FactoryContract.deploy(
      tokenAddress,
      owner,
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

/**
 * @param {*} FactoryContract PASS THE INSTANTIALIZED Factory as an argument
 * @param {*} padNumber the index number mapped to the launchpad contract
 * @returns launchpad's Contract Address
 */
export async function getPadAddress(FactoryContract, padNumber) {
  try {
    // call the getPadAddress function on the factory contract
    const padAddress = await FactoryContract.getPadAddress(padNumber);

    console.log(padAddress);
    return padAddress;
  } catch (err) {
    console.log(err.message);
  }
}

/**
 * function to get number of launchpads created
 * @param {*} FactoryContract PASS THE INSTANTIALIZED Factory as an argument
 * @returns {number} number of launchpads created
 */
export async function getNoOfLaunchPads(FactoryContract) {
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

/**
 * function to get the launchpad name
 * @param {*} FactoryContract PASS THE INSTANTIALIZED Factory as an argument
 * @param {*} padAddress launchpad CA
 * @returns {string} launchpad name
 */
export async function getPadName(FactoryContract, padAddress) {
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

/**
 * function to get the launchpad duration
 * @param {*} FactoryContract PASS THE INSTANTIALIZED Factory as an argument
 * @param {*} padAddress launchpad CA
 * @returns {number} pad duration
 */
export async function getPadDuration(FactoryContract, padAddress) {
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

export async function getPadMaxCap(FactoryContract, padAddress) {
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

export async function getPadMinCap(FactoryContract, padAddress) {
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

export async function getUnsoldTokensAmount(FactoryContract, padAddress) {
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

export async function getUserTokenPurchase(FactoryContract, padAddress) {
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

export async function getPadPrice(FactoryContract, padAddress) {
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

export async function getPadContractBalance(FactoryContract, padAddress) {
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
