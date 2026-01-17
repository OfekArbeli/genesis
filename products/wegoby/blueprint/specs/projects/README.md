# Projects

Wegoby project repositories — implementations of domain specifications.

**Note**: Project repositories are gitignored. Only this README is committed to the meta layer.

## Overview

Projects are actual codebases with:
- Source code
- Tests
- Build configurations
- CI/CD pipelines

## Project Types

### 1. Percepta Projects

Adaptive UI engine implementation.

```
projects/percepta/
├── apps/
│   ├── engine/        # Core runtime
│   └── devtools/      # Developer tools
├── packages/
│   ├── core/          # Core library
│   ├── widgets/       # Widget library
│   └── templates/     # Template library
└── tools/
    └── cli/           # CLI tools
```

### 2. Sensetree Projects

Empathic AI implementation.

```
projects/sensetree/
├── apps/
│   ├── api/           # API service
│   └── admin/         # Admin dashboard
├── packages/
│   └── sdk/           # Client SDK
└── ml/
    ├── models/        # ML models
    └── training/      # Training pipelines
```

### 3. Web Projects

Public-facing websites.

```
projects/website/
├── src/
├── public/
└── tests/
```

### 4. Backend Projects

API and services.

```
projects/api/
├── src/
│   ├── routes/
│   ├── services/
│   └── models/
└── tests/
```

## Project Conventions

### Naming

- Use kebab-case for project names
- Prefix with domain: `percepta-engine`, `sensetree-api`

### Structure

Each project should have:

```
project-name/
├── README.md           # Project overview
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
├── .cursor/            # Project-specific rules
│   └── rules/
├── src/                # Source code
├── tests/              # Tests
└── .env.example        # Environment template
```

### Project-Specific Rules

Projects can extend meta-layer rules:

```
projects/percepta/.cursor/rules/
├── project.mdc         # Project-specific context
└── testing.mdc         # Custom test patterns
```

## Getting Started

Clone a project to this folder:

```bash
cd projects
gh repo clone wegoby/percepta
```

Install dependencies:

```bash
cd percepta
pnpm install
```

## Project Independence

Projects are:
- **Self-contained** — Can be developed independently
- **Standards-compliant** — Follow meta-layer conventions
- **Well-documented** — Have their own README
- **Tested** — Include comprehensive test suites

## Related

- Domain specs: `domains/`
- Shared packages: `packages/`
- Docs: `.cursor/rules/docs/project-structure.mdc`
