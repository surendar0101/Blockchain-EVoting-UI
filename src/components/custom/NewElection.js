import React, { Component } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

class NewElection extends Component {
    baseApiUrl = 'https://e-voting-application.herokuapp.com/api/';

    constructor(props) {
        super(props);
        this.state = {
            election_name: '',
            election_organizer: '',
            election_password: '',
        };
    }

    handleInputChange = e => {
        this.setState({
        [e.target.name]: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { election_name, election_organizer, election_password } = this.state;
        console.log(election_name);
        axios.post(`${this.baseApiUrl}election`, {
            election_name: election_name,
            election_organizer: election_organizer,
            election_password: election_password
        })
        .then(function(response){ 
            window.location.assign('/');
        })
        .catch(function(err){
            console.error(err);
        });
    }

    render(){
        return(
            <div >
                <Sidebar />
                <div className="main-container">
                <div className="card p-2 max-width-800">
                <form onSubmit={this.handleSubmit} className="row">
                    <div className="logo m-2 p-2 text-center">
                    <h4>Create New Election</h4>
                     </div>   
                    <div className="form-control-group col-md-12 mt-4">
                        <label htmlFor="name">Election Name</label>
                        <input className="input-full-width size-large" type="text" id="username" name="username" onChange={this.handleInputChange} required/>
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