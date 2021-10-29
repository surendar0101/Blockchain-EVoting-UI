pragma solidity >=0.5.16;

contract Election {

    string electionId;
    string electionName;
    address electionAddress;
    mapping(uint => Candidate) public electionCandidates;
    mapping(uint => Voter) public voterList;

    constructor() public {}

    function setElection(string memory election_id, string memory name) public {
        electionId = election_id;
        electionName = name;
        electionAddress = msg.sender;
    }

    function getElectionName() public view returns (string memory) {
        return electionName;
    }

    function getElectionId() public view returns (string memory) {
        return electionId;
    }

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
        string details;
    }

    struct Voter {
        uint id;
        string name;
        string details;
        bool hasVoted;
    }

    event votedEvent(uint indexed _candidateId);

    uint public votersCount;
    uint public candidatesCount;

    function addCandidate(uint _id, string memory _name, string memory _details) public {
        candidatesCount++;
        electionCandidates[_id] = (Candidate(_id, _name, 0, _details));
    }

    function castVoteForCandidate(uint _candidate_id) private {
        electionCandidates[_candidate_id].voteCount ++;
    }

    function addVoter(uint _id, string memory _userName, string memory _details) public {
        votersCount++;
        voterList[_id] = Voter(_id, _userName, _details, false);
    }

    function vote(uint _voterId, uint _candidateId) public {

        require(_voterId > 0 && _voterId <= votersCount, 'Invalid voter id');
        require(_candidateId > 0 && _candidateId <= _candidateId, 'Invalid candidate id');

        // Check for Double voting
        require(!voterList[_voterId].hasVoted, 'The Voter has already voted.');

        // Increment the vote of the candidate
        electionCandidates[_candidateId].voteCount++;

        // Mark the voter as voted
        voterList[_voterId].hasVoted = true;
    
        // Emit the event that the voter has voted
        emit votedEvent(_voterId);
    }

}