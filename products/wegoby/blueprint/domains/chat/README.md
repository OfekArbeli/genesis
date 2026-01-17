# Chat Domain

> **HOW user communicates with AI** — The chat interface and Use/Evolve modes.

---

## Overview

The Chat domain defines how users interact with the AI assistant. It covers the chat UI, the two operation modes, and quick actions.

| Aspect | Description |
|--------|-------------|
| **Purpose** | User ↔ AI communication |
| **Interface** | Persistent bottom sheet (40vh) |
| **Modes** | Use (pink) and Evolve (purple) |
| **Context-aware** | Quick actions adapt to current screen |

---

## Structure

```
chat/
├── README.md              # This file
├── interface.md           # Chat UI specification
├── modes.md               # Use vs Evolve modes
└── quick-actions.md       # Per-screen quick actions
```

---

## The Two Modes

| Mode | Color | What AI Does |
|------|-------|--------------|
| **Use** | Pink | Operates app FOR user (within existing UI) |
| **Evolve** | Purple | Modifies app's UI/structure |

### Use Mode (Pink)
AI works within the current structure to help the user.

```
User: "Create a book for me about space"
AI: Creates a new book entity
```

### Evolve Mode (Purple)
AI changes the app's structure or features.

```
User: "Add a search bar at the top"
AI: Adds SearchBar widget to the screen
```

See [modes.md](./modes.md) for detailed specifications.

---

## Chat Interface

```
┌─────────────────────────────────────────────┐
│   [History]      [Chat]      [New/Context]  │  ← Bottom Nav
│                    ⬤                        │
└─────────────────────────────────────────────┘
                     │
                     │ tap
                     ▼
┌─────────────────────────────────────────────┐
│              Messages Area                   │
│  ┌────────────────────────────────┐         │
│  │ 👋 Hey! What can I help with?  │         │  ← AI
│  └────────────────────────────────┘         │
│                    ┌───────────────────────┐│
│                    │ Create a recipe       ││  ← User
│                    └───────────────────────┘│
│                                             │
│  [Quick Action] [Quick Action] [Action]     │  ← Context-aware
│                                             │
│  ┌─────────────────────────────────────────┐│
│  │ Ask me anything...            [Send]    ││  ← Input
│  └─────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
```

See [interface.md](./interface.md) for full UI specification.

---

## Quick Actions

Quick actions are context-aware suggestions that appear before the user types.

| Type | Color | Purpose |
|------|-------|---------|
| Use | Pink | Common operations for current screen |
| Evolve | Purple | Common customizations for current screen |

Example for to-read Library:
- "Create a book for me" (Use, pink)
- "Find books about philosophy" (Use, pink)
- "Add search bar at top" (Evolve, purple)
- "Switch to list view" (Evolve, purple)

See [quick-actions.md](./quick-actions.md) for per-screen actions.

---

## How Chat Uses Context

When user sends a message, AI receives:

1. **Context items** from the current screen
2. **User's message**
3. **Available commands** (from Engine)

```
┌─────────────────────────────────────────────────────────┐
│                     CHAT receives                       │
│                                                         │
│   Context: "User follows vegetarian diet"              │
│   Context: "User prefers quick meals under 30 min"     │
│   Message: "What should I cook tonight?"               │
│   Commands: [entity.create, view.modify, ...]          │
│                                                         │
│                         ↓                               │
│                                                         │
│   AI Response: "Here's a quick veggie stir-fry..."    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Chat History

- Conversations are persisted
- Accessible via History button (left of chat button when open)
- Each conversation has:
  - Title (auto-generated from first message)
  - Messages array
  - Timestamps

---

## Data Flow

```
┌──────────┐    ┌──────────┐    ┌──────────┐
│ CONTEXT  │───►│   CHAT   │───►│  ENGINE  │
│          │    │          │    │          │
│ prefs    │    │ AI       │    │ execute  │
│ per      │    │ decides  │    │ commands │
│ screen   │    │ action   │    │          │
└──────────┘    └──────────┘    └──────────┘
```

---

## Related

- Context Domain: [../context/](../context/)
- Engine Domain: [../engine/](../engine/)
- Interface Spec: [interface.md](./interface.md)
- Modes: [modes.md](./modes.md)
