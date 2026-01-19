# Context Sources

> How session context is collected and built.

---

## Overview

Context is built from multiple sources, combined into a single snapshot.

```
┌─────────────────────────────────────────────────────────────┐
│                  CONTEXT SOURCES                             │
│                                                             │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│   │   Chat   │  │ Sensors  │  │  User    │  │ Inferred │  │
│   │(explicit)│  │(passive) │  │ (direct) │  │(derived) │  │
│   └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  │
│        │             │             │             │          │
│        └─────────────┴─────────────┴─────────────┘          │
│                          │                                   │
│                          ▼                                   │
│               ┌──────────────────────┐                      │
│               │  Context Snapshot    │                      │
│               └──────────────────────┘                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 1. Chat (Context-Building Phase)

When the user enters a decision-heavy intent, chat proactively collects context.

### When It Triggers

- User says "What should I eat?"
- User enters a "decide now" flow
- Context is incomplete for the intent

### How It Works

```
┌─────────────────────────────────────────────────┐
│ Intent: DecideNow                               │
│ Required context: location, constraints, mood   │
│ Current context: (empty)                        │
│                                                 │
│ → Enter context-building phase                  │
└─────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────┐
│ AI: "Are you eating at home or out?"            │
│ User: "At home"                                 │
│                                                 │
│ → context.situation.location = "home"           │
└─────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────┐
│ AI: "What do you have available?"               │
│ User: "Chicken and vegetables"                  │
│                                                 │
│ → context.domain.ingredients = [...]            │
└─────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────┐
│ Context complete for intent                     │
│ → Exit context-building, continue to planner    │
└─────────────────────────────────────────────────┘
```

### Adaptive Collection

- Skip questions if context already known
- Use previous session hints (but don't assume)
- Keep it minimal (3-5 questions max)

---

## 2. Sensors / Environment (Passive)

Automatically detected, no user action required.

| Signal | How Detected | Context Field |
|--------|--------------|---------------|
| Time of day | System clock | `situation.timeOfDay` |
| Day type | Calendar | `situation.dayType` |
| Device | User agent / screen | `situation.deviceType` |
| Location | Geolocation API (if permitted) | `situation.location` |

### Location Detection

```typescript
// If geolocation available
if (coords.nearKnownRestaurant) {
  context.situation.location = "restaurant";
  context.domain.detectedRestaurant = restaurantName;
}

// Fallback: ask via chat
if (!context.situation.location) {
  askInChat("Are you at home or eating out?");
}
```

---

## 3. User Input (Direct)

User explicitly states context during session.

### Inline Statements

```
User: "I'm in a hurry today"
→ context.mood.urgency = "urgent"
→ context.policyOverrides.pace = "fast"

User: "Feeling adventurous"
→ context.mood.adventurousness = "high"
→ context.policyOverrides.noveltyBias = "high"
```

### Quick Actions

Pre-defined shortcuts that set context:

| Quick Action | Context Set |
|--------------|-------------|
| "Quick meal" | `time: "30min"`, `pace: fast` |
| "Something new" | `adventurousness: high`, `noveltyBias: high` |
| "Comfort food" | `adventurousness: low`, `noveltyBias: low` |
| "Impress guests" | `social: group`, `confidence: assertive` |

---

## 4. Inferred (Derived)

Derived from user actions, not explicit input.

| Action | Inferred Context |
|--------|------------------|
| Scanned menu photo | `location: restaurant` |
| Opened at 11pm | `timeOfDay: night`, `mood.urgency: relaxed` |
| Browsed recipes for 10min | `decisiveness: want-options` |
| Clicked first suggestion | `decisiveness: want-recommendation` |
| Returned to same book | `domain.continueReading: true` |

### Confidence Levels

Inferred context has confidence:
- **High**: Direct action implication (scanned menu → restaurant)
- **Medium**: Behavioral pattern (browsing → want options)
- **Low**: Time-based assumption (late night → relaxed)

Low-confidence inferences should be confirmed via chat.

---

## Source Priority

When sources conflict:

1. **User Input** (explicit statement wins)
2. **Chat** (deliberate collection)
3. **Sensors** (reliable detection)
4. **Inferred** (lowest priority)

---

## Context Completeness

Each intent defines required context fields.

| Intent | Required Fields |
|--------|----------------|
| `BrowseRecipes` | (none - works without context) |
| `DecideNow` | `location`, `constraints.time` |
| `ScanMenu` | `social`, `mood.adventurousness` |
| `CreateRecipe` | `constraints.time`, `domain.ingredients` |

If required fields are missing → trigger context-building phase.

---

## Related

- Context Schema: [schema.json](./schema.json)
- Chat Phases: [../chat/phases.md](../chat/phases.md)
