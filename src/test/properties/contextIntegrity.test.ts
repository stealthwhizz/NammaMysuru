/**
 * Context Integrity Property Tests for NammaMysuru AI System
 * Generated with guidance from Kiro AI
 * 
 * Property: "All AI responses must reference information from product.md, never generic knowledge"
 */

import * as fc from 'fast-check';
import { callMysaWithErrorHandlingForTesting } from '../testAiService';
import type { CallMysaParams } from '../../types';
import { TEST_CONFIG } from '../setup';

// Extract specific terms from product.md that should appear in responses
const MYSURU_SPECIFIC_TERMS = {
  restaurants: [
    'Guru Sweet Mart', 'Vinayaka Mylari', 'Sri Krishna Sweets',
    'Devaraja Market', 'Sayyaji Rao Road'
  ],
  dishes: [
    'Mysore Pak', 'Masala Dosa', 'Ragi Mudde'
  ],
  heritage_sites: [
    'Mysuru Palace', 'Chamundi Hill', 'Karanji Lake'
  ]
} as const;

// Generic terms that should NOT appear
const GENERIC_TERMS_TO_AVOID = [
  'I don\'t have specific information',
  'As an AI',
  'Please check online',
  'Delhi', 'Mumbai', 'Bangalore'
] as const;

// Load product.md content for context injection
async function loadProductContext(): Promise<string> {
  return `# Mysa - Your Mysuru Local Guide
    
    ## Food Mode
    Must-try Mysuru specialties:
    - Mysore Pak - invented at Guru Sweet Mart
    - Masala Dosa - best at Vinayaka Mylari
    - Ragi Mudde - local staple
    
    ## Dasara Mode
    Jamboo Savari procession with elephant Abhimanyu
    
    ## Walks Mode
    Heritage sites: Mysuru Palace, Chamundi Hill, Karanji Lake`;
}

// Generators for different types of questions
const foodQuestionGenerator = fc.constantFrom(
  'Where can I find authentic Mysore Pak?',
  'Best breakfast places near Mysuru Palace?',
  'Traditional Mysuru dishes I must try?'
);

describe('Context Integrity Property Tests', () => {
  let productContext: string;

  beforeAll(async () => {
    productContext = await loadProductContext();
  });

  test('Property 1: Food mode responses reference specific Mysuru restaurants/dishes from product.md', async () => {
    await fc.assert(
      fc.asyncProperty(foodQuestionGenerator, async (question) => {
        const params: CallMysaParams = {
          mode: 'food',
          latestUserMessage: question,
          messages: [],
          contextContent: productContext
        };

        const response = await callMysaWithErrorHandlingForTesting(params);
        
        // Verify response contains at least one specific Mysuru food term
        const containsSpecificTerm = [
          ...MYSURU_SPECIFIC_TERMS.restaurants,
          ...MYSURU_SPECIFIC_TERMS.dishes
        ].some(term => 
          response.toLowerCase().includes(term.toLowerCase())
        );

        // Verify response doesn't contain generic terms
        const containsGenericTerm = GENERIC_TERMS_TO_AVOID.some(term =>
          response.toLowerCase().includes(term.toLowerCase())
        );

        expect(containsSpecificTerm).toBe(true);
        expect(containsGenericTerm).toBe(false);
        expect(response.length).toBeGreaterThan(50);
      }),
      { 
        numRuns: 2, // Reduced for demo
        timeout: TEST_CONFIG.API_TIMEOUT,
        verbose: true
      }
    );
  }, TEST_CONFIG.API_TIMEOUT);

  test('Property 2: All responses contain Mysuru-specific context', async () => {
    await fc.assert(
      fc.asyncProperty(foodQuestionGenerator, async (question) => {
        const params: CallMysaParams = {
          mode: 'food',
          latestUserMessage: question,
          messages: [],
          contextContent: productContext
        };

        const response = await callMysaWithErrorHandlingForTesting(params);
        
        // Must contain "Mysuru" or "Mysore" 
        const containsMysuru = response.toLowerCase().includes('mysuru') || 
                              response.toLowerCase().includes('mysore');
        
        // Must not contain other major Indian cities
        const containsOtherCities = ['delhi', 'mumbai', 'bangalore']
          .some(city => response.toLowerCase().includes(city));

        expect(containsMysuru).toBe(true);
        expect(containsOtherCities).toBe(false);
      }),
      { 
        numRuns: 2,
        timeout: TEST_CONFIG.API_TIMEOUT,
        verbose: true
      }
    );
  }, TEST_CONFIG.API_TIMEOUT);
});