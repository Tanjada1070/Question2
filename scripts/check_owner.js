const { ethers } = require("hardhat");

async function main() {
  const PROXY_ADDRESS = "0x8A1de66fb381f04FEc8452FACFF932226F23c3D2";

  console.log("Checking owner of ShipmentTracker contract...");

  // Get the contract instance
  const ShipmentTracker = await ethers.getContractAt("ShipmentTracker", PROXY_ADDRESS);

  const owner = await ShipmentTracker.owner();
  console.log("Current owner:", owner);

  // Also check the current signer
  const [signer] = await ethers.getSigners();
  const signerAddress = await signer.getAddress();
  console.log("Current signer:", signerAddress);

  if (owner.toLowerCase() === signerAddress.toLowerCase()) {
    console.log("✅ Signer is the owner");
  } else {
    console.log("❌ Signer is NOT the owner");
  }
}

main().catch((error) => {
  console.error("Error:", error);
  process.exitCode = 1;
});