# Active Tasks

This folder contains active task workspaces. Each task gets its own folder when work begins.

**Note**: This folder is gitignored - task workspaces are temporary.

## Structure

When a task becomes active:

```
tasks/{task-id}/
├── task.json        # Task metadata, current phase, history
├── context.md       # Research findings, gathered context
├── plan.md          # Implementation plan with steps
├── decisions.md     # Key decisions and rationale
├── journal.md       # Timestamped progress log
├── outcome/         # Final artifacts, summaries
└── metrics.json     # Time spent, iterations, learnings
```

## Task Lifecycle

```
backlog/{id}.md → tasks/{id}/ → backlog/archive/{id}.md
   (planned)       (active)         (completed)
```

## task.json Format

```json
{
  "id": "a1b2c3d4-add-book-generation",
  "title": "Add book generation to to-read",
  "phase": "implementing",
  "workflowProfile": "full",
  "artifacts": {
    "context": "context.md",
    "plan": "plan.md",
    "decisions": "decisions.md"
  },
  "history": [
    { "phase": "creating", "timestamp": "2026-01-09T10:00:00Z" },
    { "phase": "researching", "timestamp": "2026-01-09T10:05:00Z" }
  ],
  "error": null,
  "resumable": true
}
```

## Phases

```
creating → researching → planning → implementing → shipping → learning → done
```

## Commands

- `/do {task-id}` - Start working on a task
- `/do --resume` - Resume interrupted task
