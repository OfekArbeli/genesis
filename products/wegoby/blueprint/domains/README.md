# Domains

Core system specifications for the Wegoby Experience Engine.

## Overview

The Experience Engine generates adaptive experiences through a pipeline of specialized components. Each domain has a specific responsibility.

```
┌─────────────────────────────────────────────────────────────────────┐
│                    EXPERIENCE ENGINE ARCHITECTURE                    │
│                                                                     │
│   User Action                                                       │
│        │                                                            │
│        ▼                                                            │
│   ┌──────────────┐                                                  │
│   │   INTENT     │  "What does the user want to do?"               │
│   │   RESOLVER   │  Route / Action / Message → Intent              │
│   └──────┬───────┘                                                  │
│          │                                                          │
│          ▼                                                          │
│   ┌──────────────────────────────────────────────────────────────┐ │
│   │                 EXPERIENCE PLANNER                            │ │
│   │                                                               │ │
│   │   ┌─────────┐   ┌─────────┐   ┌─────────┐                   │ │
│   │   │  STYLE  │ + │ CONTEXT │ + │ INTENT  │ = Experience Plan  │ │
│   │   │ (stable)│   │(session)│   │ (goal)  │                   │ │
│   │   └─────────┘   └─────────┘   └─────────┘                   │ │
│   │                                                               │ │
│   └──────────────────────────────────────────────────────────────┘ │
│          │                                                          │
│          ▼                                                          │
│   ┌──────────────────────────────────────────────────────────────┐ │
│   │                      ENGINE                                   │ │
│   │                                                               │ │
│   │   ┌────────────────┐         ┌────────────────┐             │ │
│   │   │  Data Resolver │────────►│    Renderer    │──► UI       │ │
│   │   └────────────────┘         └────────────────┘             │ │
│   │                                                               │ │
│   └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Structure

```
domains/
├── README.md              # This file
│
├── style/                 # STABLE preferences
│   ├── README.md
│   ├── schema.json        # User Style per mini-app
│   ├── policies.json      # Policy definitions
│   ├── policy-mapper.md   # Natural language → policies
│   └── baselines/
│       ├── global.json
│       └── miniapps/
│           ├── to-read.json
│           └── to-eat.json
│
├── context/               # EPHEMERAL session data
│   ├── README.md
│   ├── schema.json        # Context Snapshot
│   ├── sources.md         # How context is collected
│   └── layers.md          # 5 UX categories
│
├── intent/                # WHAT user wants to do
│   ├── README.md
│   ├── taxonomy.json      # Intent definitions
│   └── resolver.md        # Resolution rules
│
├── experience/            # THE PLAN
│   ├── README.md
│   ├── plan-schema.json   # Experience Plan format
│   ├── artifact-schema.json # Saved outcomes
│   ├── blocks.md          # 8 universal blocks
│   └── block-mapper.md    # Entity × Intent → Blocks
│
├── chat/                  # HOW user talks to AI
│   ├── README.md
│   ├── phases.md          # Context-building / Experience-use
│   ├── capabilities.md    # Use / Evolve
│   ├── interface.md       # Chat UI spec
│   └── quick-actions.md   # Per-screen actions
│
└── engine/                # HOW UI is rendered
    ├── README.md
    ├── renderer.md        # Plan → UI
    ├── data-resolver.md   # Requirements → Entities
    ├── evolve-api.md      # Structural modifications
    ├── miniapp-anatomy.md # Miniapp structure
    ├── widgets/
    └── templates/
```

## Domain Responsibilities

### Style
**STABLE preferences** — How experiences are presented, consistent over time.

- Policy knobs (density, pace, tone, autonomy, etc.)
- Baseline hierarchy: Global → Mini-app → User
- Natural language → enumerated policies mapping
- Persists across sessions

### Context
**EPHEMERAL session data** — What's relevant right now, this moment.

- Situational inputs (location, time, constraints, mood)
- Built via chat or sensors
- Policy overrides for current session
- Discarded at session end

### Intent
**WHAT user wants to do** — The goal of the current interaction.

- Intent taxonomy per mini-app
- Resolution from route/action/message
- Required context per intent
- Only one intent active at a time

### Experience
**THE PLAN** — The central artifact that defines what to render.

- Experience Plan (goal, policies, stages, blocks, data requirements)
- Experience Artifacts (saved outcomes, not transcripts)
- 8 universal blocks (Hero, List, Card, Timeline, Compare, Insight, ActionDock, Empty)
- Block mapper (Entity × Intent → Blocks)

### Chat
**HOW user communicates with AI** — Phases and capabilities.

- Phases: Context-building / Experience-use
- Capabilities: Use (operate) / Evolve (modify)
- Chat as surface, not artifact
- Quick actions per screen

### Engine
**HOW UI is rendered** — Runtime and rendering.

- Data Resolver: Requirements → Entities
- Renderer: Plan + Data → UI (no smart logic)
- Evolve API: Structural modification commands
- Widgets and templates

## Core Data Flow

```
1. User triggers intent (route, action, message)
   └─► Intent Resolver determines active intent

2. Context needed?
   └─► Yes: Chat enters context-building phase
   └─► No: Continue to planner

3. Experience Planner runs
   └─► Intent + Style + Context → Experience Plan

4. Data Resolver fetches
   └─► Plan's data requirements → Entities

5. Renderer produces UI
   └─► Plan + Data + Tokens → Rendered UI

6. User can save result
   └─► Experience Plan + Data → Experience Artifact
```

## Key Principles

### 1. Style vs Context
- **Style** = stable, per-miniapp, adjustable within theme
- **Context** = ephemeral, per-session, situational

### 2. Plans Are Declarative
Experience Plans declare what to show. The Renderer follows them deterministically with no smart logic.

### 3. Artifacts, Not Transcripts
Saved outcomes are Experience Artifacts (stable UI representations), not chat conversations.

### 4. Baseline Works Without Context
The system works with Style + Baseline alone. Context enhances but isn't required.

### 5. Universal Blocks, Domain Widgets
8 universal blocks (Hero, List, Card, etc.) rendered by domain-specific widgets (BookCard, RecipeCard).

## Mini-app Coexistence

| Aspect | to-read | to-eat | Shared |
|--------|---------|--------|--------|
| Character | calm, narrative | practical, decisive | Same policy knobs |
| Intents | BrowseLibrary, ContinueReading | DecideNow, ScanMenu | Same resolver pattern |
| Blocks | Hero, List, Card, Insight | Hero, List, Card, Compare | Same block catalog |
| Context-building | Optional (library-first) | Often needed (decisions) | Same chat phases |
| Artifacts | Saved books | Saved recipes, menus | Same artifact schema |

## Related

- Miniapp specs: `../specs/miniapps/`
- Branding: `../branding/`
- Feta framework: `packages/feta/`
