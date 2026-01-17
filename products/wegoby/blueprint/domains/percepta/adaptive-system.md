# Adaptive System

How Wegoby personalizes experiences through Baseline, Context, and Structure.

## Overview

The Adaptive System is the core mechanism that makes Wegoby experiences feel personal. It consists of three configuration layers that combine to render the UI:

| Layer | Role | Source |
|-------|------|--------|
| **Baseline** | Company defaults | Wegoby (evolves over time) |
| **Context** | User preferences | Sensetree persona + learned patterns |
| **Structure** | View configuration | Miniapp definition + Evolve Mode modifications |

## Core Concepts

### Baseline

Company defaults for Context—what Wegoby thinks is the best UX for most users.

- **Static starting point** that seeds each user's Context
- **Evolves over time** via Baseline Evolution
- Defined in: `domains/schemas/baseline-schema.json`

### Context

User's personalized state across 5 UX dimensions:

| Dimension | Focus | Examples |
|-----------|-------|----------|
| **Presentation** | Surface—how info is displayed | Layout density, theme, typography |
| **Cognition** | Density—how content is conveyed | Detail level, tone, cognitive load |
| **Autonomy** | Agency—who leads the experience | User-driven vs system-driven, confirmations |
| **Continuity** | Temporal—how time/history are handled | Memory, session persistence, anticipation |
| **Intent** | Content matching—what's relevant | Goals, interests, constraints |

Context is derived from:
1. **Baseline** (starting point)
2. **Sensetree Persona** (deep psychological model)
3. **Learned patterns** (from user interactions)

Defined in: `domains/schemas/context-schema.json`

### Structure

View configuration—what UI components exist and how they're arranged.

- **App-specific**: Each miniapp defines its own Structure
- **Modifiable via Evolve Mode**: AI can add widgets, change layouts
- **Not personalized**: Same Structure for all users (until evolved)

## Data Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    CONFIGURATION LAYER                        │
│                                                              │
│  ┌─────────────┐                       ┌─────────────┐       │
│  │  Baseline   │──────────────────────►│   Context   │       │
│  │  (defaults) │                       │ (personal)  │       │
│  └─────────────┘                       └──────┬──────┘       │
│         ▲                                     │              │
│         │                                     │              │
│  Baseline Evolution                           │              │
│         │                                     │              │
│  ┌─────────────┐                              │              │
│  │  Structure  │──────────────────────────────┼───► UI      │
│  │(view config)│                              │              │
│  └──────┬──────┘                              │              │
│         │                                     │              │
└─────────┼─────────────────────────────────────┼──────────────┘
          │                                     │
          │         ┌───────────────────────────┘
          │         │
          │         ▼
          │  ┌─────────────────────────────────────────────┐
          │  │                    UX                        │
          │  │  ┌─────────────────────────────────────┐    │
          │  │  │                UI                    │    │
          │  │  │  ┌───────────┐   ┌───────────┐     │    │
          │  │  │  │   Chat    │   │   Agent   │     │    │
          │  │  │  └───────────┘   └───────────┘     │    │
          │  │  └─────────────────────────────────────┘    │
          │  └─────────────────────────────────────────────┘
          │                         │
          │     ┌───────────────────┴───────────────────┐
          │     │                                       │
          │  use mode                            evolve mode
          │     │                                       │
          │     ▼                                       ▼
          │  ┌─────────────┐                   ┌─────────────┐
          │  │Interactions │                   │Modifications│
          │  └──────┬──────┘                   └──────┬──────┘
          │         │                                 │
          │         └──────────► Context ◄───────────┘
          │                         │
          └─────────────────────────┘
```

## Chat Modes

The AI agent operates in two distinct modes:

### Use Mode

AI operates the app **for** the user—working within the existing Structure.

| User Says | AI Does | Output |
|-----------|---------|--------|
| "Add 'Atomic Habits' to my list" | `entity.create(...)` | Interaction |
| "What's my reading streak?" | `query.get("streak")` | Interaction |
| "Mark chapter 5 as done" | `entity.update(...)` | Interaction |

**Interactions** can update Context by learning user preferences:
- User always chooses list view → Context learns `presentation.layout.columns: "single"`
- User dismisses suggestions → Context learns `autonomy.automation.suggestions: false`

### Evolve Mode

AI modifies the app's **configuration**—changing the Structure.

| User Says | AI Does | Output |
|-----------|---------|--------|
| "Add a search bar" | `view.addWidget(...)` | Modification |
| "Turn this into checkboxes" | `view.modify(...)` | Modification |
| "Create a weekly view" | `view.create(...)` | Modification |

**Modifications** change Structure directly:
- Adding/removing widgets
- Changing view templates
- Creating new views

## Baseline Evolution

The process by which aggregated user patterns update Baseline defaults.

### How It Works

1. **Observe**: Track when users deviate from Baseline values
2. **Aggregate**: Collect patterns across all users
3. **Threshold**: When >50% of users deviate from a default
4. **Evolve**: Update Baseline to reflect the better default

### Example Flow

```
1. Baseline: cognition.detail.level = "balanced"

2. User A context: cognition.detail.level = "minimal"
   User B context: cognition.detail.level = "minimal"
   User C context: cognition.detail.level = "balanced"
   ...
   60% of users prefer "minimal"

3. Analytics detects: deviationRate = 0.60 > threshold (0.50)

4. Baseline Evolution triggers:
   - Record in evolution.pendingChanges
   - After review: cognition.detail.level = "minimal"
   - Log in evolution.history

5. New users now start with better default
```

### Why This Matters

- **Smarter defaults**: Baseline becomes a learned prior, not just an assumption
- **Collective intelligence**: User behavior improves the product for everyone
- **Reduced personalization time**: New users start closer to optimal settings

## Relationship to Sensetree

Sensetree provides the **deep psychological model** (5 levels):
1. Sensorimotor & Virtual Homeostasis
2. Affective Construction & Cultural Priors
3. Conceptual World-Model & Social Affordances
4. Attentional Schema & Metacognitive Strategy
5. Identity & Plasticity

Context provides the **practical UX preferences** (5 dimensions):
1. Presentation (Surface)
2. Cognition (Density)
3. Autonomy (Agency)
4. Continuity (Temporal)
5. Intent (Content Matching)

**Flow**: Sensetree Persona → Context derivation → UI rendering

| Sensetree Level | Informs Context Dimension |
|-----------------|---------------------------|
| Level 1 (Resource levels) | Cognition (load), Autonomy (automation) |
| Level 2 (Cultural priors) | Presentation (visual), Cognition (tone) |
| Level 3 (World model) | Intent (goals, interests) |
| Level 4 (Attention) | Cognition (detail), Continuity (memory) |
| Wrapper (Plasticity) | All dimensions (learning rates) |

## Key Insight

```
Baseline + Sensetree Persona = Context
Context + Structure = UI
Interactions → Context (personal learning)
Modifications → Structure (view changes)
Aggregated Context patterns → Baseline Evolution
```

The system creates a **feedback loop** where:
- Individual experiences improve over time (Context)
- Collective patterns improve defaults for everyone (Baseline Evolution)
- Users can reshape their tools (Structure via Evolve Mode)

## Related Files

- Context schema: `domains/schemas/context-schema.json`
- Baseline schema: `domains/schemas/baseline-schema.json`
- Persona schema: `domains/sensetree/persona-schema.json`
- Command API: `domains/percepta/command-api.md`
