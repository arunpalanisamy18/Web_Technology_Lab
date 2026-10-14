
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Web_Technology_Lab/Experiment-8/student-dashboard/',
  build: {
    outDir: '../student-dashboard',
    emptyOutDir: true,
  },
})
