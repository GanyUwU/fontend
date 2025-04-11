// src/components/JobPostingForm.js
import React, { useState } from 'react';
import web3 from '../utils/web3';
import axios from 'axios';
import './JobPostingForm.css'

const JobPostingForm = ({ jobMatchingABI, contractAddress }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requiredSkills, setRequiredSkills] = useState(''); // Comma-separated
  const [reward, setReward] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Get current account
      const accounts = await web3.eth.getAccounts();
      if (!accounts[0]) throw new Error('No wallet connected');

      // 2. Build the job object
      const skillsArray = requiredSkills
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      const jobData = {
        title,
        description,
        requiredSkills: skillsArray,
        reward,
        employer: accounts[0],
        timestamp: Date.now(),
      };
      console.log('Job Data:', jobData);

      // 3. Pin JSON to IPFS via Pinata
      const pinataRes = await axios.post(
        'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        {
          pinataMetadata: { name: `JobPost-${title}` },
          pinataContent: jobData
        },
        {
          headers: {
            pinata_api_key:"c8e234b97874af461ee4",
            pinata_secret_api_key:"df423872210f046c5501e73dd9e546688306ece63cf7360a2ca6ed4e3d5c4046",
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Pinata Response:', pinataRes.data);
      const ipfsHash = pinataRes.data.IpfsHash;

      console.log('IPFS Hash:', ipfsHash);
    
      console.log("Network:", await web3.eth.net.getId());
      console.log("Account:", accounts[0]);
      console.log("Contract Address:", contractAddress);

      // 4. Send the IPFS hash on-chain
      const jobContract = new web3.eth.Contract(jobMatchingABI, contractAddress);
      await jobContract.methods
          .createJobPosting(ipfsHash) // ✅ just the hash
          .send({ from: accounts[0] });
      alert('Job posted successfully!');
      // Optionally clear form:
      setTitle('');
      setDescription('');
      setRequiredSkills('');
      setReward('');
    } catch (err) {
      console.error('Error posting job:', err);
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="job-posting-form" onSubmit={handleSubmit}>
      <div class="form-group">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>

      <div class="form-group">
        <label>Description:</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
      </div>

      <div class="form-group">
        <label>Required Skills (comma-separated):</label>
        <input
          type="text"
          value={requiredSkills}
          onChange={e => setRequiredSkills(e.target.value)}
        />
      </div>

      <div class="form-group">
        <label>Reward:</label>
        <input
          type="number"
          value={reward}
          onChange={e => setReward(e.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Posting…' : 'Post Job'}
      </button>
    </form>
  );
};

export default JobPostingForm;
