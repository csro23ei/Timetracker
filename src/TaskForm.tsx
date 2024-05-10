import React, { useState, ChangeEvent, FormEvent } from 'react';

interface TaskFormProps {
  onSubmit: (taskName: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [taskName, setTaskName] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(taskName);
    setTaskName('');
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={taskName} onChange={handleChange} />
      <button type="submit">Lägg till</button>
    </form>
  );
}

export default TaskForm;

