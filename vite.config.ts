import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'index.js',
        assetFileNames: 'style.css',
      },
    },
  },
});
