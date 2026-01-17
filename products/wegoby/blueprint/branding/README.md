# Branding

Wegoby brand identity — source of truth for all projects.

## Overview

This folder contains brand data files consumed by projects. It is:
- **Data, not implementation** — JSON files, not CSS
- **Source of truth** — Projects derive from these files
- **Version controlled** — Changes tracked and reviewed

## Structure

```
branding/
├── README.md           # This file
├── identity.json       # Name, tagline, mission
├── colors.json         # Color palette
├── typography.json     # Font families and scales
├── gradients.json      # Gradient definitions
├── images.json         # Image style guidelines
├── i18n.json           # Language support
└── assets/             # Brand assets (source of truth)
    ├── logo/           # Logo files (PNG, SVG, AI)
    └── favicon/        # Favicon files (ICO, SVG, PNG)
```

## File Contents

### identity.json

```json
{
  "name": "Wegoby",
  "tagline": "Experience the web your way",
  "mission": "Redefine the internet experience for the AI era",
  "values": ["Adaptive", "Personal", "Empathic"]
}
```

### colors.json

```json
{
  "primary": {
    "DEFAULT": "#8B5CF6",
    "50": "#FAF5FF",
    "100": "#F3E8FF",
    "500": "#8B5CF6",
    "600": "#7C3AED",
    "900": "#4C1D95"
  },
  "secondary": {
    "DEFAULT": "#06B6D4",
    "500": "#06B6D4",
    "600": "#0891B2"
  },
  "accent": {
    "pink": "#EC4899",
    "orange": "#F97316"
  },
  "semantic": {
    "success": "#10B981",
    "warning": "#F59E0B",
    "error": "#EF4444",
    "info": "#3B82F6"
  },
  "neutral": {
    "50": "#FAFAFA",
    "100": "#F4F4F5",
    "900": "#18181B"
  }
}
```

### typography.json

```json
{
  "fonts": {
    "heading": "Bricolage Grotesque",
    "body": "Bricolage Grotesque",
    "mono": "JetBrains Mono"
  },
  "scale": {
    "xs": "0.75rem",
    "sm": "0.875rem",
    "base": "1rem",
    "lg": "1.125rem",
    "xl": "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem"
  },
  "weights": {
    "normal": 400,
    "medium": 500,
    "semibold": 600,
    "bold": 700
  },
  "lineHeights": {
    "tight": 1.25,
    "normal": 1.5,
    "relaxed": 1.75
  }
}
```

### gradients.json

```json
{
  "primary": {
    "from": "#8B5CF6",
    "to": "#06B6D4",
    "direction": "to-r"
  },
  "accent": {
    "from": "#EC4899",
    "to": "#F97316",
    "direction": "to-r"
  },
  "dark": {
    "from": "#1F2937",
    "to": "#111827",
    "direction": "to-b"
  }
}
```

### images.json

```json
{
  "photography": {
    "style": "Natural, authentic, human-centered",
    "filters": "Warm tones, soft contrast",
    "subjects": "People, nature, technology harmony"
  },
  "illustrations": {
    "style": "Minimal, abstract, flowing",
    "colors": "Use brand gradients",
    "themes": "Growth, connection, adaptation"
  },
  "icons": {
    "style": "Outlined, rounded corners",
    "strokeWidth": 2,
    "library": "Lucide"
  }
}
```

### i18n.json

```json
{
  "defaultLocale": "en",
  "supportedLocales": ["en", "he"],
  "locales": {
    "en": {
      "name": "English",
      "direction": "ltr",
      "dateFormat": "MM/DD/YYYY",
      "numberFormat": "1,234.56"
    },
    "he": {
      "name": "עברית",
      "direction": "rtl",
      "dateFormat": "DD/MM/YYYY",
      "numberFormat": "1,234.56"
    }
  }
}
```

## Consumption Guide

### How Projects Use Branding

Projects should:

1. **Import data files** at build time
2. **Generate CSS/tokens** from data
3. **Never hardcode values** — always reference

### Tailwind Config Example

```javascript
// tailwind.config.js in a project
const colors = require('../../branding/colors.json');
const typography = require('../../branding/typography.json');

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        // ...
      },
      fontFamily: {
        heading: [typography.fonts.heading],
        body: [typography.fonts.body],
      }
    }
  }
}
```

### CSS Variables Example

```css
/* Generated from branding/colors.json */
:root {
  --color-primary: #8B5CF6;
  --color-primary-50: #FAF5FF;
  --color-primary-500: #8B5CF6;
  /* ... */
}
```

### Component Usage

```tsx
// Always use tokens, never hardcode
<Button className="bg-primary text-white">
  Click me
</Button>

// ❌ Never do this
<Button className="bg-[#8B5CF6] text-white">
  Click me
</Button>
```

## Updating Branding

1. Edit the relevant JSON file
2. Create PR with changes
3. Projects automatically update on next build

## Related

- Docs: `.cursor/rules/docs/branding.mdc`
- Design instructions: `.cursor/rules/instructions/design.mdc`
