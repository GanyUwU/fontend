import React, { useState, useEffect } from 'react';
import web3 from '../utils/web3';
import axios from 'axios';
import JobListing from '../components/JobListing';

const MyJobPostings = ({ jobMatchingABI, contractAddress }) => {
  const [myJobs, setMyJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMyJobs = async () => {
      try {
        // 1. Get connected account
        const accounts = await web3.eth.getAccounts();
        const myAccount = accounts[0];
        if (!myAccount) throw new Error('No wallet connected');

        // 2. Contract instance
        const jobContract = new web3.eth.Contract(jobMatchingABI, contractAddress);

        // 3. How many jobs?
        const jobCount = await jobContract.methods.getJobCount().call();

        const jobsList = [];
        // 4. Loop & fetch each job
        for (let i = 0; i < jobCount; i++) {
          const [id, ipfsHash, employer] = await jobContract.methods.getJob(i).call();

          // Only include jobs you posted
          if (employer.toLowerCase() !== myAccount.toLowerCase()) continue;

          // 5. Fetch JSON from IPFS
          const { data: jobData } = await axios.get(
            `https://gateway.pinata.cloud/ipfs/${ipfsHash}`
          );

          jobsList.push({
            id,
            employer,
            ...jobData
          });
        }

        setMyJobs(jobsList);
      } catch (err) {
        console.error('Error loading jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMyJobs();
  }, [jobMatchingABI, contractAddress]);

  if (loading) {
    return <div>Loading your job postings…</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>My Job Postings</h1>
      {myJobs.length > 0 ? (
        myJobs.map(job => (
          <JobListing key={job.id} job={job} />
        ))
      ) : (
        <p>You have not posted any jobs yet.</p>
      )}
    </div>
  );
};

export default MyJobPostings;
