# Packages

Shared packages — reusable code across Wegoby projects.

**Note**: Package repositories are gitignored. Only this README is committed to the meta layer.

## Overview

Packages are published libraries that:
- Share code between projects
- Follow semantic versioning
- Are published to npm (scoped: `@wegoby/*`)

## Package Categories

### 1. Core Packages

Foundation packages used by all projects.

| Package | Description |
|---------|-------------|
| `@wegoby/types` | Shared TypeScript types |
| `@wegoby/utils` | Common utilities |
| `@wegoby/config` | Shared configuration |

### 2. UI Packages

Design system and components.

| Package | Description |
|---------|-------------|
| `@wegoby/ui` | Component library |
| `@wegoby/tokens` | Design tokens |
| `@wegoby/icons` | Icon library |

### 3. Integration Packages

SDKs for Wegoby services.

| Package | Description |
|---------|-------------|
| `@wegoby/sensetree` | Sensetree client SDK |
| `@wegoby/percepta` | Percepta integration |

### 4. Tool Packages

Development and build tools.

| Package | Description |
|---------|-------------|
| `@wegoby/eslint-config` | ESLint configuration |
| `@wegoby/prettier-config` | Prettier configuration |
| `@wegoby/tsconfig` | TypeScript configuration |

## Package Structure

```
packages/@wegoby/utils/
├── README.md           # Package documentation
├── package.json        # Package manifest
├── tsconfig.json       # TypeScript config
├── src/
│   ├── index.ts        # Public exports
│   └── ...
├── tests/
└── dist/               # Built output (gitignored)
```

## Package Guidelines

### Extraction Criteria

Extract to a package when:
- ✅ 2+ projects need the same code
- ✅ Logic is domain-agnostic
- ✅ Pure functions, no side effects
- ✅ Utility nature (validation, formatting)
- ✅ Stable API, rarely changes

### Keep in Project When:
- ❌ Business-specific logic
- ❌ Single project usage
- ❌ UI-coupled code
- ❌ Frequently changing requirements

### Versioning

Follow semantic versioning:
- **Major**: Breaking changes
- **Minor**: New features, backward compatible
- **Patch**: Bug fixes

### Publishing

```bash
# Build
pnpm build

# Test
pnpm test

# Publish
pnpm publish --access public
```

## Getting Started

Clone a package:

```bash
cd packages/@wegoby
gh repo clone wegoby/utils utils
```

Link for local development:

```bash
cd packages/@wegoby/utils
pnpm link --global

# In consuming project
pnpm link --global @wegoby/utils
```

## Package Development

### Creating a New Package

1. Create repository: `gh repo create wegoby/{package-name}`
2. Clone to packages folder
3. Set up package structure
4. Add to relevant projects

### Testing

All packages must have:
- Unit tests (100% coverage for utilities)
- Integration tests (if applicable)
- Type tests (for TypeScript packages)

## Related

- Projects: `projects/`
- Linting configs: `.cursor/rules/instructions/dev.mdc`
