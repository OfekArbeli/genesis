import { PageContext, ContextItem } from '@/app/components/context-view';

// Baseline contexts defined by the app creators for each page
// Users can add their own context items on top of these

export const BASELINE_CONTEXTS: Record<string, PageContext> = {
  home: {
    pageName: 'Home',
    items: [
      {
        layer: 'presentation',
        text: 'iPhone-style grid layout for miniapps with colorful icons',
        isBaseline: true,
      },
      {
        layer: 'presentation',
        text: 'Pastel color scheme with glass morphism effects and soft shadows',
        isBaseline: true,
      },
      {
        layer: 'cognition',
        text: 'Welcome message is friendly and casual, using first name',
        isBaseline: true,
      },
      {
        layer: 'autonomy',
        text: 'User freely navigates between miniapps, no forced paths',
        isBaseline: true,
      },
      {
        layer: 'continuity',
        text: 'Recently used miniapps could be highlighted or sorted to top',
        isBaseline: true,
      },
      {
        layer: 'intent',
        text: 'User is exploring available miniapps to find useful tools',
        isBaseline: true,
      },
    ],
  },
  
  'to-read-library': {
    pageName: 'To-Read Library',
    items: [
      {
        layer: 'presentation',
        text: 'Light purple accent color (#C3B1E1) as the signature color for to-read miniapp',
        isBaseline: true,
      },
      {
        layer: 'autonomy',
        text: 'User can browse freely and select any book to read',
        isBaseline: true,
      },
      {
        layer: 'continuity',
        text: 'Reading progress is saved automatically and visible on each book card',
        isBaseline: true,
      },
    ],
  },
  
  'to-read-reading': {
    pageName: 'Reading View',
    items: [
      {
        layer: 'presentation',
        text: 'Clean, distraction-free reading interface with comfortable typography',
        isBaseline: true,
      },
      {
        layer: 'autonomy',
        text: 'User controls reading pace with swipe gestures to turn pages',
        isBaseline: true,
      },
      {
        layer: 'continuity',
        text: 'Reading position is bookmarked automatically so user can resume anytime',
        isBaseline: true,
      },
    ],
  },
  
  'to-read-onboarding': {
    pageName: 'To-Read Onboarding',
    items: [
      {
        layer: 'presentation',
        text: 'Step-by-step questionnaire with progress indicator',
        isBaseline: true,
      },
      {
        layer: 'cognition',
        text: 'Questions are clear and concise, not overwhelming',
        isBaseline: true,
      },
      {
        layer: 'autonomy',
        text: 'User can skip optional questions and proceed',
        isBaseline: true,
      },
      {
        layer: 'intent',
        text: 'Gathering user preferences for genres, themes, and learning goals',
        isBaseline: true,
      },
    ],
  },
};

// Helper to get baseline context for a screen
export function getBaselineContext(screen: string): PageContext {
  return BASELINE_CONTEXTS[screen] || {
    pageName: screen,
    items: [],
  };
}

// Helper to merge baseline context with user-defined context
export function mergeContexts(baseline: PageContext, userItems: ContextItem[]): PageContext {
  return {
    ...baseline,
    items: [...baseline.items, ...userItems],
  };
}

// Helper to generate context items from to-read onboarding data
export function generateToReadContextFromOnboarding(onboardingData: {
  storyPace?: string;
  readingBreakers?: string[];
  readingMotivation?: string;
  distanceFromReality?: string;
}): ContextItem[] {
  const contextItems: ContextItem[] = [];

  if (onboardingData.storyPace) {
    contextItems.push({
      layer: 'cognition',
      text: `Story pace: ${onboardingData.storyPace}`,
      isBaseline: true,
    });
  }

  if (onboardingData.readingBreakers && onboardingData.readingBreakers.length > 0) {
    contextItems.push({
      layer: 'cognition',
      text: `Reading flow breaks: ${onboardingData.readingBreakers.join(', ')}`,
      isBaseline: true,
    });
  }

  if (onboardingData.readingMotivation) {
    contextItems.push({
      layer: 'intent',
      text: `Reading motivation: ${onboardingData.readingMotivation}`,
      isBaseline: true,
    });
  }

  if (onboardingData.distanceFromReality) {
    contextItems.push({
      layer: 'intent',
      text: `Story preference: ${onboardingData.distanceFromReality}`,
      isBaseline: true,
    });
  }

  return contextItems;
}