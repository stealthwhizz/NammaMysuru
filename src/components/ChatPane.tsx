import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import MessageBubble from './MessageBubble';

interface ChatPaneProps {
  messages: ChatMessage[];
  onSubmit: (message: string) => void;
  loading: boolean;
}

const ChatPane: React.FC<ChatPaneProps> = ({ messages, onSubmit, loading }) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !loading) {
      onSubmit(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-[#e2c9a2] p-3 flex flex-col h-[420px]">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-8 w-8 rounded-full bg-[#fef3c7] flex items-center justify-center text-[#b45309] text-sm font-semibold border border-[#e2c9a2]">
          M
        </div>
        <div>
          <p className="text-sm font-medium text-[#4b2b1a]">Chat with Mysa</p>
          <p className="text-[11px] text-[#3b3126]">
            Ask about food, Dasara, or heritage walks
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pb-1">
        {messages.map(m => (
          <MessageBubble key={m.id} role={m.role} content={m.content} />
        ))}
        {loading && (
          <div className="text-[11px] text-[#3b3126] italic">
            Mysa is thinking…
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2">
        <input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Ask Mysa anything about Mysuru..."
          disabled={loading}
          className="flex-1 rounded-full bg-[#fef3c7]/30 border border-[#e2c9a2] px-3 py-2 text-xs text-[#3b3126] placeholder:text-[#3b3126]/50 focus:outline-none focus:ring-2 focus:ring-[#b45309] focus:border-transparent"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || loading}
          className="h-9 px-4 rounded-full bg-[#b45309] text-white text-xs font-medium shadow-sm hover:bg-[#92400e] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          Send
        </button>
      </form>
    </section>
  );
};

export default ChatPane;