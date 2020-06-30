import React, { useState, useEffect } from "react"
import tempTodoList from "../tempTodoList"
import TodoItem from "./TodoItem"
import TodoForm from "./TodoForm"

function TodoList() {

    console.log("render TodoList")

    // declare states I want to keep track of
    const [modelTodoList, updateModel] = useState(tempTodoList)
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
        const updateModelTodoList = modelTodoList.map(todo => {
            if(todo.id === id) {
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
        const updateModelTodoList = modelTodoList.filter(todo => todo.id !== deleteTodoId)
        updateModel(updateModelTodoList)
    }
    
    // add new todo 
    function submitNewTodo(event, newText, newPriority) {
        console.log("submitting")
        event.preventDefault()
        const newTodoObj = {
            id: modelTodoList.length + 1,
            text: newText,
            completed: false,
            priority: newPriority
        }
        updateModel(prevModel => [...prevModel, newTodoObj])
    }

    useEffect(() => {
        setShowForm(false)
    },[modelTodoList])

    // render todo list 
    const updatedView = modelTodoList.map(todo => {
        return <TodoItem 
            key={todo.id} 
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