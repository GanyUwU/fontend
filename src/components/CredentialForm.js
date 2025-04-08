// components/CredentialForm.js
import React, { useState } from 'react';
import web3 from '../utils/web3';
import { uploadToIPFS } from '../utils/ipfs';

const CredentialForm = ({ userProfileABI, contractAddress }) => {
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // Add loading state

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(file);
  
    if (!file) {
      alert('Please select a file');
      return;
    }
  
    try {
      // 1. Read file content as ArrayBuffer (browser-native way)
      const arrayBuffer = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
  
      // 2. Convert to Uint8Array (browser alternative to Buffer)
      const fileData = new Uint8Array(arrayBuffer);
  
      // 3. Upload to IPFS
      const ipfsUrl = await uploadToIPFS(fileData);
  
      // 4. Get accounts
      const accounts = await web3.eth.getAccounts();
      if (!accounts[0]) {
        alert('No connected account found');
        return;
      }
  
      // 5. Store on blockchain
      const userProfiles = new web3.eth.Contract(userProfileABI, contractAddress);
      await userProfiles.methods.uploadCredential(name, ipfsUrl)
        .send({ from: accounts[0] });
      
      alert('Credential uploaded successfully!');
      
    } catch (error) {
      console.error('Error:', error);
      alert(`Upload failed: ${error.message}`);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Credential Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Upload Credential:</label>
        <input type="file" onChange={handleFileChange} />
      </div>
      <button type="submit" disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload Credential'}
      </button>
    </form>
  );
};

export default CredentialForm;
