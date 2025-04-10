// pages/JobBoard.js
import React, { useEffect, useState } from 'react';
import web3 from '../utils/web3';
import JobListing from '../components/JobListing';

const JobBoard = ({ jobMatchingABI, jobMatchingContractAddress}) => {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("ABI:", jobMatchingABI);
  console.log("Contract address:", jobMatchingContractAddress);

  jobMatchingContractAddress="0xa9bE53E9853F120BbA5122E328b0941Da4Fda161";
  console.log("Contract address:", jobMatchingContractAddress);
  
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const contract = new web3.eth.Contract(jobMatchingABI,jobMatchingContractAddress);
        const jobCount = await contract.methods.getJobCount().call();
        const jobs = [];
        console.log(contract);

        for (let i = 0; i < jobCount; i++) {
          const job = await contract.methods.getJob(i).call();
          const ipfsHash = job.ipfsHash;
          const employer = job.employer;

          try {
            const res = await fetch(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`);
            const metadata = await res.json();

            jobs.push({ ...metadata, employer, jobId: i });
          } catch (ipfsErr) {
            console.error(`Error loading IPFS data for job ${i}:`, ipfsErr);
          }
        }

        setJobData(jobs);
      } catch (err) {
        console.error("Error loading jobs from contract:", err);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [jobMatchingABI, jobMatchingContractAddress]);

  if (loading) return <p>Loading job board…</p>;

  return (
    <div>
      <h2>Job Board</h2>
      {jobData.length > 0 ? (
        jobData.map((job, index) => (
          <div key={index} style={{ border: '1px solid #ddd', padding: 15, marginBottom: 15 }}>
            <h3>{job.title}</h3>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Required Skills:</strong> {job.requiredSkills.join(', ')}</p>
            <p><strong>Reward:</strong> {job.reward} ETH</p>
            <p><em>Posted by:</em> {job.employer}</p>
            <button style={{ marginTop: 10 }}>Apply</button>
          </div>
        ))
      ) : (
        <p>No jobs posted yet.</p>
      )}
    </div>
  );
};

export default JobBoard;
