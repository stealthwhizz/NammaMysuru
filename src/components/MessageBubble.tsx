import React from 'react';

/**
 * KIRO INTEGRATION: MessageBubble Component
 * 
 * This component was created with Kiro's assistance:
 * - Kiro helped design the distinct styling for user vs assistant messages
 * - Kiro guided the implementation of the timestamp formatting and display
 * - The bubble styling, animations, and responsive design were refined with Kiro's input
 */

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ role, content, timestamp }) => {
  const formatTimestamp = (timestamp?: number) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isUser = role === 'user';

  return (
    <div className={`flex mb-4 animate-fade-in ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`
            px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md
            ${isUser
              ? 'bg-primary-600 text-white rounded-br-md'
              : 'bg-white text-heritage-text border border-gray-200 rounded-bl-md'
            }
          `}
        >
          {!isUser && (
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-primary-700">Mysa</span>
              <span className="w-2 h-2 bg-accent-500 rounded-full"></span>
            </div>
          )}
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        </div>
        {timestamp && (
          <div className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {formatTimestamp(timestamp)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;