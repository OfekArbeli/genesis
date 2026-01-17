# Genesis

> **The God Orchestration Layer** — Where WHAT (Feta) and HOW (Meta) unite to shape products.

---

## Architecture

```
                PRODUCT ENGINEER (Actor)
                        │
        ┌───────────────┴───────────────┐
        ▼                               ▼
┌──────────────┐                ┌──────────────┐
│     FETA     │                │     META     │
│    Father    │                │    Mother    │
│ packages/feta│                │ packages/meta│
│    (WHAT)    │                │    (HOW)     │
└──────┬───────┘                └──────┬───────┘
       │                               │
       │ shapes                        │ shapes
       ▼                               ▼
┌──────────────┐                ┌──────────────┐
│  blueprint/  │                │  workspace/  │
│  - branding  │                │  - backlog   │
│  - domains   │                │  - tasks     │
│  - identity  │                │  - .cursor   │
│  - specs     │                │              │
└──────┬───────┘                └──────┬───────┘
       │                               │
       └───────────┬───────────────────┘
                   ▼
           ┌─────────────┐
           │   PRODUCT   │
           │ products/*/ │
           └─────────────┘
```

---

## Structure

```
genesis/
├── packages/
│   ├── feta/                 # @genesis/feta - Blueprint Framework
│   │   ├── schemas/          # JSON schemas for blueprint validation
│   │   └── templates/        # Template files for new blueprints
│   │
│   └── meta/                 # @genesis/meta - Workflows & Rules
│       ├── .cursor/          # Rules and commands
│       └── templates/        # Workspace and task templates
│
├── products/
│   └── wegoby/               # Wegoby Product
│       ├── blueprint/        # Product specification (shaped by Feta)
│       ├── workspace/        # Operational (shaped by Meta)
│       ├── research/         # Research findings
│       └── repos/            # Implementation code (gitignored)
│
├── package.json              # Monorepo configuration
├── pnpm-workspace.yaml       # Workspace definition
└── README.md                 # THIS FILE
```

---

## Layers

| Layer | Path | Role | Provides |
|-------|------|------|----------|
| **Genesis** | `./` | God | Project orchestration |
| **Feta** | `packages/feta/` | Father | Blueprint structure (WHAT) |
| **Meta** | `packages/meta/` | Mother | Workspace structure (HOW) |
| **Products** | `products/*/` | Children | Product implementations |

---

## Product Anatomy

Each product has two main folders shaped by the parent packages:

```
products/{product}/
├── blueprint/           # Shaped by @genesis/feta
│   ├── branding/        # Visual identity
│   ├── domains/         # System specifications
│   ├── identity/        # Vision, mission
│   ├── specs/           # Product specs
│   └── stack.json       # Tech stack
│
├── workspace/           # Shaped by @genesis/meta
│   ├── .cursor/         # Product-specific rules
│   ├── backlog/         # Work items
│   └── tasks/           # Active tasks
│
├── research/            # Research findings
├── repos/               # Implementation (gitignored)
└── package.json
```

---

## Where to Act

| Intent | Layer | Read |
|--------|-------|------|
| Change the system itself | Genesis | This file |
| Change HOW blueprints work | Feta | `packages/feta/README.md` |
| Change HOW to work | Meta | `packages/meta/README.md` |
| Change WHAT to build | Product blueprint | `products/*/blueprint/README.md` |
| Work on tasks | Product workspace | `products/*/workspace/README.md` |
| Write implementation | Product repos | Blueprint + Meta rules |

---

## Creating a New Product

To bootstrap a new product:

1. **Create product folder**: `products/{product-name}/`
2. **Create blueprint**: Copy templates from `packages/feta/templates/`
3. **Create workspace**: Copy templates from `packages/meta/templates/workspace/`
4. **Add package.json**: Depend on `@genesis/feta` and `@genesis/meta`
5. **Fill content**: Product-specific details

---

## Packages

| Package | Name | Purpose |
|---------|------|---------|
| `packages/feta/` | @genesis/feta | Defines blueprint structure (WHAT) |
| `packages/meta/` | @genesis/meta | Defines workspace structure (HOW) |

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Packages are linked automatically via workspaces
```

---

## DNA Files

| Layer | DNA File |
|-------|----------|
| Feta | `packages/feta/README.md` |
| Meta | `packages/meta/README.md` |
| Product | `products/*/blueprint/README.md` |
