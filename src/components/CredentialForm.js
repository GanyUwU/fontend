// components/CredentialForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './CredentialForm.css';


const CredentialForm = ({ userProfileABI, contractAddress }) => {
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // Add loading state
  const [fileUrl, setFileUrl] = useState('');

  
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log(file);
  
  //   if (!file) {
  //     alert('Please select a file');
  //     return;
  //   }
  
  //   try {
  //     // 1. Read file content as ArrayBuffer (browser-native way)
  //     const arrayBuffer = await new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.readAsArrayBuffer(file);
  //       reader.onload = () => resolve(reader.result);
  //       reader.onerror = (error) => reject(error);
  //     });
  
  //     // 2. Convert to Uint8Array (browser alternative to Buffer)
  //     const fileData = new Uint8Array(arrayBuffer);
  
  //     // 3. Upload to IPFS
  //     const ipfsUrl = await uploadToIPFS(fileData);
  
  //     // 4. Get accounts
  //     const accounts = await web3.eth.getAccounts();
  //     if (!accounts[0]) {
  //       alert('No connected account found');
  //       return;
  //     }
  
  //     // 5. Store on blockchain
  //     const userProfiles = new web3.eth.Contract(userProfileABI, contractAddress);
  //     await userProfiles.methods.uploadCredential(name, ipfsUrl)
  //       .send({ from: accounts[0] });
      
  //     alert('Credential uploaded successfully!');
      
  //   } catch (error) {
  //     console.error('Error:', error);
  //     alert(`Upload failed: ${error.message}`);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fileData = new FormData();
      fileData.append("file",file);
      const responseData = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: fileData,
        headers:{
          pinata_api_key: "c8e234b97874af461ee4",
          pinata_secret_api_key: "df423872210f046c5501e73dd9e546688306ece63cf7360a2ca6ed4e3d5c4046",
          "Content-Type": "multipart/form-data",
        },
      });
      const fileUrl = 
      "https://gateway.pinata.cloud/ipfs/" + responseData.data.IpfsHash;
      setFileUrl(fileUrl);
      console.log(fileUrl);
    }catch(err) {
      console.log(err);
    }

  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="credential-form">
      <div>
        <label>Credential Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Upload Credential:</label>
        <input type="file" onChange={(e)=>setFile(e.target.files[0])}/>
      </div>
     
      <button type="submit" onClick={handleSubmit}>
        {isUploading ? 'Uploading...' : 'Upload Credential'}
      </button>
      {
        fileUrl && (
          <a href={fileUrl} target="_blank">{fileUrl}</a>
        )
      }
    </form>
  );
};

export default CredentialForm;
