import React, { Component } from 'react'
import axios from 'axios'
import { loadBlockChain } from '../Utils';
import Web3 from 'web3';


class Login extends Component {
    baseApiUrl = 'https://e-voting-application.herokuapp.com/api/';


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

    constructor(props){
        super(props)
        this.state = {
            'username': null,
            'password': null,
            'userType': 'voter'
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { username, password, userType } = this.state;



        if(userType === 'voter'){
            if(this.state.electionData.voters){
                let voterFound = false;
                this.state.electionData.voters.map(voter => {
                    if(voter.name === username){
                        voterFound = true;
                    }
                });
                if(voterFound){
                    localStorage.setItem('loggedInUser', username);
                        localStorage.setItem('userType', userType);
                        window.location.assign("/newelection");
                }else{
                    alert('Incorrect Username or Password');
                }
                    }else{
                        alert('Incorrect Username or Password');
                    }

            return false;
        }

        axios.post(`${this.baseApiUrl}admin/login`, {
            username: username,
            password: password,
        })
        .then(function(response){ 
            if(response.data){
                localStorage.setItem('loggedInUser', username);
                localStorage.setItem('userType', userType);
                window.location.assign("/newelection");
            }else{
                alert('Incorrect Username or Password');
            }
        })
        .catch(function(err){
            console.error(err);
        });


        // call admin login api
            // returns bool
            // save in localstorage
            // redirect to dashboard

    }


    render(){
        
        return(
            <div className="container mt-5 card p-4 max-width-800">
                <form onSubmit={this.handleSubmit} className="row">
                    <div className="logo m-2 p-2 text-center">
                        <img src="/images/logo.gif" height="150" className="m-2 p-2 bg-primary logo" />
                        <h3>E-Voting Portal</h3>
                     </div>   
                    <div className="form-control-group col-md-6 float-left mt-4">
                        <label htmlFor="name">Username</label>
                        <input className="input-full-width size-large" type="text" id="username" name="username" onChange={this.handleInputChange} required/>
                    </div>
                    <div className="form-control-group col-md-6 float-right mt-4">
                        <label htmlFor="name">Password</label>
                        <input className="input-full-width size-large" type="password" id="password" name="password" onChange={this.handleInputChange} required/>
                    </div>
                    <div className="form-control-group col-md-12  mt-4">
                        <label htmlFor="userType" className="mb-2">Select User Type</label>
                        <select name="userType" id="userType" className="input-full-width size-large"  onChange={this.handleInputChange} required defaultValue='voter' >
                        <option value="voter" >Voter</option>
                        <option value="admin">Admin</option>
                        </select>
                        
                    </div>
                    <button className="btn btn-primary full-width  mt-4" type="submit" name="action">
                        <i className="material-icons right">send</i> Login                        
                    </button>
                </form>
            </div>      
        )
    }
}

export default Login;