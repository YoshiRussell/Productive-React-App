import React, { useState } from 'react';

// Template for each todo list item
function TodoItem(props) {

    console.log("render todoitem " + props.item.text)

    const [checked, setChecked] = useState(props.item.completed)

    function inlineStyle() {
        return {
            backgroundColor: `${props.background}`        
        }
    }

    return (
        <div className="todo-item" style={inlineStyle()}>
            <input 
                id={props.item.id}
                type="checkbox" 
                checked={checked}
                onChange={() => {
                    setChecked(prevCheck => !prevCheck)
                    props.handleClick(props.item.id)
                }}
            />
            <label htmlFor={props.item.id}></label>
            <p style={checked ? {textDecoration : "line-through"} : null}>
                {props.item.text}
            </p>
            {props.showDelete ? <button className="delete-div" onClick={() => props.handleDelete(props.item.id)}>
                                    <i class="material-icons">delete</i>
                                </button> 
                                : null}
        </div>
    )
}

export default TodoItem
