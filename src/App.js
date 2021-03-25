import logo from './logo.svg';
import "./App.css";
import React, {useState, useEffect} from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const LOCAL_STORAGE_KEY = "react-todo-list-todos";

function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(storageTodos!=null){
      setTodos(storageTodos);
    }
  }, []);

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  
  function addTodo(todo){
    setTodos([todo, ...todos]);
  }

  function toggleComplete(id){
    setTodos(
      todos.map(todo=>{
          if(todo.id == id){
            return{
             ...todo,
             completed: !todo.completed
           };
         }
         return todo;
      })
    )
  }

  function removeTodo(id){
    setTodos(todos.filter(todo=> todo.id!==id));
  }

  return (
    <div className = "App">
      <header className = "App-Header">
        <p>React Todo</p>
        <TodoForm addTodo = {addTodo} />
        <TodoList todos = {todos}
         toggleComplete ={toggleComplete}
          removeTodo={removeTodo}/>
      </header>
    </div>



    // <div>
    //   <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap py-3 shadow">
    //     <a className="navbar-brand mx-auto">ETHEREUM TODOLIST</a>
    //     <ul className="navbar-nav px-3">
    //       <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
    //         <small><a className="nav-link" href="#"><span id="account"></span></a></small>
    //       </li>
    //     </ul>
    //   </nav>
    //   <div className="container-fluid">
    //     <div className="row">
    //       <main role="main" className="col-lg-12 d-flex justify-content-center">
    //         {/* { this.state.loading
    //           ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
    //           : <TodoList
    //             tasks={this.state.tasks}
    //             createTask={this.createTask}
    //             toggleCompleted={this.toggleCompleted} />
    //         } */}
    //       </main>
    //     </div>
    //   </div>
    // </div>
  );
    
  }

export default App;
