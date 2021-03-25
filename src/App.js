
import logo from './logo.svg';
import "./App.css";
import React, {useState, useEffect} from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Web3 from 'web3'
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config'

const LOCAL_STORAGE_KEY = "react-todo-list-todos";

function App() {

  const [todos, setTodos] = useState([]);
    /*
    Stores todoList in local storage
    Not needed because blockchain
    */
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


  // useEffect(()=>{
  //   loadBlockchainData()
  // },[])

  // const loadBlockchainData = async () => {
  //   const [account, setAccount] = useState("");
  //   // const [todoList, setTodoList] = useState();
  //   // const [taskCount, setTaskCount] = useState(0);
  //   const [tasks, setTasks] = useState([]);
  //   const [loading, setLoading] = useState();

  //   const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
  //   const accounts = await web3.eth.getAccounts()
  //   // this.setState({ account: accounts[0] })
  //   setAccount(accounts[0])
  //   const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
  //   // this.setState({ todoList })
  //   setTodoList(todoList);
  //   const taskCount = await todoList.methods.taskCount().call()
  //   // this.setState({ taskCount })
  //   setTaskCount(taskCount);
  //   for (var i = 1; i <= taskCount; i++) {
  //     const task = await todoList.methods.tasks(i).call()
  //     // this.setState({
  //     //   tasks: [...this.state.tasks, task]
  //     // })
  //     setTasks([...tasks, task])
  //   }
  //   // this.setState({ loading: false })
  //   setLoading(false);
  // }


  // const createTask = (content) => {
  //   setLoading(true);
  //   todoList.methods.createTask(content).send({ from: account })
  //   .once('receipt', (receipt) => {
  //     setLoading(false)
  //   })
  // }

  // toggleCompleted = (taskId) => {
  //   setLoading(true);
  //   todoList.methods.toggleCompleted(taskId).send({ from: account })
  //   .once('receipt', (receipt) => {
  //     setLoading(false);
  //   })
  // }

  return (
    /* { this.state.loading
              ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
              : <TodoList
                tasks={this.state.tasks}
                createTask={this.createTask}
                toggleCompleted={this.toggleCompleted} />
            } */



    <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap py-3 shadow">
        <a className="navbar-brand mx-auto">ETHEREUM TODOLIST</a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small><a className="nav-link" href="#"><span id="account"></span></a></small>
          </li>
        </ul>
      </nav>
      {/* <div className="container-fluid">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex justify-content-center">
          </main>
        </div>
      </div> */}
      <div className = "App">
      <header className = "App-header">
        {/* <p>React Todo</p> */}
        <TodoForm addTodo = {addTodo} />
        <TodoList todos = {todos}
         toggleComplete ={toggleComplete}
          removeTodo={removeTodo}
          addTodo = {addTodo}/>
      </header>
    </div>
    </div>
  );
};
export default App;
