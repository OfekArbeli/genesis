# Miniapps

Wegoby miniapps — adaptive AI-powered applications.

**Note**: Miniapp repositories are gitignored. Only this README is committed to the meta layer.

## Overview

Miniapps are `to-*` named applications that:
- Run on the shared Percepta engine
- Are configurations, not codebases
- Adapt to user personas via Sensetree

## Naming Convention

All miniapps follow the `to-{action}` pattern:
- `to-read` — Reading tracker and AI book generation
- `to-note` — Note-taking and knowledge management
- `to-eat` — Meal planning and recipes
- `to-train` — Fitness tracking and workouts

## Structure

Each miniapp is a separate repository containing:

```
to-read/
├── config.json           # App configuration
├── domain.json           # Entity definitions
├── views/                # View configurations
│   ├── reading-list.json
│   ├── book-detail.json
│   └── stats-dashboard.json
├── rules/                # Business rules
│   ├── streak.json
│   └── goals.json
├── persona/              # Persona questions
│   └── questions.json
└── assets/               # App-specific assets
    └── icons/
```

## Miniapp Configuration Schema

### config.json

```json
{
  "id": "to-read",
  "name": "To Read",
  "version": "1.0.0",
  "description": "Your personalized reading companion",
  "icon": "book",
  "defaultView": "reading-list",
  "features": {
    "ai-generation": true,
    "persona-onboarding": true,
    "offline-mode": true
  },
  "locales": ["en", "he"]
}
```

### domain.json

```json
{
  "entities": {
    "Book": {
      "fields": {
        "title": { "type": "string", "required": true },
        "author": { "type": "string" },
        "totalPages": { "type": "number" },
        "currentPage": { "type": "number", "default": 0 },
        "status": { "type": "enum", "values": ["want", "reading", "done"] }
      },
      "computed": {
        "progress": "currentPage / totalPages"
      }
    },
    "ReadingSession": {
      "fields": {
        "bookId": { "type": "reference", "entity": "Book" },
        "pagesRead": { "type": "number" },
        "date": { "type": "date" },
        "duration": { "type": "number" }
      }
    }
  },
  "queries": {
    "streak": {
      "description": "Current reading streak",
      "returnType": "number"
    },
    "weeklyProgress": {
      "description": "Pages read this week",
      "params": { "week": "string" },
      "returnType": "object"
    }
  }
}
```

### View Configuration

```json
{
  "id": "reading-list",
  "template": "list",
  "config": {
    "entity": "Book",
    "title": "My Reading List",
    "filters": [
      { "field": "status", "type": "select" }
    ],
    "itemTemplate": {
      "title": "{{title}}",
      "subtitle": "{{author}}",
      "progress": "{{progress}}"
    }
  }
}
```

### Rule Configuration

```json
{
  "id": "daily-streak",
  "trigger": "daily",
  "time": "00:00",
  "condition": "query('todaysSessions').length > 0",
  "actions": [
    { "type": "increment", "target": "streak" }
  ],
  "elseActions": [
    { "type": "reset", "target": "streak", "value": 0 }
  ]
}
```

### Persona Questions

```json
{
  "onboarding": [
    {
      "id": "reading-pace",
      "question": "How many pages do you typically read per day?",
      "type": "range",
      "options": { "min": 0, "max": 100, "step": 10 }
    },
    {
      "id": "preferred-time",
      "question": "When do you prefer to read?",
      "type": "select",
      "options": ["Morning", "Afternoon", "Evening", "Before bed"]
    }
  ]
}
```

## Creating a New Miniapp

1. Use the template: `gh repo create wegoby/to-{name} --template wegoby/miniapp-template`
2. Configure `config.json` with app details
3. Define entities in `domain.json`
4. Create views in `views/`
5. Add business rules in `rules/`
6. Define persona questions in `persona/`

## Development

Clone miniapps to this folder:

```bash
cd miniapps
gh repo clone wegoby/to-read
```

Run locally with Percepta:

```bash
pnpm percepta serve to-read
```

## Related

- Engine: `domains/percepta/`
- Persona: `domains/sensetree/`
- Docs: `.cursor/rules/docs/miniapps.mdc`
