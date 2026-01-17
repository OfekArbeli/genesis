# to-read Miniapp Specification

> **Reading companion miniapp** — AI-powered personalized reading experience.

---

## Overview

| Property | Value |
|----------|-------|
| **ID** | `to-read` |
| **Name** | to-read |
| **Icon** | BookOpen (lucide) |
| **Accent Color** | Light Purple (`#C3B1E1`) |
| **Status** | In Development |

---

## User Flow

```
Home → to-read (first time) → Onboarding → Library
Home → to-read (returning) → Library → Reading View
```

---

## Screens

### 1. Onboarding (4 steps)

First-time users complete a persona questionnaire to personalize their reading experience.

#### Step 1: Story Pace
**Question**: "How do you like stories to unfold?"

| Option | Description |
|--------|-------------|
| Slowly and gradually | Prefers deliberate pacing |
| Faster, straight into the action | Prefers quick engagement |
| Depends on the story | Flexible based on content |

#### Step 2: Reading Breakers
**Question**: "What usually breaks your reading flow?" (Select up to 2)

| Option |
|--------|
| Too much tension |
| Too much information too fast |
| Long conversations with no direction |
| Stories that don't feel emotional |
| Nothing really breaks it |

#### Step 3: Reading Motivation
**Question**: "When you read, what matters most to you?"

| Option |
|--------|
| Connecting with characters |
| Exploring ideas |
| Using imagination |
| Just relaxing and flowing |

#### Step 4: Distance from Reality
**Question**: "When you enter a story, what feels more natural?"

| Option |
|--------|
| Staying close to reality |
| Going far into imagination |
| Somewhere in between |

---

### 2. Library View

Displays user's book collection with reading progress.

#### Header
- Title: "to-read" (miniapp name)
- Subtitle: "My Library"
- Filter button
- Grid/List toggle

#### Book Card (Grid Mode)
```
┌─────────────────┐
│                 │
│   Cover Color   │
│   Gradient      │
│                 │
├─────────────────┤
│ Book Title      │
│ ████████░░ 45%  │
│ [Reading]       │
└─────────────────┘
```

#### Book Statuses
| Status | Badge Color | Shows Progress |
|--------|-------------|----------------|
| `reading` | Light Purple | Yes |
| `want-to-read` | Light Teal | No |
| `done` | Mint Green | No |

#### Empty State
- Icon: Plus in purple circle
- Text: "Your library is empty"
- Subtext: "Want me to suggest a book?"
- CTA: "Add Your First Book"

#### Features
- Search bar (appears on user request via chat)
- View mode: Grid (default) / List
- Filters by status

---

### 3. Reading View

Immersive reading experience with customization.

#### Header
- Book title (truncated)
- Settings button
- Progress: "Chapter X of Y" + percentage
- Progress bar

#### Settings Panel (Expandable)
| Setting | Type | Range |
|---------|------|-------|
| Font Size | Slider | 12px - 24px (default: 16px) |
| Line Spacing | Slider | 1.2 - 2.4 (default: 1.6) |

#### Content Features
- Blockquote styling for quotes (purple left border)
- Word-by-word translation on tap (when enabled)
- Translation popup shows Hebrew translation

#### Translation Feature
- Triggered via chat: "Enable word translation on tap"
- Shows popup with original word + Hebrew translation
- Purple background with white text
- RTL support for Hebrew

---

## Chat Integration

### Quick Actions (Use)
| Screen | Actions |
|--------|---------|
| Home | "Open to-read miniapp", "Show my reading stats" |
| Library | "Create a book for me", "Find books about philosophy" |
| Reading | "Summarize this chapter", "Explain this concept" |

### Quick Actions (Evolve)
| Screen | Actions |
|--------|---------|
| Home | "Rearrange miniapp icons", "Change home layout" |
| Library | "Add search bar at top", "Switch to list view" |
| Reading | "Enable word translation on tap", "Make text larger" |

---

## Context System

Each screen has baseline context items across 5 layers:

### Library Context
| Layer | Context |
|-------|---------|
| Presentation | Light purple accent color as signature |
| Autonomy | User can browse freely and select any book |
| Continuity | Reading progress saved automatically |

### Reading Context
| Layer | Context |
|-------|---------|
| Presentation | Clean, distraction-free with comfortable typography |
| Autonomy | User controls pace with swipe gestures |
| Continuity | Position bookmarked automatically |

### Onboarding-Derived Context
After completing onboarding, these context items are added:
- **Cognition**: Story pace preference
- **Cognition**: Reading flow breakers
- **Intent**: Reading motivation
- **Intent**: Story reality preference

---

## Data Model

### Book Entity
```typescript
interface Book {
  id: string;
  title: string;
  author?: string;
  progress: number; // 0-100
  status: 'reading' | 'want-to-read' | 'done';
  coverColor: string; // Gradient class
  currentChapter?: number;
  totalChapters?: number;
}
```

### OnboardingData Entity
```typescript
interface OnboardingData {
  storyPace: string;
  readingBreakers: string[]; // max 2
  readingMotivation: string;
  distanceFromReality: string;
}
```

### Reading Settings
```typescript
interface ReadingSettings {
  fontSize: number; // 12-24
  lineSpacing: number; // 1.2-2.4
  enableTranslation: boolean;
}
```

---

## Visual Design

### Color Usage
| Element | Color |
|---------|-------|
| Accent/Highlights | Light Purple (`#C3B1E1`) |
| Selected states | Purple-50 bg + Purple border |
| Progress bars | Light Purple fill |
| User chat bubbles | Light Purple/80 |
| Blockquote border | Light Purple |
| Translation popup | Light Purple/95 |

### Book Cover Gradients
| Status | Gradient |
|--------|----------|
| Reading | `from-purple-200 to-light-purple` |
| Want to Read | `from-light-teal to-mint-green` |
| Misc | `from-light-yellow to-light-orange` |

### Typography
- Headers: Nunito Sans
- Body: Open Sans
- Reading content: Adjustable size (12-24px)

---

## Animations

| Element | Animation |
|---------|-----------|
| Screen transitions | Slide left/right with fade |
| Book cards | Scale + fade on load (staggered) |
| Settings panel | Slide down + fade |
| Translation popup | Scale + fade with spring |
| Progress bar | Width transition |

---

## Related

- Engine: [domains/percepta/](../../domains/percepta/)
- Persona: [domains/sensetree/](../../domains/sensetree/)
- Branding: [branding/](../../branding/)
