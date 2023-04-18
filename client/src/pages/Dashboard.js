import React from 'react'
import { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css';

const Dashboard = () => {
    const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (newTask !== '') {
      const newTaskObj = {
        name: newTask,
        muscle: '',
        sets_and_reps: ''
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleChangeTaskName = (index, name) => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return {
          ...task,
          name: name
        };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const handleChangeTaskDueDate = (index, dueDate) => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return {
          ...task,
          dueDate: dueDate
        };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const handleChangeTaskPriority = (index, priority) => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return {
          ...task,
          priority: priority
        };
      }
      return task;
    });
    setTasks(newTasks);
  };

  return (
    <div className="dashboard">
      <div className="to-do-list">
      <a href = "/"><img className = "kenkologo" src = "/kenkologo.png" alt = "Logo"/></a>
        <h2>Exercise List</h2>
        <div className="new-task-form">
          <input
            type="text"
            value={newTask}
            placeholder="Enter a new exercise..."
            onChange={(event) => setNewTask(event.target.value)}
          />
          <button className = "addListItem" onClick={handleAddTask}>Add</button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <input
                type="text"
                value={task.name}
                onChange={(event) => handleChangeTaskName(index, event.target.value)}
              />
              <input
                type="text"
                value={task.dueDate}
                onChange={(event) => handleChangeTaskDueDate(index, event.target.value)}
                placeholder="Muscle Group"
              />
              <input
                type="text"
                value={task.priority}
                onChange={(event) => handleChangeTaskPriority(index, event.target.value)}
                placeholder="Sets/Reps"
              />
              <button className = "deleteItemButtom" onClick={() => handleDeleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;