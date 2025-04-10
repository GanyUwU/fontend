import React, { useEffect, useState } from 'react';
import './JobListing.css';


const JobListing = ({ jobId, contract }) => {
  const [job, setJob] = useState(null);

  useEffect(() => {
    const loadJob = async () => {
      if (!contract || !contract.methods) {
        console.error("Contract is undefined or invalid in JobListing");
        return;
      }

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
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Skills:</strong> {job.requiredSkills?.join(', ')}</p>
      <p><strong>Reward:</strong> {job.reward} ETH</p>
      <p><em>Posted by:</em> {job.employer}</p>
      <button>Apply</button>
    </div>
  );
};

export default JobListing;
