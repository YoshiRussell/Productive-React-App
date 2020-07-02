import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import TodoList from './TodoList';
import '../styles/App.css';
import Navbar from './Navbar';


function App() {
    console.log("adding app")
    return (
        <div className="container">
            <Router>
                <Navbar />
                <Route path="/" exact component={TodoList} />
            </Router>
        </div>
    )
}

export default App;

