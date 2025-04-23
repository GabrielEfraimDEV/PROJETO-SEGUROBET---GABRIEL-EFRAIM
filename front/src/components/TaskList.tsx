import React from 'react';
import { api } from '../services/api';

type Task = { id: number; title: string; description: string; status: 'pending' | 'completed' };

// Lista de tarefas com ações de toggle e delete
export const TaskList: React.FC<{ tasks: Task[]; reload: () => void }> = ({ tasks, reload }) => {
  const toggleStatus = async (id: number, status: string) => {
    await api.put(/tasks/${id}, { status: status === 'pending' ? 'completed' : 'pending' });
    reload();
  };

  const deleteTask = async (id: number) => {
    await api.delete(/tasks/${id});
    reload();
  };

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id} className="border p-2 rounded mb-2 flex justify-between items-center">
          <div>
            <h3 className="font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <small>Status: {task.status}</small>
          </div>
          <div className="space-x-2">
            <button onClick={() => toggleStatus(task.id, task.status)} className="p-1 border rounded">
              {task.status === 'pending' ? 'Concluir' : 'Reabrir'}
            </button>
            <button onClick={() => deleteTask(task.id)} className="p-1 border rounded">
              Excluir
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};