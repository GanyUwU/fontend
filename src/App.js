

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/homepage';
import web3 from './utils/web3';
import JobBoard from './pages/JobBoard';
import MyJobPostings from './pages/CreateJob';
import SignInPage from './pages/SignInPage';
import JobPostingForm from './components/JobPostingForm';
import PrivateRoute from './components/PrivateRoute';
import CredentialForm from './components/CredentialForm';
import Resume from './api/resume';



 function App() {
  const userProfileContractAddress = '0xE9BA90c01bc61918b0A7941846E4a208E8251763';
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
          "internalType": "enum UserProfile.Role",
          "name": "role",
          "type": "uint8"
        }
      ],
      "name": "RoleAssigned",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "roles",
      "outputs": [
        {
          "internalType": "enum UserProfile.Role",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "registerAsJobSeeker",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "registerAsHR",
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
      "name": "getUserRole",
      "outputs": [
        {
          "internalType": "enum UserProfile.Role",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
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
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "email",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "ipfsHash",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]; 
  const jobMatchingContractAddress = '0xa9bE53E9853F120BbA5122E328b0941Da4Fda161';
  const jobMatchingABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "userProfileAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
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
      "inputs": [],
      "name": "userProfile",
      "outputs": [
        {
          "internalType": "contract UserProfile",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
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
  
  const [account, setAccount] = React.useState(null);
  const [role, setRole] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    const fetchAccountAndRole = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const acc = accounts[0];
        setAccount(acc);

        if (acc) {
          const contract = new web3.eth.Contract(userProfileABI, userProfileContractAddress);
          const roleValue = await contract.methods.getUserRole(acc).call();
          const normalizedRole = parseInt(roleValue);

          if (normalizedRole === 1) setRole('JobSeeker');
          else if (normalizedRole === 2) setRole('HR');
          else setRole('None');
        }
      }
      setLoading(false); // ✅ now we can render routes
    };

    fetchAccountAndRole();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0]);
        fetchAccountAndRole();
      });
    }
  }, [userProfileABI, userProfileContractAddress]);

  if (loading) return <div style={{ padding: 20 }}>Checking your role...</div>; // ✅

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home
          userProfileABI={userProfileABI}
          contractAddress={userProfileContractAddress}
          jobMatchingABI={jobMatchingABI}
          jobMatchingContractAddress={jobMatchingContractAddress}
        />} />

        <Route path="/signin" element={<SignInPage
          userProfileABI={userProfileABI}
          contractAddress={userProfileContractAddress}
        />} />

        <Route path="/upload-cred" element={
          <PrivateRoute allowedRole="JobSeeker" currentRole={role}
          account={account}>
            <CredentialForm
              userProfileABI={userProfileABI}
              contractAddress={userProfileContractAddress}
            />
          //</PrivateRoute>
        } />

        <Route path="/resume-review" element={<Resume/>} />


        <Route path="/jobs" element={
          <PrivateRoute allowedRole="JobSeeker" currentRole={role}
          account={account}>
            <JobBoard
              jobMatchingABI={jobMatchingABI}
              jobMatchingContractAddress={jobMatchingContractAddress}
            />
          </PrivateRoute>
        } />

        <Route path="/create-job" element={
          <PrivateRoute 
            allowedRole="HR"
            currentRole={role}
            account={account}>
            <JobPostingForm
              jobMatchingABI={jobMatchingABI}
              contractAddress={jobMatchingContractAddress}
            />
          </PrivateRoute>
        } />

        <Route path="/my-jobs" element={
          <PrivateRoute allowedRole="HR" currentRole={role}
          account={account}>
            <MyJobPostings
              jobMatchingABI={jobMatchingABI}
              contractAddress={jobMatchingContractAddress}
            />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
