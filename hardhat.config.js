require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const ALCHEMY_API_KEY = "L391508YD70GVdSZaKD2eEfbag12Jm8x";
const SEPOLIA_PRIVATE_KEY =
  "b9d9221b388aa929da06b6063e4fd7b59e293656cad06702f40493f16d1637ef";

module.exports = {
  solidity: "0.8.20",

  paths: {
    sources: "./client/contract", // Specify the correct path to your contracts(main contract)
  },
  contracts: ["SourabhToken.sol", "Ownable.sol", "ERC20.sol"], //specify the other contract here with main contract

  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/L391508YD70GVdSZaKD2eEfbag12Jm8x",
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
};
