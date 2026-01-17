# @genesis/meta

> **The Mother Layer** — Product-agnostic orchestration system for AI-native R&D teams.

---

## Identity

| Property | Value |
|----------|-------|
| **Role** | Mother layer |
| **Purpose** | Define HOW to work, not WHAT to build |
| **Scope** | Product-agnostic — works for any SaaS |
| **Users** | Product engineers, AI agents |

## Core Principle

> **If you could copy this to a completely different SaaS project and it would still make sense, it belongs in Meta.**

---

## What Meta Provides

### 1. Rules & Commands (`.cursor/`)

Cursor rules and commands for AI-native development:

```
.cursor/
├── rules/
│   ├── core/              # Always-applied rules
│   ├── instructions/      # Full R&D playbook
│   └── docs/              # Meta-level documentation
└── commands/
    ├── actions/           # Single operations
    ├── flows/             # Orchestrated actions
    └── pipelines/         # End-to-end workflows
```

### 2. Workspace Structure (`templates/workspace/`)

Templates for product workspaces:

```
workspace/
├── .cursor/              # Product-specific rules
├── backlog/              # Work items
│   ├── features/
│   ├── bugs/
│   ├── improvements/
│   └── archive/
└── tasks/                # Active task workspaces
```

### 3. Shared Configurations

- `templates/` — Task templates, scaffolds
- `linters/` — Shared lint configs

---

## R&D Playbook

The meta layer provides instructions for the **full R&D team**, not just developers.

### Disciplines

| File | Discipline | Responsibility |
|------|------------|----------------|
| `product.mdc` | Product | Features, specs, prioritization, roadmaps |
| `research.mdc` | Research | User research, market analysis, synthesis |
| `personas.mdc` | Personas | User personas, empathy mapping, modeling |
| `ux.mdc` | UX | User experience, flows, journeys |
| `design.mdc` | UI | Interface design, components, layouts |
| `branding.mdc` | Branding | Brand systems, identity, guidelines |
| `content.mdc` | Content | Copy, terminology, messaging |
| `architecture.mdc` | Architecture | System design, technical decisions |
| `dev.mdc` | Development | Code standards, patterns, practices |
| `testing.mdc` | Testing | Test strategies, QA, coverage |
| `git.mdc` | Git | Version control, branching, commits |
| `planning.mdc` | Planning | Task breakdown, estimation, scoping |
| `shipping.mdc` | Shipping | Deployment, releases, launches |
| `reflection.mdc` | Reflection | Learning, retrospectives, improvement |
| `task.mdc` | Task Management | Task lifecycle, formats, workflows |

---

## Commands

### Actions (Level 1)

| Command | Purpose |
|---------|---------|
| `/create-task` | Create a new task |
| `/research` | Gather context |
| `/plan` | Create implementation plan |
| `/implement` | Execute the plan |
| `/validate` | Run checks |
| `/commit` | Commit changes |
| `/reflect` | Compare plan vs outcome |
| `/contribute` | Extract learnings |

### Flows (Level 2)

| Flow | Orchestrates | Purpose |
|------|--------------|---------|
| `/prepare` | research → plan | Get ready to implement |
| `/ship` | validate → commit → push | Ship completed work |
| `/learn` | reflect → contribute | Capture learnings |

### Pipelines (Level 3)

| Pipeline | Full Flow |
|----------|-----------|
| `/do {task-id}` | prepare → implement → ship → learn |

---

## Product Structure

A complete product uses both Meta (workspace) and Feta (blueprint):

```
products/{product}/
├── blueprint/           # Shaped by @genesis/feta (WHAT)
├── workspace/           # Shaped by @genesis/meta (HOW)
│   ├── .cursor/         # Product-specific rules
│   ├── backlog/         # Work items
│   └── tasks/           # Active tasks
├── research/            # Research findings
├── repos/               # Implementation (gitignored)
└── package.json
```

---

## Related

| Layer | Location | Purpose |
|-------|----------|---------|
| Feta | `../feta/` | Father layer — blueprint framework |
| Products | `../../products/*/` | Product implementations |
