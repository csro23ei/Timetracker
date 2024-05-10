import React from 'react';

interface Task {
  id: number;
  name: string;
  timeElapsed: number;
}

interface TaskListProps {
  tasks: Task[];
  onStart: (taskId: number) => void;
  onStop: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onStart, onStop }) => {
  return (
    <div>
      <h2>Arbetsuppgifter</h2>
      <ul>
        {tasks.map((task: Task) => (
          <li key={task.id}>
            {task.name} - {task.timeElapsed} sek
            <button onClick={() => onStart(task.id)}>Start</button>
            <button onClick={() => onStop(task.id)}>Stop</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;

