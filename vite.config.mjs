import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** One fixed port for dev; change here only if 5173 is taken system-wide. */
const DEV_PORT = 5173;
/** Preview serves `dist`; separate from dev so both commands never collide. */
const PREVIEW_PORT = 4173;

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    host: 'localhost',
    port: DEV_PORT,
    strictPort: true,
  },
  preview: {
    host: 'localhost',
    port: PREVIEW_PORT,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
