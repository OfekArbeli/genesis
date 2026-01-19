# Intent Resolver

> How user input is mapped to a single active intent.

---

## Overview

The Intent Resolver takes user input (route, action, or message) and determines which intent is active.

```
┌─────────────────────────────────────────────────────────────┐
│                    RESOLUTION PIPELINE                       │
│                                                             │
│   ┌──────────┐   ┌──────────┐   ┌──────────┐              │
│   │  Route   │   │  Action  │   │ Message  │              │
│   │ Matcher  │   │ Matcher  │   │ Matcher  │              │
│   └────┬─────┘   └────┬─────┘   └────┬─────┘              │
│        │              │              │                      │
│        └──────────────┼──────────────┘                      │
│                       │                                     │
│                       ▼                                     │
│               ┌──────────────┐                             │
│               │   Priority   │                             │
│               │   Resolver   │                             │
│               └──────────────┘                             │
│                       │                                     │
│                       ▼                                     │
│               Single Active Intent                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Resolution Priority

When multiple matchers find candidates:

1. **Route Match** (highest priority)
   - Explicit URL patterns always win
   - Example: `/to-read/book/123` → `DeepDive`

2. **Action Match**
   - User-initiated actions (taps, buttons)
   - Example: tap "Scan Menu" → `ScanMenu`

3. **Message Match** (lowest priority)
   - Natural language parsing
   - Example: "what should I eat?" → `DecideNow`

4. **Fallback**
   - Mini-app's default intent
   - Example: `/to-read` with no specific pattern → `BrowseLibrary`

---

## Route Matching

Routes are matched using URL patterns:

```typescript
const routePatterns = {
  // Exact matches
  "/to-read": "BrowseLibrary",
  "/to-eat": "BrowseRecipes",
  "/to-eat/groceries": "ManageGroceries",

  // Parameterized matches
  "/to-read/book/:id": "DeepDive",
  "/to-eat/recipe/:id": "DeepDive",

  // With sub-routes
  "/to-read/book/:id/read": "ContinueReading",
};
```

### Pattern Priority

More specific patterns win:
```
/to-read/book/123/read → ContinueReading (most specific)
/to-read/book/123 → DeepDive
/to-read → BrowseLibrary (least specific)
```

---

## Action Matching

Actions are explicit user interactions:

```typescript
const actionMappings = {
  "scan-menu": "ScanMenu",
  "create-recipe": "CreateRecipe",
  "continue": "ContinueReading",
  "compare": "Compare",
  "save": "Save",
};
```

Actions come from:
- Button taps
- Quick actions
- Gestures
- Keyboard shortcuts

---

## Message Matching

Natural language is matched using keywords and patterns:

```typescript
const messagePatterns = [
  {
    intent: "DecideNow",
    patterns: [
      /what should I (eat|have|cook)/i,
      /I('m| am) hungry/i,
      /dinner|lunch|breakfast/i,
    ],
    confidence: "high"
  },
  {
    intent: "CreateRecipe",
    patterns: [
      /create (a )?recipe/i,
      /make me (a )?recipe/i,
      /recipe for .+/i,
    ],
    confidence: "high"
  },
  {
    intent: "Search",
    patterns: [
      /find .+/i,
      /search for .+/i,
      /look for .+/i,
    ],
    confidence: "medium"
  }
];
```

### Confidence Levels

- **High**: Clear intent indicators
- **Medium**: Could be this intent
- **Low**: Weak signal, consider asking

When confidence is low, resolver may ask for clarification via chat.

---

## Disambiguation

When multiple intents match with similar confidence:

### Option 1: Context-based Resolution

Use current context to decide:
```
User: "Show me more"
Context: viewing recipe → DeepDive (more details)
Context: in search results → Browse (more results)
```

### Option 2: Ask User

When truly ambiguous:
```
AI: "Do you want to:
     1. See more details about this recipe?
     2. Find more recipes like this?"
```

---

## Mini-app Scoping

Intents are scoped to mini-apps:

```
User in to-read says "create"
→ Check to-read intents first → CreateBook
→ Fall back to global → Create

User in to-eat says "create"
→ Check to-eat intents first → CreateRecipe
→ Fall back to global → Create
```

---

## Intent Transitions

Some intents naturally lead to others:

```
DecideNow → (user selects) → DeepDive
ScanMenu → (user saves) → Save → BrowseRecipes
CreateRecipe → (user refines) → Refine → Save
```

Transitions are tracked for:
- Back navigation
- History
- Context preservation

---

## Implementation Notes

### Performance

- Route matching: O(n) pattern count, cached
- Action matching: O(1) hash lookup
- Message matching: Evaluated lazily, with early exit

### Extensibility

New intents added via:
1. Add to `taxonomy.json`
2. Patterns auto-registered
3. No code changes needed

### Debugging

Intent resolution is logged:
```
[IntentResolver] Route: /to-eat/groceries
[IntentResolver] Matched: ManageGroceries (route)
[IntentResolver] Confidence: 1.0
```

---

## Related

- Intent Taxonomy: [taxonomy.json](./taxonomy.json)
- Chat Phases: [../chat/phases.md](../chat/phases.md)
