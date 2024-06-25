import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import Unfonts from 'unplugin-fonts/vite';
import { defineConfig } from 'vite';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';

import './src/env';

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
    Unfonts({
      custom: {
        families: [
          {
            name: 'Geist',
            src: 'geist/dist/fonts/geist-sans/*.woff2',
          },
        ],
      },
    }),
    wasm(),
    topLevelAwait(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
});
