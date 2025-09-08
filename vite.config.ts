import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import type { ServerOptions } from 'https';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    // Check if SSL certificates exist - try Office add-in certs first, then local certs
    const httpsConfig = (() => {
        try {
            // Try Office add-in development certificates first
            const officeCertPath = path.join(require('os').homedir(), '.office-addin-dev-certs');
            return {
                key: fs.readFileSync(path.join(officeCertPath, 'localhost.key')),
                cert: fs.readFileSync(path.join(officeCertPath, 'localhost.crt')),
            } as ServerOptions;
        } catch (e) {
            try {
                // Fallback to local certificates
                return {
                    key: fs.readFileSync('./certs/localhost-key.pem'),
                    cert: fs.readFileSync('./certs/localhost.pem'),
                } as ServerOptions;
            } catch (e2) {
                console.log('SSL certificates not found. Run "npx office-addin-dev-certs install" or "npm run generate-cert" to create them.');
                return undefined;
            }
        }
    })();
    
    const serverConfig: any = {
        port: 5174,
        host: true,
        cors: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
    };

    // SSL varsa ekle
    if (httpsConfig) {
        serverConfig.https = httpsConfig;
    }

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
      server: serverConfig
    };
});