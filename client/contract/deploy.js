async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const _voteTime = 3600;
  const _quorum = 51;

  const tokenFactory = await ethers.getContractFactory("SourabhToken");

  const tokenInstance = await tokenFactory.deploy(_voteTime, _quorum);

  console.log("token address:", await tokenInstance.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
