import { pool } from '../config/db';
import { Task } from '../models/task.model';

// Serviço para operações CRUD em Task
export class TaskService {
  static async getAll(): Promise<Task[]> {
    const [rows] = await pool.query('SELECT * FROM tasks');
    return rows as Task[];
  }

  static async getById(id: number): Promise<Task | null> {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    const tasks = rows as Task[];
    return tasks.length ? tasks[0] : null;
  }

  static async create(task: Omit<Task, 'id'>): Promise<number> {
    const [result]: any = await pool.query(
      'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
      [task.title, task.description, task.status]
    );
    return result.insertId;
  }

  static async update(id: number, task: Partial<Omit<Task, 'id'>>): Promise<void> {
    const fields = Object.keys(task).map(key => `${key} = ?`).join(', ');
    const values = Object.values(task);
    await pool.query(
      `UPDATE tasks SET ${fields} WHERE id = ?`, [...values, id]
    );
  }

  static async delete(id: number): Promise<void> {
    await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
  }
}