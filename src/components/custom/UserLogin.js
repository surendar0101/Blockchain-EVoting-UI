import React, { Component } from 'react'
import axios from 'axios'

class Login extends Component {
    baseApiUrl = 'https://e-voting-application.herokuapp.com/api/';
    constructor(props){
        super(props)
        this.state = {
            'username': null,
            'password': null
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        axios.post(`${this.baseApiUrl}admin/login`, {
            username: username,
            password: password,
        })
        .then(function(response){ 
            if(response.data){
                localStorage.setItem('loggedInUser', username);
                localStorage.setItem('userType', 'admin');
                window.location.assign("/dashboard");
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
                    <img src="/images/logo.png" height="150" className="m-2 p-2 bg-primary logo" />
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
                        <select name="userType" className="input-full-width size-large"  onChange={this.handleInputChange} required >
                        <option>Voter</option>
                        <option>Admin</option>
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