/**
 * KIRO INTEGRATION: Vite Configuration for NammaMysuru
 * 
 * This build configuration was set up with Kiro's assistance:
 * - Kiro helped configure Vite for optimal React development and production builds
 * - The React plugin configuration was guided by Kiro's recommendations
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
