import React, { useState } from 'react';
import { LucideIcon, MessageSquarePlus, History, Shirt } from 'lucide-react';
import { cn } from './ui/utils';
import logoImage from 'figma:asset/bbc63ba9099d3eaa21e28ebbb8075af0f85078e6.png';
import { motion } from 'motion/react';

interface NavAction {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

interface BottomNavProps {
  backAction?: NavAction;
  onChatClick?: () => void;
  isChatOpen?: boolean;
  onResetChat?: () => void;
  onChatHistoryClick?: () => void;
  onContextClick?: () => void;
}

export function BottomNav({ 
  backAction, 
  onChatClick,
  isChatOpen = false,
  onResetChat,
  onChatHistoryClick,
  onContextClick
}: BottomNavProps) {
  const [animationKey, setAnimationKey] = useState(0);

  const handleChatClick = () => {
    setAnimationKey(prev => prev + 1); // Trigger animation
    if (onChatClick) {
      onChatClick();
    }
  };

  return (
    <>
      {/* Bottom Navigation */}
      <div className={cn(
        'fixed left-0 right-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-t-2 border-border shadow-lg z-50 pb-safe transition-all duration-300',
        isChatOpen ? 'bottom-[40vh]' : 'bottom-0'
      )}>
        <div className="max-w-md mx-auto px-6 py-3">
          <div className="flex items-center justify-around relative">
            {/* Left - History Button (when chat is open) or Back Button (when chat is closed) */}
            <div className="flex gap-3 w-20 justify-start">
              {isChatOpen && onChatHistoryClick ? (
                <button
                  onClick={onChatHistoryClick}
                  className="flex flex-col items-center gap-1 text-foreground hover:text-light-purple transition-colors"
                >
                  <History className="w-6 h-6" />
                  <span className="text-xs">History</span>
                </button>
              ) : (
                backAction && (
                  <button
                    onClick={backAction.onClick}
                    className="flex flex-col items-center gap-1 text-foreground hover:text-light-purple transition-colors"
                  >
                    <backAction.icon className="w-6 h-6" />
                    <span className="text-xs">{backAction.label}</span>
                  </button>
                )
              )}
            </div>

            {/* Chat - Center Circle Button */}
            <button
              onClick={handleChatClick}
              className="flex flex-col items-center gap-1 -mt-8"
            >
              <div className="relative">
                {/* Animated glow effect - behind the button */}
                <div className={cn(
                  'absolute inset-0 rounded-full transition-opacity duration-300',
                  'bg-gradient-to-r from-primary-pink via-light-purple to-light-teal',
                  'animate-pulse opacity-40 blur-md scale-110',
                  isChatOpen && 'opacity-60'
                )} />
                
                {/* Solid white button */}
                <div className={cn(
                  'relative w-16 h-16 bg-white dark:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-10',
                  isChatOpen ? 'scale-110' : 'hover:scale-110 active:scale-95'
                )}>
                  <motion.img
                    key={animationKey}
                    src={logoImage}
                    alt="Chat"
                    className="w-10 h-10"
                    initial={{ scale: 0, rotate: -180, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 15,
                      duration: 0.8
                    }}
                  />
                </div>
              </div>
              <span className="text-xs text-light-purple mt-1">Chat</span>
            </button>

            {/* Right - New Chat button (when chat is open) or Context (when chat is closed) */}
            <div className="flex gap-3 w-20 justify-end">
              {isChatOpen && onResetChat ? (
                <button
                  onClick={onResetChat}
                  className="flex flex-col items-center gap-1 text-foreground hover:text-primary-pink transition-colors"
                >
                  <MessageSquarePlus className="w-6 h-6" />
                  <span className="text-xs">New</span>
                </button>
              ) : (
                onContextClick && (
                  <button
                    onClick={onContextClick}
                    className="flex flex-col items-center gap-1 text-foreground hover:text-light-purple transition-colors"
                  >
                    <Shirt className="w-6 h-6" />
                    <span className="text-xs">Context</span>
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}