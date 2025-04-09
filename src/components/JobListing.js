import React, { useEffect, useState } from 'react';

const JobListing = ({ jobId, contract }) => {
  const [job, setJob] = useState(null);

  useEffect(() => {
    const loadJob = async () => {
      try {
        const job = await contract.methods.getJob(jobId).call();
        const ipfsHash = job.ipfsHash;
        const employer = job.employer;
    
        const res = await fetch(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`);
        const jobData = await res.json();
    
        setJob({ ...jobData, employer });
      } catch (err) {
        console.error("Error loading job:", err);
      }
    };
    

    loadJob();
  }, [jobId, contract]);

  if (!job) return <div>Loading job...</div>;

  return (
    <div className="job-card">
      <h2>{job.title}</h2>
      <p><strong>Desc:</strong> {job.description}</p>
      <p><strong>Skills:</strong> {job.requiredSkills.join(', ')}</p>
      <p><strong>Reward:</strong> {job.reward} ETH</p>
      <p><em>Posted by:</em> {job.employer}</p>
    </div>
  );
};

export default JobListing;

// src/pages/MyJobPostings.js
