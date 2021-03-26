
import React, { Component, useState, useEffect } from 'react'
import Web3 from 'web3'
import './App.css'
import TodoList from './TodoList'
import TodoListJson from './contracts/TodoList.json'

function App() {

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
  }, [todoList])


  const loadTasks = async () => {
    if (todoList) {
      const count = await todoList.methods.taskCount().call();
      setTaskCount(count);
      for (var i = 1; i <= taskCount; i++) {
        const task = await todoList.methods.tasks(i).call()
        // this.setState({
        //   tasks: [...this.state.tasks, task]
        // })
        setTasks([...tasks, task])
      }
    }
    console.log(todoList);
  };

  const LoadBlockchainData = async () => {

    const web3 = new Web3("http://localhost:7545")
    const accounts = await web3.eth.getAccounts()
    // this.setState({ account: accounts[0] })
    // this.setState({ todoList })
    setTodoList(new web3.eth.Contract(TodoListJson.abi, TodoListJson.networks[5777].address))
    // this.setState({ taskCount })
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
  // }

  const createTask = (content) => {
    setLoading(true);
    todoList.methods.createTask(content).send({ from: account })
      .once('receipt', (receipt) => {
        setLoading(false)
      })
  }

  const toggleCompleted = (taskId) => {
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
            {loading
              ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
              : <TodoList
                tasks={tasks}
                createTask={createTask}
                toggleCompleted={toggleCompleted} />
            }
          </main>
        </div>
      </div>
    </div>
  );
};


export default App;

// import React, { Component } from 'react'
// import Web3 from 'web3'
// import './App.css'
// import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config'
// import TodoList from './TodoList'

// class App extends Component {
  // componentWillMount() {
  //   this.loadBlockchainData()
  // }

//   async loadBlockchainData() {
//     const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
//     const accounts = await web3.eth.getAccounts()
//     this.setState({ account: accounts[0] })
//     const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
//     this.setState({ todoList })
    // const taskCount = await todoList.methods.taskCount().call()
//     this.setState({ taskCount })
//     for (var i = 1; i <= taskCount; i++) {
//       const task = await todoList.methods.tasks(i).call()
//       this.setState({
//         tasks: [...this.state.tasks, task]
//       })
//     }
//     this.setState({ loading: false })
//   }

//   constructor(props) {
//     super(props)
//     this.state = {
//       account: '',
//       taskCount: 0,
//       tasks: [],
//       loading: true
//     }

//     this.createTask = this.createTask.bind(this)
//     this.toggleCompleted = this.toggleCompleted.bind(this)
//   }

//   createTask(content) {
//     this.setState({ loading: true })
//     this.state.todoList.methods.createTask(content).send({ from: this.state.account })
//     .once('receipt', (receipt) => {
//       this.setState({ loading: false })
//     })
//   }

//   toggleCompleted(taskId) {
//     this.setState({ loading: true })
//     this.state.todoList.methods.toggleCompleted(taskId).send({ from: this.state.account })
//     .once('receipt', (receipt) => {
//       this.setState({ loading: false })
//     })
//   }

//   render() {
//     return (
//       <div>
//         <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
//           <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="http://www.dappuniversity.com/free-download" target="_blank">Dapp University | Todo List</a>
//           <ul className="navbar-nav px-3">
//             <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
//               <small><a className="nav-link" href="#"><span id="account"></span></a></small>
//             </li>
//           </ul>
//         </nav>
//         <div className="container-fluid">
//           <div className="row">
//             <main role="main" className="col-lg-12 d-flex justify-content-center">
//               { this.state.loading
//                 ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
//                 : <TodoList
//                   tasks={this.state.tasks}
//                   createTask={this.createTask}
//                   toggleCompleted={this.toggleCompleted} />
//               }
//             </main>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;