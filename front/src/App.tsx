import React, { useEffect, useState } from 'react';
import { api } from './services/api';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';

// Componente principal da aplicação
const App: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const loadTasks = async () => {
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const filtered = tasks.filter(t => filter === 'all' ? true : t.status === filter);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ToDo List SeguroBet</h1>
      <TaskForm onTaskAdded={loadTasks} />
      <div className="mb-4">
        <button onClick={() => setFilter('all')} className="mr-2">Todas</button>
        <button onClick={() => setFilter('pending')} className="mr-2">Pendentes</button>
        <button onClick={() => setFilter('completed')}>Concluídas</button>
      </div>
      <TaskList tasks={filtered} reload={loadTasks} />
    </div>
  );
};

export default App;