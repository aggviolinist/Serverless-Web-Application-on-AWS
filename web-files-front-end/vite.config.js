import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  console.log('GITPOD_SERVER_URL =', env.GITPOD_SERVER_URL) // Debug log

  return {
    plugins: [react()],
    server: {
      allowedHosts: [env.VITE_GITPOD_SERVER_URL]
    }
  }
})