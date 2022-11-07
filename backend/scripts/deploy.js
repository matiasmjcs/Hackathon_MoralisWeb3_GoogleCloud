const hre = require("hardhat");

async function main() {
  const MedicalCenter = await hre.ethers.getContractFactory("medicalCenter");
  const medicalCenter = await MedicalCenter.deploy();

  await medicalCenter.deployed();

  console.log(
    ` deployed to ${medicalCenter.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
