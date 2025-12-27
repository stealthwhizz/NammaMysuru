/**
 * Test Environment Configuration for NammaMysuru Property Tests
 * Generated with guidance from Kiro AI
 * 
 * This module provides environment variable access for testing,
 * handling the import.meta.env differences between Vite and Jest.
 */

// Mock import.meta.env for Jest testing environment
const testEnv = {
  VITE_GOOGLE_API_KEY: process.env.VITE_GOOGLE_API_KEY || 'test-key',
  MODE: 'test',
  DEV: true,
  PROD: false,
};

// Create a mock import.meta object for testing
if (typeof globalThis !== 'undefined' && !(globalThis as any).import) {
  (globalThis as any).import = {
    meta: {
      env: testEnv
    }
  };
}

export { testEnv };