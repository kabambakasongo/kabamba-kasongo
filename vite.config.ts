import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  /**
   * Base path de deploiement.
   * - Sur GitHub Pages (site projet) la valeur par defaut "./" fonctionne
   *   quel que soit le nom du repository : tous les assets sont resolus
   *   relativement au fichier HTML.
   * - Pour un domaine custom, definissez VITE_BASE_PATH=/ dans un .env.
   */
  const base = env.VITE_BASE_PATH ?? './';

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      reportCompressedSize: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return;
            if (/node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react';
            if (/node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/.test(id)) {
              return 'motion';
            }
          },
        },
      },
    },
    server: {
      port: 5173,
      open: false,
    },
    preview: {
      port: 4173,
    },
  };
});
