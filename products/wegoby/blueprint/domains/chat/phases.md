# Chat Phases

> **Context-building vs Experience-use** — When and how chat is used in the flow.

---

## Overview

Chat operates in two phases, representing **when** it's used in the experience flow:

| Phase | Purpose | Outcome |
|-------|---------|---------|
| **Context-building** | Collect situational inputs | Context Snapshot |
| **Experience-use** | Guide, explain, render | User understanding / UI |

```
┌─────────────────────────────────────────────────────────────┐
│                    PHASE FLOW                                │
│                                                             │
│   User triggers intent                                      │
│            │                                                │
│            ▼                                                │
│   ┌──────────────────────────────────────────────────────┐ │
│   │         CONTEXT-BUILDING PHASE                        │ │
│   │                                                       │ │
│   │   "Are you at home or eating out?"                   │ │
│   │   "What ingredients do you have?"                    │ │
│   │   "How much time do you have?"                       │ │
│   │                                                       │ │
│   │   → Builds Context Snapshot                          │ │
│   └──────────────────────────────────────────────────────┘ │
│            │                                                │
│            ▼                                                │
│   Experience Planner (uses Context + Style + Intent)        │
│            │                                                │
│            ▼                                                │
│   ┌──────────────────────────────────────────────────────┐ │
│   │         EXPERIENCE-USE PHASE                          │ │
│   │                                                       │ │
│   │   (Optional - if renderTarget includes chat)         │ │
│   │                                                       │ │
│   │   "Here's a recipe that matches your constraints"    │ │
│   │   "Let me explain why I chose this"                  │ │
│   │   "Would you like me to adjust anything?"            │ │
│   │                                                       │ │
│   └──────────────────────────────────────────────────────┘ │
│            │                                                │
│            ▼                                                │
│   UI Renders (the primary artifact)                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Context-Building Phase

### Purpose

Collect situational inputs needed for the current intent.

### When It Triggers

- Intent requires context that's not available
- User explicitly asks for help deciding
- Planner determines more info is needed

### How It Works

```
Intent: DecideNow
Required context: situation.location, constraints.time
Current context: (empty)

AI: "Are you eating at home or out?"
User: "At home"
→ context.situation.location = "home"

AI: "What do you have in the kitchen?"
User: "Chicken, rice, some vegetables"
→ context.domain.ingredients = [...]

AI: "How much time do you have?"
User: "About 30 minutes"
→ context.constraints.time = "30min"

Context complete → exit phase → continue to planner
```

### Behavior Rules

1. **Minimal questions** — 3-5 max, only what's required
2. **Skip known context** — Don't re-ask if already known
3. **Adaptive** — Infer from partial answers when possible
4. **Interruptible** — User can say "just pick something"

### Question Types

| Type | Example | Updates |
|------|---------|---------|
| Location | "Are you at home or out?" | `situation.location` |
| Constraints | "How much time do you have?" | `constraints.time` |
| Mood | "Feeling adventurous today?" | `mood.adventurousness` |
| Domain-specific | "What ingredients do you have?" | `domain.ingredients` |

---

## Experience-Use Phase

### Purpose

The experience itself happens (partly or fully) in chat.

### When It Happens

- `renderTarget: "chat"` — Full experience in chat
- `renderTarget: "hybrid"` — Some content in chat, some in UI

### Use Cases

1. **Explanations** — "Here's why I recommend this"
2. **Guidance** — "Try adding garlic for extra flavor"
3. **Co-decision** — "Should I include dessert?"
4. **Refinement** — "That's too spicy, make it milder"

### Behavior Rules

1. **Not always needed** — Many intents go straight to UI
2. **Supports UI** — Chat enhances, doesn't replace
3. **Linked to artifact** — Leads to saveable outcome

---

## Phase Transitions

```
┌────────────────────────────────────────────────────────────┐
│                    STATE MACHINE                            │
│                                                            │
│   ┌──────────┐                                             │
│   │  IDLE    │◄────────────────────────────────────────┐  │
│   └────┬─────┘                                          │  │
│        │ intent triggered                               │  │
│        ▼                                                │  │
│   ┌──────────────────────────┐                         │  │
│   │ Context needed?          │                         │  │
│   └────┬─────────────────────┘                         │  │
│        │                                                │  │
│       Yes                    No                         │  │
│        │                      │                         │  │
│        ▼                      │                         │  │
│   ┌──────────────────┐       │                         │  │
│   │ CONTEXT-BUILDING │       │                         │  │
│   └────┬─────────────┘       │                         │  │
│        │ context complete    │                         │  │
│        │                      │                         │  │
│        └──────────┬───────────┘                         │  │
│                   │                                      │  │
│                   ▼                                      │  │
│   ┌──────────────────────────┐                         │  │
│   │ PLANNING                 │                         │  │
│   │ (Experience Planner)     │                         │  │
│   └────┬─────────────────────┘                         │  │
│        │                                                │  │
│        ▼                                                │  │
│   ┌──────────────────────────┐                         │  │
│   │ renderTarget includes    │                         │  │
│   │ chat?                    │                         │  │
│   └────┬─────────────────────┘                         │  │
│        │                                                │  │
│       Yes                    No                         │  │
│        │                      │                         │  │
│        ▼                      │                         │  │
│   ┌──────────────────┐       │                         │  │
│   │ EXPERIENCE-USE   │       │                         │  │
│   └────┬─────────────┘       │                         │  │
│        │                      │                         │  │
│        └──────────┬───────────┘                         │  │
│                   │                                      │  │
│                   ▼                                      │  │
│   ┌──────────────────────────┐                         │  │
│   │ RENDERING                │                         │  │
│   │ (UI output)              │                         │  │
│   └────┬─────────────────────┘                         │  │
│        │ user action / new intent                       │  │
│        └────────────────────────────────────────────────┘  │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## Examples by Intent

### DecideNow (to-eat)

```
Phase: CONTEXT-BUILDING
AI: "Are you at home or eating out?"
User: "At home"
AI: "What do you have in the fridge?"
User: "Chicken and vegetables"
AI: "How much time do you have?"
User: "30 minutes"

Phase: PLANNING (Experience Planner runs)

Phase: EXPERIENCE-USE (renderTarget: hybrid)
AI: "Based on your ingredients and time, here's a quick stir-fry."
AI: "You can make it even faster if you use pre-cut vegetables."

Phase: RENDERING
UI: Shows recipe card with Hero, Timeline (steps), ActionDock
```

### BrowseLibrary (to-read)

```
Phase: IDLE → intent triggered

Phase: Context needed? NO (BrowseLibrary has no required context)

Phase: PLANNING (Experience Planner runs with Style only)

Phase: RENDERING (renderTarget: screen — no chat phase)
UI: Shows library with Hero, List<Card>

(Chat available but optional)
```

### ScanMenu (to-eat)

```
Phase: CONTEXT-BUILDING
AI: "I'll analyze this menu for you."
AI: "Are you dining alone or with others?"
User: "With my partner"
AI: "How adventurous are you feeling?"
User: "Medium - some new things, but keep it safe"

Phase: PLANNING

Phase: RENDERING (renderTarget: screen)
UI: Shows personalized menu with highlighted recommendations
```

---

## Phase Indicators (UI)

The chat UI can indicate current phase:

```
┌─────────────────────────────────────────────┐
│  🔍 Building your context...                 │  ← Context-building
│                                             │
│  AI: "Where are you eating?"                │
│                                             │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  ✨ Here's your experience                   │  ← Experience-use
│                                             │
│  AI: "I found the perfect recipe for you"  │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Related

- Capabilities: [capabilities.md](./capabilities.md)
- Context Domain: [../context/](../context/)
- Intent Domain: [../intent/](../intent/)
