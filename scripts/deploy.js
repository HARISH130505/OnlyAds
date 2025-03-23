const hre = require("hardhat");

async function main() {
    const AdReviewPlatform = await hre.ethers.getContractFactory("AdReviewPlatform");
    const adReviewPlatform = await AdReviewPlatform.deploy();

    await adReviewPlatform.deployed();

    console.log("AdReviewPlatform deployed to:", adReviewPlatform.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });