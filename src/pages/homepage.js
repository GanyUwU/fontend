// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import CredentialForm from '../components/CredentialForm';
import JobBoard from './JobBoard'; // ✅ use JobBoard instead of JobListing
import JobPostingForm from '../components/JobPostingForm';
import './Home.css';
import web3 from '../utils/web3';
import { Navigate } from 'react-router-dom';

const Home = ({ userProfileABI, contractAddress, jobMatchingABI, jobMatchingContractAddress }) => {
  const [account, setAccount] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then(accs => setAccount(accs[0] || null));

      window.ethereum.on('accountsChanged', accs => setAccount(accs[0] || null));
    }
  }, []);

  useEffect(() => {
    const fetchRole = async () => {
      if (!account) return;
      try {
        const userProfile = new web3.eth.Contract(userProfileABI, contractAddress);
        const roleCode = await userProfile.methods.getUserRole(account).call();
        const roleMap = {
          1: 'JobSeeker',
          2: 'HR',
        };
        setRole(roleMap[roleCode] || null);
      } catch (err) {
        console.error('Error fetching role:', err);
      }
    };

    fetchRole();
  }, [account, userProfileABI, contractAddress]);

  if (!account) return <Navigate to="/signin" />;

  return (
    <div className="home-container">
      <h1>Welcome to the Blockchain Career Platform, {account}</h1>

      {/* 👩‍💻 Job Seeker View */}
      {role === 'JobSeeker' && (
        <>
          <section className="section">
            <h2>Upload Credential</h2>
            <CredentialForm
              userProfileABI={userProfileABI}
              contractAddress={contractAddress}
            />
          </section>
          <section className="section">
            <h2>Job Listings</h2>
            <JobBoard
              jobMatchingABI={jobMatchingABI}
              jobMatchingContractAddress={jobMatchingContractAddress}
            />
          </section>
        </>
      )}

      {/* 🧑‍💼 HR View */}
      {role === 'HR' && (
        <>
          <section className="section">
            <h2>Post a Job</h2>
            <JobPostingForm
              jobMatchingABI={jobMatchingABI}
              contractAddress={jobMatchingContractAddress}
            />
          </section>
          <section className="section">
            <h2>Job Listings</h2>
            <JobBoard
              jobMatchingABI={jobMatchingABI}
              jobMatchingContractAddress={jobMatchingContractAddress}
              filterByEmployer={account}
            />
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
