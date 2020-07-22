import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import '../styles/App.css';

function App() {
    
    console.log("adding app")

    return (
        <div className="container">
            <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/profile" component={Profile} />
                    <Redirect from="/todolist" to="/profile" />
                    <Redirect from="/calendar" to="/profile" />
                </Switch>
            </Router>
        </div>  
    )
}

export default App;

