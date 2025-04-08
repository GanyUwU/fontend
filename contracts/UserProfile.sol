// contracts/UserProfile.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserProfile {
    // Define a structure to hold user profile details
    struct Profile {
        string name;
        string email;
        string ipfsHash;
    }

    // Mapping to store profile details by user address
    mapping(address => Profile) private profiles;

    // Event to log when a credential is uploaded
    event CredentialUploaded(address indexed user, string name, string ipfsHash);
    event EmailUpdated(address indexed user, string email);

    // Function to upload or update a credential (name and IPFS hash)
    function uploadCredential(string memory _name, string memory _ipfsHash) public {
        profiles[msg.sender].name = _name;
        profiles[msg.sender].ipfsHash = _ipfsHash;
        emit CredentialUploaded(msg.sender, _name, _ipfsHash);
    }

    // Function to set or update the user's email address
    function setEmail(string memory _email) public {
        profiles[msg.sender].email = _email;
        emit EmailUpdated(msg.sender, _email);
    }

    // Function to retrieve a user's profile details
    function getUserProfile(address _user) public view returns (string memory, string memory, string memory) {
        Profile memory profile = profiles[_user];
        return (profile.name, profile.email, profile.ipfsHash);
    }
}
