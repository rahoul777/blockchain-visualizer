const hre = require("hardhat");

async function main() {
  const BlockChain = await hre.ethers.getContractFactory("BlockChain");

  // Deploy the contract
  const blockchain = await BlockChain.deploy();
  await blockchain.waitForDeployment();

  // Log the deployed address
  const address = await blockchain.getAddress();
  console.log("Contract deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
