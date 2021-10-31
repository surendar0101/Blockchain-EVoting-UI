
import Election from '../build/Election.json'
import Web3 from 'web3';


export async function loadBlockChain(_component){
    const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        _component.setState({ account: accounts[0] })
        const networkId = await web3.eth.net.getId()
        const networkData = Election.networks[networkId]
        if (networkData) {
            // Fetching the Election data from blockchain
            const election = new web3.eth.Contract(Election.abi, networkData.address);
            _component.setState({ election })


            // check if election exist or not
            if(!_component.state.electionData) _component.state.electionData = {};
            _component.state.electionData.electionID = await _component.state.election.methods.getElectionId().call()
            if(!_component.state.electionData.electionID){
                console.info('no election exists');
                return false;
            }
            _component.state.electionData.electionName = await _component.state.election.methods.getElectionName().call()

            // Fetching the candidates count for the election
            _component.state.electionData.candatesCount = await _component.state.election.methods.candidatesCount().call()

            // Population of Candidates for election
            _component.state.electionData.candidates = []
            for (var i = 1; i <= _component.state.electionData.candatesCount; i++) {
                const candidate = await election.methods.electionCandidates(i).call();
                _component.state.electionData.candidates.push(candidate);
            }
            
            // Fetching the candidates count for the election
            _component.state.electionData.votersCount = await _component.state.election.methods.votersCount().call()

            // Population of Voters for election
            _component.state.electionData.voters = []
            for (var j = 1; j <= _component.state.electionData.votersCount; j++) {
                const voter = await election.methods.voterList(j).call()
                _component.state.electionData.voters.push(voter);
            }
            
            localStorage.setItem('electionData', JSON.stringify(_component.state.electionData));
            _component.setState(_component.state.electionData);

        }
}