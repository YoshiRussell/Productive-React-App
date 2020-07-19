import React, {useState} from "react"

function TodoForm(props) {
    
    console.log("render form")

    const [inputTodo, setInputTodo] = useState("")
    const [priority, setPriority] = useState("low")
    
    return (
        <form className="todo-form" onSubmit={e => props.handleSubmit(e, inputTodo, priority)}>
            <input 
                type="text"
                name="inputTodo"
                placeholder="Add todo here"
                onChange={e => setInputTodo(e.target.value)}
            />
            <button className="btn btn-secondary" onClick={e => {e.preventDefault(); props.handleSubmit(inputTodo, priority)}}>ADD</button>
        </form > 
    )
}

export default TodoForm