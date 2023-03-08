import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      output: {
        entryFileNames: 'index.js',
        assetFileNames: 'style.css',
      },
    },
    sourcemap: true,
    target: 'esnext',
    minify: false,
  },
  plugins: [dts()],
});
