pragma solidity >=0.4.22 <0.9.0;

contract TodoList {
    uint public taskCount = 0;

    struct Task {
        uint id;
        string content;
        bool completed;
    }

    mapping(uint => Task) public tasks;

    event TaskCreated (
        uint id,
        string content,
        bool completed
    );

    event TaskCompleted (
        uint id,
        bool completed
    );

    constructor() public {
        createTask("Check out apple.com for updates");
    }

    function createTask(string memory _content) public {
        taskCount ++;
        tasks[taskCount] = Task(taskCount, _content, false);
        emit TaskCreated(taskCount, _content, false);
    }

    function toggleCompleted(uint _id) public {
        string memory _content = "And here you go again :p";
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
        createTask(_content);
        emit TaskCompleted(_id, _task.completed);
    }
}
