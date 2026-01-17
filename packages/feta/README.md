# @genesis/feta

> **The Blueprint Framework** — Defines HOW to write a product blueprint.

---

## What is Feta?

Feta is a framework that defines the structure and schema for product blueprints. It provides:

- **Schemas** — JSON schemas that validate blueprint structure
- **Templates** — Starter files for creating new blueprints

A blueprint defines **WHAT** a product is — not how to work on it (that's Meta's job).

---

## Blueprint Structure

Every product blueprint should follow this structure:

```
blueprint/
├── branding/                  # Visual identity
│   ├── assets/                # Logo, favicon, images
│   ├── colors.json            # Color palette
│   ├── typography.json        # Font definitions
│   ├── gradients.json         # Gradient definitions
│   ├── images.json            # Image references
│   ├── i18n.json              # Localization config
│   └── identity.json          # Brand identity
├── domains/                   # Domain specifications
│   ├── {domain}/              # Each domain gets a folder
│   └── schemas/               # Shared data schemas
├── identity/                  # Product identity
│   └── identity.mdc           # Vision, mission, values
├── specs/                     # Product specifications
│   ├── packages/              # Package specs
│   ├── projects/              # Project specs
│   └── {custom}/              # Product-specific specs
├── stack.json                 # Technology stack
└── README.md                  # Blueprint documentation
```

**Note:** Operational items like `backlog/` and `tasks/` belong in `workspace/`, not the blueprint. Workspace structure is defined by @genesis/meta.

---

## Creating a New Blueprint

1. Create a `blueprint/` folder in your product
2. Copy templates from `templates/` as starting points
3. Fill in product-specific content
4. Validate against schemas (optional)

---

## Schemas

| Schema | Purpose |
|--------|---------|
| `blueprint.schema.json` | Root blueprint validation |
| `branding.schema.json` | Branding folder structure |
| `domain.schema.json` | Domain folder structure |
| `stack.schema.json` | Stack.json format |

---

## Templates

| Template | Purpose |
|----------|---------|
| `README.template.md` | Blueprint README starter |
| `identity.template.md` | Identity file starter |
| `stack.template.json` | Stack.json starter |

---

## Product Structure

A complete product uses both Feta (blueprint) and Meta (workspace):

```
products/{product}/
├── blueprint/           # Shaped by @genesis/feta (WHAT)
├── workspace/           # Shaped by @genesis/meta (HOW)
├── research/            # Research findings
├── repos/               # Implementation (gitignored)
└── package.json
```

---

## Related

| Package | Purpose |
|---------|---------|
| `@genesis/meta` | Defines workspace structure, workflows, rules |
