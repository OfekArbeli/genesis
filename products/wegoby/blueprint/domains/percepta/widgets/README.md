# Percepta Widget Library

Pre-built UI components for miniapps.

## Overview

Widgets are the building blocks of Percepta UI. They are:
- Configurable via JSON
- Themeable via design tokens
- Accessible by default
- Responsive across devices

## Widget Categories

### Input Widgets

| Widget | Purpose |
|--------|---------|
| `button` | Clickable action trigger |
| `input` | Text input field |
| `select` | Dropdown selection |
| `checkbox` | Boolean toggle |
| `radio` | Single selection from options |
| `slider` | Range input |
| `date-picker` | Date selection |

### Display Widgets

| Widget | Purpose |
|--------|---------|
| `text` | Static or dynamic text |
| `card` | Content container |
| `badge` | Status indicator |
| `avatar` | User/entity image |
| `icon` | Symbolic indicator |
| `progress` | Progress indicator |
| `stat` | Numeric statistic |

### Layout Widgets

| Widget | Purpose |
|--------|---------|
| `container` | Basic wrapper |
| `stack` | Vertical/horizontal stack |
| `grid` | Grid layout |
| `divider` | Visual separator |
| `spacer` | Empty space |

### Feedback Widgets

| Widget | Purpose |
|--------|---------|
| `toast` | Temporary notification |
| `modal` | Dialog overlay |
| `spinner` | Loading indicator |
| `skeleton` | Content placeholder |
| `empty-state` | No content message |

## Widget Configuration

Each widget accepts a configuration object:

```json
{
  "widget": "button",
  "props": {
    "label": "Add Book",
    "variant": "primary",
    "size": "md",
    "onClick": {
      "command": "entity.create",
      "params": { "type": "Book" }
    }
  }
}
```

## Common Props

All widgets support:

| Prop | Type | Description |
|------|------|-------------|
| `id` | string | Unique identifier |
| `className` | string | Additional CSS classes |
| `style` | object | Inline styles |
| `visible` | boolean | Visibility control |
| `testId` | string | Testing identifier |

## Theming

Widgets use design tokens:

```json
{
  "widget": "button",
  "props": {
    "variant": "primary"
  }
}
```

Maps to tokens:
- `button.primary.background` → `colors.primary`
- `button.primary.text` → `colors.white`
- `button.primary.border` → `colors.primary`

## Accessibility

All widgets include:
- ARIA attributes
- Keyboard navigation
- Focus management
- Screen reader support

## Creating Custom Widgets

Custom widgets can be defined in miniapp configs:

```json
{
  "customWidgets": {
    "streak-badge": {
      "extends": "badge",
      "defaultProps": {
        "variant": "success",
        "icon": "flame"
      },
      "computed": {
        "label": "{{streak}} day streak"
      }
    }
  }
}
```
