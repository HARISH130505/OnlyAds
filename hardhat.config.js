// filepath: e:\programming\hackverse-2025\backend\AdReviewPlatform\hardhat.config.js
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: process.env.API_URL, // Use API_URL from .env
      accounts: [process.env.PRIVATE_KEY], // Use PRIVATE_KEY from .env
    },
  },
};
