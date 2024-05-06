


import React from 'react';

const TaskList = ({ tasks }) => {
  return (
    <div>
      <h2>Arbetsuppgifter</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;