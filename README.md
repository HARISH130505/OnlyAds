# AdReviewPlatform

## Overview
The AdReviewPlatform is a decentralized application (dApp) built on the Ethereum blockchain that allows users to register companies, add products, and submit reviews for those products. The platform aims to provide a transparent and reliable way for consumers to share their experiences and for companies to showcase their offerings.

## Project Structure
```
AdReviewPlatform
├── contracts
│   └── AdReviewPlatform.sol       # Solidity smart contract for the AdReviewPlatform
├── scripts
│   ├── deploy.js                  # Script to deploy the smart contract to the Sepolia network
│   └── verify.js                  # Script to verify the deployed contract on Etherscan
├── test
│   └── AdReviewPlatform.test.js    # Test cases for the smart contract
├── .env                            # Environment variables for sensitive information
├── hardhat.config.js              # Hardhat configuration file
├── package.json                   # npm configuration file
├── README.md                      # Project documentation
└── .vscode
    ├── settings.json              # Workspace-specific settings for Visual Studio Code
    └── launch.json                # Debugging configuration for the project
```

## Setup Instructions
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd AdReviewPlatform
   ```

2. **Install Dependencies**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Update the `.env` file with your Ethereum wallet's private key, Infura project ID, and Etherscan API key.

4. **Deploy the Smart Contract**
   To deploy the smart contract to the Sepolia network, run:
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

5. **Verify the Smart Contract**
   After deployment, you can verify the contract on Etherscan using:
   ```bash
   npx hardhat run scripts/verify.js --network sepolia
   ```

## Testing
To run the test cases for the smart contract, use:
```bash
npx hardhat test
```

## License
This project is licensed under the MIT License.