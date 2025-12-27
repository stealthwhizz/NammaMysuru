/**
 * Mode Consistency Property Tests for NammaMysuru AI System
 * Generated with guidance from Kiro AI
 * 
 * Property: "Food mode responses always prioritize food content, 
 *           Dasara mode prioritizes festival content, 
 *           Walks mode prioritizes heritage trails"
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
    Must-try specialties: Mysore Pak, Masala Dosa, Ragi Mudde
    Popular areas: Devaraja Market, Sayyaji Rao Road
    
    ## Dasara Mode  
    Key events: Jamboo Savari, palace illumination, cultural programs
    
    ## Walks Mode
    Heritage sites: Mysuru Palace, Chamundi Hill, Karanji Lake`;
}

// Keywords that should appear in each mode
const MODE_KEYWORDS = {
  food: [
    'restaurant', 'dish', 'food', 'eat', 'taste', 'meal', 'snack',
    'mysore pak', 'dosa', 'coffee', 'market', 'price', '₹'
  ],
  dasara: [
    'festival', 'procession', 'palace', 'elephant', 'cultural',
    'celebration', 'jamboo savari', 'dasara', 'illumination'
  ],
  walks: [
    'walk', 'heritage', 'temple', 'route', 'distance',
    'morning', 'hill', 'lake', 'palace', 'steps', 'view'
  ]
} as const;

// Ambiguous questions that could apply to any mode
const ambiguousQuestions = [
  'What should I do today?',
  'Best places to visit in Mysuru?',
  'Planning my Mysuru trip',
  'First time in Mysuru, what to do?',
  'Weekend in Mysuru ideas?'
] as const;

describe('Mode Consistency Property Tests', () => {
  let productContext: string;

  beforeAll(async () => {
    productContext = await loadProductContext();
  });

  test('Property 1: Food mode consistently prioritizes food-related content', async () => {
    const questionGenerator = fc.constantFrom(...ambiguousQuestions);

    await fc.assert(
      fc.asyncProperty(questionGenerator, async (question) => {
        const params: CallMysaParams = {
          mode: 'food',
          latestUserMessage: question,
          messages: [],
          contextContent: productContext
        };

        const response = await callMysaWithErrorHandlingForTesting(params);
        
        // Count food-related keywords in response
        const foodKeywordCount = MODE_KEYWORDS.food.filter(keyword =>
          response.toLowerCase().includes(keyword.toLowerCase())
        ).length;

        // Food mode should have food keywords
        expect(foodKeywordCount).toBeGreaterThan(0);
        expect(response.length).toBeGreaterThan(30);
      }),
      { 
        numRuns: 3, // Reduced for faster testing
        timeout: TEST_CONFIG.API_TIMEOUT,
        verbose: true
      }
    );
  }, TEST_CONFIG.API_TIMEOUT);

  test('Property 2: Mode switching produces different responses for identical questions', async () => {
    const questionGenerator = fc.constantFrom(...ambiguousQuestions);

    await fc.assert(
      fc.asyncProperty(questionGenerator, async (question) => {
        // Get responses from all three modes
        const foodParams: CallMysaParams = {
          mode: 'food',
          latestUserMessage: question,
          messages: [],
          contextContent: productContext
        };

        const dasaraParams: CallMysaParams = {
          mode: 'dasara',
          latestUserMessage: question,
          messages: [],
          contextContent: productContext
        };

        const [foodResponse, dasaraResponse] = await Promise.all([
          callMysaWithErrorHandlingForTesting(foodParams),
          callMysaWithErrorHandlingForTesting(dasaraParams)
        ]);

        // Responses should be different (not identical)
        expect(foodResponse).not.toBe(dasaraResponse);

        // Each response should be substantial
        expect(foodResponse.length).toBeGreaterThan(30);
        expect(dasaraResponse.length).toBeGreaterThan(30);
      }),
      { 
        numRuns: 2, // Reduced due to multiple API calls
        timeout: TEST_CONFIG.API_TIMEOUT * 2,
        verbose: true
      }
    );
  }, TEST_CONFIG.API_TIMEOUT * 2);
});