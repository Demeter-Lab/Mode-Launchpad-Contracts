require("@nomicfoundation/hardhat-toolbox");
// require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

const {
  PRIVATE_KEY,
  MODE_TESTNET_RPC_URL,
  MODE_MAINNET_RPC_URL,
  API_URL_SEPOLIA,
} = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  solidity: "0.8.9",
  networks: {
    // hardhat: {},
    mode: {
      url: "https://sepolia.mode.network",
      chainId: 919,
      accounts: [PRIVATE_KEY],
    },
    // modemainnet: {
    //   url: MODE_MAINNET_RPC_URL,
    //   accounts: [`0x${PRIVATE_KEY}`],
    // },
    // modetestnet: {
    //   url: MODE_TESTNET_RPC_URL,
    //   accounts: [PRIVATE_KEY],
    // },
    sepolia: {
      url: API_URL_SEPOLIA,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  // etherscan: {
  //   apiKey: {
  //     polygonMumbai: POLYGONSCAN_API_URL,
  //     polygon: POLYGONSCAN_API_URL,
  //     goerli: ETHERSCAN_API_URL,
  //     sepolia: ETHERSCAN_API_URL,
  //     mainnet: ETHERSCAN_API_URL,
  //   },
  // },
  sourcify: {
    enabled: true,
  },
};
