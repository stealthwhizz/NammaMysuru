// Generated with guidance from Kiro AI for NammaMysuru project
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WhySection } from "@/components/WhySection";
import { ExperienceCards } from "@/components/ExperienceCards";
import { ChatPanel } from "@/components/ChatPanel";
import { Footer } from "@/components/Footer";
import type { Mode, ChatMessage, AIServiceError } from "@/types";
import { callMysaWithErrorHandling } from "@/services/aiService";
import { loadContextContent } from "@/services/contextLoader";

/**
 * Main NammaMysuru App Component
 * 
 * This component owns the main state for the entire application:
 * - Current mode (Food / Dasara / Walks)
 * - Chat messages (user + Mysa)
 * - Loading flag for when Mysa is thinking
 * - Context content from product.md
 */
const Index = () => {
  // Debug logging
  console.log('Index component rendering');
  
  // Main app state
  const [mode, setMode] = useState<Mode>('food');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'greeting',
      role: 'assistant',
      content: "Hi! I'm Mysa, your Mysuru local guide. Ask me about food, Dasara traditions, or city walks!",
      mode: 'food',
      timestamp: Date.now(),
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [contextContent, setContextContent] = useState<string>('');

  // Load product.md context on app startup
  useEffect(() => {
    const initializeContext = async () => {
      try {
        const content = await loadContextContent();
        setContextContent(content);
      } catch (error) {
        console.error('Failed to initialize context:', error);
        setContextContent('');
      }
    };
    
    initializeContext();
  }, []);

  // Listen for experience card clicks to change chat mode
  useEffect(() => {
    const handleSetChatMode = (event: CustomEvent) => {
      const newMode = event.detail as Mode;
      setMode(newMode);
    };

    window.addEventListener('setChatMode', handleSetChatMode as EventListener);
    
    return () => {
      window.removeEventListener('setChatMode', handleSetChatMode as EventListener);
    };
  }, []);

  // Handle message submission with real AI integration
  const handleSubmit = async (message: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      mode,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, newMessage]);
    setLoading(true);
    
    try {
      const response = await callMysaWithErrorHandling({
        mode,
        messages: [...messages, newMessage],
        latestUserMessage: message,
        contextContent
      });
      
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        mode,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, aiResponse]);
      
    } catch (error) {
      const aiError = error as AIServiceError;
      
      const errorResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiError.message,
        mode,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setLoading(false);
    }
  };

  // Handle mode change
  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <WhySection />
        <ExperienceCards />
        <ChatPanel 
          mode={mode}
          messages={messages}
          loading={loading}
          onModeChange={handleModeChange}
          onSubmit={handleSubmit}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
