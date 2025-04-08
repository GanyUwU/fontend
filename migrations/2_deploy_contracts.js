const UserProfile = artifacts.require("UserProfile");
const JobMatching = artifacts.require("JobMatching");

module.exports = async function(deployer) {
  // Deploy the UserProfile contract
  await deployer.deploy(UserProfile);

  // Deploy the JobMatching contract
  await deployer.deploy(JobMatching);
};
