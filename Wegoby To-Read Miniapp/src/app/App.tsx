import React, { useState, useEffect } from 'react';
import { SignUp } from './components/signup';
import { StyleQuestions } from './components/style-questions';
import { LivePreview } from './components/live-preview';
import { HomeScreen } from './components/home-screen';
import { ToReadOnboarding } from './components/to-read-onboarding';
import { LibraryView } from './components/library-view';
import { ReadingView } from './components/reading-view';
import { ChatBox } from './components/chat-box';
import { BottomNav } from './components/bottom-nav';
import { ContextView, PageContext, ContextItem } from './components/context-view';
import { getBaselineContext, mergeContexts, generateToReadContextFromOnboarding } from '@/app/data/baseline-contexts';
import { Theme } from './components/theme-toggle';
import { Home, ArrowLeft } from 'lucide-react';

type Screen = 
  | 'signup'
  | 'style-questions'
  | 'live-preview'
  | 'home'
  | 'to-read-onboarding'
  | 'to-read-library'
  | 'to-read-reading';

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

interface UserData {
  name: string;
  email: string;
  theme: Theme;
  motionLevel: number;
  readingSize: string;
}

interface OnboardingData {
  storyPace: string;
  readingBreakers: string[];
  readingMotivation: string;
  distanceFromReality: string;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('signup');
  const [userData, setUserData] = useState<Partial<UserData>>({});
  const [toReadData, setToReadData] = useState<Partial<OnboardingData>>({
    // Sample data for testing - will be replaced when user completes onboarding
    storyPace: 'Slowly and gradually',
    readingBreakers: ['Too much tension'],
    readingMotivation: 'Connecting with characters',
    distanceFromReality: 'Somewhere in between',
  });
  const [selectedBookId, setSelectedBookId] = useState<string>('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [enableTranslation, setEnableTranslation] = useState(false);
  const [chatResetTrigger, setChatResetTrigger] = useState(0);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [totalChapters, setTotalChapters] = useState(10);

  // Chat history state
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isChatHistoryOpen, setIsChatHistoryOpen] = useState(false);

  // Context state - stores user-defined context items for each page
  const [isContextPanelOpen, setIsContextPanelOpen] = useState(false);
  const [userContexts, setUserContexts] = useState<Record<string, ContextItem[]>>({
    'home': [],
    'to-read-library': [],
    'to-read-reading': [],
    'to-read-onboarding': [],
  });

  // Get current conversation
  const currentConversation = conversations.find(c => c.id === currentConversationId);

  // Auto-generate conversation title based on first user message
  const generateConversationTitle = (messages: Message[]): string => {
    const firstUserMessage = messages.find(m => m.role === 'user');
    if (firstUserMessage) {
      // Take first 40 characters of the message
      const title = firstUserMessage.content.substring(0, 40);
      return title.length < firstUserMessage.content.length ? title + '...' : title;
    }
    return 'New Conversation';
  };

  // Create a new conversation
  const handleCreateNewChat = () => {
    const newConversation: ChatConversation = {
      id: Date.now().toString(),
      title: 'New Conversation',
      messages: [{
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Hey there! 👋 I\'m your personal assistant. What can I help you with today?'
      }],
      createdAt: Date.now(),
      lastUpdated: Date.now()
    };
    
    setConversations([newConversation, ...conversations]);
    setCurrentConversationId(newConversation.id);
    setChatResetTrigger(chatResetTrigger + 1);
  };

  // Switch to a different conversation
  const handleSelectConversation = (conversationId: string) => {
    setCurrentConversationId(conversationId);
    setIsChatHistoryOpen(false);
    setChatResetTrigger(chatResetTrigger + 1);
  };

  // Update conversation messages
  const handleUpdateConversation = React.useCallback((messages: Message[]) => {
    if (!currentConversationId) return;
    
    setConversations(prev => prev.map(conv => {
      if (conv.id === currentConversationId) {
        // Auto-update title if this is the first user message
        const hasUserMessage = conv.messages.some(m => m.role === 'user');
        const newHasUserMessage = messages.some(m => m.role === 'user');
        const shouldUpdateTitle = !hasUserMessage && newHasUserMessage && conv.title === 'New Conversation';
        
        return {
          ...conv,
          messages,
          lastUpdated: Date.now(),
          title: shouldUpdateTitle ? generateConversationTitle(messages) : conv.title
        };
      }
      return conv;
    }));
  }, [currentConversationId]);

  // Determine if nav should be shown
  const showNav = screen !== 'signup' && screen !== 'style-questions' && screen !== 'live-preview';

  // Initialize first conversation
  useEffect(() => {
    if (conversations.length === 0 && showNav) {
      // Create some sample conversations for demo purposes
      const now = Date.now();
      const sampleConversations: ChatConversation[] = [
        {
          id: (now - 3600000).toString(), // 1 hour ago
          title: 'Help me rearrange my miniapp icons',
          messages: [
            { id: '1', role: 'assistant', content: 'Hey there! 👋 I\'m your personal assistant. What can I help you with today?' },
            { id: '2', role: 'user', content: 'Help me rearrange my miniapp icons' },
            { id: '3', role: 'assistant', content: 'Got it! 😊 I\'m on it. Let me help you with that right away!' }
          ],
          createdAt: now - 3600000,
          lastUpdated: now - 3500000
        },
        {
          id: (now - 86400000).toString(), // 1 day ago
          title: 'Create a book about ancient philosophy',
          messages: [
            { id: '1', role: 'assistant', content: 'Hey there! 👋 I\'m your personal assistant. What can I help you with today?' },
            { id: '2', role: 'user', content: 'Create a book about ancient philosophy' },
            { id: '3', role: 'assistant', content: 'Awesome choice! 📚 I\'d love to help you create a book about ancient philosophy. What specific topics interest you?' }
          ],
          createdAt: now - 86400000,
          lastUpdated: now - 86300000
        },
        {
          id: now.toString(),
          title: 'New Conversation',
          messages: [
            { id: Date.now().toString(), role: 'assistant', content: 'Hey there! 👋 I\'m your personal assistant. What can I help you with today?' }
          ],
          createdAt: now,
          lastUpdated: now
        }
      ];
      
      setConversations(sampleConversations);
      setCurrentConversationId(sampleConversations[2].id); // Set to newest conversation
    }
  }, [showNav]);

  // Apply theme
  useEffect(() => {
    if (userData.theme) {
      const root = document.documentElement;
      if (userData.theme === 'dark') {
        root.classList.add('dark');
      } else if (userData.theme === 'light') {
        root.classList.remove('dark');
      } else {
        // System preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    }
  }, [userData.theme]);

  // Chat quick actions based on current screen
  const getQuickActions = () => {
    switch (screen) {
      case 'home':
        return [
          { label: 'Open to-read miniapp', type: 'use' as const },
          { label: 'Show my reading stats', type: 'use' as const },
          { label: 'Rearrange miniapp icons', type: 'evolve' as const },
          { label: 'Change home layout', type: 'evolve' as const }
        ];
      case 'to-read-library':
        return [
          { label: 'Create a book for me', type: 'use' as const },
          { label: 'Find books about philosophy', type: 'use' as const },
          { label: 'Add search bar at top', type: 'evolve' as const },
          { label: 'Switch to list view', type: 'evolve' as const }
        ];
      case 'to-read-reading':
        return [
          { label: 'Summarize this chapter', type: 'use' as const },
          { label: 'Explain this concept', type: 'use' as const },
          { label: 'Enable word translation on tap', type: 'evolve' as const },
          { label: 'Make text larger', type: 'evolve' as const }
        ];
      default:
        return [];
    }
  };

  const handleSignUpComplete = (data: { email: string; name: string }) => {
    setUserData({ ...userData, ...data });
    setScreen('style-questions');
  };

  const handleStyleQuestionsComplete = (data: { theme: Theme; motionLevel: number; readingSize: string }) => {
    setUserData({ ...userData, ...data });
    setScreen('live-preview');
  };

  const handleThemeChange = (theme: Theme) => {
    setUserData({ ...userData, theme });
  };

  const handleLivePreviewComplete = () => {
    setScreen('home');
  };

  const handleSelectMiniapp = (id: string) => {
    if (id === 'to-read') {
      // Check if already onboarded
      if (toReadData.storyPace) {
        setScreen('to-read-library');
      } else {
        setScreen('to-read-onboarding');
      }
    }
  };

  const handleToReadOnboardingComplete = (data: OnboardingData) => {
    setToReadData(data);
    setScreen('to-read-library');
  };

  const handleSelectBook = (bookId: string) => {
    setSelectedBookId(bookId);
    setScreen('to-read-reading');
  };

  const getNavActions = () => {
    switch (screen) {
      case 'home':
        return {
          // No back action on home screen
        };
      case 'to-read-library':
        return {
          backAction: { icon: Home, label: 'Home', onClick: () => setScreen('home') }
        };
      case 'to-read-reading':
        return {
          backAction: { icon: ArrowLeft, label: 'Library', onClick: () => setScreen('to-read-library') }
        };
      case 'to-read-onboarding':
        return {
          backAction: { icon: ArrowLeft, label: 'Back', onClick: () => setScreen('home') }
        };
      default:
        return {};
    }
  };

  const handleNextChapter = () => {
    if (currentChapter < totalChapters) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const handleResetChat = () => {
    // Create a new chat instead of resetting
    handleCreateNewChat();
  };

  // Get current page context (baseline + user-defined)
  const getCurrentPageContext = (): PageContext => {
    let baseline = getBaselineContext(screen);
    
    // For to-read library and reading pages, add onboarding context
    if ((screen === 'to-read-library' || screen === 'to-read-reading') && toReadData.storyPace) {
      const onboardingContextItems = generateToReadContextFromOnboarding(toReadData);
      baseline = {
        ...baseline,
        items: [...baseline.items, ...onboardingContextItems],
      };
    }
    
    const userItems = userContexts[screen] || [];
    return mergeContexts(baseline, userItems);
  };

  // Save context for current page
  const handleSaveContext = (pageContext: PageContext) => {
    // Extract only user-defined items (not baseline)
    const userItems = pageContext.items.filter(item => !item.isBaseline);
    setUserContexts({
      ...userContexts,
      [screen]: userItems,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      {screen === 'signup' && (
        <SignUp onContinue={handleSignUpComplete} />
      )}

      {screen === 'style-questions' && (
        <StyleQuestions
          onContinue={handleStyleQuestionsComplete}
          onBack={() => setScreen('signup')}
          initialTheme={userData.theme}
          onThemeChange={handleThemeChange}
        />
      )}

      {screen === 'live-preview' && (
        <LivePreview
          theme={userData.theme || 'light'}
          motionLevel={userData.motionLevel || 50}
          onContinue={handleLivePreviewComplete}
          onTweakMore={() => setScreen('style-questions')}
        />
      )}

      {screen === 'home' && (
        <HomeScreen
          userName={userData.name || 'there'}
          onSelectMiniapp={handleSelectMiniapp}
        />
      )}

      {screen === 'to-read-onboarding' && (
        <ToReadOnboarding
          onComplete={handleToReadOnboardingComplete}
          onBack={() => setScreen('home')}
        />
      )}

      {screen === 'to-read-library' && (
        <LibraryView
          onBack={() => setScreen('home')}
          onSelectBook={handleSelectBook}
          onCreateBook={() => {
            // In a real app, this would open a create book dialog
            console.log('Create book clicked');
          }}
          showSearchBar={showSearchBar}
        />
      )}

      {screen === 'to-read-reading' && (
        <ReadingView
          bookTitle="The Three-Body Problem"
          onBack={() => setScreen('to-read-library')}
          enableTranslation={enableTranslation}
        />
      )}

      {/* Chat Interface - Transparent overlay */}
      {showNav && (
        <ChatBox
          isOpen={isChatOpen}
          quickActions={getQuickActions()}
          onSendMessage={(message) => {
            console.log('Message sent:', message);
            // Handle chat messages here
            if (message.toLowerCase().includes('search bar')) {
              setShowSearchBar(true);
            }
            if (message.toLowerCase().includes('translation') || message.toLowerCase().includes('translate')) {
              setEnableTranslation(true);
            }
          }}
          resetTrigger={chatResetTrigger}
          conversations={conversations}
          currentConversationId={currentConversationId}
          onSelectConversation={handleSelectConversation}
          onCreateNewChat={handleCreateNewChat}
          isChatHistoryOpen={isChatHistoryOpen}
          onToggleChatHistory={() => setIsChatHistoryOpen(!isChatHistoryOpen)}
          onUpdateConversation={handleUpdateConversation}
        />
      )}

      {/* Bottom Navigation - Moves up when chat is open */}
      {showNav && (
        <BottomNav
          {...getNavActions()}
          onChatClick={() => setIsChatOpen(!isChatOpen)}
          isChatOpen={isChatOpen}
          onResetChat={handleResetChat}
          onChatHistoryClick={() => setIsChatHistoryOpen(!isChatHistoryOpen)}
          onContextClick={() => setIsContextPanelOpen(true)}
        />
      )}

      {/* Context Preferences Panel */}
      {showNav && (
        <ContextView
          isOpen={isContextPanelOpen}
          onClose={() => setIsContextPanelOpen(false)}
          currentScreen={screen}
          preferences={getCurrentPageContext()}
          onSave={handleSaveContext}
        />
      )}
    </div>
  );
}