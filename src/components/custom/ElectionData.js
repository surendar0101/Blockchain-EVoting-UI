import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

class ElectionData extends Component {
    baseApiUrl = 'https://e-voting-application.herokuapp.com/api/';
    constructor(props) {
        super(props);
        this.state = {
            election_name: [],
            election_organizer: [],
            election_id: [],
            final: [],
            id: null,
        };
    }

    componentDidMount(){
        let currentComponent = this;
      
        axios.get(`${this.baseApiUrl}election/list`, {})
        .then(function(response){ 
            var data = response.data;
            currentComponent.setState({
                final: data
            })
        })
        .catch(function(err){
            console.error(err);
        });

    }

    handleInputChange = (e) => {
        var name = e.target.innerHTML;
        var index = 0;
        for(let i = 0; i < this.state.election_name.length; i++){
            if(name === this.state.election_name[i]){
                index = i;
                break;
            }
        }
        var id = this.state.election_id[index];
        this.setState({
            id : id
        })
    };


    render(){

        // check if election data exists: else navigate to new elections
        if(!localStorage.getItem('electionData')){
            window.location.assign('/newelection');
            return false;
        }

        const electionData = JSON.parse(localStorage.getItem('electionData'));
        
        // if logged in as admin: redirect to candidate ui
        if(localStorage.getItem('userType') === 'voter'){
            window.location.assign("/candidates/" + electionData.electionID);
            return false;
        }

        
        console.info(electionData);
        return(
            <div>
                <Sidebar />
                <div className="main-container">
                <div className="card p-4 max-width-800">
                <ul className="collection">
                    <li className="pb-2">
                        <h3>Manage Election: <b>{electionData.electionName}</b></h3>
                    </li>
                    <div className="contact clearfix clear" key={electionData.electionID}>
                    <li className="">
                    <div className="pull-left" style={{minWidth : '200px'}}>
                        <i className="material-icons circle blue darken-2 electionIcon">ballot</i> Election ID: <u>{electionData.electionID}</u><br/>
                            Total Candidates: <b>{electionData.candatesCount}</b><br/>
                            Total Voters: <b>{electionData.votersCount}</b>
                            </div>
                            <div className="pull-right">
                            <Link to={"/candidates/" + electionData.electionID} className="title" onClick={this.handleInputChange}>
                                <button id={electionData.electionID} className="btn btn-primary btn-lg">Manage Candidates</button></Link>
                            &nbsp;&nbsp;&nbsp;
                            <Link to={"/voters/" + electionData.electionID} className="title" onClick={this.handleInputChange}>
                                <button id={electionData.electionID} className="btn btn-secondary  btn-lg">Manage Voters</button></Link>
                            </div>
                            
                        </li>
                    </div>
                </ul>
                </div>
                
                </div>
            </div>
        )
    }
}

export default ElectionData;