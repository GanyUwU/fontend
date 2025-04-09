// contracts/JobMatching.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JobMatching {
    // Each job is now represented by its IPFS hash + poster
    struct Job {
        uint256 jobId;
        string ipfsHash;    // IPFS CID of the job JSON
        address employer;   // who posted it
    }

    Job[] private jobs;

    // Emitted when a new job is posted
    event JobPosted(
        uint256 indexed jobId,
        address indexed employer,
        string ipfsHash
    );

    /// @notice Post a new job by supplying the IPFS hash of its JSON data
    /// @param _ipfsHash The CID where the job details JSON is pinned
    function createJobPosting(string memory _ipfsHash) public {
        uint256 jobId = jobs.length;
        jobs.push(Job({
            jobId: jobId,
            ipfsHash: _ipfsHash,
            employer: msg.sender
        }));
        emit JobPosted(jobId, msg.sender, _ipfsHash);
    }

    /// @notice Get the CID and poster for a given job
    /// @param _jobId The index of the job
    /// @return jobId The job’s ID
    /// @return ipfsHash The CID of the job data
    /// @return employer The address that posted the job
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

    /// @notice How many jobs have been posted so far
    /// @return The total count of jobs
    function getJobCount() public view returns (uint256) {
        return jobs.length;
    }
}
