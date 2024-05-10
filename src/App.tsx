import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

interface Task {
  id: number;
  name: string;
  timeElapsed: number;
  intervalId?: ReturnType<typeof setInterval>; // Use ReturnType<typeof setInterval> to define intervalId
}

const App: React.FC = () => {
  // State to keep track of active tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  // State to keep track of completed tasks
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Load previously saved tasks from localStorage when the component renders
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const savedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    setTasks(savedTasks);
    setCompletedTasks(savedCompletedTasks);
  }, []);

  useEffect(() => {
    // Save updated tasks to localStorage when tasks or completedTasks update
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [tasks, completedTasks]);

  const startTask = (taskId: number) => {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    const activeTaskIndex = tasks.findIndex(task => task.intervalId);
    
    if (taskIndex !== -1 && activeTaskIndex === -1) {
      const startTime = Date.now();
      const intervalId = setInterval(() => {
        const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
        setTasks(prevState => {
          const updatedTasks = [...prevState];
          updatedTasks[taskIndex].timeElapsed = timeElapsed;
          return updatedTasks;
        });
      }, 1000);
  
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex].intervalId = intervalId;
      setTasks(updatedTasks);
    } else if (activeTaskIndex !== -1) {
      // Om det redan finns en aktiv uppgift, visa en popup-meddelanderuta för att låta användaren välja vad de vill göra
      const confirmMessage = "Det finns redan en aktiv uppgift. Vill du starta en till? OK komer låta dig starta två saker samtidigt";
      const result = window.confirm(confirmMessage);
      if (result) {
        // Om användaren väljer att starta en till uppgift, starta den nya uppgiften
        const startTime = Date.now();
        const intervalId = setInterval(() => {
          const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
          setTasks(prevState => {
            const updatedTasks = [...prevState];
            updatedTasks[taskIndex].timeElapsed = timeElapsed;
            return updatedTasks;
          });
        }, 1000);
  
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex].intervalId = intervalId;
        setTasks(updatedTasks);
      }
    }
  };
  
  const stopTask = (taskId: number) => {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1 && tasks[taskIndex].intervalId) {
      clearInterval(tasks[taskIndex].intervalId);
      const completedTask = tasks[taskIndex];
      setCompletedTasks(prevState => [...prevState, completedTask]);
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
    }
  };

  // Function to remove a completed task
  const removeCompletedTask = (taskId: number) => {
    const updatedCompletedTasks = completedTasks.filter(task => task.id !== taskId);
    setCompletedTasks(updatedCompletedTasks);
  };

  // Function to add a new task
  const addTask = (taskName: string) => {
    const newTask = {
      id: Date.now(),
      name: taskName,
      timeElapsed: 0,
    };
    setTasks(prevState => [...prevState, newTask]);
  };

  return (
    <div>
      <div style={{ float: 'left', marginRight: '50px' }}>
        <h2>Vad gör du nu?</h2>
        <TaskForm onSubmit={addTask} />
        <TaskList tasks={tasks} onStart={startTask} onStop={stopTask} />
      </div>
      <div>
        <h2>Det har du gjort</h2>
        <ul>
          {completedTasks.map(task => (
            <li key={task.id}>
              {task.name} - {Math.floor(task.timeElapsed / 3600)} timmar {Math.floor((task.timeElapsed % 3600) / 60)} minuter {task.timeElapsed % 60} sekunder
              <button onClick={() => removeCompletedTask(task.id)}>Ta bort</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

