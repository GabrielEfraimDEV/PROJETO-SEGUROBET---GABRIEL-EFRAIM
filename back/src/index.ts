// back/src/routes/task.routes.ts
import { Router } from 'express';

const router = Router();

// Exemplo de rota
router.get('/', (req, res) => {
  res.json({ message: 'Rota de tarefas funcionando!' });
});

export default router;
