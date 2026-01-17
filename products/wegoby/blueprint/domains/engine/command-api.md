# Engine Command API

The only way AI interacts with the Engine.

## Overview

The Command API is a restricted interface that allows AI to:
- Operate miniapps (Use Mode)
- Modify miniapps (Evolve Mode)

AI **never** writes Percepta code directly.

## Command Categories

### 1. Entity Commands

CRUD operations on domain entities.

#### entity.create

```typescript
entity.create({
  type: "Book",
  data: {
    title: "Atomic Habits",
    author: "James Clear",
    totalPages: 320,
    status: "want"
  }
})

// Response
{
  success: true,
  data: {
    id: "book-abc123",
    type: "Book",
    title: "Atomic Habits",
    ...
  }
}
```

#### entity.update

```typescript
entity.update({
  id: "book-abc123",
  data: {
    currentPage: 150,
    status: "reading"
  }
})
```

#### entity.delete

```typescript
entity.delete({
  id: "book-abc123"
})
```

### 2. Query Commands

Read operations.

#### query.get

```typescript
query.get("streak")

// Response
{
  value: 7,
  unit: "days"
}
```

#### query.list

```typescript
query.list("Book", {
  filters: { status: "reading" },
  sort: { field: "updatedAt", order: "desc" },
  limit: 10,
  offset: 0
})

// Response
{
  items: [...],
  total: 42,
  hasMore: true
}
```

#### query.custom

```typescript
query.custom("weeklyProgress", {
  week: "2026-W02"
})
```

### 3. View Commands

UI manipulation.

#### view.switch

```typescript
view.switch("reading-stats")
```

#### view.modify

```typescript
view.modify({
  id: "reading-list",
  changes: {
    template: "checklist",
    config: {
      showProgress: true,
      groupBy: "status"
    }
  }
})
```

#### view.create

```typescript
view.create({
  id: "weekly-calendar",
  template: "calendar",
  config: {
    period: "week",
    entity: "ReadingSession",
    showTitle: true
  }
})
```

#### view.addWidget

```typescript
view.addWidget({
  viewId: "dashboard",
  widget: "streak-counter",
  position: { row: 1, col: 2 }
})
```

### 4. Rule Commands

Business logic automation.

#### rule.create

```typescript
rule.create({
  id: "daily-streak",
  trigger: "daily",
  condition: "readingSessions.today.length > 0",
  action: {
    type: "increment",
    target: "streak"
  }
})
```

#### rule.modify

```typescript
rule.modify({
  id: "daily-streak",
  changes: {
    condition: "readingSessions.today.pagesRead >= 10"
  }
})
```

#### rule.delete

```typescript
rule.delete({
  id: "daily-streak"
})
```

### 5. UI Commands

User interface interactions.

#### ui.notify

```typescript
ui.notify({
  message: "Book added to your list!",
  type: "success",  // success | error | warning | info
  duration: 3000
})
```

#### ui.navigate

```typescript
ui.navigate({
  to: "/book/abc123"
})
```

#### ui.openPanel

```typescript
ui.openPanel({
  type: "book-details",
  data: { bookId: "abc123" }
})
```

#### ui.closePanel

```typescript
ui.closePanel()
```

## Response Format

### Success

```typescript
{
  success: true,
  data: { ... },
  meta: {
    timestamp: "2026-01-09T10:00:00Z",
    commandId: "cmd-xyz789"
  }
}
```

### Error

```typescript
{
  success: false,
  error: {
    code: "VALIDATION_ERROR",
    message: "Invalid entity type",
    details: { field: "type", value: "Invalid" }
  }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Invalid input data |
| `NOT_FOUND` | Entity/view/rule not found |
| `PERMISSION_DENIED` | Operation not allowed |
| `CONFLICT` | Resource conflict |
| `RATE_LIMITED` | Too many requests |

## Security

### Command Validation

All commands are validated:
- Type checking
- Permission checking
- Rate limiting

### Sandboxing

Commands execute in a sandbox:
- No direct DOM access
- No network requests
- No file system access

### Audit Logging

All commands are logged:
- Command type and parameters
- User ID and session
- Timestamp and result

## Best Practices

### Use Mode

1. Use `query` before `entity.update` to confirm current state
2. Use `ui.notify` for user feedback
3. Handle errors gracefully

### Evolve Mode

1. Use `view.modify` over `view.create` when possible
2. Test rule conditions before deploying
3. Provide undo capability for major changes

## SDK Usage

```typescript
import { PerceptaClient } from '@wegoby/percepta';

const percepta = new PerceptaClient();

// Use Mode
await percepta.entity.create({ type: "Book", data: { ... } });
await percepta.query.list("Book", { filters: { ... } });

// Evolve Mode
await percepta.view.modify({ id: "list", changes: { ... } });
await percepta.rule.create({ ... });
```
