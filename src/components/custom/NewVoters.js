import React, { Component } from 'react';
import Web3 from 'web3';
import Election from '../../build/Election.json'
import Sidebar from './Sidebar';

import { loadBlockChain } from '../Utils';

class NewVoters extends Component {

    async componentWillMount() {
        await this.loadWeb3();
        await loadBlockChain(this);
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
        this.addVoter();
    }

    addVoter() {
        console.log(this.state);
        this.setState({ loading: true })
        this.state.election.methods.addVoter(this.state.voter_name.replace(/ /g,"_"), this.state.voter_details).send({ from: this.state.account })
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
            id: null
        }

        this.addVoter = this.addVoter.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        this.setState({
            id: id,
        })
    }

    resetForm(){
        this.setState({candidate_name: null});
        this.setState({candidate_details: null});
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
                <div className="main-container">
                    <div className="card p-4">
                        <h3 className="pb-2">Manage Voters for {electionData.electionName}</h3>
                        <form onSubmit={this.handleSubmit} className="row">
                            <div className="col-md-4">
                                <input placeholder="Voter Name" type="text" className="form-control mt-0" id="voter_name" name="voter_name" onChange={this.handleInputChange} required />
                            </div>
                            <div className="col-md-5">
                                <input placeholder="Voter Description" type="text" className="form-control mt-0" id="voter_details" name="voter_details" onChange={this.handleInputChange} required />
                            </div>
                            <div className="col-md-3">
                                <button className="btn btn-primary input-full-width btn-sm" type="submit" name="action">
                                    <i className="material-icons right" style={{ position: 'relative', top: '7px' }}>add</i> <span>Add</span>
                                </button>
                            </div>

                        </form>
                        <div className="candidatesList pt-3">
                            {!electionData.voters.length ? <div>
                                <h4 className="text-danger">Please add a voter to view list</h4>
                            </div> :

                                <table className="pt-4 mt-4 table table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Voter Name</th>
                                            <th>Description</th>
                                            <th className="forAdmin">Casted Vote</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            electionData.voters.map(voter => {
                                                return (
                                                    <tr key={voter.id}>
                                                        <td>{voter.id}</td>
                                                        <td>{voter.name}</td>
                                                        <td><p>{voter.details}</p></td>
                                                        <td className="forAdmin">{voter.hasVoted? <i className="material-icons right">check</i>  : <i className="material-icons right">close</i> }</td>
                                                    </tr>
                                                )
                                            }) 
                                        }
                                        
                                    </tbody>
                                </table>

                            }

                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

export default NewVoters;
