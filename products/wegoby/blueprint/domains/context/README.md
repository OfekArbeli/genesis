# Context Domain

> **EPHEMERAL session data** — What's relevant right now, this moment.

---

## Overview

Context captures **situational, session-specific information** that shapes the current experience. Unlike Style (stable), Context is temporary and resets between sessions.

```
┌─────────────────────────────────────────────────────────────┐
│                    CONTEXT LIFECYCLE                         │
│                                                             │
│  Session Start                                              │
│       │                                                     │
│       ▼                                                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              CONTEXT SNAPSHOT                         │  │
│  │                                                       │  │
│  │  Built from:                                          │  │
│  │  - Chat (context-building phase)                     │  │
│  │  - Sensors (location, time)                          │  │
│  │  - User input ("I'm in a hurry")                     │  │
│  │  - Inferred state (restaurant detected)              │  │
│  │                                                       │  │
│  └──────────────────────────────────────────────────────┘  │
│       │                                                     │
│       ▼                                                     │
│  Experience Planner uses snapshot                           │
│       │                                                     │
│       ▼                                                     │
│  Session End → Context discarded                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Context vs Style

| Aspect | Context | Style |
|--------|---------|-------|
| **Temporality** | Ephemeral, session-only | Stable, persists |
| **Question answered** | "What's happening now?" | "How do I prefer things?" |
| **Source** | Chat, sensors, situation | Onboarding, learned, user-set |
| **Lifespan** | Dies with session | Lives across sessions |
| **Example** | "I'm at a restaurant" | "I prefer calm pacing" |

---

## Context Sources

### 1. Chat (Context-Building Phase)

When user enters a decision-heavy flow, chat collects situational inputs:

```
AI: "Are you at home or eating out?"
User: "At home"

AI: "What ingredients do you have?"
User: "Chicken, rice, some vegetables"

AI: "How much time do you have?"
User: "About 30 minutes"
```

Result:
```json
{
  "location": "home",
  "ingredients": ["chicken", "rice", "vegetables"],
  "timeConstraint": "30min"
}
```

### 2. Sensors / Environment

Automatically detected:
- Time of day
- Day of week
- Location (if permitted)
- Device type

### 3. User Input

Explicit statements during session:
- "I'm in a hurry"
- "I'm feeling adventurous today"
- "Keep it simple"

### 4. Inferred State

Derived from actions:
- Scanned a menu → at restaurant
- Browsing recipes → cooking mood
- Opened library late night → relaxed reading time

---

## Context Snapshot

The Context Snapshot is the structured output passed to the Experience Planner.

```typescript
interface ContextSnapshot {
  sessionId: string;
  timestamp: string;

  // Situational data
  situation: {
    location: "home" | "restaurant" | "commute" | "work" | "unknown";
    timeOfDay: "morning" | "afternoon" | "evening" | "night";
    dayType: "weekday" | "weekend";
    deviceType: "mobile" | "tablet" | "desktop";
  };

  // Constraints
  constraints: {
    time?: string;           // "30min", "1 hour", "no limit"
    budget?: string;         // "cheap", "moderate", "splurge"
    energy?: string;         // "tired", "normal", "energetic"
    social?: string;         // "alone", "with partner", "group"
  };

  // Mood / Intent hints
  mood: {
    adventurousness: "low" | "medium" | "high";
    decisiveness: "want-options" | "want-recommendation";
    urgency: "relaxed" | "normal" | "urgent";
  };

  // Domain-specific data
  domain: {
    [key: string]: any;      // Mini-app specific context
  };

  // Natural language items (for AI interpretation)
  naturalItems: string[];

  // Policy overrides (derived from session context)
  policyOverrides: Partial<PolicySet>;
}
```

---

## Policy Overrides

Session context can temporarily override Style policies:

| Context Signal | Policy Override |
|----------------|-----------------|
| "I'm in a hurry" | `pace: fast`, `verbosity: minimal` |
| "Feeling adventurous" | `noveltyBias: high`, `confidence: assertive` |
| "Keep it simple" | `density: low`, `structure: guided` |
| "Just tell me what to eat" | `autonomy: system-led` |

These overrides apply **only to the current session**.

---

## Structure

```
context/
├── README.md              # This file
├── schema.json            # ContextSnapshot definition
├── sources.md             # How context is collected
└── layers.md              # The 5 UX categories (for organization)
```

---

## The 5 Categories

Context items are still organized into 5 UX categories (same as Style):

| Category | Focus | Example |
|----------|-------|---------|
| **Presentation** | How things look | "Show compact cards" |
| **Cognition** | How content is conveyed | "I need quick answers" |
| **Autonomy** | Who's in control | "Just decide for me" |
| **Continuity** | How time/state is handled | "Remember where I was" |
| **Relevance** | What's relevant now | "I'm at a restaurant" |

Note: "Intent" layer renamed to "Relevance" to avoid confusion with Intent Resolver.

---

## Files

| File | Purpose |
|------|---------|
| `schema.json` | Context Snapshot data model |
| `sources.md` | How context is collected |
| `layers.md` | The 5 UX categories explained |

---

## Related

- Style Domain: [../style/](../style/) — Stable preferences
- Chat Domain: [../chat/](../chat/) — Context-building phase
- Experience Domain: [../experience/](../experience/) — Consumes context
- Intent Domain: [../intent/](../intent/) — What user wants to do
