import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          en: path.resolve(__dirname, 'en/index.html'),
          privacy: path.resolve(__dirname, 'privacy/index.html'),
          privacyEn: path.resolve(__dirname, 'privacy/en/index.html'),
          terms: path.resolve(__dirname, 'terms/index.html'),
          termsEn: path.resolve(__dirname, 'terms/en/index.html'),
          subscriptions: path.resolve(__dirname, 'subscriptions/index.html'),
          subscriptionsEn: path.resolve(__dirname, 'subscriptions/en/index.html'),
          notFound: path.resolve(__dirname, '404.html'),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
});
