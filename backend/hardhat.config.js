require("@nomiclabs/hardhat-ethers");
require("dotenv").config()



const BINANCE_URL = process.env.BINANCE_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;


module.exports = {
  solidity: "0.8.17",
  networks: {
    testnet: {
      url: BINANCE_URL,
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [PRIVATE_KEY]
    }
  }
};