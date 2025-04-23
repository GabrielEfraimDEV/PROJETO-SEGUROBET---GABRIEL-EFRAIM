// Interface Task e mapeamento com o banco
export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'completed';
  }