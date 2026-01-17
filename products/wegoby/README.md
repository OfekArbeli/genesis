# Wegoby

> **Product Repository** — Where Wegoby comes to life.

---

## Structure

```
wegoby/
├── blueprint/          # Product specification (WHAT) — shaped by @genesis/feta
│   ├── branding/       # Visual identity
│   ├── domains/        # System specifications
│   ├── identity/       # Vision, mission, values
│   ├── specs/          # Product specifications
│   └── stack.json      # Tech stack
│
├── workspace/          # Operational (HOW) — shaped by @genesis/meta
│   ├── .cursor/        # Product-specific cursor rules
│   ├── backlog/        # Work items
│   └── tasks/          # Active task workspaces
│
├── research/           # Research findings
├── repos/              # Implementation code (gitignored)
├── package.json        # Dependencies
└── README.md           # THIS FILE
```

---

## Layers

| Folder | Shaped By | Purpose |
|--------|-----------|---------|
| `blueprint/` | @genesis/feta | Defines WHAT Wegoby is |
| `workspace/` | @genesis/meta | Defines HOW to work on it |
| `repos/` | — | Implementation code |

---

## Blueprint

The `blueprint/` folder contains the product specification:
- **What** Wegoby is (identity, vision)
- **How** it should look (branding)
- **Which** systems to build (domains)

See: [blueprint/README.md](blueprint/README.md)

---

## Workspace

The `workspace/` folder contains operational structures:
- **Backlog** of work items
- **Tasks** in progress
- **Cursor rules** for this product

See: [workspace/README.md](workspace/README.md)

---

## Research

The `research/` folder contains research findings that inform the blueprint.

---

## Implementation

The `repos/` folder (gitignored) is where actual code lives.

---

## Related

| Package | Purpose |
|---------|---------|
| `@genesis/feta` | Defines blueprint structure |
| `@genesis/meta` | Provides workflows, rules, workspace structure |
