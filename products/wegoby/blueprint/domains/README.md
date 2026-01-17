# Domains

This folder contains core domain specifications for Wegoby.

**Note**: Domain implementations (inner repos) are gitignored. Only specifications and README files are committed to the meta layer.

## Structure

```
domains/
├── README.md           # This file
├── sensetree/          # Empathic AI (the "feeling" side)
│   ├── research/       # EI theory and research
│   ├── architecture.md # How Sensetree works
│   ├── api-contract.md # API specification
│   └── persona-schema.json
│
├── percepta/           # Adaptive UI Engine (the "doing" side)
│   ├── architecture.md # Runtime + AI + adaptive UI
│   ├── command-api.md  # Command API specification
│   ├── widgets/        # Widget library definitions
│   └── templates/      # Template library definitions
│
└── auth/               # Authentication patterns
```

## Domain Philosophy

### Sensetree
The "feeling" side of Wegoby. Empathic AI trained on deep user personas to approximate inner experience.

### Percepta
The "doing" side of Wegoby. Adaptive UI engine that brings Sensetree's insights to life through runtime + AI operator + adaptive UI.

## Specifications vs Implementations

- **Specifications** (in this folder): Architecture docs, API contracts, schemas
- **Implementations** (in projects/): Actual code, tests, builds

This separation allows:
- Designing before coding
- Clear contracts between systems
- Documentation that lives with specs
