// Generated with guidance from Kiro AI for NammaMysuru project
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // For GitHub Pages, we need the repository name as base path
  const base = process.env.NODE_ENV === 'production' || mode === 'production' 
    ? '/NammaMysuru/' 
    : '/';
  
  console.log('Vite config - mode:', mode, 'base:', base, 'NODE_ENV:', process.env.NODE_ENV);
  
  return {
    base,
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    }
  };
});
