// components/UserProfile.js
import React, { useState, useEffect } from 'react';
import web3 from '../utils/web3'; // Import your web3 instance

const UserProfile = ({ userAddress, userProfileABI, contractAddress }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const userProfiles = new web3.eth.Contract(userProfileABI, contractAddress);
      const profileData = await userProfiles.methods.getUserProfile(userAddress).call();
      // Destructure properly
      const [name, email, ipfsHash] = profileData;
      setProfile({ name, email, ipfsHash });
    };
    

    loadProfile();
  }, [userAddress, userProfileABI, contractAddress]);

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <h2>{profile.name}</h2>
      <p>Email: {profile.email}</p>
      <p>IPFS Hash: {profile.ipfsHash}</p>
      {/* You can fetch and display the detailed profile from IPFS here */}
    </div>
  );
};

export default UserProfile;
