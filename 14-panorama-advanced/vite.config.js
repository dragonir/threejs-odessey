import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';
import eslintPlugin from 'vite-plugin-eslint';
import vue from '@vitejs/plugin-vue';
import vitePluginCompress from 'vite-plugin-compression';
import { resolve } from 'path';

export default defineConfig({
  publicDir: './public',
  base: './',
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true,
  },
  build:
  {
    outDir: './docs',
    emptyOutDir: true,
    sourcemap: false,
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const arr = id.toString().split('node_modules/')[1].split('/');
            switch (arr[0]) {
              case '@vue':
              case 'three':
                return `${arr[0]}`;
              default:
                return 'vendor';
            }
          }
          return true;
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : [];
          const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]';
          return `assets/${fileName}/[name].[hash].js`;
        },
      },
    },
  },
  plugins: [
    vue(),
    glsl.default(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.ts', 'src/**/*.vue'],
    }),
    vitePluginCompress(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
