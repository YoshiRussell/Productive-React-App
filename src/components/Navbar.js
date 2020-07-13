import React from 'react';
import { Link } from 'react-router-dom';
import TodoList from './TodoList';
import Calender from './Calender';

function Navbar(props) {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/todolist">TODO LIST</Link>
                    <Link to="/calender">CALENDER</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar