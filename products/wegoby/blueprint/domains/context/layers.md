# The 5 UX Categories

> **Organizing Dimensions** — How style and context items are categorized.

---

## Overview

Every style or context item belongs to one of 5 categories. These represent different aspects of the user experience.

```
┌─────────────────────────────────────────────────────────┐
│                    UX CATEGORIES                        │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │Presentation │  │  Cognition  │  │  Autonomy   │     │
│  │  (surface)  │  │  (density)  │  │  (agency)   │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│                                                         │
│       ┌─────────────┐       ┌─────────────┐            │
│       │ Continuity  │       │  Relevance  │            │
│       │ (temporal)  │       │  (content)  │            │
│       └─────────────┘       └─────────────┘            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

Note: The category previously called "Intent" is now "Relevance" to avoid confusion with the Intent Resolver (which determines what the user wants to do).

---

## 1. Presentation

**Focus**: Surface — How information is displayed

### What It Covers
- Visual style and aesthetics
- Layout and spacing
- Colors and themes
- Typography
- Animations and motion

### Example Items
| Item | Effect |
|------|--------|
| "Clean, distraction-free interface" | Minimal UI elements |
| "Light purple accent color" | Use specific color |
| "Prefer grid view over list view" | Default to grid layout |
| "Large text for comfortable reading" | Increase font size |

---

## 2. Cognition

**Focus**: Density — How content is conveyed

### What It Covers
- Amount of detail
- Tone and formality
- Pacing of information
- Complexity level
- Explanations and guidance

### Example Items
| Item | Effect |
|------|--------|
| "Story pace: Slowly and gradually" | Generate slower-paced stories |
| "Questions are clear and concise" | Simple onboarding questions |
| "User is a beginner cook" | Provide detailed instructions |
| "Reading flow breaks: Too much tension" | Avoid intense content |

---

## 3. Autonomy

**Focus**: Agency — Who leads the experience

### What It Covers
- User control vs system control
- Proactive suggestions
- Confirmations and warnings
- Navigation freedom
- Automation level

### Example Items
| Item | Effect |
|------|--------|
| "User freely navigates, no forced paths" | No mandatory flows |
| "User can skip optional questions" | Allow skipping |
| "Don't show proactive suggestions" | Disable AI suggestions |
| "Always confirm before deleting" | Show confirmation dialogs |

---

## 4. Continuity

**Focus**: Temporal — How time and state are handled

### What It Covers
- Progress saving
- Session persistence
- History and memory
- Cross-device sync
- Resume functionality

### Example Items
| Item | Effect |
|------|--------|
| "Reading progress saved automatically" | Auto-save position |
| "Reading position bookmarked automatically" | Remember last read |
| "Recently used miniapps highlighted" | Show recents |
| "Sync across devices" | Enable sync |

---

## 5. Relevance

**Focus**: Content matching — What's relevant to the user right now

### What It Covers
- Content filters and restrictions
- Interests and preferences
- Domain-specific needs
- Current situational constraints

### Example Items
| Item | Effect |
|------|--------|
| "User follows vegetarian diet" | Filter out meat recipes |
| "Reading motivation: Connecting with characters" | Character-driven stories |
| "User prefers quick meals under 30 minutes" | Fast recipes |
| "User is at a restaurant" | Show menu-focused UI |

Note: This category is about content filtering and matching, not about user goals (which are handled by the Intent Resolver).

---

## Category Selection Guide

When creating a style or context item, choose the category based on:

| If the item is about... | Use Category |
|-------------------------|--------------|
| How things **look** | Presentation |
| How things are **explained** | Cognition |
| Who is **in control** | Autonomy |
| How **state/time** is managed | Continuity |
| What content is **relevant** | Relevance |

---

## Cross-Category Examples

Some preferences might seem to fit multiple categories. Here's guidance:

| Preference | Could be... | Should be | Why |
|------------|-------------|-----------|-----|
| "User prefers dark mode" | Presentation | **Presentation** | Visual appearance |
| "User is a beginner" | Cognition or Relevance | **Cognition** | Affects how content is explained |
| "User follows vegetarian diet" | Cognition or Relevance | **Relevance** | Content filter |
| "Save progress automatically" | Autonomy or Continuity | **Continuity** | About persistence |
| "Don't auto-play videos" | Presentation or Autonomy | **Autonomy** | User control issue |

---

## Related

- Context Overview: [README.md](./README.md)
- Context Schema: [schema.json](./schema.json)
