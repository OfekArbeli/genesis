# Intent Domain

> **WHAT the user wants to do** — The goal of the current interaction.

---

## Overview

Intent represents the **user's goal** for the current interaction. The Intent Resolver determines which intent is active based on route, action, or message.

```
┌─────────────────────────────────────────────────────────────┐
│                    INTENT RESOLUTION                         │
│                                                             │
│   Route / Action / Message                                  │
│            │                                                │
│            ▼                                                │
│   ┌──────────────────────────────────────────────────────┐ │
│   │              INTENT RESOLVER                          │ │
│   │                                                       │ │
│   │   /to-read → BrowseContent                           │ │
│   │   /to-read/book/123 → DeepDive                       │ │
│   │   "what should I eat?" → DecideNow                   │ │
│   │   scan menu → AnalyzeContent                         │ │
│   │                                                       │ │
│   └──────────────────────────────────────────────────────┘ │
│            │                                                │
│            ▼                                                │
│   Single Active Intent → Experience Planner                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Core Principle

**Only one intent is active at a time.**

The intent determines:
- What the Experience Planner should produce
- What context is required
- What blocks are appropriate
- What actions are available

---

## Intent vs Relevance

| Concept | Intent | Relevance |
|---------|--------|-----------|
| **Question** | "What do you want to do?" | "What content matters?" |
| **Domain** | Intent Domain | Context Domain (category) |
| **Example** | `DecideNow` | "User follows vegetarian diet" |
| **Scope** | Single active goal | Multiple active filters |

---

## Global Intents

These intents apply across all mini-apps:

| Intent | Description | Typical Trigger |
|--------|-------------|-----------------|
| `Browse` | Explore available content | Entering library/home |
| `Search` | Find specific content | Search action |
| `DeepDive` | Focus on single item | Opening specific content |
| `Create` | Generate new content | "Create a..." |
| `Refine` | Modify/adjust result | "Change this to..." |
| `Compare` | Evaluate options | "Compare these..." |
| `Save` | Store for later | Save action |

---

## Mini-app Intents

### to-read Intents

| Intent | Description | Trigger Examples |
|--------|-------------|------------------|
| `BrowseLibrary` | Explore book collection | `/to-read`, open app |
| `ContinueReading` | Resume where left off | "Continue", tap current book |
| `DiscoverNew` | Find new books | "Something new", browse |
| `ReflectOnBook` | Think about/discuss book | "What did I think of..." |
| `CreateBook` | Generate new book content | "Create a book about..." |

### to-eat Intents

| Intent | Description | Trigger Examples |
|--------|-------------|------------------|
| `BrowseRecipes` | Explore recipe collection | `/to-eat`, open app |
| `DecideNow` | Need immediate food decision | "What should I eat?" |
| `ScanMenu` | Analyze restaurant menu | Upload menu photo |
| `CreateRecipe` | Generate new recipe | "Create a recipe for..." |
| `PlanMeals` | Plan ahead | "Plan this week's meals" |
| `ManageGroceries` | Handle shopping list | "Groceries", shopping |

---

## Intent Properties

Each intent has:

```typescript
interface Intent {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  miniapp: string | "global";    // Which mini-app or global

  // Resolution
  triggers: {
    routes: string[];            // URL patterns that trigger
    actions: string[];           // User actions that trigger
    keywords: string[];          // Message keywords that trigger
  };

  // Requirements
  requiredContext: string[];     // Context fields needed
  optionalContext: string[];     // Context fields that enhance

  // Output
  typicalBlocks: string[];       // Blocks usually produced
  availableActions: string[];    // Actions shown to user

  // Behavior
  contextBuildingNeeded: boolean; // Needs chat phase first?
  renderTarget: "screen" | "chat" | "hybrid";
}
```

---

## Resolution Rules

### 1. Route-based (Highest Priority)

```
/to-read → BrowseLibrary
/to-read/book/123 → DeepDive
/to-eat/groceries → ManageGroceries
```

### 2. Action-based

```
tap "Scan Menu" → ScanMenu
tap book in library → DeepDive
tap "Create" → Create
```

### 3. Message-based (Lowest Priority)

```
"What should I eat?" → DecideNow
"Create a recipe for pasta" → CreateRecipe
"Compare these two books" → Compare
```

### Fallback

If no intent matches → mini-app's default intent (usually `Browse`)

---

## Intent Lifecycle

```
┌─────────────────────────────────────────────────────────────┐
│ 1. RESOLVE                                                   │
│    Input → Intent Resolver → Single Intent                  │
└─────────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. CHECK CONTEXT                                             │
│    Does intent have required context?                        │
│    No → Enter context-building phase                        │
│    Yes → Continue                                           │
└─────────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. PLAN                                                      │
│    Intent + Style + Context → Experience Plan               │
└─────────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. RENDER                                                    │
│    Experience Plan → UI                                      │
└─────────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. TRANSITION (Optional)                                     │
│    User action may trigger new intent                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Files

| File | Purpose |
|------|---------|
| `taxonomy.json` | All intents with properties |
| `resolver.md` | Resolution rules and priority |

---

## Related

- Experience Domain: [../experience/](../experience/) — Consumes intent
- Context Domain: [../context/](../context/) — Provides situational data
- Chat Domain: [../chat/](../chat/) — Context-building phase
