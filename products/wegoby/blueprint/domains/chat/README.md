# Chat Domain

> **HOW user communicates with AI** — Phases, capabilities, and the chat interface.

---

## Overview

Chat is a **rendering surface** and a **context builder** — not the primary artifact.

The Chat domain defines:
- **Phases**: When chat is used (context-building vs experience-use)
- **Capabilities**: What AI can do (use vs evolve)
- **Interface**: The chat UI specification

```
┌─────────────────────────────────────────────────────────────┐
│                    CHAT MODEL                                │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │                    PHASES                            │  │
│   │         (WHEN chat is used)                         │  │
│   │                                                      │  │
│   │   ┌──────────────────┐    ┌──────────────────┐     │  │
│   │   │ Context-building │    │ Experience-use   │     │  │
│   │   │ (collect inputs) │───►│ (guide/render)   │     │  │
│   │   └──────────────────┘    └──────────────────┘     │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │                  CAPABILITIES                        │  │
│   │         (WHAT AI can do)                            │  │
│   │                                                      │  │
│   │   ┌─────────────┐          ┌─────────────┐          │  │
│   │   │    Use      │          │   Evolve    │          │  │
│   │   │  (operate)  │          │  (modify)   │          │  │
│   │   │   (pink)    │          │  (purple)   │          │  │
│   │   └─────────────┘          └─────────────┘          │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Principles

### Chat Is Not The Artifact

- Chat collects context, guides decisions, provides explanations
- **Saved outcomes are Experience Artifacts**, not chat transcripts
- UI is the final answer; chat is the conversation that leads there

### Chat Often Leads Into UI

```
User: "What should I eat?"
Chat: Asks 3 context questions
Chat: Builds context snapshot
Engine: Produces Experience Plan
Renderer: Shows recipe in UI  ← This is the outcome
```

### Chat Can Be Optional

For some intents (BrowseLibrary, DeepDive), chat isn't needed.
The experience works with just Style + Baseline.

---

## Structure

```
chat/
├── README.md              # This file
├── phases.md              # Context-building vs Experience-use
├── capabilities.md        # Use vs Evolve modes
├── interface.md           # Chat UI specification
└── quick-actions.md       # Per-screen quick actions
```

---

## Phases × Capabilities Matrix

| | Use (Operate) | Evolve (Modify) |
|---|---|---|
| **Context-building** | "What ingredients do you have?" | "What would you like to customize?" |
| **Experience-use** | "Here's a recipe based on your context" | "I've added the search bar" |

Both phases can use both capabilities. They're orthogonal.

---

## Chat Interface

```
┌─────────────────────────────────────────────┐
│   [History]      [Chat]      [Context]       │  ← Bottom Nav
│                    ⬤                         │
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
│                    │ What should I eat?    ││  ← User
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

Quick actions are pre-categorized by phase and capability:

| Type | Color | Purpose |
|------|-------|---------|
| Use | Pink | Common operations for current screen |
| Evolve | Purple | Common customizations for current screen |

Example for to-eat:
- "What should I eat?" (Use, pink) → triggers context-building
- "Create a recipe" (Use, pink) → may trigger context-building
- "Scan a menu" (Use, pink) → triggers context-building
- "Add calorie tracking" (Evolve, purple)

See [quick-actions.md](./quick-actions.md) for per-screen actions.

---

## Data Flow

```
┌──────────────────────────────────────────────────────────┐
│                     CHAT FLOW                             │
│                                                          │
│   User Message                                           │
│        │                                                 │
│        ▼                                                 │
│   Intent Resolver → Active Intent                        │
│        │                                                 │
│        ▼                                                 │
│   Context Complete? ──No──► Context-building phase       │
│        │                            │                    │
│       Yes                           │                    │
│        │◄───────────────────────────┘                    │
│        ▼                                                 │
│   Experience Planner → Experience Plan                   │
│        │                                                 │
│        ▼                                                 │
│   Render Target = chat? ──Yes──► Chat response           │
│        │                                                 │
│       No (screen/hybrid)                                 │
│        │                                                 │
│        ▼                                                 │
│   UI Rendering                                           │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## Related

- Phases: [phases.md](./phases.md)
- Capabilities: [capabilities.md](./capabilities.md)
- Style Domain: [../style/](../style/) — Stable preferences
- Context Domain: [../context/](../context/) — Ephemeral session data
- Intent Domain: [../intent/](../intent/) — What user wants to do
- Experience Domain: [../experience/](../experience/) — The plan
