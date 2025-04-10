// contracts/UserProfile.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserProfile {
    // Define roles for users
    enum Role { None, JobSeeker, HR }

    // Define a structure to hold user profile details
    struct Profile {
        string name;
        string email;
        string ipfsHash;
    }

    // Mapping to store profile details by user address
    mapping(address => Profile) private profiles;

    // Mapping to store user roles
    mapping(address => Role) public roles;

    // Events
    event CredentialUploaded(address indexed user, string name, string ipfsHash);
    event EmailUpdated(address indexed user, string email);
    event RoleAssigned(address indexed user, Role role);

    /**
     * @notice Register the caller as a Job Seeker
     */
    function registerAsJobSeeker() public {
        require(roles[msg.sender] == Role.None, "Already registered");
        roles[msg.sender] = Role.JobSeeker;
        emit RoleAssigned(msg.sender, Role.JobSeeker);
    }

    /**
     * @notice Register the caller as HR
     */
    function registerAsHR() public {
        require(roles[msg.sender] == Role.None, "Already registered");
        roles[msg.sender] = Role.HR;
        emit RoleAssigned(msg.sender, Role.HR);
    }

    /**
     * @notice Get the role of a given user
     * @param _user Address of the user
     * @return The role of the user
     */
    function getUserRole(address _user) public view returns (Role) {
        return roles[_user];
    }

    /**
     * @notice Upload or update a credential (name and IPFS hash)
     * @param _name Name associated with the credential
     * @param _ipfsHash IPFS hash where the credential is stored
     */
    function uploadCredential(string memory _name, string memory _ipfsHash) public {
        profiles[msg.sender].name = _name;
        profiles[msg.sender].ipfsHash = _ipfsHash;
        emit CredentialUploaded(msg.sender, _name, _ipfsHash);
    }

    /**
     * @notice Set or update the user's email address
     * @param _email The user's email
     */
    function setEmail(string memory _email) public {
        profiles[msg.sender].email = _email;
        emit EmailUpdated(msg.sender, _email);
    }

    /**
     * @notice Retrieve a user's profile details
     * @param _user Address of the user
     * @return name User's name
     * @return email User's email
     * @return ipfsHash IPFS hash of the user's credential
     */
    function getUserProfile(address _user)
        public
        view
        returns (string memory name, string memory email, string memory ipfsHash)
    {
        Profile memory profile = profiles[_user];
        return (profile.name, profile.email, profile.ipfsHash);
    }
}
