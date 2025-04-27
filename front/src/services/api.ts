import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000', // ou a porta que você configurou no backend
});
