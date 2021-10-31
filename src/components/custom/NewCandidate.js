import React, { Component } from 'react';
import Web3 from 'web3';
import Election from '../../build/Election.json'
import Sidebar from './Sidebar';
import { loadBlockChain } from '../Utils';

class NewCandidate extends Component {

    async componentWillMount() {
        await this.loadWeb3();
        await loadBlockChain(this);

        // get loggedin candidate's detail
        if (localStorage.getItem('userType') === 'voter') {
            this.state.electionData.voters.map(voter => {
                if (voter.name === localStorage.getItem('loggedInUser')) {
                    this.setState({ currentVoter: voter });
                }
            })
        }



        // check if candidate is voted or not
        // if voted: disable all vote buttons
        // bind addVote method
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



    handleSubmit = (e) => {
        e.preventDefault();
        this.addCandidates();
    }

    castVote = (candidate) => {

        this.state.election.methods.vote(this.state.currentVoter.id, candidate.id)
            .send({ from: this.state.account })
            .once('receipt', (receipt) => {
                this.setState({ loading: false })
                this.state.currentVoter.hasVoted = true;
                this.resetForm();
                loadBlockChain(this);

            })

        // this.addCandidates();
    }

    

    async addCandidates() {
        this.setState({ loading: true });
        this.state.election.methods.addCandidate(this.state.candidate_name, this.state.candidate_detail)
            .send({ from: this.state.account })
            .once('receipt', (receipt) => {
                console.info(receipt);
                this.setState({ loading: false })
                this.resetForm();
                loadBlockChain(this);
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
            id: null
        }

        this.addCandidates = this.addCandidates.bind(this);
        this.resetForm = this.resetForm.bind(this);

    }

    componentDidMount() {
        let id = this.props.match.params.id;
        this.setState({
            id: id,
        })
    }

    resetForm() {
        this.setState({ candidate_name: null });
        this.setState({ candidate_details: null });
        this.setState({ key: Math.random() });
    };
    render() {

        // check if election data exists: else navigate to new elections
        if (!localStorage.getItem('electionData')) {
            window.location.assign('/newelection');
            return false;
        }
        const electionData = JSON.parse(localStorage.getItem('electionData'));
        return (
            <div key={this.state.key}>
                <Sidebar />
                <div className={`main-container ${localStorage.getItem('userType')}`}>
                    <div className="card p-4">
                        <h3 className="pb-2">{localStorage.getItem('userType') == 'admin' ? 'Manage Candidate' : 'Vote Candidate'} for {electionData.electionName}</h3>
                        {localStorage.getItem('userType') == 'admin' ?
                            <form onSubmit={this.handleSubmit} className="row">
                                <div className="col-md-4">
                                    <input placeholder="Candidate Name" type="text" className="form-control mt-0" id="candidate_name" name="candidate_name" onChange={this.handleInputChange} required />
                                </div>
                                <div className="col-md-5">
                                    <input placeholder="Candidate Description" type="text" className="form-control mt-0" id="candidate_detail" name="candidate_detail" onChange={this.handleInputChange} required />
                                </div>
                                <div className="col-md-3">
                                    <button className="btn btn-primary input-full-width btn-sm" type="submit" name="action">
                                        <i className="material-icons right" style={{ position: 'relative', top: '7px' }}>add</i> <span>Add</span>
                                    </button>
                                </div>

                            </form> : <div></div>}

                        <div className="candidatesList pt-3">
                            {!electionData.candidates.length ? <div>
                                <h4 className="text-danger">No Candidate added yet!</h4>

                            </div> :
                                <div>
                                    {this.state.currentVoter?.hasVoted ? <h4 className="text-primary pt-0 pb-3">Your valuable vote is casted. Thank you!</h4> : null}
                                    <table className="pt-4 mt-4 table table-striped">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Candidate Name</th>
                                                <th>Description</th>
                                                {localStorage.getItem('userType') == 'admin' ? <th className="forAdmin">Votes</th> : <th className="forVoters">Actions</th>}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                electionData.candidates.map(candidate => {
                                                    return (
                                                        <tr key={candidate.id}>
                                                            <td>{candidate.id}</td>
                                                            <td>{candidate.name}</td>
                                                            <td><p>{candidate.details}</p></td>
                                                            {localStorage.getItem('userType') == 'admin' ?
                                                                <td className="forAdmin">{candidate.voteCount}</td> :
                                                                <td className="forVoters"><button className="btn btn-primary" disabled={this.state.currentVoter?.hasVoted} onClick={() => this.castVote(candidate)}>Vote</button></td>
                                                            }
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>


                            }

                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

export default NewCandidate;
