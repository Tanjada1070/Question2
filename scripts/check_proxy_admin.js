const { ethers, upgrades } = require("hardhat");

async function main() {
  const PROXY_ADDRESS = "0x8A1de66fb381f04FEc8452FACFF932226F23c3D2";

  console.log("Checking ProxyAdmin for ShipmentTracker contract...");

  // Get the admin instance
  const adminAddress = await upgrades.erc1967.getAdminAddress(PROXY_ADDRESS);
  console.log("ProxyAdmin address:", adminAddress);

  // Get the ProxyAdmin contract using the address
  const proxyAdminAbi = [
    "function owner() view returns (address)"
  ];
  const ProxyAdmin = new ethers.Contract(adminAddress, proxyAdminAbi, ethers.provider);

  const owner = await ProxyAdmin.owner();
  console.log("ProxyAdmin owner:", owner);

  // Also check the current signer
  const [signer] = await ethers.getSigners();
  const signerAddress = await signer.getAddress();
  console.log("Current signer:", signerAddress);

  if (owner.toLowerCase() === signerAddress.toLowerCase()) {
    console.log("✅ Signer is the ProxyAdmin owner");
  } else {
    console.log("❌ Signer is NOT the ProxyAdmin owner");
  }
}

main().catch((error) => {
  console.error("Error:", error);
  process.exitCode = 1;
});