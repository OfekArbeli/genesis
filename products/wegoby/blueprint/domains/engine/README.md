# Engine Domain

> **HOW UI is rendered** — The runtime that renders miniapps and executes commands.

---

## Overview

The Engine domain defines how miniapps are structured and rendered. It's the "doing" layer that brings everything to life.

| Aspect | Description |
|--------|-------------|
| **Purpose** | Render UI, execute commands |
| **Input** | Miniapp config + Context + Chat commands |
| **Output** | Rendered UI |
| **Key Concept** | Structure (widgets + layout) |

---

## Structure

```
engine/
├── README.md              # This file
├── miniapp-anatomy.md     # How miniapps are structured
├── command-api.md         # Commands AI can execute
├── widgets/
│   └── README.md          # Widget library
└── templates/
    └── README.md          # Layout templates
```

---

## Core Concepts

### Miniapp
A self-contained app within Wegoby (to-read, to-eat, etc.).

### Screen
A view within a miniapp (library, reading, recipes, etc.).

### Structure
The configuration of widgets and layout for a screen.

### Widget
A UI component (Header, BookGrid, SearchBar, etc.).

### Template
A layout pattern (grid, list, reader, etc.).

---

## Data Flow

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐        │
│   │ PERSONA  │───►│ CONTEXT  │───►│   CHAT   │        │
│   └──────────┘    └──────────┘    └──────────┘        │
│                                          │             │
│                                          │ commands    │
│                                          ▼             │
│   ┌─────────────────────────────────────────────────┐ │
│   │                    ENGINE                        │ │
│   │                                                  │ │
│   │   Miniapp ──► Screen ──► Structure ──► Widgets  │ │
│   │                                                  │ │
│   └─────────────────────────────────────────────────┘ │
│                          │                            │
│                          ▼                            │
│                    ┌──────────┐                       │
│                    │    UI    │                       │
│                    └──────────┘                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Miniapp Configuration

Each miniapp defines:

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

## Screen Structure

Each screen has a Structure that defines its UI:

```typescript
interface ScreenStructure {
  id: string;
  title: string;
  contextKey: string;            // Links to Context domain

  layout: string;                // Template: 'grid', 'list', 'reader'
  widgets: WidgetConfig[];       // Ordered list of widgets

  modifiable: string[];          // What Evolve Mode can change
}

interface WidgetConfig {
  type: string;                  // Widget type: 'Header', 'BookGrid'
  config: Record<string, any>;   // Widget-specific config
}
```

---

## Command API

Commands the Chat AI can execute:

| Category | Commands |
|----------|----------|
| **Entity** | `create`, `update`, `delete`, `get`, `list` |
| **Query** | `search`, `filter`, `aggregate` |
| **View** | `addWidget`, `removeWidget`, `setLayout` |
| **Feature** | `enable`, `disable`, `configure` |
| **Style** | `update`, `reset` |
| **AI** | `generate`, `summarize`, `translate` |

See [command-api.md](./command-api.md) for full specification.

---

## Widgets

Pre-built UI components:

| Widget | Description |
|--------|-------------|
| Header | Title, actions, navigation |
| SearchBar | Search input with filters |
| BookGrid | Grid of book cards |
| BookCard | Single book with progress |
| RecipeGrid | Grid of recipe cards |
| RecipeCard | Single recipe with time/difficulty |
| GroceryList | Checklist with categories |
| ReadingContent | Text display with settings |
| BottomNav | Navigation bar with chat button |

See [widgets/README.md](./widgets/README.md) for full library.

---

## Templates

Layout patterns:

| Template | Description |
|----------|-------------|
| `grid` | Multi-column card grid |
| `list` | Single-column list |
| `reader` | Full-width content view |
| `form` | Input form layout |
| `onboarding` | Step-by-step wizard |

See [templates/README.md](./templates/README.md) for details.

---

## Evolve Mode Integration

When Chat sends Evolve commands:

```
User: "Add search bar at top"
        │
        ▼
Chat: { command: 'view.addWidget', params: { type: 'SearchBar', position: 0 } }
        │
        ▼
Engine: Updates screen Structure
        │
        ▼
UI: Re-renders with SearchBar
```

---

## Related

- Chat Domain: [../chat/](../chat/)
- Context Domain: [../context/](../context/)
- Command API: [command-api.md](./command-api.md)
- Miniapp Anatomy: [miniapp-anatomy.md](./miniapp-anatomy.md)
