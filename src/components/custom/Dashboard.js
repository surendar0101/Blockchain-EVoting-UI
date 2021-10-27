import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showComponents: false
        }
    }


    render() {
        return (
            <div className="container">
                <ul className="collection with-header">
                    <li className="collection-item"><Link to="/elections" className="secondary-content float-none"><div><h4><i className="material-icons">explicit</i> View Elections</h4></div></Link></li>
                    <li className="collection-item"><Link to="/newelection" className="secondary-content float-none"><div><h4><i className="material-icons dashboard-icon-overflow">assignment-o</i> Add New Election</h4></div></Link></li>
                    <li className="collection-item"><Link to="/choose" className="secondary-content float-none"><div><h4><i className="material-icons dashboard-icon-overflow">pin-account</i> View Users</h4></div></Link></li>
                    <li className="collection-item"><Link to="/login" className="secondary-content float-none"><div><h4><i className="material-icons">key</i> Admin Login</h4></div></Link></li>
                </ul>
            </div>
        )
    }
}

export default Dashboard