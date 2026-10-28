import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// Vite builds the site; Vitest (the test runner) reads the same file.
// https://vite.dev/config/  ·  https://vitest.dev/config/
export default defineConfig({
  plugins: [react()],

  // This repo is a GitHub *user site* (ChuqingShi.github.io), which is served
  // from the domain root, so every asset URL starts at "/".
  // A *project* site (github.io/some-repo/) would need base: '/some-repo/'.
  base: '/',

  test: {
    include: ['src/**/*.test.ts'],
  },
})
