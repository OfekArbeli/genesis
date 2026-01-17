# Domains

Core system specifications for Wegoby.

## Overview

Domains define the architecture of Wegoby's adaptive system. Each domain has a specific responsibility in the data flow.

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ PERSONA  │───►│ CONTEXT  │───►│   CHAT   │───►│  ENGINE  │───► UI
│          │    │          │    │          │    │          │
│   WHO    │    │   WHAT   │    │   HOW    │    │   HOW    │
│  user is │    │  prefs   │    │  talk    │    │  render  │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
```

## Structure

```
domains/
├── README.md              # This file
│
├── persona/               # WHO the user is
│   ├── README.md
│   ├── schema.json        # Deep 5-level model
│   ├── baseline.json      # Default assumptions
│   ├── onboarding.md      # Miniapp questions
│   └── research/
│
├── context/               # WHAT the user prefers
│   ├── README.md
│   ├── schema.json        # ContextItem[] definition
│   ├── layers.md          # The 5 UX layers
│   └── panel.md           # Context Panel UI
│
├── chat/                  # HOW user talks to AI
│   ├── README.md
│   ├── interface.md       # Chat UI spec
│   ├── modes.md           # Use vs Evolve
│   └── quick-actions.md   # Per-screen actions
│
└── engine/                # HOW UI is rendered
    ├── README.md
    ├── miniapp-anatomy.md # Miniapp structure
    ├── command-api.md     # AI commands
    ├── widgets/
    └── templates/
```

## Domain Responsibilities

### Persona
**WHO the user is** — Deep psychological model and baseline assumptions.

- Stores 5-level persona model
- Defines baseline assumptions per screen
- Maps onboarding questions to persona
- Generates Context items from persona data

### Context
**WHAT the user prefers** — Natural language preferences for AI.

- 5 layers: Presentation, Cognition, Autonomy, Continuity, Intent
- Per-screen context items
- Sources: baseline, onboarding, learned, user-added
- Visible to user in Context Panel

### Chat
**HOW user communicates with AI** — Chat interface and modes.

- Use Mode (pink): AI operates app for user
- Evolve Mode (purple): AI modifies app structure
- Quick actions per screen
- Chat history

### Engine
**HOW UI is rendered** — Runtime and command execution.

- Miniapp configuration
- Screen structure (widgets + layout)
- Command API for AI
- Widget and template libraries

## Data Flow

```
1. User completes onboarding
   └─► Persona stores answers

2. Persona generates Context items
   └─► Context merges baseline + onboarding + user-added

3. User opens chat
   └─► Chat receives Context for current screen

4. User sends message
   └─► Chat AI interprets with Context
   └─► AI sends command to Engine

5. Engine executes command
   └─► UI updates
```

## Key Principle

**Context is natural language, not config.**

Instead of:
```json
{ "presentation.typography.fontSize": "large" }
```

We use:
```json
{ "layer": "presentation", "text": "User prefers large text" }
```

This allows:
- AI to read preferences naturally
- Users to add freeform preferences
- Flexibility without schema changes

## Specifications vs Implementations

- **Specifications** (in this folder): Architecture docs, API contracts, schemas
- **Implementations** (in projects/): Actual code, tests, builds

This separation allows:
- Designing before coding
- Clear contracts between systems
- Documentation that lives with specs

## Related

- Miniapp specs: `../specs/miniapps/`
- Branding: `../branding/`
- Feta framework: `packages/feta/`
