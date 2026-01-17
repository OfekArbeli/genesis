# Percepta Architecture

How the adaptive UI engine works.

## Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         PERCEPTA                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Renderer   │  │ State Store  │  │  Event Bus   │          │
│  │  (Fast DOM)  │  │              │  │              │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Widgets    │  │  Templates   │  │   Theming    │          │
│  │   Library    │  │   Library    │  │   System     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│  ┌─────────────────────────────────────────────────┐           │
│  │              COMMAND API                         │           │
│  │  (The only way AI interacts with Percepta)      │           │
│  └─────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────┘
                              ↑
              ┌───────────────┼───────────────┐
              ↓               ↓               ↓
        ┌──────────┐   ┌──────────┐   ┌──────────┐
        │ to-read  │   │ to-note  │   │ to-eat   │
        │ (config) │   │ (config) │   │ (config) │
        └──────────┘   └──────────┘   └──────────┘
```

## Components

### 1. Renderer

Fast DOM rendering without framework hydration overhead.

**Responsibilities**:
- Render components from configuration
- Handle updates efficiently
- Manage virtual DOM diffing

**Key Properties**:
- No React hydration delay
- Minimal bundle size
- Streaming support

### 2. State Store

Centralized state management for all miniapps.

**Responsibilities**:
- Store entity data
- Handle state updates
- Provide reactive subscriptions

**Interface**:
```typescript
interface StateStore {
  get<T>(key: string): T;
  set<T>(key: string, value: T): void;
  subscribe(key: string, callback: (value: unknown) => void): () => void;
}
```

### 3. Event Bus

Cross-component communication system.

**Responsibilities**:
- Publish/subscribe events
- Handle inter-component communication
- Log events for analytics

**Interface**:
```typescript
interface EventBus {
  emit(event: string, payload: unknown): void;
  on(event: string, handler: (payload: unknown) => void): () => void;
}
```

### 4. Widget Library

Pre-built UI components.

**Categories**:
- **Input**: Button, Input, Select, Checkbox
- **Display**: Card, List, Table, Badge
- **Layout**: Container, Grid, Stack, Divider
- **Feedback**: Toast, Modal, Progress, Spinner

### 5. Template Library

Higher-level UI patterns.

**Templates**:
- **List**: Filterable, sortable item lists
- **Detail**: Entity detail views
- **Dashboard**: Stats and widgets grid
- **Form**: Multi-step forms
- **Calendar**: Date-based views

### 6. Theming System

Design token management and persona-based theming.

**Responsibilities**:
- Load design tokens from branding/
- Apply persona preferences
- Support dark/light modes
- Handle RTL layouts

**Token Categories**:
- Colors
- Typography
- Spacing
- Borders
- Shadows

### 7. Command API

The **only** interface for AI interaction.

See: [command-api.md](./command-api.md)

## Data Flow

### Render Flow

```
Miniapp Config
      ↓
Template Resolution
      ↓
Widget Composition
      ↓
Theme Application
      ↓
DOM Render
```

### Update Flow

```
Command API Call
      ↓
State Store Update
      ↓
Reactive Notification
      ↓
Widget Re-render
      ↓
DOM Patch
```

### Adaptation Flow

```
Sensetree Preferences
      ↓
Theming System
      ↓
Design Tokens Updated
      ↓
Components Re-styled
```

### Adaptive System Flow

The full personalization flow integrating Baseline, Context, and Structure:

```
┌──────────────────────────────────────────────────────────────┐
│                    CONFIGURATION LAYER                        │
│                                                              │
│  ┌─────────────┐                       ┌─────────────┐       │
│  │  Baseline   │──────────────────────►│   Context   │       │
│  │  (defaults) │                       │ (personal)  │       │
│  └─────────────┘                       └──────┬──────┘       │
│         ▲                                     │              │
│         │ Baseline Evolution                  │              │
│         │                                     │              │
│  ┌─────────────┐                              │              │
│  │  Structure  │──────────────────────────────┼───► UI      │
│  │(view config)│                              │              │
│  └──────┬──────┘                              │              │
└─────────┼─────────────────────────────────────┼──────────────┘
          │                                     │
          │  modifications          interactions│
          │         ▲                      │    │
          │         │                      ▼    │
          │  ┌──────┴───────────────────────────┴──┐
          │  │           Chat (Agent)              │
          │  │  ┌───────────┐  ┌───────────────┐  │
          │  │  │ Use Mode  │  │  Evolve Mode  │  │
          │  │  └───────────┘  └───────────────┘  │
          │  └─────────────────────────────────────┘
          │                    │
          └────────────────────┘
```

| Layer | Role | Feedback Loop |
|-------|------|---------------|
| **Baseline** | Company defaults | Updated via Baseline Evolution (>50% deviation) |
| **Context** | User preferences | Updated via Interactions (Use Mode) |
| **Structure** | View configuration | Updated via Modifications (Evolve Mode) |

See: [adaptive-system.md](./adaptive-system.md) for full details.

## Miniapp Integration

Each miniapp is a **configuration**, not code:

```json
{
  "domain": "to-read",
  "entities": { ... },
  "views": [ ... ],
  "rules": [ ... ]
}
```

Percepta:
1. Loads miniapp config
2. Resolves templates
3. Renders UI
4. Handles interactions via Command API

## AI Interaction Modes

The Chat agent operates in two distinct modes:

### Use Mode

AI operates the app **for** the user, working within existing Structure.

**Actions**:
- Create entities
- Query data
- Navigate views

**Output**: Interactions → can update Context (personal learning)

| User Says | AI Command |
|-----------|------------|
| "Add 'Atomic Habits' to my list" | `entity.create({ type: "Book", ... })` |
| "What's my reading streak?" | `query.get("streak")` |

### Evolve Mode

AI modifies the app's **configuration**, changing Structure.

**Actions**:
- Change view configurations
- Add new rules
- Create custom views

**Output**: Modifications → updates Structure directly

| User Says | AI Command |
|-----------|------------|
| "Add a search bar" | `view.addWidget({ widget: "search-bar", ... })` |
| "Turn this into checkboxes" | `view.modify({ template: "checklist" })` |

See: [adaptive-system.md](./adaptive-system.md) for the full system flow.

## Performance Targets

| Metric | Target |
|--------|--------|
| First Paint | <100ms |
| Time to Interactive | <200ms |
| Bundle Size | <50KB |
| Memory Usage | <20MB |

## Scaling

- CDN distribution
- Service worker caching
- Lazy loading of templates
- Incremental hydration
