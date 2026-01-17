# Context Domain

> **WHAT the user prefers** — Natural language preferences that the AI reads.

---

## Overview

Context is the practical layer of personalization. It's a list of natural language statements that describe how the user wants their experience to feel.

| Aspect | Description |
|--------|-------------|
| **Purpose** | Communicate preferences to AI |
| **Format** | Natural language text items |
| **Scope** | Per-screen |
| **Visibility** | Shown in Context Panel (transparent to user) |

---

## Structure

```
context/
├── README.md              # This file
├── schema.json            # ContextItem[] definition
├── layers.md              # The 5 UX layers explained
└── panel.md               # Context Panel UI spec
```

---

## The 5 Layers

Context items are organized into 5 UX dimensions:

| Layer | Focus | Example |
|-------|-------|---------|
| **Presentation** | How things look | "Clean, distraction-free interface" |
| **Cognition** | How content is conveyed | "Story pace: Slowly and gradually" |
| **Autonomy** | Who's in control | "User freely navigates, no forced paths" |
| **Continuity** | How time/state is handled | "Progress bookmarked automatically" |
| **Intent** | What the user wants | "User follows vegetarian diet" |

See [layers.md](./layers.md) for detailed explanations.

---

## Context Sources

Context items come from 4 sources:

| Source | Description | Editable | Locked |
|--------|-------------|----------|--------|
| **Baseline** | Default assumptions (from Persona) | No | Yes |
| **Onboarding** | Generated from miniapp onboarding | No | Yes |
| **Learned** | Patterns detected from behavior | Yes | No |
| **User-added** | Manually added in Context Panel | Yes | No |

---

## Data Model

```typescript
interface ContextItem {
  layer: 'presentation' | 'cognition' | 'autonomy' | 'continuity' | 'intent';
  text: string;           // Natural language preference
  isBaseline: boolean;    // true = locked, false = editable
  source: 'baseline' | 'onboarding' | 'learned' | 'user-added';
}

interface PageContext {
  pageName: string;
  items: ContextItem[];
}
```

---

## How Context is Built

```
┌─────────────────────────────────────────────────────────┐
│                  PERSONA DOMAIN                         │
│                                                         │
│   Baseline (per screen)    +    Onboarding answers     │
│                                                         │
└─────────────────────┬───────────────────────────────────┘
                      │ generates
                      ▼
┌─────────────────────────────────────────────────────────┐
│                  CONTEXT DOMAIN                         │
│                                                         │
│   Baseline items    Onboarding items    User items     │
│   (locked)          (locked)            (editable)     │
│                                                         │
│                      ↓ merged                          │
│                                                         │
│               Full Context (per screen)                │
│                                                         │
└─────────────────────┬───────────────────────────────────┘
                      │ read by
                      ▼
┌─────────────────────────────────────────────────────────┐
│                   CHAT DOMAIN                           │
│                                                         │
│   AI receives context items as natural language        │
│   AI adapts responses based on preferences             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Example: Merged Context

For the `to-read-library` screen:

```typescript
const libraryContext = {
  pageName: 'To-Read Library',
  items: [
    // From Baseline (locked)
    { layer: 'presentation', text: 'Light purple accent color (#C3B1E1)', isBaseline: true, source: 'baseline' },
    { layer: 'autonomy', text: 'User can browse freely and select any book', isBaseline: true, source: 'baseline' },
    { layer: 'continuity', text: 'Reading progress saved automatically', isBaseline: true, source: 'baseline' },

    // From Onboarding (locked)
    { layer: 'cognition', text: 'Story pace: Slowly and gradually', isBaseline: true, source: 'onboarding' },
    { layer: 'intent', text: 'Reading motivation: Connecting with characters', isBaseline: true, source: 'onboarding' },

    // User-added (editable)
    { layer: 'presentation', text: 'Prefer grid view over list view', isBaseline: false, source: 'user-added' },
  ]
};
```

---

## How AI Uses Context

When user sends a chat message, AI receives:

1. Current screen's Context items (all layers)
2. User's message
3. Available commands

The AI reads Context as natural language:

```
Context: "Story pace: Slowly and gradually"
Context: "Reading flow breaks: Too much tension"
Context: "User follows vegetarian diet"

User: "Create a recipe for dinner"

AI thinks: User wants vegetarian, probably not rushed.
AI action: Generates a relaxed vegetarian recipe.
```

---

## Context Panel

Users can view and edit their Context via the Context Panel.

See [panel.md](./panel.md) for the full UI specification.

---

## Related

- Persona Domain: [../persona/](../persona/)
- Chat Domain: [../chat/](../chat/)
- Context Schema: [schema.json](./schema.json)
- Layers Explanation: [layers.md](./layers.md)
