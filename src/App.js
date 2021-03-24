  
import React, { Component, useState } from 'react'
import Web3 from 'web3'
import './App.css'
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config'
import TodoList from './TodoList'

function Test() {

  useEffect(()=>{
    loadBlockchainData()
  },[])

  const loadBlockchainData = async () => {
    const [account, setAccount] = useState("");
    const [todoList, setTodoList] = useState();
    const [taskCount, setTaskCount] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState();

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts()
    // this.setState({ account: accounts[0] })
    setAccount(accounts[0])
    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
    // this.setState({ todoList })
    setTodoList(todoList);
    const taskCount = await todoList.methods.taskCount().call()
    // this.setState({ taskCount })
    setTaskCount(taskCount);
    for (var i = 1; i <= taskCount; i++) {
      const task = await todoList.methods.tasks(i).call()
      // this.setState({
      //   tasks: [...this.state.tasks, task]
      // })
      setTasks([...tasks, task])
    }
    // this.setState({ loading: false })
    setLoading(false);
  }

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     account: '',
  //     taskCount: 0,
  //     tasks: [],
  //     loading: true
  //   }

    // this.createTask = this.createTask.bind(this)
    // this.toggleCompleted = this.toggleCompleted.bind(this)
  }

  const createTask = (content) => {
    setLoading(true);
    todoList.methods.createTask(content).send({ from: account })
    .once('receipt', (receipt) => {
      setLoading(false)
    })
  }

  toggleCompleted = (taskId) => {
    setLoading(true);
    todoList.methods.toggleCompleted(taskId).send({ from: account })
    .once('receipt', (receipt) => {
      setLoading(false);
    })
  }

  return (
    <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap py-3 shadow">
        <a className="navbar-brand mx-auto">ETHEREUM TODOLIST</a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small><a className="nav-link" href="#"><span id="account"></span></a></small>
          </li>
        </ul>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex justify-content-center">
            {/* { this.state.loading
              ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
              : <TodoList
                tasks={this.state.tasks}
                createTask={this.createTask}
                toggleCompleted={this.toggleCompleted} />
            } */}
          </main>
        </div>
      </div>
    </div>
  );
    
  }

export default App;
