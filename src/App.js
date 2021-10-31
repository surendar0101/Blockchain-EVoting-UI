import React, { Component } from 'react';
import NewElection from './components/custom/NewElection';
import NavBar from './components/custom/Navbar';
import ElectionData from './components/custom/ElectionData';
import { BrowserRouter, Route } from 'react-router-dom';
import NewCandidate from './components/custom/NewCandidate';
import UserLogin from './components/custom/UserLogin';
import NewVoters from './components/custom/NewVoters';

class App extends Component {

    getVal = () => {
        console.log('Test!')
    }

    render(){
        return (
        <BrowserRouter>
            <div className="App">
                <NavBar getVal={this.getVal}/>
                <Route exact path="/" component={UserLogin} />
                <Route exact path="/newelection" component={NewElection} />
                <Route exact path="/elections" component={ElectionData} />
                <Route exact path="/candidates/:id" component={NewCandidate} />
                <Route exact path="/voters/:id" component={NewVoters} />
            </div>
        </BrowserRouter>
        );
    }
}

export default App;
