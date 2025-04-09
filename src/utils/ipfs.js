// // utils/ipfs.js
// import { create } from 'ipfs-http-client';

// // ALWAYS store secrets in environment variables
// const projectId = process.env.REACT_APP_INFURA_PROJECT_ID;
// const projectSecret = process.env.REACT_APP_INFURA_PROJECT_SECRET;

// const auth = 'Basic ' + Buffer.from(`${projectId}:${projectSecret}`).toString('base64');

// const ipfs = create({
//   host: 'ipfs.infura.io',
//   port: 5001,
//   protocol: 'https',
//   headers: {
//     authorization: auth,
//   },
// });

// // Modified to handle files properly
// export const uploadToIPFS = async (file) => {
//   try {
//     // Convert file to readable stream format
//     const fileDetails = {
//       path: file.name,
//       content: file,
//     };

//     // Add to IPFS
//     const result = await ipfs.add(fileDetails);
//     return `https://ipfs.infura.io/ipfs/${result.cid}`;
//   } catch (error) {
//     console.error('IPFS Upload Error:', error);
//     throw new Error('IPFS upload failed: ' + error.message);
//   }
// };