import { ethers } from "hardhat";

async function main() {
  const Transfer = await ethers.getContractFactory("myNFT");
  const transfer = await Transfer.deploy();

  await transfer.deployed();

  console.log(`deployed to ${transfer.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
