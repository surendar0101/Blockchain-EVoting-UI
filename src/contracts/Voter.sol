pragma solidity >=0.5.16;

contract Voter {

    struct VoterDetails {
        uint id;
        string userName;
        string details;
        string election_id;
        bool hasVoted;
        address voterAddress;
    }

    event votedEvent(
        uint indexed _candidateId
    );
    
    uint public votersCount;

    mapping(uint => VoterDetails) public voterList;
    mapping(address => bool) public voters;

    function addVoter(string memory _userName, string memory _details, string memory _election_id) public {
        votersCount++;
        voterList[votersCount] = VoterDetails(votersCount, _userName, _details, _election_id, false, msg.sender);
    }

    function vote(uint _voterId) public {
        // Check for Double voting
        require(!voters[msg.sender]);

        require(_voterId > 0 && _voterId <= votersCount);
        
        // Mark the voter as voted
        voters[msg.sender] = true;
        voterList[_voterId].hasVoted = true;
    
        // Emit the event that the voter has voted to the Ethereum network
        emit votedEvent(_voterId);
    }

}