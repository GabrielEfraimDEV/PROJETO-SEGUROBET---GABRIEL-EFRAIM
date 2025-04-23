import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';

// Controller lida com requisições HTTP
export class TaskController {
  static async getAll(req: Request, res: Response) {
    const tasks = await TaskService.getAll();
    res.json(tasks);
  }

  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const task = await TaskService.getById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  }

  static async create(req: Request, res: Response) {
    const { title, description, status } = req.body;
    const insertId = await TaskService.create({ title, description, status });
    res.status(201).json({ id: insertId });
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    await TaskService.update(id, req.body);
    res.json({ message: 'Task updated' });
  }

  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await TaskService.delete(id);
    res.json({ message: 'Task deleted' });
  }
}