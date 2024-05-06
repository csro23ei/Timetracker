import React, { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(taskName);
    setTaskName('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
      <button type="submit">Lägg till</button>
    </form>
  );
}

export default TaskForm;