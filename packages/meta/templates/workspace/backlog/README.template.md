# Backlog

> Work items organized by type.

---

## Structure

```
backlog/
├── features/         # New functionality
├── bugs/             # Bug reports
├── improvements/     # Tech debt, refactoring
├── archive/          # Completed items
└── README.md         # THIS FILE
```

---

## Task Format

Each task file follows this format:

```markdown
# {task-id}

## Goal
What success looks like (1-2 sentences)

## Context
Why this matters, background info, relevant links

## Scope
- [ ] Specific deliverable 1
- [ ] Specific deliverable 2
- [ ] Specific deliverable 3

## Meta
- Priority: high | medium | low
- Type: feature | bugfix | refactor | docs
- Estimate: small | medium | large
```

---

## Task ID Format

`{uuid}-{short-name}`

Example: `a1b2c3d4-add-book-generation`

---

## Workflow

```
backlog/{type}/{task}.md → workspace/tasks/{task-id}/ → backlog/archive/{task}.md
       (planned)                    (active)                    (completed)
```
