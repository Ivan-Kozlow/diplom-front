import react from '@vitejs/plugin-react-swc'

import vercel from 'vite-plugin-vercel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), vercel()],
})
