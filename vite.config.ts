import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { defineConfig } from 'vite';
import pluginChecker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      tsDecorators: true
    }),
    svgrPlugin(),
    tsconfigPaths(),
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
    host: '0.0.0.0', // Разрешает подключение со всех IP
    port: 1337,
    cors: true,
    strictPort: true, // Запрещает автоматический выбор порта
    proxy: {
      '/api': {
        target: 'http://103.71.23.62/',
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
