import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import TodoList from './TodoList';
import MyCalendar from './MyCalendar';
import axios from 'axios';

function Profile() {

    console.log("rendering profile");

    // get auth0 variables and functions
    const {user, isAuthenticated, getAccessTokenSilently, isLoading, logout} = useAuth0();

    // access token [state, state change function]
    const [accessToken, setAccessToken] = useState(null);
    
    // upon first load to profile request an accesstoken from auth0 api
    useEffect(() => {
        console.log("inside useeffect in profile");
        getAccessTokenSilently({
            audience: 'http://localhost:5000/',
            redirect_uri: 'http://localhost:3000/profile',
            scope: 'read:user_todos update:user_todos read:users',
        })
        .then(accessToken => {
            console.log("successfully got access token")
            setAccessToken(accessToken);
        })
        .catch(err => {
            console.log("error getting accessToken: " + err);
        })
    }, [getAccessTokenSilently]);

    return (
        isAuthenticated ? (
            <div>
                <Router>
                    <Navbar />
                    <h1>Hello {user.name}</h1>
                    <Switch>
                        <Route path="/todolist">
                            <TodoList accessToken={accessToken} user={user} />
                        </Route>
                        <Route path="/calendar">
                            <MyCalendar accessToken={accessToken} user={user} />
                        </Route>
                    </Switch>
                </Router>
                <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
            </div>
        ) : (
            isLoading ? (
                <span> Loading... </span>
            ) : (
                <Redirect to="/" />
            )
        )
    )

}

export default Profile