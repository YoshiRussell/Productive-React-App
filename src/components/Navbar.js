import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <ul>
                <li> <Link to="/todolist">TODO LIST</Link> </li>
                <li> <Link to="/calendar">CALENDAR</Link> </li>
            </ul>
        </nav>
    )
}

export default Navbar