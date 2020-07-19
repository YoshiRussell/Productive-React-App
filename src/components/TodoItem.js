import React, { useState } from 'react';

// Template for each todo list item
function TodoItem(props) {

    // states to keep track of
    const [checked, setChecked] = useState(props.item.completed)

    // render todo-item
    return (
        <div className="todo-item">
            <input
                id={props.item._id}
                type="checkbox" 
                checked={checked}
                onChange={() => {
                    setChecked(prevCheck => !prevCheck)
                    props.handleClick(props.item._id)
                }}
            />
            <label htmlFor={props.item.id}>
                <p style={checked ? {textDecoration : "line-through"} : null}>
                    {props.item.text}
                </p>
            </label>
            
            {props.showDelete ? (
                <button className="delete-div" onClick={() => props.handleDelete(props.item._id)}>
                    <i className="material-icons">delete</i>
                </button> 
            ) : (
                null
            )}
        </div>
    )
}

export default TodoItem
