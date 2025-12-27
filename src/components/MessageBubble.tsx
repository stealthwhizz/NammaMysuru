import React from 'react';

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ role, content }) => {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={[
          'max-w-[75%] px-3 py-2 text-xs leading-snug rounded-2xl',
          isUser
            ? 'bg-[#b45309] text-white rounded-br-sm'
            : 'bg-[#fef3c7] text-[#3b3126] rounded-bl-sm border border-[#e2c9a2]'
        ].join(' ')}
      >
        {content}
      </div>
    </div>
  );
};

export default MessageBubble;