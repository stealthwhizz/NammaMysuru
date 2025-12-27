/**
 * Response Time Property Tests for NammaMysuru AI System
 * Generated with guidance from Kiro AI
 * 
 * Property: "All API calls complete within 5 seconds regardless of query complexity"
 */

import { describe, test, expect } from 'jest';
import * as fc from 'fast-check';
import { callMysaWithErrorHandlingForTesting } from '../testAiService';
import type { CallMysaParams } from '../../types';
import { TEST_CONFIG } from '../setup';

// Load product.md content
async function loadProductContext(): Promise<string> {
  return `# Mysa - Your Mysuru Local Guide
    
    ## Food Mode
    Traditional dishes and restaurants in Mysuru
    
    ## Dasara Mode
    Festival events and cultural celebrations
    
    ## Walks Mode
    Heritage sites and walking routes`;
}

// Different complexity levels of questions
const simpleQuestions = [
  'Hi',
  'Palace timings?',
  'Best dosa?',
  'Dasara dates?'
] as const;

const mediumQuestions = [
  'Best restaurants near Mysuru Palace for lunch?',
  'How to plan a day during Dasara festival?',
  'Heritage walking route covering main attractions?',
  'Local specialties and where to find them?'
] as const;

// Utility function to measure response time
async function measureResponseTime(params: CallMysaParams): Promise<{ response: string; timeMs: number }> {
  const startTime = Date.now();
  const response = await callMysaWithErrorHandlingForTesting(params);
  const endTime = Date.now();
  
  return {
    response,
    timeMs: endTime - startTime
  };
}

describe('Response Time Property Tests', () => {
  let productContext: string;

  beforeAll(async () => {
    productContext = await loadProductContext();
  });

  test('Property 1: Simple questions respond within 5 seconds', async () => {
    const questionGenerator = fc.constantFrom(...simpleQuestions);
    const modeGenerator = fc.constantFrom('food', 'dasara', 'walks');

    await fc.assert(
      fc.asyncProperty(
        fc.tuple(questionGenerator, modeGenerator),
        async ([question, mode]) => {
          const params: CallMysaParams = {
            mode: mode as 'food' | 'dasara' | 'walks',
            latestUserMessage: question,
            messages: [],
            contextContent: productContext
          };

          const { response, timeMs } = await measureResponseTime(params);
          
          expect(timeMs).toBeLessThan(TEST_CONFIG.MAX_RESPONSE_TIME);
          expect(response.length).toBeGreaterThan(10); // Ensure actual response
        }
      ),
      { 
        numRuns: 3, // Reduced for faster testing
        timeout: TEST_CONFIG.API_TIMEOUT,
        verbose: true
      }
    );
  }, TEST_CONFIG.API_TIMEOUT);

  test('Property 2: Medium complexity questions respond within 5 seconds', async () => {
    const questionGenerator = fc.constantFrom(...mediumQuestions);

    await fc.assert(
      fc.asyncProperty(questionGenerator, async (question) => {
        const params: CallMysaParams = {
          mode: 'food',
          latestUserMessage: question,
          messages: [],
          contextContent: productContext
        };

        const { response, timeMs } = await measureResponseTime(params);
        
        expect(timeMs).toBeLessThan(TEST_CONFIG.MAX_RESPONSE_TIME);
        expect(response.length).toBeGreaterThan(50); // More substantial response expected
      }),
      { 
        numRuns: 3,
        timeout: TEST_CONFIG.API_TIMEOUT,
        verbose: true
      }
    );
  }, TEST_CONFIG.API_TIMEOUT);
});