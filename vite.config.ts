import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    // Check if SSL certificates exist
    const httpsConfig = (() => {
        try {
            return {
                key: fs.readFileSync('./certs/localhost-key.pem'),
                cert: fs.readFileSync('./certs/localhost.pem'),
            };
        } catch (e) {
            console.log('SSL certificates not found. Run npm run generate-cert to create them.');
            return false;
        }
    })();
    
    return {
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      server: {
        https: httpsConfig,
        port: 5173,
        host: true, // This makes the server accessible externally
        cors: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      }
    };
});
