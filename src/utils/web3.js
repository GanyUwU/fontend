// utils/web3.js
import Web3 from 'web3';

let web3;

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  window.ethereum.request({ method: 'eth_requestAccounts' })
    .then(() => {
      console.log("MetaMask enabled!");
    })
    .catch((error) => {
      console.error("User denied account access:", error);
    });
} else if (window.web3) {
  web3 = new Web3(window.web3.currentProvider);
  console.log("Legacy web3 detected");
} else {
  console.log('Non-Ethereum browser detected. You should consider using MetaMask!');
  // Optionally, you can set a fallback provider, e.g.:
  // web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'));
}

export default web3;
