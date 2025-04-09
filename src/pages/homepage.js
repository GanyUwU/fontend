// src/pages/Home.js
import React from 'react';
import CredentialForm from '../components/CredentialForm';
import JobListing from '../components/JobListing';
import JobPostingForm from '../components/JobPostingForm';
import UserProfile from '../components/UserProfile';
import './Home.css';  // Import the CSS file
import web3 from '../utils/web3';


// // Dummy job data for demonstration
// const dummyJob = {
//   title: "Frontend Developer",
//   description: "We are looking for a skilled frontend developer with experience in React.",
//   reward: "0.5 ETH",
//   employer: "Blockchain Inc."
// };
const contractAddress = "0x9aA9E001ee27bFd654D71717FC7b09C74df9B35E"; // ✅ same as JobPostingForm
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
const jobContract = new web3.eth.Contract(jobMatchingABI, contractAddress);

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Blockchain Career Platform</h1>

      <section className="section">
        <h2>User Profile</h2>
        <UserProfile 
          userAddress="0x468Cd5e516a278547950aCA503529eDA2C807e08" 
          userProfileABI={[
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
              "type": "function"
            }
          ]} 
          contractAddress="0x56839D327054cCF57503Dd7f1a691ad270DE3E15" 
        />
      </section>

      <section className="section">
        <h2>Upload Credential</h2>
        <CredentialForm 
         userProfileABI={
          [
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
            "type": "function"
          }
        ]} 
        contractAddress="0x8B3199d62C55e20Ef07d5738F55e3D0fE992AF39" 
        />
      </section>

      <section className="section">
        <h2>Post a Job</h2>
        <JobPostingForm 
          jobMatchingABI={jobMatchingABI}
          contractAddress="0x9aA9E001ee27bFd654D71717FC7b09C74df9B35E" 
        />
      </section>
      
      <section className="section">
        <h2>Job Listings</h2>
        <JobListing jobId={0} contract={jobContract} />
      </section>
    </div>
  );
};

export default Home;
