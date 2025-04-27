import express, { Application, Request, Response } from 'express';
import taskRoutes from './routes/task.routes';
import cors from 'cors';
import dotenv from 'dotenv';

// Inicializa variáveis de ambiente
dotenv.config();

// Cria aplicação Express
const app: Application = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Habilita CORS para todas as origens
app.use(express.json()); // Faz o parsing de JSON no body das requisições

// Rotas
app.use('/tasks', taskRoutes);

// Rota principal (teste)
app.get('/', (req: Request, res: Response) => {
  res.send('Olá Mundo!');
});

// Inicializa servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
