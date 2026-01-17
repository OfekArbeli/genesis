# {{PRODUCT_NAME}} Blueprint

> **The Product Specification** — Defines WHAT {{PRODUCT_NAME}} is.

---

## Identity

| Property | Value |
|----------|-------|
| **Product** | {{PRODUCT_NAME}} |
| **Tagline** | "{{TAGLINE}}" |
| **Vision** | {{VISION}} |
| **Philosophy** | {{PHILOSOPHY}} |

---

## Core Systems

| System | Role | Description |
|--------|------|-------------|
| **{{SYSTEM_1}}** | {{ROLE_1}} | {{DESCRIPTION_1}} |
| **{{SYSTEM_2}}** | {{ROLE_2}} | {{DESCRIPTION_2}} |

---

## Structure

```
blueprint/
├── branding/                  # Visual identity
│   ├── assets/                # Logo, favicon, images
│   ├── colors.json
│   ├── typography.json
│   └── ...
├── domains/                   # Domain specifications
│   └── schemas/               # Data models
├── identity/                  # Vision, mission, values
├── specs/                     # Product-specific specifications
├── stack.json                 # Tech stack decisions
└── README.md                  # THIS FILE
```

---

## Brand Voice

| Trait | Meaning |
|-------|---------|
| **{{TRAIT_1}}** | {{MEANING_1}} |
| **{{TRAIT_2}}** | {{MEANING_2}} |
| **{{TRAIT_3}}** | {{MEANING_3}} |

---

## Values

| Value | Expression |
|-------|------------|
| **{{VALUE_1}}** | {{EXPRESSION_1}} |
| **{{VALUE_2}}** | {{EXPRESSION_2}} |

---

## Pure Specification

The blueprint is **pure specification**. No operational content here.

| What | Where |
|------|-------|
| Product specification | Here (blueprint/) |
| Work items, tasks | workspace/ (shaped by @genesis/meta) |
| How to build | @genesis/meta |
| Actual code | repos/ (gitignored) |
