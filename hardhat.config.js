require("@nomicfoundation/hardhat-toolbox");
// require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

const { PRIVATE_KEY, MODE_TESTNET_RPC_URL, MODE_MAINNET_RPC_URL } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {},
    modemainnet: {
      url: MODE_MAINNET_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    modetestnet: {
      url: MODE_TESTNET_RPC_URL,
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
