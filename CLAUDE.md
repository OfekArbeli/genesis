# Genesis - Claude Code Instructions

> This file provides Claude Code with the same context that Cursor receives via `.cursor/` directories.
> The source of truth for all rules lives in `packages/meta/.cursor/` — this file references them.

## Project Overview

**Genesis** is the God Orchestration Layer — where WHAT (Feta) and HOW (Meta) unite to shape products.

| Layer | Path | Role | Purpose |
|-------|------|------|---------|
| Genesis | `./` | God | Project orchestration |
| Feta | `packages/feta/` | Father | Blueprint framework (WHAT to build) |
| Meta | `packages/meta/` | Mother | Workflow & rules system (HOW to work) |
| Products | `products/*/` | Children | Product implementations |

## Important Files to Read

When working on this project, read these key files for context:

### Core Rules (Always Apply)
- [packages/meta/.cursor/rules/core/conventions.mdc](packages/meta/.cursor/rules/core/conventions.mdc) - Naming, commits, code style
- [packages/meta/.cursor/rules/core/workflow.mdc](packages/meta/.cursor/rules/core/workflow.mdc) - Task phases and command flow
- [packages/meta/.cursor/rules/core/validation.mdc](packages/meta/.cursor/rules/core/validation.mdc) - Quality gates

### Documentation
- [packages/meta/.cursor/rules/docs/project-structure.mdc](packages/meta/.cursor/rules/docs/project-structure.mdc) - Project organization
- [packages/meta/.cursor/rules/docs/meta-layer.mdc](packages/meta/.cursor/rules/docs/meta-layer.mdc) - Meta layer overview
- [packages/meta/.cursor/rules/docs/glossary.mdc](packages/meta/.cursor/rules/docs/glossary.mdc) - Terminology

### R&D Playbook (Read as needed)
- [packages/meta/.cursor/rules/instructions/dev.mdc](packages/meta/.cursor/rules/instructions/dev.mdc) - Development practices
- [packages/meta/.cursor/rules/instructions/architecture.mdc](packages/meta/.cursor/rules/instructions/architecture.mdc) - System design
- [packages/meta/.cursor/rules/instructions/testing.mdc](packages/meta/.cursor/rules/instructions/testing.mdc) - Test strategies
- [packages/meta/.cursor/rules/instructions/git.mdc](packages/meta/.cursor/rules/instructions/git.mdc) - Git workflows

### Product-Specific (Wegoby)
- [products/wegoby/workspace/.cursor/rules/docs/](products/wegoby/workspace/.cursor/rules/docs/) - Product context

---

## Quick Reference: Conventions

### Naming

| Type | Convention | Example |
|------|------------|---------|
| Folders | kebab-case | `user-profile/` |
| TypeScript files | camelCase | `userProfile.ts` |
| React components | PascalCase | `UserProfile.tsx` |
| Variables | camelCase | `userName` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_RETRIES` |

### Git Commits

Format: `{type}({scope}): {description}`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

```
feat(auth): add OAuth2 integration
fix(ui): resolve button alignment
```

### Branch Naming

Format: `{type}/{short-description}`

Types: `feature/`, `fix/`, `refactor/`, `docs/`, `hotfix/`

---

## Task Workflow

```
creating → researching → planning → implementing → shipping → learning → done
```

| Profile | Flow | When to Use |
|---------|------|-------------|
| **Full** | research → plan → implement → ship → learn | New features, refactors |
| **Focused** | plan → implement → ship | Medium tasks, clear scope |
| **Quick** | implement → ship | Bug fixes, small tweaks |

---

## Validation Checklist

Before completing any task:

- [ ] All tests pass
- [ ] No TypeScript/type errors
- [ ] Code follows linting rules
- [ ] Feature works as specified
- [ ] Edge cases handled
- [ ] No console errors

### Never Allow
- `// @ts-ignore` without explanation
- `eslint-disable` without justification
- Empty catch blocks
- Commented-out code
- Hardcoded secrets

---

## Code Style

### TypeScript
- Use `const` by default, `let` only when needed
- Avoid `any` — use `unknown` if type is truly unknown
- Use explicit return types for public functions
- Use optional chaining (`?.`) and nullish coalescing (`??`)

### React
- Functional components with hooks
- Keep components small (<100 lines)
- Extract complex logic into custom hooks

### Import Order
1. External libraries
2. Internal packages (`@wegoby/*`)
3. Relative imports
4. Styles

---

## Monorepo Structure

```
genesis/
├── packages/
│   ├── feta/              # Blueprint framework (@genesis/feta)
│   │   ├── schemas/       # JSON schemas for blueprints
│   │   └── templates/     # Blueprint templates
│   └── meta/              # Workflow system (@genesis/meta)
│       ├── .cursor/       # Rules & commands (SOURCE OF TRUTH)
│       └── templates/     # Workspace templates
└── products/
    └── wegoby/            # First product (@genesis/wegoby)
        ├── blueprint/     # WHAT (shaped by Feta)
        ├── workspace/     # HOW (shaped by Meta)
        └── repos/         # Implementation (gitignored)
```

---

## Dual-Tool Compatibility

This project supports both **Cursor** and **Claude Code**:

| Tool | Configuration |
|------|---------------|
| Cursor | `.cursor/rules/` and `.cursor/commands/` directories |
| Claude Code | This `CLAUDE.md` file (references the same rules) |

**Source of truth**: `packages/meta/.cursor/` contains all rules.
Both tools read from the same underlying documentation.
