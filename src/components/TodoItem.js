import React, { useState } from 'react';

// Template for each todo list item
function TodoItem(props) {

    console.log("render todoitem " + props.item.text)
    console.log("todoitem id: " + props.item._id)
    const [checked, setChecked] = useState(props.item.completed)

    function inlineStyle() {
        return {
            backgroundColor: `${props.background}`        
        }
    }

    return (
        <div className="todo-item" style={inlineStyle()}>
            <input 
                id={props.item._id}
                type="checkbox" 
                checked={checked}
                onChange={() => {
                    console.log("change triggered")
                    setChecked(prevCheck => !prevCheck)
                    props.handleClick(props.item._id)
                }}
            />
            <label htmlFor={props.item.id}></label>
            <p style={checked ? {textDecoration : "line-through"} : null}>
                {props.item.text}
            </p>
            {props.showDelete ? <button className="delete-div" onClick={() => props.handleDelete(props.item._id)}>
                                    <i className="material-icons">delete</i>
                                </button> 
                                : null}
        </div>
    )
}

export default TodoItem
