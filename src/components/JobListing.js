// // components/JobListing.js
// import React from 'react';

// const JobListing = ({ job }) => {
//   return (
//     <div>
//       <h3>{job.title}</h3>
//       <p>{job.description}</p>
//       <p>Reward: {job.reward}</p>
//       <p>Employer: {job.employer}</p>
//       {/* Display other job details */}
//     </div>
//   );
// };

// export default JobListing;

// src/pages/MyJobPostings.js
import React, { useState, useEffect } from 'react';
import web3 from '../utils/web3';
import JobListing from '../components/JobListing';

const MyJobPostings = ({ jobMatchingABI, contractAddress }) => {
  const [myJobs, setMyJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAccount, setCurrentAccount] = useState('');

  useEffect(() => {
    const loadMyJobs = async () => {
      try {
        // Get the current connected account from MetaMask
        const accounts = await web3.eth.getAccounts();
        const myAccount = accounts[0];
        setCurrentAccount(myAccount);

        // Create an instance of the JobMatching contract
        const jobContract = new web3.eth.Contract(jobMatchingABI, contractAddress);

        // Retrieve the total number of job postings
        const jobCount = await jobContract.methods.getJobCount().call();
        const jobsList = [];

        // Loop through each job posting
        for (let i = 0; i < jobCount; i++) {
          const job = await jobContract.methods.getJob(i).call();
          // job returns an array: [title, description, requiredSkills, reward, employer]
          // Filter for jobs where the employer matches the current account
          if (job[4].toLowerCase() === myAccount.toLowerCase()) {
            jobsList.push({
              title: job[0],
              description: job[1],
              requiredSkills: job[2],
              reward: job[3],
              employer: job[4],
            });
          }
        }
        setMyJobs(jobsList);
      } catch (error) {
        console.error("Error loading your jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMyJobs();
  }, [jobMatchingABI, contractAddress]);

  if (loading) {
    return <div>Loading your job postings...</div>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>My Job Postings</h1>
      {myJobs.length > 0 ? (
        myJobs.map((job, index) => <JobListing key={index} job={job} />)
      ) : (
        <p>You have not posted any jobs yet.</p>
      )}
    </div>
  );
};

export default MyJobPostings;
