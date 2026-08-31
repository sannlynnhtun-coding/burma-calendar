import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.svg', 'social-preview.png'],
      manifest: {
        id: '/',
        name: 'Myanmar Calendar 2024–2027',
        short_name: 'Myanmar Calendar',
        description: 'Myanmar calendar and public holiday reference in Burmese and English.',
        lang: 'my',
        start_url: '/',
        scope: '/',
        theme_color: '#36558f',
        background_color: '#e7ebf0',
        display: 'standalone',
        categories: ['utilities', 'lifestyle'],
        icons: [
          {
            src: 'logo.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: 'logo.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ],
        screenshots: [
          {
            src: 'social-preview.png',
            sizes: '1200x630',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Myanmar Calendar with Burmese dates and a three-month holiday outlook'
          }
        ]
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
