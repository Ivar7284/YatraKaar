import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  server: {
    proxy: {
      '/api/chat': {
        target: 'https://api.groq.com/openai/v1/chat/completions',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/chat/, '')
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        team: resolve(__dirname, 'team.html'),
        services: resolve(__dirname, 'services.html'),
        destinations: resolve(__dirname, 'destinations.html'),
        blog: resolve(__dirname, 'blog.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
});
