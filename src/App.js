
import logo from './logo.svg'
import "./App.css"
import React, { useState, useEffect } from "react"
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"
import Web3 from 'web3'
import TruffleContract from "truffle-contract"
import TodoListJson from "./contracts/TodoList.json"


const useConstructor = (callBack = () => { }) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
}

function App() {
  const [todos, setTodos] = useState([]);
  const [account, setAccount] = useState("");
  const [todoList, setTodoList] = useState();
  const [taskCount, setTaskCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState();


  useEffect(() => {
    LoadBlockchainData()
  }, [])

  useEffect(() => {
    loadTasks();
    console.log("effect")
  }, [todoList])


  const ethEnabled = () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      return true;
    }
    return false;
  }

  const loadTasks = async () => {
    if (todoList) {
      const count = await todoList.methods.taskCount().call();
      setTaskCount(count);
      console.log(count);
      setTodos([])
      for (var i = 1; i <= count; i++) {
        const todo = await todoList.methods.tasks(i).call()
        setTodos([...todos, todo])
        console.log(todo)
        console.log(i)
      }
    }
    console.log(todoList);
  };

  const LoadBlockchainData = async () => {
    ethEnabled()
    const web3 = new Web3("http://localhost:7545")
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
    console.log(web3)
    console.log(accounts[0])


    // this.setState({ account: accounts[0] })
    // this.setState({ todoList })
    setTodoList(new web3.eth.Contract(TodoListJson.abi, TodoListJson.networks[5777].address))
    // this.setState({ taskCount })
    // this.setState({ loading: false })
    setLoading(false);
  }

  useConstructor(() => {
    LoadBlockchainData()
    loadTasks()
    console.log("constructor")
  })


  function toggleComplete(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id == id) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      })
    )
  }

  const createTask = (content) => {
    setLoading(true);
    todoList.methods.createTask(content).send({ from: account })
      .once('receipt', (receipt) => {
        setLoading(false)
      })
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }


  const toggleCompleted = (taskId) => {
    setLoading(true);
    todoList.methods.toggleCompleted(taskId).send({ from: account })
      .once('receipt', (receipt) => {
        setLoading(false);
      })
  }




  return (

    /* <div className="container-fluid">
       <div className="row">
         <main role="main" className="col-lg-12 d-flex justify-content-center">
           {loading
             ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
             : <TodoList
               tasks={tasks}
               createTask={createTask}
               toggleCompleted={toggleCompleted} />
           }
         </main>
       </div>
     </div>*/




    <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap py-3 shadow">
        <a className="navbar-brand mx-auto">ETHEREUM TODOLIST</a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small><a className="nav-link" href="#"><span id="account"></span></a></small>
          </li>
        </ul>
      </nav>
      <div className="App">
        <header className="App-header">
          <TodoForm createTask={createTask} loadTasks={loadTasks} />
          <TodoList todos={todos}
            toggleComplete={toggleComplete}
            removeTodo={removeTodo} />
        </header>
      </div>
    </div>
  );
};
export default App;
