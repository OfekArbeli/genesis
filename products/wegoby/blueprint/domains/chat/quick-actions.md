# Quick Actions

> **Context-aware suggestions** — Pre-defined actions shown before user types.

---

## Overview

Quick actions are suggestions that appear in the chat before the user sends their first message. They're tailored to the current screen.

| Aspect | Description |
|--------|-------------|
| **Position** | Above input, below messages |
| **Visibility** | Disappear after first user message |
| **Types** | Use (pink) and Evolve (purple) |
| **Per-screen** | Different actions for each screen |

---

## Quick Action Types

### Use Actions (Pink)
Common operations for the current screen.

```typescript
{ label: "Create a book for me", type: 'use' }
```

### Evolve Actions (Purple)
Common customizations for the current screen.

```typescript
{ label: "Add search bar at top", type: 'evolve' }
```

---

## Home Screen

| Type | Action |
|------|--------|
| Use | "Open to-read miniapp" |
| Use | "Show my reading stats" |
| Use | "What miniapps are available?" |
| Evolve | "Rearrange miniapp icons" |
| Evolve | "Change home layout" |

---

## to-read Miniapp

### Onboarding
| Type | Action |
|------|--------|
| Use | "Skip to library" |
| Use | "Explain these questions" |

### Library
| Type | Action |
|------|--------|
| Use | "Create a book for me" |
| Use | "Find books about philosophy" |
| Use | "What should I read next?" |
| Evolve | "Add search bar at top" |
| Evolve | "Switch to list view" |

### Reading
| Type | Action |
|------|--------|
| Use | "Summarize this chapter" |
| Use | "Explain this concept" |
| Use | "Continue the story" |
| Evolve | "Enable word translation on tap" |
| Evolve | "Make text larger" |
| Evolve | "Change font style" |

---

## to-eat Miniapp

### Onboarding
| Type | Action |
|------|--------|
| Use | "Skip to recipes" |
| Use | "What will you ask me?" |

### Recipes
| Type | Action |
|------|--------|
| Use | "Create a recipe for dinner" |
| Use | "Import recipe from URL" |
| Use | "What can I cook with chicken?" |
| Evolve | "Add search bar" |
| Evolve | "Show cooking time on cards" |

### Groceries
| Type | Action |
|------|--------|
| Use | "Add milk to the list" |
| Use | "What do I need to buy?" |
| Use | "Clear completed items" |
| Evolve | "Group items by category" |
| Evolve | "Add quantity column" |

### Menus (Restaurant)
| Type | Action |
|------|--------|
| Use | "Scan a menu" |
| Use | "What did I order last time here?" |
| Use | "Find vegetarian options" |
| Evolve | "Show prices in list" |
| Evolve | "Add favorites section" |

---

## Data Model

```typescript
interface QuickAction {
  label: string;
  type: 'use' | 'evolve';
}

interface ScreenQuickActions {
  screenId: string;
  actions: QuickAction[];
}
```

---

## Styling

### Use Actions (Pink)
```css
background: bg-primary-pink/70 (#F4B4C0)
hover: bg-primary-pink
text: text-foreground
border-radius: rounded-full
padding: px-3 py-2
font-size: text-xs
```

### Evolve Actions (Purple)
```css
background: bg-light-purple/70 (#C3B1E1)
hover: bg-light-purple
text: text-foreground
border-radius: rounded-full
padding: px-3 py-2
font-size: text-xs
```

---

## Behavior

1. **Show**: When chat opens and no user message yet
2. **Hide**: After user sends first message
3. **Reappear**: When "New Chat" is pressed
4. **Tap**: Sends action as user message

---

## Adding Quick Actions

To add quick actions for a new screen:

1. Identify the screen ID (e.g., `to-eat-recipes`)
2. List 3-5 common Use actions
3. List 2-3 common Evolve actions
4. Add to screen configuration

```typescript
const screenQuickActions: ScreenQuickActions = {
  screenId: 'to-eat-recipes',
  actions: [
    { label: "Create a recipe for dinner", type: 'use' },
    { label: "Import recipe from URL", type: 'use' },
    { label: "Add search bar", type: 'evolve' },
  ]
};
```

---

## Related

- Chat Overview: [README.md](./README.md)
- Modes: [modes.md](./modes.md)
- Interface: [interface.md](./interface.md)
