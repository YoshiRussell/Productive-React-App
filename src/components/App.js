import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './Login';
import TodoList from './TodoList';
import Navbar from './Navbar';
import '../styles/App.css';


function App() {
    console.log("adding app")

    return (
        <div className="container">
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/todolist" exact component={TodoList} />
                </Switch>
            </Router>
        </div>
    )
}

export default App;

