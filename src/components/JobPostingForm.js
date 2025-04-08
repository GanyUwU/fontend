// components/JobPostingForm.js
import React, { useState } from 'react';
import web3 from '../utils/web3';

const JobPostingForm = ({ jobMatchingABI, contractAddress }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requiredSkills, setRequiredSkills] = useState(''); // Comma-separated string
  const [reward, setReward] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const skillsArray = requiredSkills.split(',').map(skill => skill.trim()); //split skills

    const jobMatching = new web3.eth.Contract(jobMatchingABI, contractAddress);
    const accounts = await web3.eth.getAccounts();
     console.log(accounts);

    try {
      await jobMatching.methods.createJobPosting(title, description, skillsArray, reward).send({ from: accounts[0] });
      alert('Job posted successfully!');
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Error posting job');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Required Skills (comma-separated):</label>
        <input type="text" value={requiredSkills} onChange={(e) => setRequiredSkills(e.target.value)} />
      </div>
      <div>
        <label>Reward:</label>
        <input type="number" value={reward} onChange={(e) => setReward(e.target.value)} />
      </div>
      <button type="submit">Post Job</button>
    </form>
  );
};

export default JobPostingForm;
