import React, {useState} from "react"

function TodoForm(props) {
    
    console.log("render todo form component")

    const [inputTodo, setInputTodo] = useState("")
    
    return (
        <form className="todo-form" onSubmit={e => props.handleSubmit(e, inputTodo)}>
            <input 
                type="text"
                name="inputTodo"
                value={inputTodo}
                placeholder="Add todo here"
                onChange={e => setInputTodo(e.target.value)}
            />
            <button className="btn btn-secondary" onClick={e => {e.preventDefault(); props.handleSubmit(inputTodo); setInputTodo("");}}>ADD</button>
        </form > 
    )
}

export default TodoForm