import React, { useState, useEffect } from "react"
import axios from 'axios';
import tempTodoList from "../tempTodoList"
import TodoItem from "./TodoItem"
import TodoForm from "./TodoForm"

function TodoList() {

    console.log("render TodoList")

    // fetch data from database
    useEffect(() => {
        axios.get('http://localhost:5000/todo')
            .then(response => {
                console.log(response.data)
                updateModel(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []) 

    // declare states I want to keep track of
    const [modelTodoList, updateModel] = useState([])
    const [showForm, setShowForm] = useState(false)

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

        // delete from database
        axios.delete('http://localhost:5000/todo/' + deleteTodoId)
            .then(response => console.log(response.data))

        const updateModelTodoList = modelTodoList.filter(todo => todo._id !== deleteTodoId)
        updateModel(updateModelTodoList)
    }
    
    // add new todo 
    function submitNewTodo(event, newText, newPriority) {
        console.log("submitting")
        event.preventDefault()
        const newTodoObj = {
            text: newText,
            completed: false,
            priority: newPriority
        }

        // update database
        axios.post('http://localhost:5000/todo/add', newTodoObj)
                .then(res => console.log(res.data))
                .catch(err => console.log(err))

        updateModel(prevModel => [...prevModel, newTodoObj])
    }

    useEffect(() => {
        setShowForm(false)
    },[modelTodoList])

    // render todo list 
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

    return (
        <div className="todo-list">
            {updatedView.length > 0 ? updatedView : console.log("loading...")}
            <TodoForm handleSubmit={submitNewTodo} show={showForm} setShow={setShowForm} />
            {showForm ? null : <button className="delete-div" id="add" onClick={() => setShowForm(true)}>ADD NEW TODO</button>}
        </div>
    )
}

export default TodoList