import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/case-chrome.ts'),
      formats: ['es'],
      fileName: 'case-chrome',
    },
    outDir: 'public/cases',
    emptyOutDir: false,
    rollupOptions: {
      output: {
        entryFileNames: 'case-chrome.js',
      },
    },
    codeSplitting: false,
  },
})
