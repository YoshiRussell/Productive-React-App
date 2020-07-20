import React, { useState } from 'react';
import Details from './Details';
import { Link } from 'react-router-dom';

// Template for each todo list item
function TodoItem(props) {

    // states to keep track of
    const [checked, setChecked] = useState(props.item.completed)
    const [showDetails, setShowDetails] = useState(false);

    // render todo-item
    return (
        <div className="todo-item">
            <div className="todo-item-child">
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
                    <p className="todo-text" style={checked ? {textDecoration : "line-through"} : null}>
                        {props.item.text}
                    </p>
                </label>
                
                {props.showDelete ? (
                    <button className="delete-div" onClick={() => props.handleDelete(props.item._id)}>
                        delete
                    </button> 
                ) : (
                    null
                )}
                <div className="details-button">
                    <Link onClick={() => setShowDetails(!showDetails)}>{showDetails ? "Hide" : "Show"} Details</Link>
                </div>
            </div>
            {showDetails ? <Details setShowDetails={setShowDetails}/> : null }
        </div>
    )
}

export default TodoItem
