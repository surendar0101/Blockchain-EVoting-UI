import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'

class Navbar extends Component {
    state = {
        location: ""
    }

    componentWillReceiveProps(){
        console.log(this.props)
        this.setState({
            location: this.props.history.location.pathname
        })
    }
    render(){
        console.info(window.location.pathname);
        if(!window.location.pathname || window.location.pathname == '/'){
            return false
        }else{
            return(
                <div>
                     <nav className="navbar navbar-expand-lg navbar-dark bg-dark pl-3 pr-3">
        <div className="container-fluid">
        <NavLink to="/dashboard" className="navbar navbar-expand-lg ">
                                <img src="/images/logo.png" height="80" classStyle="margin-top: 5px;" /></NavLink>
         
            <div className="float-right">
                <NavLink to="/" className="btn btn-outline-success" href="/" type="submit">Sign Out</NavLink>
            </div>
        </div>
      </nav>
                </div>
            )
        }

        
    }
}

export default withRouter(Navbar)