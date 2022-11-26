import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";

require('dotenv').config();
const { ALCHEMY_API_URL, OWNER_PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;
const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    hardhat: {},
    goerli: {
      url: ALCHEMY_API_URL,
      accounts: [String(OWNER_PRIVATE_KEY)],
    },
    mainnet: {
      url: ALCHEMY_API_URL,
      accounts: [String(OWNER_PRIVATE_KEY)],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  }
};

export default config;
