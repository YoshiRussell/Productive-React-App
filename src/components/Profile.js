import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import TodoList from './TodoList';
import Calender from './Calender';

function Profile() {

    const {user, isAuthenticated, getAccessTokenSilently, isLoading} = useAuth0();

    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        getAccessTokenSilently({
            audience: 'http://localhost:5000/',
            scope: 'read:user_todos update:user_todos',
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
                            <TodoList token={accessToken} />
                        </Route>
                        <Route path="/calender" exact component={Calender} />
                    </Switch>
                </Router>
            </div>
        ) : (
            isLoading ? (
                <span> Loading... </span>
            ) : (
                <Home />
            )
        )
    )

}

export default Profile