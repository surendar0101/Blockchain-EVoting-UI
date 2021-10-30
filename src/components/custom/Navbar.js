import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'

class Navbar extends Component {
    state = {
        location: ""
    }

    componentWillReceiveProps(){
        this.setState({
            location: this.props.history.location.pathname
        })
    }

    logoutUser(){
        localStorage.removeItem('loggedInUser')
        window.location.assign("/");
    }
    render(){
        if(!window.location.pathname || window.location.pathname == '/'){
            if(localStorage.getItem('loggedInUser')){
                window.location.assign("/dashboard");
            }
            return false
        }else{
            if(!localStorage.getItem('loggedInUser')){
                window.location.assign("/");
            }
            return(
                <div>
                     <nav className="navbar navbar-expand-lg navbar-dark bg-dark pl-3 pr-3">
        <div className="container-fluid">
        <NavLink to="/dashboard" className="navbar navbar-expand-lg ">
                                <img src="/images/logo.png" height="80" className="mt-1" /></NavLink>
         
            <div className="float-right">
                <button onClick={this.logoutUser} className="btn btn-outline-success" href="/" type="submit">Sign Out</button>
            </div>
        </div>
      </nav>
                </div>
            )
        }

        
    }
}

export default withRouter(Navbar)