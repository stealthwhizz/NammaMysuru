/**
 * Test-Specific AI Service for NammaMysuru Property Tests
 * Generated with guidance from Kiro AI
 * 
 * This module provides a Node.js-compatible version of the AI service
 * for property-based testing, handling environment differences between
 * Vite (browser) and Jest (Node.js) environments.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import type { CallMysaParams, AIServiceError } from '../types';

/**
 * Test-compatible AI service call using Google Gemini API
 * 
 * This function replicates the main AI service functionality but works
 * in the Node.js testing environment without import.meta dependencies.
 */
export async function callMysaForTesting(params: CallMysaParams): Promise<string> {
  const { mode, latestUserMessage, messages, contextContent } = params;
  
  try {
    // Get API key from process.env instead of import.meta.env
    const apiKey = process.env.VITE_GOOGLE_API_KEY;
    
    if (!apiKey) {
      throw new Error('API_KEY_MISSING: Google API key not found in environment variables');
    }
    
    if (apiKey === 'your_actual_api_key_here' || apiKey === 'test-key') {
      throw new Error('API_KEY_PLACEHOLDER: Please replace the placeholder API key with your actual Google API key');
    }
    
    // Initialize Google Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Get the generative model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash"
    });
    
    // Construct the comprehensive system prompt with context and personality
    const systemPrompt = `You are Mysa, a friendly 25-year-old local guide from Mysuru (Mysore), Karnataka, India. You have lived in Mysuru your entire life and love helping visitors discover your city.

CRITICAL INSTRUCTIONS - FOLLOW EXACTLY:

1. PERSONALITY & TONE:
   - Speak like a warm, enthusiastic local friend
   - Use simple, conversational English
   - Include 1-2 Kannada words per response with explanations in parentheses
   - Examples: "namma" (our), "maga" (friend), "sakkat" (awesome)
   - Be realistic about limitations - don't oversell experiences
   - Address users warmly but not overly familiar

2. CURRENT MODE FOCUS:
   - The user is currently in "${mode.toUpperCase()}" mode
   - Focus primarily on ${mode === 'food' ? 'food recommendations, restaurants, and local dishes' : 
     mode === 'dasara' ? 'Dasara festival events, traditions, and planning' : 
     'heritage walks, routes, and sightseeing'}
   - Use the ${mode} section of the context below as your primary knowledge source

3. RESPONSE STRUCTURE:
   - Keep responses to 3-4 sentences maximum
   - Give 2-3 specific recommendations with brief explanations
   - Include practical details: timing, cost in rupees, location hints
   - End with a helpful tip or follow-up suggestion

4. SAFETY & ETIQUETTE:
   - Always mention appropriate dress codes for religious sites
   - Warn about peak hours and crowds during festivals
   - Suggest carrying water and wearing comfortable shoes
   - Remind about respecting local customs

5. USE THIS MYSURU KNOWLEDGE BASE:

${contextContent}

6. CONVERSATION CONTEXT:
   Current mode: ${mode}
   Recent conversation history: ${messages.slice(-3).map(msg => 
     `${msg.role === 'user' ? 'User' : 'Mysa'}: ${msg.content}`
   ).join('\n')}

Now respond to this user message as Mysa: "${latestUserMessage}"

Remember: You are a local Mysuru guide. Stay focused on Mysuru. Use the context above. Be helpful, authentic, and friendly!`;

    // Generate response using Gemini
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text();
    
    // Validate response
    if (!text || text.trim().length === 0) {
      throw new Error('Empty response from Gemini API');
    }
    
    return text.trim();
    
  } catch (error) {
    // Handle specific Gemini API errors
    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase();
      
      if (errorMessage.includes('api_key') || errorMessage.includes('api key') || errorMessage.includes('invalid key')) {
        throw new Error('API_KEY_INVALID: Please check your Google API key configuration');
      } else if (errorMessage.includes('quota') || errorMessage.includes('exceeded')) {
        throw new Error('QUOTA_EXCEEDED: API quota exceeded - please try again later');
      } else if (errorMessage.includes('safety') || errorMessage.includes('blocked')) {
        throw new Error('SAFETY_FILTER: Content filtered for safety - please rephrase your question');
      } else if (errorMessage.includes('permission') || errorMessage.includes('forbidden')) {
        throw new Error('PERMISSION_DENIED: API access denied - check your API key permissions');
      }
    }
    
    throw new Error(`GEMINI_API_ERROR: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
  }
}

/**
 * Enhanced AI service call with error handling and retry logic for testing
 */
export async function callMysaWithErrorHandlingForTesting(
  params: CallMysaParams, 
  retryCount: number = 0
): Promise<string> {
  const MAX_RETRIES = 2;
  const TIMEOUT_MS = 30000; // 30 seconds
  
  try {
    // Create timeout promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error('Request timeout'));
      }, TIMEOUT_MS);
    });
    
    // Race between AI call and timeout
    const response = await Promise.race([
      callMysaForTesting(params),
      timeoutPromise
    ]);
    
    // Validate response
    if (!response || typeof response !== 'string' || response.trim().length === 0) {
      throw new Error('Invalid response from AI service');
    }
    
    return response;
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Determine error type and retryability
    let aiError: AIServiceError;
    
    if (errorMessage.includes('timeout')) {
      aiError = {
        type: 'timeout',
        message: 'Mysa is taking longer than usual - please try again',
        retryable: true
      };
    } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      aiError = {
        type: 'network',
        message: 'Connection issue - please try again',
        retryable: true
      };
    } else if (errorMessage.includes('API_KEY') || errorMessage.includes('api key') || errorMessage.includes('invalid key')) {
      aiError = {
        type: 'api_key',
        message: 'API key configuration issue - please check your Google API key',
        retryable: false
      };
    } else if (errorMessage.includes('QUOTA') || errorMessage.includes('quota')) {
      aiError = {
        type: 'quota',
        message: 'API quota exceeded - please try again later',
        retryable: false
      };
    } else if (errorMessage.includes('SAFETY') || errorMessage.includes('safety')) {
      aiError = {
        type: 'safety',
        message: 'Content was filtered - please rephrase your question',
        retryable: false
      };
    } else if (errorMessage.includes('PERMISSION') || errorMessage.includes('permission')) {
      aiError = {
        type: 'api_key',
        message: 'API access denied - check your API key permissions',
        retryable: false
      };
    } else if (errorMessage.includes('GEMINI_API_ERROR')) {
      aiError = {
        type: 'unknown',
        message: `Gemini API error: ${errorMessage.replace('GEMINI_API_ERROR: ', '')}`,
        retryable: true
      };
    } else if (errorMessage.includes('Invalid response')) {
      aiError = {
        type: 'invalid_response',
        message: 'Sorry, I couldn\'t understand that. Please try again',
        retryable: true
      };
    } else {
      aiError = {
        type: 'unknown',
        message: 'Something went wrong. Please try again',
        retryable: true
      };
    }
    
    // Retry logic for retryable errors
    if (aiError.retryable && retryCount < MAX_RETRIES) {
      console.warn(`AI service call failed (attempt ${retryCount + 1}/${MAX_RETRIES + 1}):`, errorMessage);
      
      // Exponential backoff
      const delay = Math.pow(2, retryCount) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      
      return callMysaWithErrorHandlingForTesting(params, retryCount + 1);
    }
    
    // Max retries reached or non-retryable error
    console.error('AI service call failed after retries:', errorMessage);
    throw aiError;
  }
}