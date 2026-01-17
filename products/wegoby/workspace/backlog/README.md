# Backlog

This folder contains all planned tasks for Wegoby projects.

## Structure

```
backlog/
├── README.md           # This file
├── features/           # New functionality
├── bugs/               # Bug reports
├── improvements/       # Tech debt, refactoring
└── archive/            # Completed tasks
```

## Task File Format

Each task file follows the naming convention: `{uuid}-{short-name}.md`

Example: `a1b2c3d4-add-reading-streaks.md`

### Template

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
- Domains: [sensetree, percepta]
- Projects: [to-read]
```

## Task Lifecycle

```
backlog/{id}.md → tasks/{id}/ → backlog/archive/{id}.md
   (planned)       (active)         (completed)
```

## Commands

- `/create-task` - Create a new task
- `/do {task-id}` - Execute a task
- `/help` - See all commands

## Priority Guidelines

- **high**: This week, blocking other work
- **medium**: This sprint, important
- **low**: Backlog, nice to have

## Type Guidelines

- **feature**: New functionality
- **bugfix**: Something is broken
- **refactor**: Code improvement
- **docs**: Documentation update
