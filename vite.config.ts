// Generated with guidance from Kiro AI for NammaMysuru project
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Determine base path based on deployment target
  // Check multiple environment indicators for GitHub Actions
  const isGitHubPages = process.env.GITHUB_ACTIONS === 'true' || 
                        process.env.CI === 'true' || 
                        process.env.GITHUB_REPOSITORY === 'stealthwhizz/NammaMysuru';
  
  const base = isGitHubPages ? '/NammaMysuru/' : '/';
  
  console.log('Vite config - mode:', mode, 'base:', base, 'isGitHubPages:', isGitHubPages);
  console.log('Environment check:', {
    GITHUB_ACTIONS: process.env.GITHUB_ACTIONS,
    CI: process.env.CI,
    GITHUB_REPOSITORY: process.env.GITHUB_REPOSITORY
  });
  
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
