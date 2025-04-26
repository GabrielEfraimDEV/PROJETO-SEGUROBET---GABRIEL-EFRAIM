import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './', // Define a raiz do projeto Vite como a pasta 'front'
  build: {
    rollupOptions: {
      input: './index.ts', // Assumindo que index.html está na raiz da pasta 'front'
    },
  },
});