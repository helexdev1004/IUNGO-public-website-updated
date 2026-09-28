import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Route-level code splitting is handled by React.lazy in src/App.tsx, which
  // is where the meaningful wins are. Vendor chunking is left to the bundler's
  // defaults rather than hand-tuned.
})
