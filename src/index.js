import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import { Auth0Provider } from "@auth0/auth0-react";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
        <Auth0Provider
            domain="dev-lkenkzaj.us.auth0.com"              // auth0 universal login page domain
            clientId="qH0fEHdMUZX0Iiypz3mO6GU7cTYfAz3N"
            redirectUri="http://localhost:3000/todolist"    // after successful login, redirect here
            audience="http://localhost:5000/"               // api to validate access tokens
            scope="read:user_todos update:user_todos"       // permissions granted for private routes
        >
            <App />
        </Auth0Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
