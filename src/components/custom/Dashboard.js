import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showComponents: false
        }
    }


    render() {

        return (
            <div >
                <Sidebar />
                <div className="main-container">
                    Welcome Admin!<br/>
                    Please select a menu item to proceed.
                </div>
            </div>
        )
    }
}

export default Dashboard