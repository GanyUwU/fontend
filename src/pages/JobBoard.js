// pages/JobBoard.js
import React, { useState, useEffect } from 'react';
import web3 from '../utils/web3';
import JobListing from '../components/JobListing';

const JobBoard = ({jobMatchingABI, contractAddress}) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const loadJobs = async () => {
      const jobMatching = new web3.eth.Contract(jobMatchingABI, contractAddress);
      // Logic to fetch job postings from your smart contract
      // Example (adjust according to your contract's functions):
      const jobCount = await jobMatching.methods.jobCounter().call();
      const jobList = [];

      for (let i = 0; i < jobCount; i++) {
        const job = await jobMatching.methods.getJobPosting(i).call();
        jobList.push(job);
      }
      setJobs(jobList);
    };

    loadJobs();
  }, [jobMatchingABI, contractAddress]);

  return (
    <div>
      <h2>Job Board</h2>
      {jobs.map((job, index) => (
        <JobListing key={index} job={job} />
      ))}
    </div>
  );
};

export default JobBoard;
