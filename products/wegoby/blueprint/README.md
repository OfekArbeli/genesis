# Wegoby Blueprint

> **The Product Specification** — Defines WHAT Wegoby is.

---

## Identity

| Property | Value |
|----------|-------|
| **Product** | Wegoby |
| **Tagline** | "An adaptive chat-app experience that evolves with you—built for maximum personalization that shapes the app around you in real time." |
| **Vision** | Redefine the internet experience for the AI era |
| **Philosophy** | Maximum personalization — experiences that evolve with you and shape the app around you |

---

## Core Systems

| System | Role | Description |
|--------|------|-------------|
| **Sensetree** | Feeling | Empathic AI trained on deep user personas |
| **Percepta** | Doing | Adaptive UI engine that brings insights to life |
| **Miniapps** | Expressions | `to-*` products (to-read, to-eat, etc.) |

---

## Structure

```
blueprint/
├── branding/                  # Visual identity
│   ├── assets/                # Logo, favicon, images
│   ├── colors.json
│   ├── typography.json
│   ├── gradients.json
│   ├── images.json
│   ├── i18n.json
│   └── identity.json
├── domains/                   # Domain specifications
│   ├── sensetree/             # Empathic AI specs
│   ├── percepta/              # Adaptive UI specs
│   └── schemas/               # Data models
├── identity/                  # Vision, mission, values
├── specs/                     # Product-specific specifications
│   ├── packages/
│   ├── projects/
│   └── miniapps/
├── stack.json                 # Tech stack decisions
└── README.md                  # THIS FILE
```

---

## Brand Voice

| Trait | Meaning |
|-------|---------|
| **Confident** | We know what we're building and why |
| **Friendly** | Approachable, not intimidating |
| **Innovative** | Pushing boundaries of what's possible |

---

## Values

| Value | Expression |
|-------|------------|
| **Adaptive** | Experiences that evolve |
| **Personal** | Tailored to each user |
| **Empathic** | Understanding, not guessing |

---

## Domains

### Sensetree

| Aspect | Description |
|--------|-------------|
| **What** | Empathic AI that "experiences" like users |
| **Foundation** | Emotional Intelligence (EI) research |
| **Output** | Persona data, preferences, recommendations |

### Percepta

| Aspect | Description |
|--------|-------------|
| **What** | Adaptive UI engine |
| **Components** | Renderer, State, Events, Widgets, Templates |
| **AI Interface** | Command API (entity, view, rule, ui) |

---

## Miniapps

Format: `to-{action}` products running on Percepta.

| Miniapp | Domain | Status |
|---------|--------|--------|
| `to-read` | Reading | Planned |
| `to-eat` | Meal planning | Planned |
| `to-note` | Note-taking | Planned |

---

## Pure Specification

The blueprint is **pure specification**. No operational content here.

| What | Where |
|------|-------|
| Product specification | Here (blueprint/) |
| Work items, tasks | workspace/ |
| How to build | @genesis/meta |
| Actual code | repos/ (gitignored) |

---

## Related

| Layer | Location | Purpose |
|-------|----------|---------|
| Feta | `../../packages/feta/` | Blueprint framework |
| Meta | `../../packages/meta/` | Workflows and HOW to work |
| Workspace | `../workspace/` | Operational workspace |
