import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  plugins: [react()],
  build: {
    lib: {
      formats: ['umd'],
      entry: 'src/App.tsx',
      name: 'MedAssist',
      fileName: (format) => `medassist.${format}.js`,
    },
  },
});
