# Chat Capabilities

> **Use vs Evolve** — What the AI can do, regardless of phase.

---

## Overview

Capabilities describe **what** the AI can do, orthogonal to **when** (phases):

| Capability | Color | What AI Does |
|------------|-------|--------------|
| **Use** | Pink (`#F4B4C0`) | Operates the app FOR the user |
| **Evolve** | Purple (`#C3B1E1`) | Modifies the app's structure |

```
┌─────────────────────────────────────────────────────────────┐
│                    CAPABILITIES                              │
│                                                             │
│   ┌───────────────────────────────────────────────────────┐ │
│   │                    USE (Pink)                          │ │
│   │                                                        │ │
│   │   Works WITHIN existing structure                      │ │
│   │                                                        │ │
│   │   • Create/update/delete entities                      │ │
│   │   • Search and filter data                            │ │
│   │   • Generate content                                  │ │
│   │   • Navigate screens                                  │ │
│   │   • Answer questions                                  │ │
│   │                                                        │ │
│   │   → Uses Experience Plan                              │ │
│   │                                                        │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   ┌───────────────────────────────────────────────────────┐ │
│   │                   EVOLVE (Purple)                      │ │
│   │                                                        │ │
│   │   Changes HOW the app works                           │ │
│   │                                                        │ │
│   │   • Add/remove widgets                                │ │
│   │   • Change layouts                                    │ │
│   │   • Enable/disable features                           │ │
│   │   • Modify visual style                               │ │
│   │   • Create new views                                  │ │
│   │                                                        │ │
│   │   → Uses Evolve API (imperative commands)             │ │
│   │                                                        │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Use Capability (Pink)

AI operates the app **for** the user, within the existing structure.

### What It Does

- Creates, updates, deletes entities
- Searches and filters data
- Generates content (books, recipes, etc.)
- Navigates between screens
- Answers questions about content
- Produces Experience Plans for rendering

### Examples

| User Says | AI Action | Mechanism |
|-----------|-----------|-----------|
| "Create a book about space" | Generates book | Experience Plan → Renderer |
| "Find recipes with tomatoes" | Searches | Experience Plan → Data Resolver |
| "What should I eat tonight?" | Recommends | Context-building → Plan → Render |
| "Summarize this chapter" | Generates summary | Experience Plan (chat target) |
| "Mark chapter 5 as done" | Updates entity | Entity command |

### How to Identify

User wants to **do something** with content:
- "Create...", "Add...", "Find...", "Show..."
- "What is...", "Tell me...", "Help me..."
- "Mark as...", "Update...", "Delete..."

### Context Influence

Use capability respects Style and Context:

```
Style: { pace: "calm", verbosity: "normal" }
Context: { relevance: "vegetarian diet" }

User: "Create a recipe for dinner"
AI: Creates calm-paced vegetarian recipe (matches both)
```

---

## Evolve Capability (Purple)

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
| "Switch to list view" | Changes layout | `view.setLayout` |
| "Enable word translation" | Enables feature | `feature.enable` |
| "Make text larger" | Modifies style | `style.update` |
| "Create a weekly view" | Creates new view | `view.create` |

### How to Identify

User wants to **change how the app works**:
- "Add...", "Remove...", "Hide..."
- "Change...", "Switch...", "Enable...", "Disable..."
- "Make it...", "I want it to..."

### Evolve API

Evolve uses imperative commands (not Experience Plans):

```typescript
// Evolve commands are direct structure changes
await engine.execute({
  type: "view.addWidget",
  params: {
    viewId: "to-read-library",
    widget: "SearchBar",
    position: "top"
  }
});
```

---

## Capabilities × Phases

Both capabilities can occur in either phase:

| Phase | Use Example | Evolve Example |
|-------|-------------|----------------|
| **Context-building** | "What ingredients do you have?" | "What layout would you prefer?" |
| **Experience-use** | "Here's your recipe" | "I've added the search bar" |

### Common Patterns

**Use + Context-building**: DecideNow intent
```
AI: "What should I eat?" → collects context → generates recommendation
```

**Use + Experience-use**: Recipe explanation
```
AI: "Here's why this recipe matches your mood..."
```

**Evolve + Context-building**: Customization wizard
```
AI: "Would you like grid or list view?"
User: "Grid"
AI: "How many columns?"
```

**Evolve + Experience-use**: Confirmation
```
AI: "Done! I've added a 3-column grid to your library."
```

---

## Mode Detection

The AI determines capability based on intent keywords:

```
┌─────────────────────────────────────────────────────────┐
│                   User Message                          │
│                                                         │
│   "Create a book"          "Add a search bar"          │
│         │                         │                     │
│         ▼                         ▼                     │
│   ┌─────────────┐          ┌─────────────┐             │
│   │    Use      │          │   Evolve    │             │
│   │   (pink)    │          │  (purple)   │             │
│   └─────────────┘          └─────────────┘             │
│         │                         │                     │
│         ▼                         ▼                     │
│   Experience Plan            Evolve API                 │
│   + Renderer                 Commands                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Ambiguous Requests

Some requests could be either capability:

| Request | Could be... | Resolution |
|---------|-------------|------------|
| "Show dark mode" | Use (toggle) or Evolve (add setting) | Ask for clarification |
| "I want bigger text" | Use (zoom) or Evolve (change default) | Default to Evolve |
| "Add tomatoes" | Use (to recipe) or Evolve (to UI) | Context determines |

When ambiguous:
1. Check current screen context
2. Infer from recent actions
3. Ask for clarification if still unclear

---

## Visual Distinction

Quick actions are color-coded by capability:

### Use Actions (Pink)
```css
background: bg-primary-pink/70;
hover: bg-primary-pink;
```

### Evolve Actions (Purple)
```css
background: bg-light-purple/70;
hover: bg-light-purple;
```

---

## Capability Persistence

- Capability is per-message (not sticky)
- Each message is independently categorized
- Quick actions are pre-categorized by screen

---

## Why Two Capabilities?

**Use** handles the 99% case:
- Users want to do things with the app
- Experience Plans enable rich, adaptive rendering

**Evolve** handles structural changes:
- Some users want to customize their experience
- Structural changes need precision (imperative API)
- Keeps Use path simple and declarative

---

## Related

- Phases: [phases.md](./phases.md)
- Quick Actions: [quick-actions.md](./quick-actions.md)
- Engine Evolve API: [../engine/evolve-api.md](../engine/evolve-api.md)
- Experience Plan: [../experience/plan-schema.json](../experience/plan-schema.json)
