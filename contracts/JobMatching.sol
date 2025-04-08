// contracts/JobMatching.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JobMatching {
    // Structure to hold job details
    struct Job {
        uint256 jobId;
        string title;
        string description;
        string[] requiredSkills;
        uint256 reward;
        address employer;
    }

    // Array to store job postings
    Job[] private jobs;

    // Event emitted when a new job is posted
    event JobPosted(uint256 indexed jobId, address indexed employer, string title);

    // Function to create a new job posting
    function createJobPosting(
        string memory _title,
        string memory _description,
        string[] memory _requiredSkills,
        uint256 _reward
    ) public {
        uint256 jobId = jobs.length;
        jobs.push(Job(jobId, _title, _description, _requiredSkills, _reward, msg.sender));
        emit JobPosted(jobId, msg.sender, _title);
    }

    // Function to retrieve job details by jobId
    function getJob(uint256 _jobId)
        public
        view
        returns (
            string memory title,
            string memory description,
            string[] memory requiredSkills,
            uint256 reward,
            address employer
        )
    {
        require(_jobId < jobs.length, "Job does not exist");
        Job memory job = jobs[_jobId];
        return (job.title, job.description, job.requiredSkills, job.reward, job.employer);
    }

    // Function to get the total number of jobs posted
    function getJobCount() public view returns (uint256) {
        return jobs.length;
    }
}
