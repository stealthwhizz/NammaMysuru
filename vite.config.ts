// Generated with guidance from Kiro AI for NammaMysuru project
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Determine base path based on deployment target
  const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
  const base = isGitHubPages ? '/NammaMysuru/' : '/';
  
  console.log('Vite config - mode:', mode, 'base:', base, 'isGitHubPages:', isGitHubPages);
  
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
          // Ensure proper file extensions
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]'
        },
      },
    }
  };
});
