import React, { Component } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Election from '../../build/Election.json'
import Web3 from 'web3';
import {loadBlockChain} from '../Utils';

class NewElection extends Component {
    baseApiUrl = 'https://e-voting-application.herokuapp.com/api/';

    async componentWillMount() {
        await this.loadWeb3()
        await loadBlockChain(this);
        console.info('electionData', this.state.electionData);
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

    async getElections(){

    }


    constructor(props) {
        super(props);
        this.state = {
            account: '',
            election: null,
            id: null,
            electionData: {}
        };
    }



    

    handleInputChange = e => {
        this.setState({
        [e.target.name]: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { election_name } = this.state;
        this.state.election.methods.setElection(this.state.election_name.replace(/ /g,"_"), this.state.election_name).send({ from: this.state.account })
            .once('receipt', (receipt) => {
                console.log(receipt);
                if(receipt.status){
                    console.info('election added successfully!');
                    window.location.assign('/elections');
                }
            })
        console.log(election_name);
    }

    render(){

        // check if elections exist in local truffle - if it does then navigate to election list ui, else let user create one here
        if(localStorage.getItem('electionData')){
            window.location.assign('/elections');
            return false;
        }

        return(
            <div key={this.state.key}>
                <Sidebar />
                <div className="main-container">
                <div className="card p-4">
                <form onSubmit={this.handleSubmit} className="row">
                    <div className="logo m-2 p-2 text-center">
                    <h4>No Election Exists: Create a new one</h4>
                     </div>   
                    <div className="form-control-group col-md-12 mt-4">
                        <label htmlFor="name">Election Name</label>
                        <input className="input-full-width size-large" type="text" id="election_name" name="election_name" onChange={this.handleInputChange} required/>
                    </div>
                    <div className="form-control-group col-md-12 mt-4">
                    <button className="btn btn-primary input-full-width" type="submit" name="action">
                        Create Election                        
                    </button>
                        </div>
                    
                    
                </form>
            </div> 
                </div>
            </div>

        )
    }
}

export default NewElection;