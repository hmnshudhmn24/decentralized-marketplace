# Decentralized Marketplace

A smart contract-powered decentralized marketplace where users can list and buy digital assets using Ethereum.

## Features
- List digital assets with a price in ETH.
- Buy assets directly from the contract.
- Fully decentralized, trustless transactions.

## Setup Instructions

1. Clone the repository:
   ```sh
   git clone https://github.com/YOUR_GITHUB_USERNAME/decentralized-marketplace.git
   cd decentralized-marketplace
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Deploy the contract:
   ```sh
   npx hardhat run scripts/deploy.js --network goerli
   ```

4. Update `App.js` with your deployed contract address.

5. Start the React frontend:
   ```sh
   npm start
   ```

## Technologies Used
- Solidity
- Hardhat
- React
- Web3.js
