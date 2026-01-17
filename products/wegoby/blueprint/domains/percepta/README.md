# Percepta Domain

Wegoby's adaptive UI engine—the "doing" side that brings Sensetree's insights to life.

## Overview

Percepta unifies:
- **Runtime Engine** — Fast DOM rendering
- **AI Operator** — Command API for AI control
- **Adaptive UI** — Personalization based on persona

| Aspect | Description |
|--------|-------------|
| **What** | Runtime engine + AI operator + adaptive UI |
| **Purpose** | Renders and adapts UI based on Sensetree persona data |
| **Components** | Renderer, state store, event bus, widgets, templates, theming |
| **AI Role** | Master operator via Command API (never writes code) |

## Structure

```
percepta/
├── README.md              # This file
├── architecture.md        # How Percepta works
├── adaptive-system.md     # Baseline, Context, Structure flow
├── command-api.md         # Command API specification
├── widgets/               # Widget library definitions
│   └── README.md
└── templates/             # Template library definitions
    └── README.md
```

## Key Insight

- **Percepta Engine** = Code (TypeScript, tests, builds)
- **Miniapps** = Configuration (JSON, declarative)
- **AI** = Operator (sends commands, never writes code)

## Adaptive System

Percepta personalizes experiences through three configuration layers:

| Layer | Role | Source |
|-------|------|--------|
| **Baseline** | Company defaults | Wegoby (evolves over time) |
| **Context** | User preferences | Sensetree persona + learned patterns |
| **Structure** | View configuration | Miniapp definition + Evolve Mode |

The Chat agent operates in two modes:
- **Use Mode**: Operates the app → Interactions → updates Context
- **Evolve Mode**: Modifies the app → Modifications → updates Structure

See: [adaptive-system.md](./adaptive-system.md) for full details.

## Related

- Implementation: `projects/percepta/`
- Client SDK: `packages/@wegoby/percepta/`
- Docs: `.cursor/rules/docs/percepta.mdc`
