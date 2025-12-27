/**
 * Property-Based Testing Setup for NammaMysuru AI System
 * Generated with guidance from Kiro AI
 * 
 * This setup file configures the testing environment for comprehensive
 * property-based testing of the AI service integration.
 */

import './testEnvironment'; // Initialize test environment

// Global test configuration
beforeAll(async () => {
  // Ensure environment variables are loaded for testing
  if (!process.env.VITE_GOOGLE_API_KEY) {
    console.warn('⚠️  VITE_GOOGLE_API_KEY not found - some tests may fail');
  }
  
  console.log('🧪 Property-Based Testing Suite Initialized');
  console.log('📊 Testing Context Integrity, Mode Consistency, Local Personality, and Response Time');
});

afterAll(() => {
  console.log('✅ Property-Based Testing Suite Complete');
});

// Global test utilities
export const TEST_CONFIG = {
  MAX_RESPONSE_TIME: 5000, // 5 seconds
  MIN_PROPERTY_TESTS: 20,   // Minimum test cases per property
  API_TIMEOUT: 30000,       // 30 seconds for API calls
} as const;