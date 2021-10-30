import React, { Component } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

class NewElection extends Component {
    baseApiUrl = 'https://e-voting-application.herokuapp.com/api/';

    constructor(props) {
        super(props);
        this.state = {
            election_name: ''
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
        console.log(election_name);
        axios.post(`${this.baseApiUrl}election`, {
            election_name: election_name
        })
        .then(function(response){ 
            console.info(response);
            if(response.data.election_id){
            // election created - navigate to election list UI
            alert(`Election ${response.data.election_name} created with id: ${response.data.election_id}`)
            window.location.assign('/elections');
            }else{
                alert('Failed to create a new election!')
            }
            
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