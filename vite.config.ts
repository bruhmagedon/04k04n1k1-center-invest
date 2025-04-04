import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { defineConfig } from 'vite';
import pluginChecker from 'vite-plugin-checker';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      tsDecorators: true
    }),
    tsconfigPaths(),
    VitePWA(
      { registerType: 'autoUpdate', workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      } }
    ),
    pluginChecker({ typescript: true })
  ],
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1500
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  },
  server: {
    port: 1337,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://178.253.55.179/',
        changeOrigin: true
      }
    }
  },
  preview: {
    port: 7000
  },
  resolve: {
    alias: {
      '@/app': path.resolve(__dirname, './src/app'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/modules': path.resolve(__dirname, './src/modules'),
      '@/widgets': path.resolve(__dirname, './src/widgets'),
      '@/shared': path.resolve(__dirname, './src/shared'),
      '@/hooks': path.resolve(__dirname, './src/shared/hooks'),
      '@/ui': path.resolve(__dirname, './src/shared/ui')
    }
  }
});
