require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");

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
    sepolia: {
      url: API_URL_SEPOLIA,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  // etherscan: {
  //   apiKey: {
  //     tenet: process.env.TENET_API,
  //   },
  //   customChains: [
  //     {
  //       network: "tenet",
  //       chainId: 155,
  //       urls: {
  //         apiURL: process.env.TENET_API,
  //         browserURL: "https://testnet.tenetscan.io/",
  //       },
  //     },
  //   ],
  // },
  // npx hardhat verify --network <network> DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1"
  sourcify: {
    enabled: true,
  },
};
