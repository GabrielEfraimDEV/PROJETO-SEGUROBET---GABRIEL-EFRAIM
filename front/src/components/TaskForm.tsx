import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
}

type Props = { onTaskAdded: () => void };

// Formulário para criar nova tarefa
export const TaskForm: React.FC<Props> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false); // Adicionado estado de loading
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Define loading como true ao iniciar a requisição
    setError(null);
    try {
      await api.post('/tasks', { title, description, status: 'pending' });
      setTitle('');
      setDescription('');
      onTaskAdded();
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao criar a tarefa. Por favor, tente novamente.');
    } finally {
      setLoading(false); // Define loading como false ao finalizar a requisição (com ou sem erro)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Nova Tarefa</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Título da Tarefa
        </label>
        <input
          type="text"
          id="title"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Digite o título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={loading} // Desabilita o input enquanto carrega
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Descrição (opcional)
        </label>
        <textarea
          id="description"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Digite a descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading} // Desabilita o textarea enquanto carrega
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        disabled={loading} // Desabilita o botão enquanto carrega
      >
        {loading ? 'Adicionando...' : 'Adicionar'}
      </button>
      {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
    </form>
  );
};

// Lista de tarefas existentes
export const TaskList: React.FC<{ tasks: Task[]; onTaskDeleted: (id: string) => void; onTaskUpdated: (id: string, updates: Partial<Task>) => void }> = ({ tasks, onTaskDeleted, onTaskUpdated }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleEdit = (id: string, currentText: string) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const handleSave = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.put(`/tasks/${id}`, { title: editText });
      onTaskUpdated(id, { title: editText });
      setEditingId(null);
      setEditText('');
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao atualizar a tarefa. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/tasks/${id}`);
      onTaskDeleted(id);
    } catch (err: any) {
       setError(err.message || 'Ocorreu um erro ao deletar a tarefa. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

    const handleStatusChange = async (id: string, currentStatus: 'pending' | 'completed') => {
        const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
        setLoading(true);
        setError(null);
        try {
            await api.put(`/tasks/${id}`, { status: newStatus });
            onTaskUpdated(id, { status: newStatus });
        } catch (err: any) {
             setError(err.message || "Ocorreu um erro ao alterar o status da tarefa.");
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Lista de Tarefas</h2>
      {tasks.length === 0 ? (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
          <p className="font-bold">Sem Tarefas</p>
          <p>Nenhuma tarefa cadastrada ainda.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li key={task.id} className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
              <div>
                {editingId === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      disabled={loading}
                    />
                    <div className="mt-2">
                      <button
                        onClick={() => handleSave(task.id)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline text-sm mr-2"
                        disabled={loading}
                      >
                        {loading ? 'Salvando...' : 'Salvar'}
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline text-sm"
                        disabled={loading}
                      >
                        Cancelar
                      </button>
                    </div>
                    {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
                  </>
                ) : (
                  <>
                    <p className="text-gray-800">
                      {task.title} - <span className={task.status === 'pending' ? 'text-yellow-500' : 'text-green-500'}>{task.status}</span>
                    </p>
                    <p className="text-gray-600 text-sm">{task.description}</p>
                    <div className="mt-2">
                      <button
                        onClick={() => handleEdit(task.id, task.title)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline text-sm mr-2"
                        disabled={loading}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline text-sm mr-2"
                        disabled={loading}
                      >
                        {loading ? 'Excluindo...' : 'Excluir'}
                      </button>
                       <button
                        onClick={() => handleStatusChange(task.id, task.status)}
                        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline text-sm"
                        disabled={loading}
                      >
                        {loading ?  task.status === 'pending' ? 'Concluindo...' : 'Reabrindo...': task.status === 'pending' ? 'Concluir' : 'Reabrir'}
                      </button>
                    </div>
                    {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const TaskApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao buscar as tarefas. Por favor, recarregue a página.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleTaskAdded = () => {
    fetchTasks();
  };

    const handleTaskDeleted = (id: string) => {
       setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    const handleTaskUpdated = (id: string, updates: Partial<Task>) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, ...updates } : task
            )
        );
    };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">TODO List SeguroBet</h1>
      <TaskForm onTaskAdded={handleTaskAdded} />
      {loading ? (
        <p className="text-gray-600">Carregando tarefas...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <TaskList tasks={tasks} onTaskDeleted={handleTaskDeleted} onTaskUpdated={handleTaskUpdated}/>
      )}
    </div>
  );
};

export default TaskApp;
