/**
 * KIRO INTEGRATION: Core Types for NammaMysuru Application
 * 
 * These TypeScript type definitions were created with Kiro's assistance:
 * - Kiro helped design the type structure for clean separation of concerns
 * - Kiro guided the implementation of proper typing for AI service integration
 * - The interface design for ChatMessage, CallMysaParams, and error handling were refined with Kiro's input
 */

// Core types for NammaMysuru application

export type Mode = 'food' | 'dasara' | 'walks';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  mode: Mode;
  timestamp: number;
}

export interface CallMysaParams {
  mode: Mode;
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  latestUserMessage: string;
  contextContent: string;
}

export interface SuggestionPrompt {
  id: string;
  text: string;
  mode: Mode;
}

// Mode configuration for UI display
export interface ModeConfig {
  mode: Mode;
  label: string;
  icon: string;
  suggestions: SuggestionPrompt[];
}

// Error types for AI service
export interface AIServiceError {
  type: 'network' | 'timeout' | 'invalid_response' | 'api_key' | 'quota' | 'safety' | 'unknown';
  message: string;
  retryable: boolean;
}