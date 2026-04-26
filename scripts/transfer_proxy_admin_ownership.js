const { ethers, upgrades } = require("hardhat");

async function main() {
  const PROXY_ADDRESS = "0x8A1de66fb381f04FEc8452FACFF932226F23c3D2";

  // Get the ProxyAdmin address
  const adminAddress = await upgrades.erc1967.getAdminAddress(PROXY_ADDRESS);
  console.log("ProxyAdmin address:", adminAddress);

  // Get the current signer
  const [signer] = await ethers.getSigners();
  console.log("Current signer:", signer.address);

  // ProxyAdmin ABI for ownership transfer
  const proxyAdminAbi = [
    "function transferOwnership(address newOwner) external"
  ];

  const proxyAdmin = new ethers.Contract(adminAddress, proxyAdminAbi, signer);

  console.log("Transferring ProxyAdmin ownership to:", signer.address);

  const tx = await proxyAdmin.transferOwnership(signer.address);
  await tx.wait();

  console.log("✅ ProxyAdmin ownership transferred!");
  console.log("Now you can run the upgrade script.");
}

main().catch((error) => {
  console.error("Transfer failed:", error);
  process.exitCode = 1;
});