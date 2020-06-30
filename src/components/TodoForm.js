import React, {useState} from "react"

function TodoForm(props) {
    
    console.log("render form")

    const [inputTodo, setInputTodo] = useState("")
    const [priority, setPriority] = useState("low")
    
    return (
        props.show ? 
            <form onSubmit={e => props.handleSubmit(e, inputTodo, priority)}>
                <input 
                    type="text"
                    name="inputTodo"
                    placeholder="Add todo here"
                    onChange={e => setInputTodo(e.target.value)}
                />
                <input 
                    type="radio"
                    id="high"
                    name="priority"
                    value="high"
                    checked={priority === "high"}
                    onChange={e => setPriority("high")}
                />
                <label htmlFor="high">High Priority</label><br/>
                <input 
                    type="radio"
                    id="medium"
                    name="priority"
                    value="medium"
                    checked={priority === "medium"}
                    onChange={e => setPriority("medium")}
                />
                <label htmlFor="medium">Medium Priority</label><br/>
                <input
                    type="radio"
                    id="low"
                    name="priority"
                    value="low"
                    checked={priority === "low"}
                    onChange={e => setPriority("low")}
                />
                <label htmlFor="low">Low Priority</label><br/>
                <button onClick={e => props.handleSubmit(e, inputTodo, priority)}>ADD</button>
                <button onClick={e => {e.preventDefault(); props.setShow(false)}}>CANCEL</button>
            </form > 
            : null
    )
}

export default TodoForm