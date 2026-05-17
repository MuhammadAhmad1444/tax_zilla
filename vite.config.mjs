import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** One fixed port for dev; change here only if 5173 is taken system-wide. */
const DEV_PORT = 5173;
/** Preview serves `dist`; separate from dev so both commands never collide. */
const PREVIEW_PORT = 4173;

export default defineConfig({
  base: '/',
  // Vite skips dotfiles from /public by default.
  // The copy-htaccess plugin manually copies .htaccess into dist for Apache/Hostinger hosting.
  plugins: [
    react(),
    {
      name: 'copy-htaccess',
      closeBundle() {
        const src  = path.resolve(__dirname, 'public/.htaccess');
        const dest = path.resolve(__dirname, 'dist/.htaccess');
        if (fs.existsSync(src)) fs.copyFileSync(src, dest);
      },
    },
  ],
  server: {
    host: 'localhost',
    port: DEV_PORT,
    strictPort: false,
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
