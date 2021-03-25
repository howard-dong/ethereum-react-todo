import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config'
import TodoList from './TodoList'

function App(props) {
  const componentWillMount = () => {
    loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts()
    setState({ account: accounts[0] })
    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
    setState({ todoList })
    const taskCount = await todoList.methods.taskCount().call()
    setState({ taskCount })
    for (var i = 1; i <= taskCount; i++) {
      const task = await todoList.methods.tasks(i).call()
      setState({
        tasks: [...state.tasks, task]
      })
    }
    setState({ loading: false })
  }

  function Apps(props) {
      const [account, setAccount] = useState('')
      const [taskCount, setTaskCount] = useState(0)
      const [tasks, setTasks] = useState([])
      const [loading, setLoading] = useState(true)
    }

  }

  const createTask = (content) => {
    setState({ loading: true })
    state.todoList.methods.createTask(content).send({ from: state.account })
    .once('receipt', (receipt) => {
      setState({ loading: false })
    })
  }

  toggleCompleted(taskId) {
    setState({ loading: true })
    state.todoList.methods.toggleCompleted(taskId).send({ from: state.account })
    .once('receipt', (receipt) => {
      setState({ loading: false })
    })
  }

  return (
    <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="http://www.dappuniversity.com/free-download" target="_blank">Dapp University | Todo List</a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small><a className="nav-link" href="#"><span id="account"></span></a></small>
          </li>
        </ul>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex justify-content-center">
            { state.loading
              ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
              : <TodoList
                tasks={state.tasks}
                createTask={createTask}
                toggleCompleted={toggleCompleted} />
            }
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
