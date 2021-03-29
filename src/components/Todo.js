import React from "react";
import {v4 as uuidv4} from "uuid";

function Todo({todo, toggleComplete, removeTodo}){

    function handleCheckboxClick(){
        toggleComplete(todo.id)
    }

    function handleRemoveClick(){
        removeTodo(todo.id);
    }

    return (
        <div style={{display: "flex"}}>
            <input type = "checkbox" onClick = {handleCheckboxClick} />
            <li
                style = {{
                    color: "white",
                    // textDecoration: todo.completed ? "line-through" : null
                }}
            
            >{todo.content}</li>
            <button onClick= {handleRemoveClick}>X</button>
        </div>
    )
}

export default Todo;