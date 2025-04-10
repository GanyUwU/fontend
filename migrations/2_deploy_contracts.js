const UserProfile = artifacts.require("UserProfile");
const JobMatching = artifacts.require("JobMatching");

module.exports = async function (deployer) {
  await deployer.deploy(UserProfile);
  const userProfileInstance = await UserProfile.deployed();

  await deployer.deploy(JobMatching, userProfileInstance.address);
};
