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

        if(this.state.location === "/home" || this.state.location === "/choose"  || this.state.location === "/vote"  || this.state.location === "/login"){
            return ( 
                <nav className="nav-wrapper black darken-2">
                    <div className="container">
                        <a className="brand-logo">
                            <NavLink to="/">BITS WILP E-Voting</NavLink>
                        </a>
                    </div>
                </nav>
            )
        }else{
            return(
                <nav className="nav-wrapper black darken-2">
                    <div className="container">
                        <a className="brand-logo">
                            <NavLink to="/">
                                <img src="/images/logo.png" height="80" classStyle="margin-top: 5px;" /></NavLink>
                        </a>
                        <ul className="right">
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/newelection">New Election</NavLink></li>
                            <li><NavLink to="/elections">Elections</NavLink></li>
                        </ul>
                    </div>
                </nav>
            )
        }

        
    }
}

export default withRouter(Navbar)