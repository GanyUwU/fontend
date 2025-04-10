import React, { useState, useEffect } from 'react';
import web3 from '../utils/web3';
import './MyJobPostings.css';

const MyJobPostings = ({ jobMatchingABI, contractAddress }) => {
  const [myJobs, setMyJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAccount, setCurrentAccount] = useState('');

  useEffect(() => {
    const loadMyJobs = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        const myAccount = accounts[0];
        setCurrentAccount(myAccount);

        const jobContract = new web3.eth.Contract(jobMatchingABI, contractAddress);
        const jobCount = await jobContract.methods.getJobCount().call();
        const jobList = [];

        for (let i = 0; i < jobCount; i++) {
          const job = await jobContract.methods.getJob(i).call();
          if (job.employer.toLowerCase() === myAccount.toLowerCase()) {
            const res = await fetch(`https://gateway.pinata.cloud/ipfs/${job.ipfsHash}`);
            const metadata = await res.json();
            jobList.push({
              ...metadata,
              jobId: i,
              employer: job.employer
            });
          }
        }

        setMyJobs(jobList);
      } catch (error) {
        console.error("Error loading job postings:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMyJobs();
  }, [jobMatchingABI, contractAddress]);

  // const back = () => {
  //   window.history.back(); // Go back to the previous page
  // };

  return (
    <div className="my-jobs-container">
      <h2>My Job Postings</h2>
      {loading ? (
        <p>Loading your jobs...</p>
      ) : myJobs.length === 0 ? (
        <p>You haven't posted any jobs yet.</p>
      ) : (
        myJobs.map((job, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: 15, marginBottom: 15 }}>
            <h3>{job.title}</h3>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Skills:</strong> {job.requiredSkills.join(', ')}</p>
            <p><strong>Reward:</strong> {job.reward} ETH</p>
            <p><em>Posted by:</em> {job.employer}</p>
          </div>
        ))
      )}
      
    </div>
  );
};

export default MyJobPostings;
