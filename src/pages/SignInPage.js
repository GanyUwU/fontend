// src/pages/SignInPage.js
import React, { useState } from 'react';
import UserProfile from '../components/UserProfile';

const SignInPage = ({ userProfileABI, contractAddress }) => {
  const [account, setAccount] = useState('');

  // Function to connect to MetaMask and retrieve the account address
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this feature.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Sign In</h1>
      {account ? (
        <div>
          <p>Connected account: {account}</p>
          {/* Display the user profile with the connected account */}
          <UserProfile 
            userAddress={account} 
            userProfileABI={userProfileABI} 
            contractAddress={contractAddress} 
          />
        </div>
      ) : (
        <button onClick={connectWallet} style={{ padding: '10px 20px', fontSize: '16px' }}>
          Connect with MetaMask
        </button>
      )}
    </div>
  );
};

export default SignInPage;
