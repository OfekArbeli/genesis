# Policy Mapper

> **Natural Language → Enumerated Policies**

---

## Overview

Users and AI communicate in natural language. The Renderer needs enumerated values.
The Policy Mapper bridges this gap.

```
┌─────────────────────────────────────────────────────────────┐
│                    MAPPING FLOW                              │
│                                                             │
│  "I prefer things calm      ┌──────────────┐               │
│   and not overwhelming"  ──►│ Policy Mapper │──► pace: calm │
│                             │               │    density: low│
│                             └──────────────┘               │
└─────────────────────────────────────────────────────────────┘
```

---

## Mapping Rules

### Pace Signals

| If text contains... | Set `pace` to |
|---------------------|---------------|
| "slow", "gradually", "calm", "relaxed", "no rush" | `calm` |
| "quick", "fast", "immediately", "hurry" | `fast` |
| (default) | `normal` |

### Density Signals

| If text contains... | Set `density` to |
|---------------------|------------------|
| "minimal", "clean", "simple", "spacious", "one thing" | `low` |
| "comprehensive", "detailed", "all information", "dense" | `high` |
| (default) | `medium` |

### Verbosity Signals

| If text contains... | Set `verbosity` to |
|---------------------|-------------------|
| "brief", "concise", "short", "just the facts" | `minimal` |
| "explain", "detailed", "thorough", "comprehensive" | `detailed` |
| (default) | `normal` |

### Autonomy Signals

| If text contains... | Set `autonomy` to |
|---------------------|-------------------|
| "decide for me", "just do it", "you choose" | `system-led` |
| "let me explore", "don't interrupt", "I'll find it" | `user-led` |
| (default) | `shared` |

### Tone Signals

| If text contains... | Set `tone` to |
|---------------------|---------------|
| "professional", "formal", "serious" | `neutral` |
| "fun", "casual", "playful", "joke" | `playful` |
| "friendly", "supportive", "warm" | `warm` |
| (default) | `warm` |

### Confidence Signals

| If text contains... | Set `confidence` to |
|---------------------|---------------------|
| "maybe", "options", "alternatives", "not sure" | `cautious` |
| "best", "definitely", "you should", "my pick" | `assertive` |
| (default) | `balanced` |

---

## Multi-Policy Patterns

Some natural language maps to multiple policies at once:

| Pattern | Derived Policies |
|---------|------------------|
| "I'm a beginner" | `verbosity: detailed`, `structure: guided`, `pace: calm` |
| "I'm in a hurry" | `pace: fast`, `verbosity: minimal`, `chunking: small` |
| "I want to explore" | `autonomy: user-led`, `structure: loose`, `noveltyBias: high` |
| "Just tell me what to do" | `autonomy: system-led`, `confidence: assertive` |
| "Keep it simple" | `density: low`, `verbosity: minimal`, `structure: guided` |

---

## Conflict Resolution

When multiple items suggest different values for the same policy:

1. **User-set > Learned > Onboarding > Baseline** (source priority)
2. **Session Context > User Style > Mini-app > Global** (layer priority)
3. **Most recent wins** (if same source and layer)

---

## Implementation Notes

The Policy Mapper runs:
1. During onboarding (answers → User Style)
2. When user adds natural language in Context Panel
3. When AI detects behavioral patterns
4. During chat context-building

The Experience Planner receives already-enumerated policies. It never interprets natural language directly.

---

## Related

- Style Schema: [schema.json](./schema.json)
- Policy Definitions: [policies.json](./policies.json)
