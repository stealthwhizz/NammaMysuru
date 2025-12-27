import { GoogleGenerativeAI } from '@google/generative-ai';
import type { CallMysaParams, AIServiceError } from '../types';

/**
 * KIRO INTEGRATION: Real Google Gemini AI Service for NammaMysuru
 * 
 * This service integrates with Google Gemini API to provide real AI responses
 * as Mysa, the local Mysuru guide, using product.md context for authentic guidance.
 */

// Initialize Google Gemini AI - moved inside function for better error handling
// const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);

/**
 * Real AI service call using Google Gemini API
 * 
 * This function integrates with Google Gemini to generate contextual responses
 * as Mysa, using the product.md content for authentic Mysuru-specific guidance.
 * 
 * @param params - Parameters for AI service call
 * @returns Promise resolving to Mysa's response
 */
export async function callMysa(params: CallMysaParams): Promise<string> {
  const { mode, latestUserMessage, messages, contextContent } = params;
  
  try {
    // Check if API key is available
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    console.log('API Key check:', {
      hasApiKey: !!apiKey,
      keyLength: apiKey?.length || 0,
      keyPrefix: apiKey?.substring(0, 10) || 'none',
      environment: import.meta.env.MODE,
      isDev: import.meta.env.DEV,
      isProd: import.meta.env.PROD
    });
    
    if (!apiKey) {
      throw new Error('API_KEY_MISSING: Google API key not found in environment variables');
    }
    
    if (apiKey === 'your_actual_api_key_here') {
      throw new Error('API_KEY_PLACEHOLDER: Please replace the placeholder API key with your actual Google API key');
    }
    
    // Initialize Google Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Get the generative model - using current stable Gemini models
    // Updated model names as of December 2024
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash" // Current stable model name
    });
    console.log('Using Gemini 2.5 Flash model');
    
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

    console.log('Calling Google Gemini API with context:', {
      mode,
      promptLength: systemPrompt.length,
      contextLength: contextContent.length,
      userMessage: latestUserMessage
    });
    
    // Generate response using Gemini
    console.log('About to call Gemini API...');
    const result = await model.generateContent(systemPrompt);
    console.log('Gemini API call completed, processing response...');
    
    const response = await result.response;
    const text = response.text();
    
    console.log('Gemini response received:', {
      hasText: !!text,
      textLength: text?.length || 0,
      textPreview: text?.substring(0, 100) || 'empty'
    });
    
    // Validate response
    if (!text || text.trim().length === 0) {
      throw new Error('Empty response from Gemini API');
    }
    
    console.log('Gemini API response received:', {
      responseLength: text.length,
      mode,
      success: true
    });
    
    return text.trim();
    
  } catch (error) {
    console.error('Gemini API call failed - Full error details:', {
      error,
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      errorStack: error instanceof Error ? error.stack : 'No stack',
      errorType: typeof error,
      mode,
      userMessage: latestUserMessage
    });
    
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
 * Enhanced AI service call with error handling and retry logic
 * This is the main function that should be used by UI components
 * 
 * @param params - Parameters for AI service call
 * @param retryCount - Current retry attempt (internal use)
 * @returns Promise resolving to Mysa's response
 * @throws AIServiceError for various failure scenarios
 */
export async function callMysaWithErrorHandling(
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
      callMysa(params),
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
      
      return callMysaWithErrorHandling(params, retryCount + 1);
    }
    
    // Max retries reached or non-retryable error
    console.error('AI service call failed after retries:', errorMessage);
    throw aiError;
  }
}

/**
 * Utility function to create retry mechanism for failed requests
 * This allows UI components to easily implement retry functionality
 * 
 * @param params - Original parameters for the failed request
 * @returns Promise resolving to Mysa's response on retry
 */
export async function retryLastRequest(params: CallMysaParams): Promise<string> {
  return callMysaWithErrorHandling(params, 0);
}