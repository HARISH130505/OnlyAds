const { run } = require("hardhat");

async function main() {
    const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your deployed contract address

    console.log("Verifying contract...");

    await run("verify:verify", {
        address: contractAddress,
        constructorArguments: [],
    });

    console.log("Contract verified successfully!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });