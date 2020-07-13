import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//import Login from './Login';
import TodoList from './TodoList';
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
                    <Route path="/profile" exact component={Profile} />
                    {/*<Route path="/todolist" exact component={TodoList} /> */}
                </Switch>
            </Router>
        </div>
    )
}

export default App;

