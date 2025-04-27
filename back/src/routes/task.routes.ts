import { Router, Request, Response } from 'express';

const router = Router();

// Interface para definir a estrutura de uma tarefa
interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
}

// Dados simulados em memória (por enquanto)
let tasks: Task[] = [
  // { id: 1, title: 'Exemplo', description: 'Descrição', status: 'pending' }
];

// Buscar todas as tarefas
router.get('/', (req: Request, res: Response) => {
  res.json(tasks);
});

// Criar nova tarefa
router.post('/', (req: Request, res: Response) => {
  const { title, description } = req.body;
  const newTask: Task = {
    id: Date.now(), // id único baseado no timestamp
    title,
    description,
    status: 'pending'
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Atualizar tarefa (por ID)
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const taskIndex = tasks.findIndex(task => task.id === Number(id));

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Tarefa não encontrada' });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title ?? tasks[taskIndex].title,
    description: description ?? tasks[taskIndex].description,
    status: status ?? tasks[taskIndex].status,
  };

  res.json(tasks[taskIndex]);
});

// Deletar tarefa (por ID)
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex(task => task.id === Number(id));

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Tarefa não encontrada' });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send(); // 204 = Sem conteúdo
});

export default router;