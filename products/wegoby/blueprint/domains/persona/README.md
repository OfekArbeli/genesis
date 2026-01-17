# Persona Domain

> **WHO the user is** — Deep psychological model and baseline assumptions.

---

## Overview

The Persona domain manages user identity and preferences at a deep level. It contains both the **baseline** (what we assume about new users) and the **user persona** (what we learn about specific users).

| Aspect | Description |
|--------|-------------|
| **Purpose** | Model who the user is |
| **Baseline** | Default assumptions for new users (per screen) |
| **User Persona** | Deep psychological model (5 levels) |
| **Output** | Generates Context items (natural language) |

---

## Structure

```
persona/
├── README.md              # This file
├── baseline.json          # Default context items per screen
├── schema.json            # Deep 5-level persona model
├── onboarding.md          # Miniapp questions → persona mapping
└── research/
    └── emotional-intelligence.md
```

---

## Baseline

**Baseline** is what Wegoby assumes about a new user before knowing them. It's the "default persona" that seeds the Context.

- Defined per screen
- Locked in the Context Panel (users can't delete)
- Source: `baseline`

### Example

```json
{
  "home": {
    "items": [
      { "layer": "presentation", "text": "iPhone-style grid layout for miniapps" },
      { "layer": "autonomy", "text": "User freely navigates between miniapps" }
    ]
  }
}
```

---

## User Persona

**User Persona** is the deep psychological model built from onboarding and learned patterns.

### The 5 Levels

| Level | Name | What It Captures |
|-------|------|------------------|
| 1 | Sensorimotor & Virtual Homeostasis | Energy, attention, pace preferences |
| 2 | Affective Construction & Cultural Priors | Cultural norms, emotional associations |
| 3 | Conceptual World-Model & Social Affordances | Beliefs, goals, social comfort |
| 4 | Attentional Schema & Metacognitive Strategy | Focus duration, multitasking tolerance |
| 5 | Identity & Plasticity | Self-concept, adaptability, learning rate |

---

## How Persona Generates Context

```
User completes onboarding
        │
        ▼
Answers stored in User Persona (structured)
        │
        ▼
Context items generated (natural language)
        │
        ▼
Merged with Baseline → Full Context
        │
        ▼
AI reads Context in chat
```

### Example Flow

```
Onboarding question: "What diet do you follow?"
User selects: "Vegetarian"
        │
        ▼
Persona stores: level2.culturalNorms.diet = "vegetarian"
        │
        ▼
Context generated: { layer: 'intent', text: 'User follows vegetarian diet' }
        │
        ▼
AI sees: "User follows vegetarian diet" when suggesting recipes
```

---

## When Persona is Used

| Stage | Role |
|-------|------|
| **Onboarding** | Stores structured answers |
| **Context generation** | Converts persona → text items |
| **AI content generation** | Informs story/recipe style |
| **Baseline Evolution** (future) | Aggregate patterns update baseline |

---

## Related

- Context Domain: [../context/](../context/)
- Onboarding Questions: [onboarding.md](./onboarding.md)
- Baseline Data: [baseline.json](./baseline.json)
