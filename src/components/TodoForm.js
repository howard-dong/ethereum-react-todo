import React, {useState} from "react";
import {v4 as uuidv4} from "uuid";

function TodoForm({createTask, loadTasks}){
    const [todo, setTodo] = useState({
    });


    function handleTaskInputChange(e){
        setTodo ({...todo, content : e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault(); 
        if (todo.content.trim()) {
          createTask({ ...todo.content});
        }
        loadTasks()
      }

    return (
        <form onSubmit={handleSubmit}>
            <input
                name = "content"
                type ="text"
                value = {todo.content}
                onChange = {handleTaskInputChange}
            />
            <button type="submit">
                Submit
            </button>
        </form>
    )
}

export default TodoForm;