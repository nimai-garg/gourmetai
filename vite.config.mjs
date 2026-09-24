import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'REACT_APP_');
  // Keep existing Netlify variable names. Only explicitly public values enter the browser.
  const publicKeys = ['FIREBASE_API_KEY', 'FIREBASE_AUTH_DOMAIN', 'FIREBASE_PROJECT_ID',
    'FIREBASE_STORAGE_BUCKET', 'FIREBASE_MESSAGING_SENDER_ID', 'FIREBASE_APP_ID', 'USDA_API_KEY'];
  return {
    plugins: [react()],
    define: Object.fromEntries(publicKeys.map(key => [
      `process.env.REACT_APP_${key}`, JSON.stringify(env[`REACT_APP_${key}`] || '')
    ])),
    build: { outDir: 'build' },
    server: { port: 3000, proxy: { '/.netlify/functions': 'http://127.0.0.1:5001' } },
    preview: { port: 4173, proxy: { '/.netlify/functions': 'http://127.0.0.1:5001' } }
  };
});
