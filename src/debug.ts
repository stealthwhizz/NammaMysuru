// Debug utility to check environment variables
export function debugEnvironment() {
  console.log('Environment Debug:', {
    hasApiKey: !!import.meta.env.VITE_GOOGLE_API_KEY,
    apiKeyLength: import.meta.env.VITE_GOOGLE_API_KEY?.length || 0,
    apiKeyPrefix: import.meta.env.VITE_GOOGLE_API_KEY?.substring(0, 10) || 'none',
    mode: import.meta.env.MODE,
    dev: import.meta.env.DEV,
    prod: import.meta.env.PROD,
    allEnvVars: Object.keys(import.meta.env).filter(key => key.startsWith('VITE_'))
  });
}