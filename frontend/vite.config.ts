import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
        },
        manifest: {
          name: 'ВИНЕГРЕТ - Магазин готовой еды',
          short_name: 'ВИНЕГРЕТ',
          description: 'Магазин готовой еды и полуфабрикатов в Новороссийске',
          theme_color: '#7AC65C',
          background_color: '#F5FCE8',
          display: 'standalone',
          orientation: 'portrait',

          scope: '/web-project/',
          start_url: '/web-project/',

          icons: [
            { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
            { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
            { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
      }),
    ],

    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
        },
      },
    },

    base: isProd ? '/web-project/' : '/',
  };
});
