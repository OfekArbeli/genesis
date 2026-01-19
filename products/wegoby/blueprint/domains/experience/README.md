# Experience Domain

> **THE PLAN** — The central artifact that defines what to render and how.

---

## Overview

The Experience Domain defines the **Experience Plan** — the declarative specification produced by the Experience Planner and consumed by the Renderer.

```
┌─────────────────────────────────────────────────────────────┐
│                    EXPERIENCE FLOW                           │
│                                                             │
│   Intent + Style + Context                                  │
│            │                                                │
│            ▼                                                │
│   ┌──────────────────────────────────────────────────────┐ │
│   │           EXPERIENCE PLANNER                          │ │
│   │                                                       │ │
│   │   Decides:                                            │ │
│   │   - What data is needed                              │ │
│   │   - What blocks to show                              │ │
│   │   - In what order                                    │ │
│   │   - With what policies                               │ │
│   │                                                       │ │
│   └──────────────────────────────────────────────────────┘ │
│            │                                                │
│            ▼                                                │
│   ┌──────────────────────────────────────────────────────┐ │
│   │           EXPERIENCE PLAN                             │ │
│   │                                                       │ │
│   │   The central artifact (JSON/AST)                    │ │
│   │   Human-readable, diffable, stable                   │ │
│   │                                                       │ │
│   └──────────────────────────────────────────────────────┘ │
│            │                                                │
│            ├─────────────────┐                              │
│            ▼                 ▼                              │
│      Data Resolver      Renderer                           │
│            │                 │                              │
│            └────────►  UI Output                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Core Concepts

### Experience Plan

A declarative specification of what the user should experience:

- **Goal**: What this experience achieves
- **Intent**: Which intent triggered this
- **Policies**: How to present (from resolved Style + Context)
- **Stages**: Multi-step experience structure
- **Blocks**: UI components per stage
- **Data Requirements**: What entities to fetch
- **Actions**: Available user actions
- **Render Target**: screen / chat / hybrid

### Experience Artifact

A saved outcome from an Experience Plan:

- Stable UI representation
- Stored in user's library
- Not a chat transcript
- Reloadable without context

### Blocks

Universal UI building blocks:

- Pre-defined, reusable
- Policy-aware rendering
- Entity-agnostic (just data slots)
- Composable

---

## Key Principles

### 1. Planner Doesn't Render

The Experience Planner produces a Plan. It never:
- Calls the database directly
- Produces HTML/React
- Makes UI decisions

### 2. Planner Doesn't Fetch

Data requirements are declared in the Plan.
The Data Resolver fetches them.
Separation enables caching, batching, authorization.

### 3. Plans Are Diffable

```diff
  {
    "intent": "BrowseRecipes",
    "stages": [{
      "blocks": [
-       { "type": "Hero", "title": "Your Recipes" },
+       { "type": "Hero", "title": "Tonight's Options" },
        { "type": "List", "data": "recipes" }
      ]
    }]
  }
```

### 4. Plans Work Standalone

A Plan should be renderable without:
- The original context (policies are resolved)
- The original intent (goal is explicit)
- Real-time AI (it's pre-computed)

---

## Files

| File | Purpose |
|------|---------|
| `plan-schema.json` | Experience Plan data model |
| `artifact-schema.json` | Saved artifact data model |
| `blocks.md` | The 8 universal blocks |
| `block-mapper.md` | Entity × Intent → Block mapping |

---

## Related

- Style Domain: [../style/](../style/) — Provides policies
- Context Domain: [../context/](../context/) — Provides situational data
- Intent Domain: [../intent/](../intent/) — Triggers experience
- Engine Domain: [../engine/](../engine/) — Renders the plan
