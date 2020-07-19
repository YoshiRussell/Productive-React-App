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
            <section className="light">
                <label>
                    <input 
                        type="radio"
                        id="high"
                        name="priority"
                        value="high"
                        checked={priority === "high"}
                        onChange={e => setPriority("high")}
                    />
                    <span className="design"></span>
                    <span className="text">High Priority</span>
                </label>
                <label>
                    <input 
                        type="radio"
                        id="medium"
                        name="priority"
                        value="medium"
                        checked={priority === "medium"}
                        onChange={e => setPriority("medium")}
                    />
                    <span className="design"></span>
                    <span className="text">Medium Priority</span>
                </label>
                <label>
                    <input
                        type="radio"
                        id="low"
                        name="priority"
                        value="low"
                        checked={priority === "low"}
                        onChange={e => setPriority("low")}
                    />
                    <span className="design"></span>
                    <span className="text">Low Priority</span>
                </label>
            </section>
            <button onClick={e => {e.preventDefault(); props.handleSubmit(inputTodo, priority)}}>ADD</button>
        </form > 
    )
}

export default TodoForm