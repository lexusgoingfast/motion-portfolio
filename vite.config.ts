import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'log-spa-project-url',
      configureServer(server) {
        server.httpServer?.once('listening', () => {
          const a = server.httpServer?.address()
          if (!a || typeof a === 'string') return
          const port = a.port
          const host = a.address === '::' || a.address === '0.0.0.0' ? '127.0.0.1' : a.address
          const base = (server.config.base || '/').replace(/\/$/, '') || ''
          const prefix = base === '/' ? '' : base
          console.info(`\n  Case HTML (paste in browser): http://${host}:${port}${prefix}/cases/mosaic-concept-store.html\n`)
        })
      },
    },
  ],
  appType: 'spa',
})
