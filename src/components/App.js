import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import TodoList from './TodoList';
import '../styles/App.css';
import { useAuth0 } from '@auth0/auth0-react';
import TodoItem from './TodoItem';
import ProtectedRoute from './ProtectedRoute';

function App() {
    console.log("adding app")

    const { user, isAuthenticated } = useAuth0();

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {user && isAuthenticated ? (
                        <Redirect to="/profile" />
                    ) : (
                        <Home />
                    )}
                </Route>
                <ProtectedRoute exact path="/profile" component={Profile} />
                <ProtectedRoute exact path="/todolist" component={TodoList} />
            </Switch>
        </Router>
    )
}

export default App;

