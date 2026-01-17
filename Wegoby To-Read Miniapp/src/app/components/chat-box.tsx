import React, { useState, useRef } from 'react';
import { Send } from 'lucide-react';
import { cn } from './ui/utils';
import { motion, AnimatePresence } from 'motion/react';
import { ChatHistorySidebar } from './chat-history-sidebar';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatConversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  lastUpdated: number;
}

interface QuickAction {
  label: string;
  type: 'use' | 'evolve'; // use = AI operates app, evolve = AI modifies app
}

interface ChatBoxProps {
  isOpen: boolean;
  quickActions?: QuickAction[];
  onSendMessage?: (message: string) => void;
  resetTrigger?: number;
  conversations?: ChatConversation[];
  currentConversationId?: string | null;
  onSelectConversation?: (id: string) => void;
  onCreateNewChat?: () => void;
  isChatHistoryOpen?: boolean;
  onToggleChatHistory?: () => void;
  onUpdateConversation?: (messages: Message[]) => void;
}

export function ChatBox({ isOpen, quickActions = [], onSendMessage, resetTrigger, conversations = [], currentConversationId, onSelectConversation, onCreateNewChat, isChatHistoryOpen = false, onToggleChatHistory, onUpdateConversation }: ChatBoxProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hey there! 👋 I\'m your personal assistant. What can I help you with today?'
    }
  ]);
  const [hasUserSentMessage, setHasUserSentMessage] = useState(false);
  
  // Track if we're loading messages from props to prevent infinite loop
  const isLoadingFromProps = useRef(false);

  // Load messages from current conversation
  React.useEffect(() => {
    if (currentConversationId && conversations.length > 0) {
      const currentConv = conversations.find(c => c.id === currentConversationId);
      if (currentConv) {
        isLoadingFromProps.current = true;
        setMessages(currentConv.messages);
        setHasUserSentMessage(currentConv.messages.some(m => m.role === 'user'));
        // Reset flag after state update completes
        setTimeout(() => {
          isLoadingFromProps.current = false;
        }, 0);
      }
    }
  }, [currentConversationId, resetTrigger]);

  // Update parent when messages change (but not when loading from props)
  React.useEffect(() => {
    if (onUpdateConversation && messages.length > 0 && !isLoadingFromProps.current) {
      onUpdateConversation(messages);
    }
  }, [messages, onUpdateConversation]);

  // Reset conversation when resetTrigger changes
  React.useEffect(() => {
    if (resetTrigger && resetTrigger > 0) {
      setMessages([{
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Hey there! 👋 I\'m your personal assistant. What can I help you with today?'
      }]);
      setInput('');
      setHasUserSentMessage(false); // Reset the flag so quick actions appear again
    }
  }, [resetTrigger]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages([...messages, newMessage]);
    setInput('');

    if (onSendMessage) {
      onSendMessage(input);
    }

    // Simulate assistant response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Got it! 😊 I\'m on it. Let me help you with that right away!'
      }]);
    }, 1000);

    setHasUserSentMessage(true); // Set the flag to true after user sends a message
  };

  const handleQuickAction = (action: string) => {
    // Create user message
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: action
    };

    setMessages([...messages, newMessage]);

    if (onSendMessage) {
      onSendMessage(action);
    }

    // Simulate assistant response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Got it! 😊 I\'m on it. Let me help you with that right away!'
      }]);
    }, 1000);

    setHasUserSentMessage(true); // Set the flag to true after quick action is sent
  };

  // Determine if we should show quick actions
  const showQuickActions = quickActions.length > 0 && !input.trim() && !hasUserSentMessage;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: '40vh' }}
            exit={{ height: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-40 overflow-hidden"
          >
            {/* Transparent background with blur - animate opacity separately */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="h-full bg-background/40 dark:bg-background/30 backdrop-blur-md border-t border-border/50 relative"
            >
              {/* Chat History Sidebar - Now inside chat box */}
              {onSelectConversation && onToggleChatHistory && (
                <ChatHistorySidebar
                  isOpen={isChatHistoryOpen}
                  conversations={conversations}
                  currentConversationId={currentConversationId || null}
                  onSelectConversation={onSelectConversation}
                  onClose={onToggleChatHistory}
                />
              )}

              <div className="max-w-4xl mx-auto h-full flex flex-col p-4">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-3 mb-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        'flex',
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          'max-w-[80%] px-4 py-2.5 rounded-2xl backdrop-blur-sm',
                          message.role === 'user'
                            ? 'bg-light-purple/80 text-foreground rounded-br-sm shadow-lg'
                            : 'bg-white/60 dark:bg-card text-foreground rounded-bl-sm border border-border/50 shadow-lg'
                        )}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Actions */}
                {showQuickActions && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-2">
                      {quickActions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickAction(action.label)}
                          className={cn(
                            "text-xs px-3 py-2 rounded-full transition-colors backdrop-blur-sm shadow-md",
                            action.type === 'evolve'
                              ? 'bg-light-purple/70 text-foreground hover:bg-light-purple'
                              : 'bg-primary-pink/70 text-foreground hover:bg-primary-pink'
                          )}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask me anything or give a command..."
                    className="flex-1 px-4 py-3 bg-white/60 dark:bg-card backdrop-blur-sm rounded-full focus:outline-none focus:ring-2 focus:ring-light-purple text-sm border border-border/50 shadow-lg"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="p-3 bg-light-purple text-foreground rounded-full hover:bg-purple-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}