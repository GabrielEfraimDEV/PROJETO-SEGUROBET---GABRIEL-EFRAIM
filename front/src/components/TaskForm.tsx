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
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        className="border p-2 rounded w-full mb-2"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        className="border p-2 rounded w-full mb-2"
        placeholder="Descrição"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Adicionar
      </button>
    </form>
  );
};