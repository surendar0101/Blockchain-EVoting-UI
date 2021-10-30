import React, { Component } from 'react';
import Web3 from 'web3';
import Election from '../../build/Election.json'
import Sidebar from './Sidebar';


class ManageElection extends Component {

    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockChain()
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }


    handleInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    async loadBlockChain() {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        const networkId = await web3.eth.net.getId()
        const networkData = Election.networks[networkId]
        if (networkData) {
            // Fetching the Election data from blockchain
            const election = new web3.eth.Contract(Election.abi, networkData.address)
            this.setState({ election })

            // Fetching the candidates count for the election
            const candatesCount = await this.state.election.methods.candidatesCount().call()
            this.setState({ candatesCount: candatesCount })
            console.log(`Candidate Count: ${candatesCount}`);

            // Population of Candidates for election
            const candidates = []
            for (var i = 1; i <= candatesCount; i++) {
                const candidate = await election.methods.electionCandidates(i).call()
                console.log(`Candidate[${i}]: ${JSON.stringify(candidate)}`)
                candidates.push(candidate);
            }
            this.setState({
                candidates: [...this.state.candidates, candidates]
            })
            console.log(`Candidates List: ${JSON.stringify(this.state.candidates)}`);

            // Fetching the candidates count for the election
            const votersCount = await this.state.election.methods.votersCount().call()
            this.setState({ votersCount });

            // Population of Voters for election
            const voters = []
            for (var j = 1; j <= votersCount; j++) {
                const voter = await election.methods.voterList(j).call()
                console.log(`Voter[${j}]: ${JSON.stringify(voter)}`)
                voters.push(voter);
            }
            this.setState({
              voters: [...this.state.voters, voters]
            })
            console.log(`Candidates List: ${JSON.stringify(this.state.voters)}`);

        } else {
            window.alert('Election contract not deployed to detected network.')
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.addCandidates();
        this.addVoters();
    }

    async addCandidates() {
        this.setState({ loading: true });
        this.state.election.methods.addCandidate(this.state.candidate_name, this.state.candidate_description)
            .send({ from: this.state.account })
            .once('receipt', (receipt) => {
                this.setState({ loading: false })
                window.location.assign("/manageElection");
            })
    }
  
    async addVoters() {
        this.setState({ loading: true });
        this.state.election.methods.addVoters(this.state.voter_name, this.state.voter_description)
          .send({ from: this.state.account })
          .once('receipt', (receipt) => {
              // Make an API call to store the Login credentials
              this.setState({ loading: false })
              window.location.assign("/manageElection");
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            election: null,
            candidate_name: null,
            candidate_detail: null,
            candidates: [],
            voter_name: null,
            voter_description: null,
            voters: [],
            id: null
        }

        this.addCandidates = this.addCandidates.bind(this);
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        this.setState({
            id: id,
        })
    }

    render() {
        return (
            <div >
                <Sidebar />
                <div className="main-container">
                    <div className="card p-2">
                        <h3 className="pb-2">Manage Candidates for BESCOM: Bengaluru</h3>
                        <form onSubmit={this.handleSubmit} className="row">
                        <div className="col-md-4">
                                <input placeholder="Candidate Name" type="text" className="form-control mt-0" id="candidate_name" name="candidate_name" onChange={this.handleInputChange} required />
                            </div>
                            <div className="col-md-5">
                                <input placeholder="Candidate Description" type="text" className="form-control mt-0" id="candidate_name" name="candidate_name" onChange={this.handleInputChange} required />
                            </div>
                            <div className="col-md-3">
                                <button className="btn btn-primary input-full-width btn-sm" type="submit" name="action">
                                    <i className="material-icons right" style={{position: 'relative', top: '7px'}}>add</i> <span>Add</span>
                                </button>
                            </div>

                        </form>
                        <div className="candidatesList">
                            <table className="pt-4 mt-4 table table-striped">
                            <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Candidate Name</th>
                                        <th>Description</th>
                                        <th  className="forAdmin">Votes</th>
                                        <th  className="forVoters">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr>
                                        <td>1</td>
                                        <td>Sunny</td>
                                        <td><p>Sed vitae nulla a est commodo vehicula. Morbi finibus malesuada maximus. Quisque non neque egestas erat scelerisque interdum eget id odio. Pellentesque vitae hendrerit orci, eu congue quam. Donec semper velit ut velit elementum aliquet. Aliquam tincidunt sem in pharetra rutrum. Donec placerat t</p></td>
                                        <td className="forAdmin">123 </td> {/* for admin*/}
                                        <td className="forVoters"><button className="btn btn-primary">Vote</button></td> {/*-> for voters*/}
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Rahil</td>
                                        <td><p>Sed vitae nulla a est commodo vehicula. Morbi finibus malesuada maximus. Quisque non neque egestas erat scelerisque interdum eget id odio. Pellentesque vitae hendrerit orci, eu congue quam. Donec semper velit ut velit elementum aliquet. Aliquam tincidunt sem in pharetra rutrum. Donec placerat t</p></td>
                                        <td className="forAdmin">25 </td> {/* for admin*/}
                                        <td className="forVoters"><button className="btn btn-primary">Vote</button></td> {/*-> for voters*/}
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Ramesh</td>
                                        <td><p>Sed vitae nulla a est commodo vehicula. Morbi finibus malesuada maximus. Quisque non neque egestas erat scelerisque interdum eget id odio. Pellentesque vitae hendrerit orci, eu congue quam. Donec semper velit ut velit elementum aliquet. Aliquam tincidunt sem in pharetra rutrum. Donec placerat t</p></td>
                                        <td className="forAdmin">30 </td> {/* for admin*/}
                                        <td className="forVoters"><button className="btn btn-primary">Vote</button></td> {/*-> for voters*/}
                                    </tr>
                                    <tr>
                                        <td>1235</td>
                                        <td>Suresh</td>
                                        <td><p>Sed vitae nulla a est commodo vehicula. Morbi finibus malesuada maximus. Quisque non neque egestas erat scelerisque interdum eget id odio. Pellentesque vitae hendrerit orci, eu congue quam. Donec semper velit ut velit elementum aliquet. Aliquam tincidunt sem in pharetra rutrum. Donec placerat t</p></td>
                                        <td className="forAdmin">45 </td> {/* for admin*/}
                                        <td className="forVoters"><button className="btn btn-primary">Vote</button></td> {/*-> for voters*/}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

export default ManageElection;
