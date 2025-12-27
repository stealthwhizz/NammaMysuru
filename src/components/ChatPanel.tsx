// Generated with guidance from Kiro AI for NammaMysuru project
import { useEffect, useRef } from "react";
import { Send, Utensils, Sparkles, Footprints, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Mode, ChatMessage } from "@/types";

interface ChatPanelProps {
  mode: Mode;
  messages: ChatMessage[];
  loading: boolean;
  onModeChange: (mode: Mode) => void;
  onSubmit: (message: string) => void;
}

const modeConfig = {
  food: {
    icon: Utensils,
    label: "Food",
    placeholder: "Ask about Mysore Pak, dosa spots, coffee houses...",
    greeting: "Namaste! I'm Mysa, your food guide. Ask me about the best local eateries, iconic dishes, or hidden food gems in Mysuru!",
  },
  dasara: {
    icon: Sparkles,
    label: "Dasara",
    placeholder: "Ask about Dasara events, palace illumination, Jamboo Savari...",
    greeting: "Welcome! I'm excited to help you plan your Dasara experience. Ask me about the 10-day festival schedule, best viewing spots, or cultural events!",
  },
  walks: {
    icon: Footprints,
    label: "Walks",
    placeholder: "Ask about heritage trails, temples, palace tours...",
    greeting: "Hello! Ready for a heritage adventure? Ask me about walking trails, historical monuments, or the fascinating stories behind Mysuru's landmarks!",
  },
};

export function ChatPanel({ mode, messages, loading, onModeChange, onSubmit }: ChatPanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleModeChange = (newMode: Mode) => {
    onModeChange(newMode);
  };

  const handleSendMessage = (message: string) => {
    if (!message.trim() || loading) return;
    onSubmit(message.trim());
  };

  const config = modeConfig[mode];

  return (
    <section id="chat" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wide">
            AI Guide
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 font-serif">
            Chat with Mysa
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Ask anything about Mysuru — from the best dosa joints to Dasara schedules. 
            Mysa is here to help you explore like a local.
          </p>
        </div>

        {/* Chat Container */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-background rounded-xl border border-border shadow-lg overflow-hidden">
            {/* Mode Selector */}
            <div className="flex border-b border-border">
              {(Object.keys(modeConfig) as Mode[]).map((m) => {
                const Icon = modeConfig[m].icon;
                return (
                  <button
                    key={m}
                    onClick={() => handleModeChange(m)}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 text-sm font-medium transition-all ${
                      mode === m
                        ? "bg-accent text-accent-foreground border-b-2 border-primary"
                        : "text-muted-foreground hover:bg-accent/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{modeConfig[m].label}</span>
                  </button>
                );
              })}
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${
                    msg.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.role === "user"
                        ? "bg-primary"
                        : "bg-accent"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-4 h-4 text-primary-foreground" />
                    ) : (
                      <Bot className="w-4 h-4 text-accent-foreground" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent text-accent-foreground"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {loading && (
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <Bot className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div className="bg-accent rounded-lg px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-accent-foreground/50 animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-accent-foreground/50 animate-bounce [animation-delay:0.1s]" />
                      <span className="w-2 h-2 rounded-full bg-accent-foreground/50 animate-bounce [animation-delay:0.2s]" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-border p-4">
              <div className="flex gap-3">
                <Input
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      const input = e.currentTarget;
                      handleSendMessage(input.value);
                      input.value = "";
                    }
                  }}
                  placeholder={config.placeholder}
                  disabled={loading}
                  className="flex-1"
                />
                <Button
                  onClick={() => {
                    const input = document.querySelector('#chat input') as HTMLInputElement;
                    if (input && input.value.trim()) {
                      handleSendMessage(input.value);
                      input.value = "";
                    }
                  }}
                  disabled={loading}
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Mysa uses local knowledge to give you the best Mysuru recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
