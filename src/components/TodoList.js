import React, { useState, useEffect } from "react"
import axios from 'axios';
import TodoItem from "./TodoItem"
import TodoForm from "./TodoForm"
import { useAuth0 } from "@auth0/auth0-react"

function TodoList() {

    // get user details
    const { user, isAuthenticated, getAccessTokenSilently, logout, isLoading } = useAuth0()
    
    // states to keep track of
    const [modelTodoList, updateModel] = useState([])
    const [showForm, setShowForm] = useState(false)

    // fetch data from database
    useEffect(() => {
        (async() => {
            try {
                const accessToken = await getAccessTokenSilently({
                    audience: 'http://localhost:5000/',
                    scope: 'read:user_todos update:user_todos',
                });
                const headerConfig = {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
                const reqBody = {
                    email: user.email,
                    userId: user.sub
                }
                const response = await axios.post('http://localhost:5000/api/users/getUserId&Todos', reqBody, headerConfig)
                updateModel(response.data.todos);
            } catch(e) {
                console.log("there was an error fetching data: ", e);
            }
        })();
    }, [getAccessTokenSilently, user]);

    // handle color of todo item based on priority
    function handleColor(thisPriority) {
        const colorMapper = {
            low : "linen",
            medium : "Silver",
            high : "lightSlateGrey"
        }
        return colorMapper[thisPriority]
    }

    // update checkboxes
    function checkBoxChange(id) {
        console.log("checkboxchange")
        const updateModelTodoList = modelTodoList.map(todo => {
            if(todo._id === id) {
                return {
                    ...todo,
                    completed: !todo.completed
                }
            }
            return todo
        })
        updateModel(updateModelTodoList)
    }

    // delete todo
    function handleDelete(deleteTodoId) {
        (async() => {
            try {
                const accessToken = await getAccessTokenSilently({
                    audience: 'http://localhost:5000/',
                    scope: 'read:user_todos update:user_todos delete:user_todos',
                });
                const headerConfig = {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
                const updateModelTodoList = modelTodoList.filter(todo => todo._id !== deleteTodoId);
                updateModel(updateModelTodoList);
                axios.post(`http://localhost:5000/api/todo/delete/${deleteTodoId}`, { userId: user.sub }, headerConfig)    
            } catch(e) {
                console.log("there was an err deleting data: ", e);
            }
        })();
    }
    
    // add new todo 
    function submitNewTodo(newText, newPriority) {
        (async() => {
            try {
                const accessToken = await getAccessTokenSilently({
                    audience: 'http://localhost:5000/',
                    scope: 'read:user_todos update:user_todos',
                });
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
                updateModel(prevModel => [...prevModel, newTodoObj]);
                axios.post('http://localhost:5000/api/todo/add', newTodoObj, headerConfig);
            } catch(e) {
                console.log("there was an err posting data: ", e);
            }
        })();
    }

    // hide form after creating/canceling new todo item
    useEffect(() => {
        setShowForm(false)
    },[modelTodoList])

    // create list of todoitem components
    const updatedView = modelTodoList.map(todo => {
        return <TodoItem 
            key={todo._id} 
            item={todo} 
            handleClick={checkBoxChange} 
            showDelete={todo.completed} 
            handleDelete={handleDelete}
            background={handleColor(todo.priority)}
        /> 
    })

    // render todo list
    return (
        <div>
            {isAuthenticated ?
                <div className="todo-list">
                    {updatedView.length > 0 ? updatedView : console.log("loading...")}
                    <TodoForm handleSubmit={submitNewTodo} show={showForm} setShow={setShowForm} />
                    {showForm ? null : <button className="delete-div" id="add" onClick={() => setShowForm(true)}>ADD NEW TODO</button>}
                </div> :
                <div>
                    {isLoading ? 
                        <h1>Loading...</h1> :
                        logout({ returnTo: window.location.origin })
                    }
                </div>
            }   
        </div>
        
    )
}

export default TodoList