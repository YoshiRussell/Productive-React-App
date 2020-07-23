import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Calendar from 'react-calendar';
import TodoForm from './TodoForm';
import { Redirect } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';

function MyCalendar(props) {

    console.log("rendering calendar component");

    const { user, isAuthenticated, isLoading } = useAuth0();
    
    const [date, setDate] = useState(new Date());
    const [showForm, toggleShowForm] = useState(false);
    const [accessToken, setAccessToken] = useState(props.accessToken);

    function handleClickDay(newText, newPriority) {
        const headerConfig = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const newTodoObj = {
            userId: user.sub,
            text: newText,
            completed: false,
            priority: newPriority
        }
        toggleShowForm(false);

        axios.post('http://localhost:5000/api/todo/add', newTodoObj, headerConfig)
            .then(response => console.log(response))
            .catch(err => {
                console.log("error sending todo to database from myCalendar: " + err);
                setAccessToken(null);
            });
    };

    function handleProxyClick() {
        axios.post('http://localhost:5000/api/proxy',{
            user: user
        })
        .then(response => {
            console.log("Success in proxy: " + response.data);
        })
        .catch(err => {
            console.log("Error in proxy: " + err);
        }) 
    }

    return (
        user && accessToken && isAuthenticated ? (
            <div className="content-body">
                 <h1>CALENDER PAGE</h1><br />
                <button onClick={() => handleProxyClick()}>Get data from auth0/api/v2 endpoint</button>
                <Calendar
                    value={date}
                    onChange={date => setDate(date)}
                    onClickDay={() => toggleShowForm(true)}
                />
                { showForm ? <TodoForm handleSubmit={handleClickDay} setShow={toggleShowForm} />
                           : null }
            </div>
        ) : (
            <div>
                { isLoading ? <h1>Loading...</h1> 
                            : <Redirect to="/profile" /> }
            </div>
        )
    )
}

export default MyCalendar