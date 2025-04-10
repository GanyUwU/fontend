// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UserProfile.sol";

contract JobMatching {
    struct Job {
        uint256 jobId;
        string ipfsHash;
        address employer;
    }

    Job[] private jobs;
    UserProfile public userProfile;

    constructor(address userProfileAddress) {
        userProfile = UserProfile(userProfileAddress);
    }

    // Only allow addresses registered as HR in the UserProfile contract
    modifier onlyHR() {
        require(
            userProfile.getUserRole(msg.sender) == UserProfile.Role.HR,
            "Only HR can post jobs"
        );
        _;
    }

    event JobPosted(
        uint256 indexed jobId,
        address indexed employer,
        string ipfsHash
    );

    function createJobPosting(string memory _ipfsHash) public onlyHR {
        uint256 jobId = jobs.length;
        jobs.push(Job({
            jobId: jobId,
            ipfsHash: _ipfsHash,
            employer: msg.sender
        }));
        emit JobPosted(jobId, msg.sender, _ipfsHash);
    }

    function getJob(uint256 _jobId)
        public
        view
        returns (
            uint256 jobId,
            string memory ipfsHash,
            address employer
        )
    {
        require(_jobId < jobs.length, "Job does not exist");
        Job storage job = jobs[_jobId];
        return (job.jobId, job.ipfsHash, job.employer);
    }

    function getJobCount() public view returns (uint256) {
        return jobs.length;
    }
}
