# Style Domain

> **STABLE preferences** — How experiences are presented, consistent over time.

---

## Overview

Style defines the **stable, inheritable presentation preferences** that shape how experiences feel. Unlike Context (ephemeral), Style persists across sessions and accumulates over time.

```
┌─────────────────────────────────────────────────────────────┐
│                    STYLE HIERARCHY                          │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Global Baseline                         │   │
│  │         (Wegoby-wide defaults)                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                         │                                   │
│                         ▼                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │            Mini-app Baseline                         │   │
│  │    (to-read: calm | to-eat: practical)              │   │
│  └─────────────────────────────────────────────────────┘   │
│                         │                                   │
│                         ▼                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              User Style                              │   │
│  │     (per mini-app, adjustable within theme)         │   │
│  └─────────────────────────────────────────────────────┘   │
│                         │                                   │
│                         ▼                                   │
│  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐   │
│           Session Context (ephemeral overlay)               │
│  └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Style vs Context

| Aspect | Style | Context |
|--------|-------|---------|
| **Temporality** | Stable, persists | Ephemeral, session-only |
| **Scope** | Per mini-app | Per session |
| **Source** | Onboarding + learned + user-set | Chat + sensors + situation |
| **Changes** | Slowly, deliberately | Frequently, situationally |
| **Example** | "I prefer calm pacing" | "I'm in a hurry right now" |

---

## Policy Knobs

Style is expressed through **enumerated policies** — discrete values that the Renderer can interpret deterministically.

### Group A: Cognition

| Policy | Values | What It Controls |
|--------|--------|------------------|
| `density` | `low` / `medium` / `high` | Amount of information per screen |
| `structure` | `loose` / `guided` | How much hand-holding |
| `verbosity` | `minimal` / `normal` / `detailed` | Text length and detail |

### Group B: Control

| Policy | Values | What It Controls |
|--------|--------|------------------|
| `autonomy` | `system-led` / `shared` / `user-led` | Who drives the experience |
| `ctaStrength` | `soft` / `clear` / `urgent` | How prominent actions are |

### Group C: Pace

| Policy | Values | What It Controls |
|--------|--------|------------------|
| `pace` | `fast` / `normal` / `calm` | Speed of experience progression |
| `chunking` | `small` / `medium` / `large` | Size of information units |

### Group D: Memory

| Policy | Values | What It Controls |
|--------|--------|------------------|
| `useHistory` | `true` / `false` | Whether to reference past behavior |
| `noveltyBias` | `low` / `medium` / `high` | Preference for new vs familiar |

### Group E: Tone

| Policy | Values | What It Controls |
|--------|--------|------------------|
| `tone` | `neutral` / `warm` / `playful` | Voice and personality |
| `confidence` | `cautious` / `balanced` / `assertive` | How decisive recommendations are |

---

## Inheritance Rules

1. **Global Baseline** defines defaults for all policies
2. **Mini-app Baseline** overrides specific policies to establish character
3. **User Style** overrides within mini-app's allowed range
4. **Session Context** can temporarily override any policy

```typescript
// Resolution order (later wins)
const resolvedStyle = {
  ...globalBaseline,
  ...miniappBaseline,
  ...userStyle,
  ...sessionOverrides  // from Context
};
```

---

## Files

| File | Purpose |
|------|---------|
| `schema.json` | User Style data model |
| `policies.json` | Policy definitions and valid values |
| `baselines/global.json` | Wegoby-wide defaults |
| `baselines/miniapps/to-read.json` | to-read baseline |
| `baselines/miniapps/to-eat.json` | to-eat baseline |
| `policy-mapper.md` | Natural language → policies |

---

## Related

- Context Domain: [../context/](../context/) — Ephemeral session data
- Experience Domain: [../experience/](../experience/) — Plan uses resolved policies
