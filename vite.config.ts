import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@data': path.resolve(__dirname, 'src/data'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  test: {
    setupFiles: './vitest.setup.ts',
    environment: 'jsdom',
    globals: true,
    css: false,
  },
});
