import React from "react";
import {v4 as uuidv4} from "uuid";

function Todo({todo, toggleComplete, removeTodo, addTodo}){

    function handleCheckboxClick(){
        toggleComplete(todo.id)
        spawnNew()
    }

    function spawnNew(){
        addTodo({ ...todo, id: uuidv4() });
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
            
            >{todo.task}</li>
            <button onClick= {handleRemoveClick}>X</button>
        </div>
    )
}

export default Todo;