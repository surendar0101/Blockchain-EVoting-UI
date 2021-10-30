import React, { Component } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'

class Sidebar extends Component {
    state = {
        location: ""
    }

    componentWillReceiveProps(){
        this.setState({
            location: this.props.history.location.pathname
        })
    }
    render(){
            return(
                <div className="sidebar">
                <ul className="sidebar-list m-0 p-0">
                    <li className="collection-item"><Link to="/newelection" className="secondary-content float-none"><div><h4><i className="material-icons dashboard-icon-overflow">assignment-o</i> Add New Election</h4></div></Link></li>
                    <li className="collection-item"><Link to="/elections" className="secondary-content float-none"><div><h4><i className="material-icons">explicit</i> View Elections</h4></div></Link></li>
                </ul>
            </div>
            )

        
    }
}

export default withRouter(Sidebar)