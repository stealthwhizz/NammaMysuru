import { useState, useEffect } from 'react'
import type { Mode, ChatMessage, AIServiceError } from './types'
import { callMysaWithErrorHandling } from './services/aiService'
import { loadContextContent } from './services/contextLoader'
import Header from './components/Header'
import ModeTabs from './components/ModeTabs'
import ChatPane from './components/ChatPane'
import SuggestionCards from './components/SuggestionCards'

/**
 * KIRO INTEGRATION: Main App Component
 * 
 * This component was scaffolded and structured with Kiro's assistance:
 * - Kiro helped design the component hierarchy and state management approach
 * - Kiro guided the integration of AI service calls with proper error handling
 * - Kiro assisted in implementing the responsive layout structure
 * - The overall architecture follows Kiro's recommendations for clean separation of concerns
 */

function App() {
  // KIRO INTEGRATION: State management structure designed with Kiro's guidance
  // Kiro helped establish the proper state organization for mode, messages, and loading states
  const [mode, setMode] = useState<Mode>('food')
  
  // Initialize chat with Mysa's greeting message
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'greeting',
      role: 'assistant',
      content: "Hi! I'm Mysa, your Mysuru local guide. Ask me about food, Dasara traditions, or city walks!",
      mode: 'food',
      timestamp: Date.now(),
    }
  ])
  
  const [loading, setLoading] = useState(false)
  const [contextContent, setContextContent] = useState<string>('')

  // Load product.md context on app startup using the context loading utility
  useEffect(() => {
    const initializeContext = async () => {
      try {
        const content = await loadContextContent();
        setContextContent(content);
      } catch (error) {
        console.error('Failed to initialize context:', error);
        // Context loader already provides fallback content, so we should still get something
        setContextContent('');
      }
    };
    
    initializeContext();
  }, [])

  // Handle message submission with real AI integration
  const handleSubmit = async (message: string) => {
    // Add user message to chat
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      mode,
      timestamp: Date.now(),
    }
    setMessages(prev => [...prev, newMessage])
    setLoading(true)
    
    try {
      // Call AI service with current context
      const response = await callMysaWithErrorHandling({
        mode,
        messages: [...messages, newMessage], // Include the new user message
        latestUserMessage: message,
        contextContent
      })
      
      // Add AI response to chat
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        mode,
        timestamp: Date.now(),
      }
      setMessages(prev => [...prev, aiResponse])
      
    } catch (error) {
      // Handle AI service errors
      const aiError = error as AIServiceError
      
      // Add error message to chat for user visibility
      const errorResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiError.message,
        mode,
        timestamp: Date.now(),
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setLoading(false)
    }
  }

  // Handle suggestion selection
  const handleSuggestionSelect = (prompt: string) => {
    handleSubmit(prompt)
  }

  // Handle mode change
  const handleModeChange = (newMode: Mode) => {
    setMode(newMode)
  }

  return (
    <div className="min-h-screen bg-heritage-paper">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-6">        
        {/* Mode Tabs */}
        <ModeTabs mode={mode} onChange={handleModeChange} />
        
        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chat Pane */}
          <div className="order-2 lg:order-1">
            <ChatPane 
              messages={messages} 
              onSubmit={handleSubmit} 
              loading={loading} 
            />
          </div>
          
          {/* Suggestion Cards */}
          <div className="order-1 lg:order-2">
            <SuggestionCards 
              mode={mode} 
              onSelect={handleSuggestionSelect} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
