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
                // election_name: data[0],
                // election_organizer: data[1],
                // election_id: data[2],
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
        const electionList = this.state.final.map(election => {
            return (
                <div className="contact clearfix clear" key={election.election_id}>
                    <li className="">
                    <div className="pull-left">
                    <i className="material-icons circle blue darken-2">ballot</i>
                        <p><b>{election.election_name}</b></p>
                        </div>
                        <div className="pull-right">
                        <Link to={"/candidates/" + election.election_id} className="title" onClick={this.handleInputChange}>
                            <button id={election.election_id} className="btn btn-primary">Manage Candidates</button></Link>
                        &nbsp;&nbsp;&nbsp;
                        <Link to={"/voters/" + election.election_id} className="title" onClick={this.handleInputChange}>
                            <button id={election.election_id} className="btn btn-secondary">Manage Voters</button></Link>
                        </div>
                        
                    </li>
                </div>
            )
        }) 
        return(
            <div >
                <Sidebar />
                <div className="main-container">
                <div className="card p-2 max-width-800">
                <ul className="collection">
                    <li >
                        <h3>Elections</h3>
                    </li>
                        {electionList}
                </ul>
                </div>
                
                </div>
            </div>
        )
    }
}

export default ElectionData;