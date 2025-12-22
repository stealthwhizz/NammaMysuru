import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import MessageBubble from './MessageBubble';

/**
 * KIRO INTEGRATION: ChatPane Component
 * 
 * This component was built with extensive Kiro assistance:
 * - Kiro helped design the chat interface layout and scrolling behavior
 * - Kiro guided the implementation of the loading indicator and message submission flow
 * - The auto-scroll functionality and input handling were developed with Kiro's guidance
 * - Kiro assisted in creating the chat header design and message area styling
 */

interface ChatPaneProps {
  messages: ChatMessage[];
  onSubmit: (message: string) => void;
  loading: boolean;
}

const ChatPane: React.FC<ChatPaneProps> = ({ messages, onSubmit, loading }) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !loading) {
      onSubmit(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Initial greeting message if no messages
  const displayMessages = messages.length === 0 ? [
    {
      id: 'greeting',
      role: 'assistant' as const,
      content: "Hi! I'm Mysa, your Mysuru local guide. Ask me about food, Dasara traditions, or city walks!",
      mode: 'food' as const,
      timestamp: Date.now(),
    }
  ] : messages;

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-accent-50">
        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center" role="img" aria-label="Mysa avatar">
          <span className="text-white text-sm font-bold">M</span>
        </div>
        <div>
          <h3 className="font-medium text-heritage-text">Chat with Mysa</h3>
          <p className="text-xs text-gray-500">Your local Mysuru guide</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {displayMessages.map((message) => (
          <MessageBubble
            key={message.id}
            role={message.role}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))}
        
        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-start mb-4 animate-fade-in">
            <div className="max-w-[80%]">
              <div className="bg-white text-heritage-text border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-primary-700">Mysa</span>
                  <span className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Mysa about Mysuru..."
            disabled={loading}
            aria-label="Chat message input"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || loading}
            aria-label="Send message to Mysa"
            className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 min-h-[44px]"
          >
            {loading ? 'Sending...' : 'Ask Mysa'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatPane;