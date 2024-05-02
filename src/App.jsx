import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Hämta uppgifter från backend och sätt tillståndet
  }, []);

  const addTask = (taskName) => {
    // Skicka uppgiften till backend och uppdatera frontend
  }

  return (
    <div>
      <h1>Personligt Tidsrapporteringssystem</h1>
      <TaskForm onSubmit={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
