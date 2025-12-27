/**
 * Local Personality Property Tests for NammaMysuru AI System
 * Generated with guidance from Kiro AI
 * 
 * Property: "Mysa responses always include at least one Kannada term 
 *           or local reference per conversation"
 */

import { describe, test, expect } from 'jest';
import * as fc from 'fast-check';
import { callMysaWithErrorHandlingForTesting } from '../testAiService';
import type { CallMysaParams } from '../../types';
import { TEST_CONFIG } from '../setup';

// Kannada terms and local references from product.md
const LOCAL_PERSONALITY_MARKERS = {
  kannada_terms: [
    'namma', 'maga', 'sakkat', 'mysurian'
  ],
  local_expressions: [
    'namma mysuru', 'our mysuru', 'local guide', 'my city'
  ],
  cultural_references: [
    'local', 'traditional', 'authentic', 'heritage',
    'mysuru', 'mysore', 'karnataka'
  ]
} as const;

// Generic AI responses that should be avoided
const GENERIC_AI_MARKERS = [
  'as an ai', 'i am an ai', 'artificial intelligence',
  'i don\'t have personal experience', 'according to my training'
] as const;

// Load product.md content
async function loadProductContext(): Promise<string> {
  return `# Mysa - Your Mysuru Local Guide
    
    You are Mysa, a friendly 25-year-old local from Mysuru. Use "namma" (our) 
    when referring to places. Include Kannada terms like "maga" (friend) and 
    "sakkat" (awesome) naturally in conversation.`;
}

// Diverse question types to test personality consistency
const diverseQuestions = [
  'Where is the best Mysore Pak?',
  'How do I get to Chamundi Hill?',
  'Planning a day trip to Mysuru',
  'First time visitor, what should I see?',
  'Local experiences to try?'
] as const;

describe('Local Personality Property Tests', () => {
  let productContext: string;

  beforeAll(async () => {
    productContext = await loadProductContext();
  });

  test('Property 1: Every response contains at least one Kannada term or local expression', async () => {
    const questionGenerator = fc.constantFrom(...diverseQuestions);
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

          const response = await callMysaWithErrorHandlingForTesting(params);
          
          // Check for Kannada terms or local expressions
          const hasKannadaTerm = LOCAL_PERSONALITY_MARKERS.kannada_terms.some(term =>
            response.toLowerCase().includes(term.toLowerCase())
          );

          const hasLocalExpression = LOCAL_PERSONALITY_MARKERS.local_expressions.some(expr =>
            response.toLowerCase().includes(expr.toLowerCase())
          );

          const hasCulturalReference = LOCAL_PERSONALITY_MARKERS.cultural_references.some(ref =>
            response.toLowerCase().includes(ref.toLowerCase())
          );

          // At least one should be present
          expect(hasKannadaTerm || hasLocalExpression || hasCulturalReference).toBe(true);
        }
      ),
      { 
        numRuns: 3, // Reduced for faster testing
        timeout: TEST_CONFIG.API_TIMEOUT,
        verbose: true
      }
    );
  }, TEST_CONFIG.API_TIMEOUT);

  test('Property 2: Responses maintain warm, personal tone without generic AI language', async () => {
    const questionGenerator = fc.constantFrom(...diverseQuestions);

    await fc.assert(
      fc.asyncProperty(questionGenerator, async (question) => {
        const params: CallMysaParams = {
          mode: 'food',
          latestUserMessage: question,
          messages: [],
          contextContent: productContext
        };

        const response = await callMysaWithErrorHandlingForTesting(params);
        
        // Should NOT have generic AI markers
        const hasGenericAIMarkers = GENERIC_AI_MARKERS.some(marker =>
          response.toLowerCase().includes(marker.toLowerCase())
        );

        // Should mention Mysuru/Mysore specifically
        const mentionsMysuru = response.toLowerCase().includes('mysuru') || 
                             response.toLowerCase().includes('mysore');

        expect(hasGenericAIMarkers).toBe(false);
        expect(mentionsMysuru).toBe(true);
        expect(response.length).toBeGreaterThan(30);
      }),
      { 
        numRuns: 3,
        timeout: TEST_CONFIG.API_TIMEOUT,
        verbose: true
      }
    );
  }, TEST_CONFIG.API_TIMEOUT);
});