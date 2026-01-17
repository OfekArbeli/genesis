# Chat Modes

> **Use vs Evolve** — The two ways AI can respond to user requests.

---

## Overview

Every chat interaction falls into one of two modes:

| Mode | Color | What AI Does |
|------|-------|--------------|
| **Use** | Pink (`#F4B4C0`) | Operates the app FOR the user |
| **Evolve** | Purple (`#C3B1E1`) | Modifies the app's structure |

---

## Use Mode (Pink)

AI operates the app **for** the user, working within the existing UI structure.

### What It Does
- Creates, updates, deletes entities
- Searches and filters data
- Generates content (books, recipes, etc.)
- Navigates between screens
- Answers questions

### Examples

| User Says | AI Action | Command |
|-----------|-----------|---------|
| "Create a book about space" | Generates book entity | `entity.create` |
| "Find recipes with tomatoes" | Searches recipes | `query.search` |
| "Mark chapter 5 as done" | Updates progress | `entity.update` |
| "What's in my reading list?" | Queries data | `query.get` |
| "Summarize this chapter" | Generates summary | `ai.summarize` |

### How to Identify
User wants to **do something** with the current app:
- "Create...", "Add...", "Find...", "Show..."
- "What is...", "Tell me...", "Help me..."
- "Mark as...", "Update...", "Delete..."

### Context Influence
Use mode respects Context items:
```
Context: "User follows vegetarian diet"
User: "Create a recipe for dinner"
AI: Creates vegetarian recipe (not meat)
```

---

## Evolve Mode (Purple)

AI modifies the app's **structure**, changing how the UI works.

### What It Does
- Adds/removes widgets
- Changes layouts
- Enables/disables features
- Modifies visual style
- Creates new views

### Examples

| User Says | AI Action | Command |
|-----------|-----------|---------|
| "Add a search bar" | Adds SearchBar widget | `view.addWidget` |
| "Switch to list view" | Changes layout template | `view.setLayout` |
| "Enable word translation" | Enables feature | `feature.enable` |
| "Make text larger" | Modifies style | `style.update` |
| "Create a weekly view" | Creates new view | `view.create` |

### How to Identify
User wants to **change how the app works**:
- "Add...", "Remove...", "Show...", "Hide..."
- "Change...", "Switch...", "Enable...", "Disable..."
- "Make it...", "I want...", "Can you..."

### Structure Changes
Evolve mode modifies the screen's Structure:
```
Before: { widgets: [Header, BookGrid] }
User: "Add search bar at top"
After: { widgets: [Header, SearchBar, BookGrid] }
```

---

## Mode Detection

The AI determines mode based on intent:

```
┌─────────────────────────────────────────────────────────┐
│                   User Message                          │
│                                                         │
│   "Create a book"          "Add a search bar"          │
│         │                         │                     │
│         ▼                         ▼                     │
│   ┌─────────────┐          ┌─────────────┐             │
│   │  Use Mode   │          │ Evolve Mode │             │
│   │   (pink)    │          │  (purple)   │             │
│   └─────────────┘          └─────────────┘             │
│         │                         │                     │
│         ▼                         ▼                     │
│   Entity/Query               View/Feature               │
│   Commands                   Commands                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Quick Action Colors

Quick actions are pre-categorized:

### Use Actions (Pink)
```css
background: bg-primary-pink/70
hover: bg-primary-pink
```

### Evolve Actions (Purple)
```css
background: bg-light-purple/70
hover: bg-light-purple
```

---

## Ambiguous Requests

Some requests could be either mode:

| Request | Could be... | AI Decision |
|---------|-------------|-------------|
| "Show dark mode" | Use (toggle) or Evolve (add setting) | Ask for clarification |
| "I want bigger text" | Use (zoom) or Evolve (change default) | Default to Evolve |
| "Add tomatoes" | Use (to recipe) or Evolve (to UI) | Context determines |

When ambiguous, AI should:
1. Check current screen context
2. Infer from recent actions
3. Ask for clarification if still unclear

---

## Mode Persistence

- Mode is per-message (not sticky)
- Each message is independently categorized
- Quick actions are pre-categorized by screen

---

## Related

- Chat Overview: [README.md](./README.md)
- Quick Actions: [quick-actions.md](./quick-actions.md)
- Engine Commands: [../engine/command-api.md](../engine/command-api.md)
