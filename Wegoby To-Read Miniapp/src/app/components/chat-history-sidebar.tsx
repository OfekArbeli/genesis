import React from 'react';
import { MessageSquare, Clock } from 'lucide-react';
import { cn } from './ui/utils';
import { motion, AnimatePresence } from 'motion/react';

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

interface ChatHistorySidebarProps {
  isOpen: boolean;
  conversations: ChatConversation[];
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onClose: () => void;
}

export function ChatHistorySidebar({
  isOpen,
  conversations,
  currentConversationId,
  onSelectConversation,
  onClose
}: ChatHistorySidebarProps) {
  
  // Format timestamp to readable format
  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <>
      {/* Sidebar - Now contained within chat box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute left-0 top-0 bottom-0 w-80 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg border-r-2 border-border shadow-2xl z-10 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-light-purple" />
                Chat History
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {conversations.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No conversations yet</p>
                </div>
              ) : (
                conversations.map((conversation) => {
                  const isActive = conversation.id === currentConversationId;
                  const messageCount = conversation.messages.filter(m => m.role === 'user').length;
                  
                  return (
                    <button
                      key={conversation.id}
                      onClick={() => onSelectConversation(conversation.id)}
                      className={cn(
                        'w-full text-left p-3 rounded-xl transition-all duration-200',
                        'hover:bg-light-purple/10 active:scale-[0.98]',
                        isActive 
                          ? 'bg-light-purple/20 border-2 border-light-purple/40' 
                          : 'bg-white/50 dark:bg-neutral-800/50 border-2 border-transparent'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          'p-2 rounded-lg flex-shrink-0',
                          isActive ? 'bg-light-purple/30' : 'bg-light-purple/10'
                        )}>
                          <MessageSquare className="w-4 h-4 text-light-purple" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className={cn(
                            'text-sm font-medium truncate mb-1',
                            isActive ? 'text-foreground' : 'text-foreground/80'
                          )}>
                            {conversation.title}
                          </h3>
                          
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{formatTimestamp(conversation.lastUpdated)}</span>
                            <span>•</span>
                            <span>{messageCount} message{messageCount !== 1 ? 's' : ''}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}