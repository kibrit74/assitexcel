/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    // Test file patterns
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    // Exclude patterns
    exclude: ['node_modules', 'dist'],
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.{js,ts}',
        'dist/',
      ],
    },
    // Test timeout
    testTimeout: 10000,
    hookTimeout: 10000,
  },
  // Resolve paths for testing
  resolve: {
    alias: {
      '@': '/src',
      '@/components': '/src/components',
      '@/services': '/src/services',
      '@/types': '/src/types.ts',
    },
  },
});