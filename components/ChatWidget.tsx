'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ProductCard {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  compare_price?: number;
  image_url?: string;
  is_new_arrival?: boolean;
  is_bestseller?: boolean;
}

const QUICK_ACTIONS = [
  { label: '🆕 New Arrivals', query: 'Show me new arrivals' },
  { label: '🌿 Lawn Collection', query: 'Show lawn collection' },
  { label: '☀️ Summer Picks', query: 'Best summer fabrics' },
  { label: '⭐ Best Sellers', query: 'Show best sellers' },
  { label: '📦 Track Order', query: 'How do I track my order?' },
  { label: '📞 Contact Support', query: 'How can I contact support?' },
];

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content: `Assalam-o-Alaikum 👋
Welcome to **Alimran Fabrics**!

I'm your AI Shopping Assistant. I can help you:
✔ Find & recommend products
✔ Check prices & availability
✔ Recommend fabrics for any occasion
✔ Track your orders
✔ Answer delivery & return questions

How can I assist you today?`,
  timestamp: new Date(),
};

function parseProductsFromText(text: string): { cleanText: string; products: ProductCard[] } {
  // Extract JSON product blocks from assistant messages
  const products: ProductCard[] = [];
  return { cleanText: text, products };
}

function renderMessageContent(content: string) {
  // Convert markdown bold **text** to <strong>
  const parts = content.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    // Handle line breaks
    return part.split('\n').map((line, j, arr) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < arr.length - 1 && <br />}
      </span>
    ));
  });
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [unread, setUnread] = useState(0);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMsg: Message = {
        role: 'user',
        content: text.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setIsLoading(true);
      setShowQuickActions(false);

      try {
        const history = [...messages, userMsg].map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history }),
        });

        const data = await res.json();
        const reply = data.reply || data.error || 'Something went wrong. Please try again.';

        const assistantMsg: Message = {
          role: 'assistant',
          content: reply,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMsg]);

        if (!isOpen) {
          setUnread((n) => n + 1);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'Sorry, I could not connect. Please check your connection and try again.',
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading, isOpen]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickAction = (query: string) => {
    sendMessage(query);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        style={{ background: 'linear-gradient(135deg, #0C1350 0%, #1a237e 100%)' }}
        aria-label="Open chat assistant"
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            <svg className="w-7 h-7 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.546 21l3.965-.867A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.953 7.953 0 01-4.076-1.116l-.292-.174-3.02.66.678-2.944-.19-.302A7.953 7.953 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8zm4.406-5.844c-.242-.121-1.428-.705-1.65-.785-.22-.079-.381-.121-.542.121-.161.242-.623.785-.763.946-.141.161-.282.181-.523.06-.242-.121-1.02-.376-1.944-1.199-.718-.641-1.203-1.432-1.344-1.674-.141-.242-.015-.373.106-.494.109-.108.242-.282.363-.423.121-.141.161-.242.242-.403.081-.161.04-.302-.02-.423-.061-.121-.542-1.307-.742-1.79-.195-.47-.394-.406-.542-.413-.141-.007-.302-.009-.462-.009-.161 0-.423.06-.644.302-.221.242-.845.827-.845 2.015 0 1.188.865 2.336.985 2.497.121.161 1.701 2.596 4.123 3.641.576.249 1.025.397 1.375.508.578.184 1.104.158 1.52.096.464-.069 1.428-.584 1.629-1.148.201-.563.201-1.046.141-1.147-.06-.101-.22-.161-.463-.282z"/>
            </svg>
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {unread}
              </span>
            )}
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-1.5rem)] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ height: '520px', border: '1px solid rgba(255,230,0,0.2)' }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #070D38 0%, #0C1350 100%)' }}
          >
            {/* Logo / Avatar */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #FFE600 0%, #f0d000 100%)', color: '#0C1350' }}
            >
              AI
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-sm leading-tight">Alimran AI Assistant</h3>
              <p className="text-xs flex items-center gap-1" style={{ color: '#FFE600' }}>
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block"></span>
                Online · Alimran Fabrics
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-3 py-3 space-y-3"
            style={{ background: '#F8F7F5' }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                {msg.role === 'assistant' && (
                  <div
                    className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold mt-1"
                    style={{ background: '#0C1350', color: '#FFE600' }}
                  >
                    AI
                  </div>
                )}

                <div className={`max-w-[78%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div
                    className="px-3 py-2 rounded-2xl text-sm leading-relaxed"
                    style={
                      msg.role === 'user'
                        ? {
                            background: 'linear-gradient(135deg, #0C1350 0%, #1a237e 100%)',
                            color: '#ffffff',
                            borderBottomRightRadius: '4px',
                          }
                        : {
                            background: '#ffffff',
                            color: '#1a1a1a',
                            border: '1px solid #E8E4DC',
                            borderBottomLeftRadius: '4px',
                          }
                    }
                  >
                    {renderMessageContent(msg.content)}
                  </div>
                  <span className="text-xs text-gray-400 mt-1 px-1">{formatTime(msg.timestamp)}</span>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex gap-2 items-end">
                <div
                  className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                  style={{ background: '#0C1350', color: '#FFE600' }}
                >
                  AI
                </div>
                <div
                  className="px-4 py-3 rounded-2xl"
                  style={{ background: '#ffffff', border: '1px solid #E8E4DC', borderBottomLeftRadius: '4px' }}
                >
                  <div className="flex gap-1 items-center">
                    <span
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ background: '#FFE600', animationDelay: '0ms' }}
                    ></span>
                    <span
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ background: '#FFE600', animationDelay: '150ms' }}
                    ></span>
                    <span
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ background: '#FFE600', animationDelay: '300ms' }}
                    ></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {showQuickActions && messages.length <= 1 && (
            <div className="px-3 py-2 flex-shrink-0" style={{ background: '#F8F7F5', borderTop: '1px solid #E8E4DC' }}>
              <p className="text-xs text-gray-500 mb-2 font-medium">Quick actions:</p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => handleQuickAction(action.query)}
                    className="text-xs px-2.5 py-1.5 rounded-full border font-medium transition-all hover:shadow-sm active:scale-95"
                    style={{
                      background: '#ffffff',
                      borderColor: '#0C1350',
                      color: '#0C1350',
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.background = '#0C1350';
                      (e.target as HTMLElement).style.color = '#FFE600';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.background = '#ffffff';
                      (e.target as HTMLElement).style.color = '#0C1350';
                    }}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-3 py-3 flex-shrink-0"
            style={{ background: '#ffffff', borderTop: '1px solid #E8E4DC' }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message or ask in Urdu..."
              disabled={isLoading}
              className="flex-1 text-sm px-3 py-2 rounded-full outline-none disabled:opacity-60"
              style={{
                background: '#F8F7F5',
                border: '1.5px solid #E0D8CC',
                color: '#1a1a1a',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#0C1350')}
              onBlur={(e) => (e.target.style.borderColor = '#E0D8CC')}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: '#0C1350' }}
            >
              <svg className="w-4 h-4" style={{ color: '#FFE600' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>

          {/* Footer */}
          <div
            className="text-center py-1.5 text-xs flex-shrink-0"
            style={{ background: '#070D38', color: 'rgba(255,230,0,0.6)' }}
          >
            Powered by Alimran Fabrics AI · <span style={{ color: 'rgba(255,230,0,0.4)' }}>claude-haiku</span>
          </div>
        </div>
      )}
    </>
  );
}
