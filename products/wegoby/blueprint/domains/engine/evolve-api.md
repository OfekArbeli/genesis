# Evolve API

> Imperative commands for structural modifications.

---

## Overview

The Evolve API handles structural modifications to the UI — changes that persist and affect how the app works, not just what it shows.

```
┌─────────────────────────────────────────────────────────────┐
│                    EVOLVE PATH                               │
│                                                             │
│   Chat (Evolve capability)                                  │
│        │                                                    │
│        ▼                                                    │
│   "Add a search bar at the top"                             │
│        │                                                    │
│        ▼                                                    │
│   ┌──────────────────────────────────────────────────────┐ │
│   │                   EVOLVE API                          │ │
│   │                                                       │ │
│   │   1. Parse command                                    │ │
│   │   2. Validate permissions                             │ │
│   │   3. Execute modification                             │ │
│   │   4. Persist structure                                │ │
│   │   5. Trigger re-render                                │ │
│   │                                                       │ │
│   └──────────────────────────────────────────────────────┘ │
│        │                                                    │
│        ▼                                                    │
│   Screen Structure Updated                                  │
│        │                                                    │
│        ▼                                                    │
│   UI Re-renders                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Why Evolve Is Imperative

Experience Plans (Use path) are **declarative** — they describe what to show.

Evolve commands are **imperative** — they describe exact changes to make.

This separation exists because:
1. Structural changes need precision
2. Users expect exact control over customization
3. Changes persist across sessions
4. Rollback needs clear command history

---

## Command Categories

### View Commands

Modify screen structure.

| Command | Purpose | Parameters |
|---------|---------|------------|
| `view.addWidget` | Add widget to screen | `screenId`, `widget`, `position` |
| `view.removeWidget` | Remove widget from screen | `screenId`, `widgetId` |
| `view.reorderWidgets` | Change widget order | `screenId`, `order` |
| `view.setLayout` | Change layout template | `screenId`, `template` |
| `view.setConfig` | Update widget config | `screenId`, `widgetId`, `config` |

### Feature Commands

Toggle functionality.

| Command | Purpose | Parameters |
|---------|---------|------------|
| `feature.enable` | Enable a feature | `featureId`, `config?` |
| `feature.disable` | Disable a feature | `featureId` |
| `feature.configure` | Update feature settings | `featureId`, `config` |

### Style Commands

Modify visual settings.

| Command | Purpose | Parameters |
|---------|---------|------------|
| `style.update` | Update style property | `property`, `value` |
| `style.reset` | Reset to default | `property?` (all if omitted) |

---

## Command Structure

```typescript
interface EvolveCommand {
  type: string;                    // Command type: "view.addWidget"
  params: Record<string, any>;     // Command-specific parameters
  metadata?: {
    requestId?: string;            // For tracking
    dryRun?: boolean;              // Validate without executing
  };
}
```

---

## View Commands

### view.addWidget

```typescript
await engine.evolve({
  type: "view.addWidget",
  params: {
    screenId: "to-read-library",
    widget: {
      type: "SearchBar",
      config: {
        placeholder: "Search books...",
        filters: ["title", "author", "genre"]
      }
    },
    position: 1  // After Header (index 0)
  }
});
```

**Validation:**
- Screen must exist
- Widget type must be valid
- Position must be valid (0 to widgets.length)

### view.removeWidget

```typescript
await engine.evolve({
  type: "view.removeWidget",
  params: {
    screenId: "to-read-library",
    widgetId: "search-bar-1"
  }
});
```

**Validation:**
- Widget must exist
- Widget must be removable (some are locked)

### view.setLayout

```typescript
await engine.evolve({
  type: "view.setLayout",
  params: {
    screenId: "to-read-library",
    template: "list"  // Change from grid to list
  }
});
```

**Validation:**
- Template must be valid
- Screen must support the template

---

## Feature Commands

### feature.enable

```typescript
await engine.evolve({
  type: "feature.enable",
  params: {
    featureId: "word-translation",
    config: {
      targetLanguage: "he"
    }
  }
});
```

### feature.disable

```typescript
await engine.evolve({
  type: "feature.disable",
  params: {
    featureId: "word-translation"
  }
});
```

---

## Style Commands

### style.update

```typescript
await engine.evolve({
  type: "style.update",
  params: {
    property: "fontSize",
    value: "large"  // 'small' | 'normal' | 'large' | 'xlarge'
  }
});
```

---

## Validation & Security

### Schema Validation

Every command is validated against its schema:

```typescript
function validateCommand(command: EvolveCommand) {
  const schema = commandSchemas[command.type];
  if (!schema) {
    throw new Error(`Unknown command: ${command.type}`);
  }

  const result = schema.validate(command.params);
  if (!result.valid) {
    throw new ValidationError(result.errors);
  }
}
```

### Permission Checking

```typescript
function checkPermissions(command: EvolveCommand, user: User) {
  // Some widgets can't be removed
  if (command.type === 'view.removeWidget') {
    const widget = getWidget(command.params.widgetId);
    if (widget.locked) {
      throw new PermissionError('This widget cannot be removed');
    }
  }

  // Some features require premium
  if (command.type === 'feature.enable') {
    const feature = getFeature(command.params.featureId);
    if (feature.premium && !user.isPremium) {
      throw new PermissionError('Premium feature');
    }
  }
}
```

### Audit Logging

All commands are logged:

```typescript
{
  timestamp: "2024-01-15T10:30:00Z",
  userId: "user-123",
  command: "view.addWidget",
  params: { screenId: "...", widget: {...} },
  result: "success"
}
```

---

## Execution

### Sandboxed Execution

Commands run in a sandbox:
- No arbitrary code execution
- No direct DOM access
- No network access
- No file system access

### Transaction Model

Changes are transactional:

```typescript
async function executeCommand(command: EvolveCommand) {
  const transaction = startTransaction();

  try {
    // Execute
    await applyCommand(command, transaction);

    // Persist
    await persistStructure(transaction);

    // Commit
    await transaction.commit();

    // Trigger re-render
    triggerRerender();

  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
```

---

## Response Format

```typescript
interface EvolveResponse {
  success: boolean;
  command: string;
  result?: {
    widgetId?: string;        // For addWidget
    previousValue?: any;       // For updates
    affectedScreens: string[]; // What changed
  };
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}
```

---

## Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Invalid command parameters |
| `NOT_FOUND` | Screen/widget/feature not found |
| `PERMISSION_DENIED` | Not allowed to perform action |
| `CONFLICT` | Command conflicts with current state |
| `RATE_LIMIT` | Too many commands |

---

## Dry Run

Test commands without executing:

```typescript
const result = await engine.evolve({
  type: "view.addWidget",
  params: { ... },
  metadata: { dryRun: true }
});

// Result shows what would happen without making changes
```

---

## Undo Support

Commands can be undone:

```typescript
// Execute and get undo info
const result = await engine.evolve(command);

// Later, undo
await engine.evolveUndo(result.undoToken);
```

---

## Related

- Chat Capabilities: [../chat/capabilities.md](../chat/capabilities.md)
- Widgets: [widgets/README.md](./widgets/README.md)
- Engine Overview: [README.md](./README.md)
