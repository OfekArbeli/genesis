# Context Panel Specification

> **User-visible Context** — Transparency layer showing and editing personalization preferences.

---

## Overview

The Context Panel gives users visibility into how their experience is personalized. It displays the active context items for the current screen and allows users to add their own preferences.

| Aspect | Description |
|--------|-------------|
| **Access** | Context button (Shirt icon) in bottom nav |
| **Position** | Slides in from right as sheet/drawer |
| **Scope** | Per-screen context (different for each view) |
| **Layers** | Presentation, Cognition, Autonomy, Continuity, Intent |

---

## UI Layout

```
┌─────────────────────────────────────────────┐
│  Context Preferences                    [X] │
├─────────────────────────────────────────────┤
│  Current Screen: Home                       │
│                                             │
│  ┌─ Presentation ─────────────────────────┐ │
│  │ • iPhone-style grid layout...    [🔒]  │ │
│  │ • Pastel color scheme...         [🔒]  │ │
│  │ + Add preference                       │ │
│  └────────────────────────────────────────┘ │
│                                             │
│  ┌─ Cognition ────────────────────────────┐ │
│  │ • Welcome message is friendly... [🔒]  │ │
│  │ + Add preference                       │ │
│  └────────────────────────────────────────┘ │
│                                             │
│  ┌─ Autonomy ─────────────────────────────┐ │
│  │ • User freely navigates...       [🔒]  │ │
│  │ + Add preference                       │ │
│  └────────────────────────────────────────┘ │
│                                             │
│  ┌─ Continuity ───────────────────────────┐ │
│  │ • Recently used miniapps...      [🔒]  │ │
│  │ + Add preference                       │ │
│  └────────────────────────────────────────┘ │
│                                             │
│  ┌─ Intent ───────────────────────────────┐ │
│  │ • User is exploring...           [🔒]  │ │
│  │ + Add preference                       │ │
│  └────────────────────────────────────────┘ │
│                                             │
│                                     [Save]  │
└─────────────────────────────────────────────┘
```

---

## Item States

### Locked Items (🔒)
- From Baseline or Onboarding
- Cannot be deleted
- `isBaseline: true`

### Editable Items (✏️)
- User-added or Learned
- Can be edited/deleted
- `isBaseline: false`

---

## Interactions

### Opening the Panel
1. User taps Context button (Shirt icon) in bottom nav
2. Panel slides in from right
3. Current screen's context is displayed

### Adding a Preference
1. User taps "+ Add preference" in a layer
2. Text input appears
3. User types preference
4. Tap Save to add

### Editing a Preference
1. User taps editable item (✏️)
2. Text becomes editable
3. User modifies text
4. Tap Save to update

### Deleting a Preference
1. User swipes left on editable item
2. Delete button appears
3. Tap to confirm deletion

---

## Context Merging

When displaying a screen's context:

```typescript
function getCurrentPageContext(screen: string): PageContext {
  // 1. Get baseline from Persona domain
  const baseline = getBaseline(screen);

  // 2. Get onboarding-derived context
  const onboardingItems = getOnboardingContext(screen);

  // 3. Get learned patterns
  const learnedItems = getLearnedContext(screen);

  // 4. Get user-added items
  const userItems = getUserContext(screen);

  // 5. Merge all sources
  return {
    pageName: baseline.pageName,
    items: [
      ...baseline.items,      // locked
      ...onboardingItems,     // locked
      ...learnedItems,        // editable
      ...userItems,           // editable
    ]
  };
}
```

---

## Storage

| Data | Storage | Domain |
|------|---------|--------|
| Baseline contexts | App config | Persona |
| Onboarding data | User profile | Persona |
| Learned patterns | User profile | Context |
| User-added context | Local storage | Context |

---

## Related

- Context Overview: [README.md](./README.md)
- Layers Explanation: [layers.md](./layers.md)
- Persona Domain: [../persona/](../persona/)
- Chat Domain: [../chat/](../chat/)
