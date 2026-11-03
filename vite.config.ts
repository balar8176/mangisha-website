import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Output directory for Cloudflare Pages: dist
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        // Keep the heavy 3D libraries in their own cached chunk, loaded only when the hero mounts
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          motion: ['gsap', 'lenis'],
        },
      },
    },
  },
});
