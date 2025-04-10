// utils/web3.js
import Web3 from 'web3';

let web3;

if (window.ethereum) {
  web3 = new Web3(window.ethereum); // Just create the instance
} else if (window.web3) {
  web3 = new Web3(window.web3.currentProvider); // legacy dapp browsers
} else {
  console.log('Non-Ethereum browser detected. Consider installing MetaMask.');
  // You can add a fallback provider here if needed
}

export default web3;
