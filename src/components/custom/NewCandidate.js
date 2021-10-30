import React, { Component } from 'react';
import Web3 from 'web3';
import Election from '../../build/Election.json'
import Sidebar from './Sidebar';


class NewCandidate extends Component {

    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockChain()
        await this.getCandidates();
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
            const election = new web3.eth.Contract(Election.abi, networkData.address)
            this.setState({ election })
        } else {
            window.alert('Election contract not deployed to detected network.')
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.addCandidates();
    }

    addCandidates() {
        console.log(this.state);
        this.setState({ loading: true })
        this.state.election.methods.addCandidate(this.state.candidate_name, this.state.id).send({ from: this.state.account })
            .once('receipt', (receipt) => {
                console.log(receipt);
                this.setState({ loading: false })
                window.location.assign("/");
            })
    }

    async getCandidates() {
        console.info('hello');
        const candCount = await this.state.election.methods.candidates(1).call();
        console.info('candCount', candCount);
    }

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            election: null,
            candidate_name: null,
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
                    <div className="card p-2 max-width-800">
                        <form onSubmit={this.handleSubmit} className="row">
                            <div className="col-md-9">
                                <input placeholder="Candidate Name" type="text" className="form-control mt-0" id="candidate_name" name="candidate_name" onChange={this.handleInputChange} required />
                            </div>
                            <div className="col-md-3">
                                <button className="btn btn-primary input-full-width btn-sm" type="submit" name="action">
                                    <i className="material-icons right">add</i> <span>Add</span>
                                </button>
                            </div>

                        </form>
                        <div className="candidatesList">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Candidate Name</th>
                                        <th>Voted</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

export default NewCandidate;
