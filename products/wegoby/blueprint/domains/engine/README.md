# Engine Domain

> **HOW experiences are rendered** — The runtime that renders Experience Plans and executes commands.

---

## Overview

The Engine is the "doing" layer of Wegoby. It:

1. **Resolves Data** — Fetches entities needed by the Experience Plan
2. **Renders Plans** — Converts Experience Plans into UI
3. **Handles Evolve** — Executes structural modification commands

```
┌─────────────────────────────────────────────────────────────┐
│                    ENGINE ARCHITECTURE                       │
│                                                             │
│   Experience Plan (from Planner)                            │
│            │                                                │
│            ├────────────────────┐                           │
│            │                    │                           │
│            ▼                    ▼                           │
│   ┌──────────────────┐  ┌──────────────────┐              │
│   │  DATA RESOLVER   │  │     RENDERER     │              │
│   │                  │  │                  │              │
│   │  • Fetch entities│  │  • Map blocks    │              │
│   │  • Normalize     │  │  • Apply policies│              │
│   │  • Cache         │  │  • Compose UI    │              │
│   └────────┬─────────┘  └────────┬─────────┘              │
│            │                     │                         │
│            └──────────┬──────────┘                         │
│                       │                                     │
│                       ▼                                     │
│                   UI OUTPUT                                 │
│                                                             │
│   ─────────────────────────────────────────────────────    │
│                                                             │
│   Evolve Commands (from Chat)                               │
│            │                                                │
│            ▼                                                │
│   ┌──────────────────────────────────────────────────────┐ │
│   │                   EVOLVE API                          │ │
│   │                                                       │ │
│   │  • Modify structure     • Add/remove widgets         │ │
│   │  • Change layouts       • Enable/disable features    │ │
│   │                                                       │ │
│   └──────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Two Paths

### Use Path (Declarative)

Experience Plan → Data Resolver → Renderer → UI

- Most interactions follow this path
- Plan declares what's needed
- Engine renders deterministically

### Evolve Path (Imperative)

Evolve Command → Evolve API → Structure Update → UI

- Structural modifications only
- Direct imperative commands
- Changes persist in screen configuration

---

## Structure

```
engine/
├── README.md              # This file
├── renderer.md            # Experience Plan → UI
├── data-resolver.md       # Data requirements → Entities
├── evolve-api.md          # Structural modification commands
├── miniapp-anatomy.md     # How miniapps are structured
├── widgets/               # Widget implementations
│   └── README.md
└── templates/             # Layout templates
    └── README.md
```

---

## Data Resolver

Fetches and normalizes data declared in the Experience Plan.

### Input

```typescript
// From Experience Plan
dataRequirements: [
  { key: "recipes", type: "Recipe", query: { filters: { vegetarian: true }, limit: 10 } },
  { key: "user", type: "User", query: { id: "current" } }
]
```

### Output

```typescript
// Normalized entities
{
  recipes: [
    { id: "r1", type: "Recipe", title: "Veggie Stir-fry", ... },
    { id: "r2", type: "Recipe", title: "Pasta Primavera", ... }
  ],
  user: { id: "u1", type: "User", name: "Alex", ... }
}
```

### Responsibilities

- Fetch from appropriate data sources
- Normalize to standard Entity format
- Handle caching and batching
- Apply authorization filters

### Entity Format

```typescript
interface Entity {
  id: string;
  type: string;
  [key: string]: any;      // Type-specific fields
  meta?: {
    freshness: number;     // 0-1, how recent
    confidence: number;    // 0-1, how confident
    source: string;        // Where it came from
  };
}
```

---

## Renderer

Converts Experience Plan + Data into rendered UI.

### Input

```typescript
{
  plan: ExperiencePlan,
  data: Record<string, Entity | Entity[]>,
  tokens: DesignTokens
}
```

### Process

1. **Resolve Blocks** — Map plan blocks to widget implementations
2. **Apply Policies** — Adjust rendering based on policy values
3. **Compose Layout** — Arrange blocks according to template
4. **Render Widgets** — Produce final UI output

### Rendering Rules

Renderer has **no smart logic**. It:
- Follows the plan exactly
- Applies policies deterministically
- Uses design tokens for styling
- Produces stable, predictable output

See [renderer.md](./renderer.md) for details.

---

## Evolve API

Imperative commands for structural modifications.

### Command Categories

| Category | Commands | Purpose |
|----------|----------|---------|
| **View** | `addWidget`, `removeWidget`, `setLayout`, `reorder` | Modify screen structure |
| **Feature** | `enable`, `disable`, `configure` | Toggle functionality |
| **Style** | `update`, `reset` | Modify visual settings |

### Example

```typescript
await engine.evolve({
  type: "view.addWidget",
  params: {
    screenId: "to-read-library",
    widget: { type: "SearchBar", config: {} },
    position: 1  // After Header
  }
});
```

### Validation

All Evolve commands are:
- Schema-validated
- Permission-checked
- Audit-logged
- Sandboxed (no arbitrary code execution)

See [evolve-api.md](./evolve-api.md) for full specification.

---

## Miniapp Configuration

Each miniapp defines its structure:

```typescript
interface MiniappConfig {
  id: string;                    // 'to-read', 'to-eat'
  name: string;                  // Display name
  icon: string;                  // Lucide icon name
  accentColor: string;           // Hex color

  screens: string[];             // Available screen IDs
  defaultScreen: string | 'user-selected';

  entities: string[];            // Data types (Book, Recipe, etc.)

  features: {
    personaOnboarding: boolean;  // Has onboarding flow
    aiGeneration: boolean;       // AI can create content
  };

  contentSources: {
    aiGenerated: boolean;        // AI creates content
    urlImport: boolean;          // Import from URL
    photoImport: boolean;        // Import from photo/OCR
    manual: boolean;             // Manual entry
  };

  dataSharing?: {
    [entityType: string]: 'personal' | 'household';
  };
}
```

See [miniapp-anatomy.md](./miniapp-anatomy.md) for details.

---

## Widgets

Widgets are the implementation of universal Blocks (from Experience domain).

| Block | Widget Implementation |
|-------|----------------------|
| Hero | `HeroWidget` |
| List | `ListWidget`, `GridWidget`, `CarouselWidget` |
| Card | `CardWidget`, `BookCard`, `RecipeCard` |
| Timeline | `TimelineWidget` |
| Compare | `CompareWidget` |
| Insight | `InsightWidget` |
| ActionDock | `ActionDockWidget` |
| Empty | `EmptyWidget`, `LoadingWidget` |

Domain-specific widgets (BookCard, RecipeCard) are specializations that know how to render specific entity types within the Card block.

See [widgets/README.md](./widgets/README.md) for full library.

---

## Templates

Layout patterns that organize widgets:

| Template | Description |
|----------|-------------|
| `full-screen` | Single content area |
| `split` | Main content + sidebar |
| `grid` | Multi-column card grid |
| `list` | Single-column list |
| `reader` | Full-width reading view |

See [templates/README.md](./templates/README.md) for details.

---

## Data Flow Summary

```
┌─────────────────────────────────────────────────────────────┐
│                    COMPLETE FLOW                             │
│                                                             │
│   User Action                                               │
│        │                                                    │
│        ▼                                                    │
│   Intent Resolver → Intent                                  │
│        │                                                    │
│        ▼                                                    │
│   Experience Planner                                        │
│   (Intent + Style + Context)                               │
│        │                                                    │
│        ▼                                                    │
│   Experience Plan                                           │
│        │                                                    │
│        ├─────────────────────────────────────┐             │
│        │                                     │             │
│        ▼                                     ▼             │
│   Data Resolver                          Renderer          │
│        │                                     │             │
│        └──────────────► Data ────────────────┘             │
│                                              │             │
│                                              ▼             │
│                                         UI Output          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Related

- Experience Domain: [../experience/](../experience/) — Defines plans and blocks
- Style Domain: [../style/](../style/) — Policies for rendering
- Chat Domain: [../chat/](../chat/) — Triggers intents
- Renderer: [renderer.md](./renderer.md)
- Evolve API: [evolve-api.md](./evolve-api.md)
