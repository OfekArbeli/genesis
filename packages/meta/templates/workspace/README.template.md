# {{PRODUCT_NAME}} Workspace

> **Operational workspace** — Where work happens, shaped by @genesis/meta.

---

## Structure

```
workspace/
├── .cursor/              # Product-specific cursor rules
│   └── rules/
├── backlog/              # Work items
│   ├── features/         # Feature requests
│   ├── bugs/             # Bug reports
│   ├── improvements/     # Tech debt, refactoring
│   └── archive/          # Completed items
├── tasks/                # Active task workspaces
│   └── {task-id}/        # One folder per active task
└── README.md             # THIS FILE
```

---

## Backlog

Work items waiting to be done. Organized by type.

| Folder | Purpose |
|--------|---------|
| `features/` | New functionality |
| `bugs/` | Bug reports |
| `improvements/` | Tech debt, refactoring |
| `archive/` | Completed items |

---

## Tasks

Active task workspaces. Each task gets its own folder when work begins.

```
tasks/{task-id}/
├── task.json       # Metadata, phase, history
├── context.md      # Research findings
├── plan.md         # Implementation plan
├── decisions.md    # Key decisions
├── journal.md      # Progress log
└── outcome/        # Final artifacts
```

---

## Cursor Rules

Product-specific cursor rules live in `.cursor/rules/`.

These extend the base rules from `@genesis/meta`.

---

## Related

| Layer | Location | Purpose |
|-------|----------|---------|
| Meta | `../../packages/meta/` | Defines workspace structure |
| Blueprint | `../blueprint/` | Product specification |
