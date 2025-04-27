import React from 'react';
import { api } from '../services/api';

type Task = { id: number; title: string; description: string; status: 'pending' | 'completed' };

// Lista de tarefas com ações de toggle e delete
export const TaskList: React.FC<{ tasks: Task[]; reload: () => void }> = ({ tasks, reload }) => {
  const toggleStatus = async (id: number, status: string) => {
    await api.put(`/tasks/${id}`, { status: status === 'pending' ? 'completed' : 'pending' });
    reload();
  };

  const deleteTask = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    reload();
  };

  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">Nenhuma tarefa encontrada.</p>;
  }

  return (
    <ul className="space-y-4">
      {tasks.map(task => (
        <li
          key={task.id}
          className={`border p-4 rounded-lg flex justify-between items-start shadow-sm ${
            task.status === 'completed' ? 'bg-green-100' : 'bg-white'
          }`}
        >
          <div>
            <h3 className={`text-lg font-bold ${task.status === 'completed' ? 'line-through text-green-700' : ''}`}>
              {task.title}
            </h3>
            <p className="text-gray-600">{task.description}</p>
            <small className="text-xs text-gray-500">Status: {task.status === 'pending' ? 'Pendente' : 'Concluída'}</small>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <button
              onClick={() => toggleStatus(task.id, task.status)}
              className="text-xs bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded transition"
            >
              {task.status === 'pending' ? 'Concluir' : 'Reabrir'}
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
            >
              Excluir
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
