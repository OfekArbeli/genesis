# Percepta Template Library

Higher-level UI patterns for miniapps.

## Overview

Templates are pre-built page layouts that combine widgets into common patterns. They are:
- Configurable for different entities
- Responsive by default
- Consistent across miniapps

## Available Templates

### List Template

Filterable, sortable list of items.

```json
{
  "template": "list",
  "config": {
    "entity": "Book",
    "title": "My Reading List",
    "filters": [
      { "field": "status", "type": "select" }
    ],
    "sort": {
      "default": { "field": "updatedAt", "order": "desc" },
      "options": ["title", "author", "progress"]
    },
    "itemTemplate": {
      "title": "{{title}}",
      "subtitle": "{{author}}",
      "badge": "{{status}}"
    },
    "actions": ["edit", "delete"]
  }
}
```

### Detail Template

Single entity detail view.

```json
{
  "template": "detail",
  "config": {
    "entity": "Book",
    "sections": [
      {
        "title": "Book Info",
        "fields": ["title", "author", "pages"]
      },
      {
        "title": "Progress",
        "widgets": ["progress-bar", "stats"]
      }
    ],
    "actions": ["edit", "delete", "share"]
  }
}
```

### Dashboard Template

Stats and widgets grid.

```json
{
  "template": "dashboard",
  "config": {
    "title": "Reading Stats",
    "widgets": [
      { "widget": "stat", "query": "booksRead", "position": { "row": 1, "col": 1 } },
      { "widget": "stat", "query": "streak", "position": { "row": 1, "col": 2 } },
      { "widget": "chart", "query": "weeklyProgress", "position": { "row": 2, "col": 1, "span": 2 } }
    ]
  }
}
```

### Form Template

Multi-step data entry.

```json
{
  "template": "form",
  "config": {
    "entity": "Book",
    "steps": [
      {
        "title": "Basic Info",
        "fields": ["title", "author"]
      },
      {
        "title": "Details",
        "fields": ["pages", "genre", "notes"]
      }
    ],
    "onSubmit": {
      "command": "entity.create",
      "successMessage": "Book added!"
    }
  }
}
```

### Calendar Template

Date-based view.

```json
{
  "template": "calendar",
  "config": {
    "entity": "ReadingSession",
    "dateField": "date",
    "views": ["month", "week", "day"],
    "defaultView": "week",
    "itemTemplate": {
      "title": "{{book.title}}",
      "subtitle": "{{pagesRead}} pages"
    }
  }
}
```

### Checklist Template

Todo-style list.

```json
{
  "template": "checklist",
  "config": {
    "entity": "ReadingGoal",
    "checkField": "completed",
    "itemTemplate": {
      "title": "{{title}}",
      "subtitle": "Due: {{dueDate}}"
    },
    "groupBy": "category"
  }
}
```

## Template Configuration

### Common Options

All templates support:

| Option | Type | Description |
|--------|------|-------------|
| `title` | string | Page/section title |
| `entity` | string | Primary entity type |
| `actions` | array | Available actions |
| `empty` | object | Empty state configuration |

### Responsive Behavior

Templates automatically adapt:
- Mobile: Single column, stacked
- Tablet: Two column where appropriate
- Desktop: Full layout

### Theming

Templates inherit theme from:
1. Global branding tokens
2. Persona preferences
3. Miniapp overrides

## Custom Templates

Define custom templates in miniapp config:

```json
{
  "customTemplates": {
    "reading-session": {
      "extends": "detail",
      "sections": [
        {
          "title": "Session",
          "widgets": ["timer", "page-tracker"]
        }
      ]
    }
  }
}
```
