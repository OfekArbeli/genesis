# Linters

Shared linting and formatting configurations for Wegoby projects.

## Overview

This folder contains shareable configurations for:
- ESLint — Code linting
- Prettier — Code formatting
- TypeScript — Type checking

## Structure

```
linters/
├── README.md
├── eslint/
│   ├── base.js         # Base ESLint rules
│   ├── react.js        # React-specific rules
│   ├── node.js         # Node.js-specific rules
│   └── typescript.js   # TypeScript-specific rules
├── prettier/
│   └── index.js        # Prettier configuration
└── typescript/
    ├── base.json       # Base tsconfig
    ├── react.json      # React tsconfig
    └── node.json       # Node.js tsconfig
```

## Usage in Projects

### ESLint

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    '../../linters/eslint/base.js',
    '../../linters/eslint/react.js',
    '../../linters/eslint/typescript.js'
  ]
}
```

### Prettier

```javascript
// prettier.config.js
module.exports = require('../../linters/prettier');
```

### TypeScript

```json
// tsconfig.json
{
  "extends": "../../linters/typescript/react.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "include": ["src"]
}
```

## Configuration Principles

### ESLint Rules

**Base rules:**
- No unused variables
- Consistent code style
- Error prevention

**React rules:**
- Hooks rules
- JSX best practices
- Accessibility checks

**TypeScript rules:**
- Strict type checking
- No explicit any (warn)
- Consistent type imports

### Prettier Rules

```javascript
{
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 100
}
```

### TypeScript Settings

```json
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "noImplicitReturns": true
}
```

## Updating Configurations

1. Edit the relevant config file
2. Test in a project
3. Create PR with changes
4. Update all projects after merge

## Related

- Development standards: `.cursor/rules/instructions/dev.mdc`
- Validation rules: `.cursor/rules/core/validation.mdc`
