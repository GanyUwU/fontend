

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/homepage';
import Profile from './pages/Profile';
import JobBoard from './pages/JobBoard';
import MyJobPostings from './pages/CreateJob';
import SignInPage from './pages/SignInPage';
import JobPostingForm from './components/JobPostingForm';
import JobListing from './components/JobListing';


 function App() {
  const userProfileContractAddress = '0x56839D327054cCF57503Dd7f1a691ad270DE3E15';
  const userProfileABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "ipfsHash",
          "type": "string"
        }
      ],
      "name": "CredentialUploaded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "email",
          "type": "string"
        }
      ],
      "name": "EmailUpdated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_ipfsHash",
          "type": "string"
        }
      ],
      "name": "uploadCredential",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_email",
          "type": "string"
        }
      ],
      "name": "setEmail",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "getUserProfile",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]; 
  const jobMatchingContractAddress = '0x9aA9E001ee27bFd654D71717FC7b09C74df9B35E';
  const jobMatchingABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "jobId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "employer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "ipfsHash",
          "type": "string"
        }
      ],
      "name": "JobPosted",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_ipfsHash",
          "type": "string"
        }
      ],
      "name": "createJobPosting",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_jobId",
          "type": "uint256"
        }
      ],
      "name": "getJob",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "jobId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "ipfsHash",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "employer",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getJobCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];
  

  return (
    <Router>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Home />} />

        {/* Sign in with MetaMask */}
        <Route
          path="/signin"
          element={
            <SignInPage
              userProfileABI={userProfileABI}
              contractAddress={userProfileContractAddress}
            />
          }
        />

        {/* View your profile */}
        <Route
          path="/profile"
          element={
            <Profile
              userProfileABI={userProfileABI}
              contractAddress={userProfileContractAddress}
            />
          }
        />

        {/* Browse all jobs */}
        <Route
          path="/jobs"
          element={
            <JobBoard
              jobMatchingABI={jobMatchingABI}
              contractAddress={jobMatchingContractAddress}
            />
          }
        />

        {/* Create a new job posting */}
        <Route
          path="/create-job"
          element={
            <JobPostingForm
              jobMatchingABI={jobMatchingABI}
              contractAddress={jobMatchingContractAddress}
            />
          }
        />

        {/* View jobs YOU have posted */}
        <Route
          path="/my-jobs"
          element={
            <JobListing
              jobMatchingABI={jobMatchingABI}
              contractAddress={jobMatchingContractAddress}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
