import React, { useState } from 'react';
import { api } from '../services/api';

type Props = { onTaskAdded: () => void };

// Formulário para criar nova tarefa
export const TaskForm: React.FC<Props> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/tasks', { title, description, status: 'pending' });
    setTitle('');
    setDescription('');
    onTaskAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Título da Tarefa</label>
        <input
          className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Digite o título"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Descrição (opcional)</label>
        <textarea
          className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Digite a descrição"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">
        Adicionar
      </button>
    </form>
  );
};
