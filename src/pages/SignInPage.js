// src/pages/SignInPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import web3 from '../utils/web3';
import UserProfile from '../components/UserProfile';

const ROLE_NONE      = 'None';
const ROLE_JOBSEEKER = 'JobSeeker';
const ROLE_HR        = 'HR';

const SignInPage = ({ userProfileABI, contractAddress }) => {
  const [account, setAccount]       = useState('');
  const [role, setRole]             = useState(ROLE_NONE);
  const [loadingRole, setLoadingRole] = useState(false);
  const [txLoading, setTxLoading]   = useState(false);

  // Instantiate the UserProfile contract once we have an account
  const userProfileContract = account
    ? new web3.eth.Contract(userProfileABI, contractAddress)
    : null;

  // 1. Connect wallet
  const connectWallet = async () => {
    
    if (!window.ethereum) {
      return alert('MetaMask not detected. Please install it.');
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } catch (err) {
      console.error('Error connecting wallet:', err);
    }
  };

  // 2. Load on‑chain role
  const loadRole = async () => {
    if (!userProfileContract || !account) return;
    setLoadingRole(true);
    console.log('Loading role for account:', account);
    try {
      const roleValue = await userProfileContract.methods.getUserRole(account).call();
      console.log('Role value from contract:', roleValue); // Debugging line

    // Normalize roleValue to a number for comparison
      const normalizedRole = parseInt(roleValue); // Convert BigNumber or string to a number
      // roleValue is "0", "1", or "2"
      if (normalizedRole === 1) setRole(ROLE_JOBSEEKER);
      else if (normalizedRole === 2) setRole(ROLE_HR);
      else setRole(ROLE_NONE);
    } catch (err) {
      console.error('Error fetching role:', err);
    } finally {
      setLoadingRole(false);
    }
  };

  // Reload role whenever account changes
  useEffect(() => {
    if (account) loadRole();
  }, [account]);

  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setAccount('');
      }
    };
  
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }
  
    // Cleanup on unmount
    return () => {
      if (window.ethereum && handleAccountsChanged) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);
  


  // 3. Registration functions
  const registerAsJobSeeker = async () => {
    setTxLoading(true);
    try {
      const currentRole = await userProfileContract.methods
            .getUserRole(account)
            .call();          
        if (parseInt(currentRole) !== 0) {
            alert('Already registered!');
            return;
        }
      await userProfileContract.methods
        .registerAsJobSeeker()
        .send({ from: account });
      await loadRole();
      console.log('Registered as Job Seeker:', account);
    } catch (err) {
      console.error('Register JobSeeker failed:', err);
    } finally {
      setTxLoading(false);
    }
  };

  const registerAsHR = async () => {
    setTxLoading(true);
    try {
      const currentRole = await userProfileContract.methods
            .getUserRole(account)
            .call();
            
        if (parseInt(currentRole) !== 0) {
            alert('Already registered!');
            return;
        }
      await userProfileContract.methods
        .registerAsHR()
        .send({ from: account });
      await loadRole();
    } catch (err) {
      console.error('Register HR failed:', err);
    } finally {
      setTxLoading(false);
    }
  };

  // 4. Render
  if (!account) {
    return (
      <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
        <h1>Sign In</h1>
        <button onClick={connectWallet}>Connect with MetaMask</button>
      </div>
    );
  }

  if (loadingRole) {
    return <div>Loading your role…</div>;
  }

  if (role === ROLE_NONE) {
    return (
      <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
        <h1>Choose Your Role</h1>
        <p>Connected: {account}</p>
        <button onClick={registerAsJobSeeker} disabled={txLoading}>
          {txLoading ? 'Registering…' : 'Register as Job Seeker'}
        </button>
        <button onClick={registerAsHR} disabled={txLoading} style={{ marginLeft: 10 }}>
          {txLoading ? 'Registering…' : 'Register as HR'}
        </button>
      </div>
    );
  }

  // Once registered:
  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Welcome, {role}</h1>
      <p>Connected account: {account}</p>

      {/* Show the immutable profile */}
      {/* <UserProfile
        userAddress={account}
        userProfileABI={userProfileABI}
        contractAddress={contractAddress}
      /> */}

      {/* Role‑specific navigation */}
      {role === ROLE_JOBSEEKER && (
        <div style={{ marginTop: 20 }}>
          <p>You can upload credentials and browse jobs:</p>
          <Link to="/upload-cred">Upload Credential</Link><br/>
          <Link to="/jobs">Browse Jobs</Link>
        </div>
      )}

      {role === ROLE_HR && (
        <div style={{ marginTop: 20 }}>
          <p>You can post new jobs and view your postings:</p>
          <Link to="/create-job">Post a Job</Link><br/>
          <Link to="/my-jobs">My Postings</Link>
        </div>
      )}
    </div>
  );
};

export default SignInPage;
