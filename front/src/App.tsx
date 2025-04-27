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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">ToDo List SeguroBet</h1>

      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <TaskForm onTaskAdded={loadTasks} />
        
        <div className="flex justify-center mb-6 space-x-4">
          <button onClick={() => setFilter('all')} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition">
            Todas
          </button>
          <button onClick={() => setFilter('pending')} className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded transition">
            Pendentes
          </button>
          <button onClick={() => setFilter('completed')} className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded transition">
            Concluídas
          </button>
        </div>

        <TaskList tasks={filtered} reload={loadTasks} />
      </div>
    </div>
  );
};

export default App;
