# Miniapp Anatomy

> **How miniapps are structured** — Configuration patterns for Wegoby miniapps.

---

## Overview

A miniapp is a self-contained application within Wegoby. Each miniapp has:

- **Config** — Metadata and capabilities
- **Screens** — Views and navigation
- **Entities** — Data types it manages
- **Context** — Per-screen preferences (from Context domain)
- **Onboarding** — Persona questions (from Persona domain)

---

## Miniapp Config

```typescript
interface MiniappConfig {
  // Identity
  id: string;                    // Unique ID: 'to-read', 'to-eat'
  name: string;                  // Display name: 'to-read', 'to-eat'
  icon: string;                  // Lucide icon: 'BookOpen', 'Utensils'
  accentColor: string;           // Signature color: '#C3B1E1'

  // Navigation
  screens: string[];             // Screen IDs
  defaultScreen: string | 'user-selected';

  // Data
  entities: string[];            // Entity types managed
  dataSharing?: {                // Per-entity sharing rules
    [entity: string]: 'personal' | 'household';
  };

  // Capabilities
  features: {
    personaOnboarding: boolean;  // Has onboarding questionnaire
    aiGeneration: boolean;       // AI can create content
  };

  // Content sources
  contentSources: {
    aiGenerated: boolean;        // "Create a book for me"
    urlImport: boolean;          // "Import this recipe URL"
    photoImport: boolean;        // "Scan this menu"
    manual: boolean;             // Manual entry
  };
}
```

---

## Example: to-read

```typescript
const toReadConfig: MiniappConfig = {
  id: 'to-read',
  name: 'to-read',
  icon: 'BookOpen',
  accentColor: '#C3B1E1',

  screens: ['onboarding', 'library', 'reading'],
  defaultScreen: 'library',

  entities: ['Book', 'ReadingSession'],
  dataSharing: {
    Book: 'personal',
    ReadingSession: 'personal',
  },

  features: {
    personaOnboarding: true,
    aiGeneration: true,
  },

  contentSources: {
    aiGenerated: true,           // AI writes books
    urlImport: false,
    photoImport: false,
    manual: false,
  },
};
```

---

## Example: to-eat

```typescript
const toEatConfig: MiniappConfig = {
  id: 'to-eat',
  name: 'to-eat',
  icon: 'Utensils',
  accentColor: '#A7D1AB',

  screens: ['onboarding', 'recipes', 'groceries', 'menus'],
  defaultScreen: 'user-selected',  // User chooses their home screen

  entities: ['Recipe', 'GroceryList', 'GroceryItem', 'Menu', 'Restaurant'],
  dataSharing: {
    Recipe: 'personal',
    GroceryList: 'household',      // Shared with family
    GroceryItem: 'household',
    Menu: 'personal',
    Restaurant: 'personal',
  },

  features: {
    personaOnboarding: true,
    aiGeneration: true,
  },

  contentSources: {
    aiGenerated: true,             // "Create a recipe for dinner"
    urlImport: true,               // "Import this recipe from URL"
    photoImport: true,             // "Scan this menu"
    manual: true,                  // Type in a recipe
  },
};
```

---

## Screen Structure

Each screen defines its UI:

```typescript
interface ScreenConfig {
  id: string;                      // 'library', 'recipes'
  title: string;                   // 'My Library', 'Recipes'
  contextKey: string;              // Links to Context: 'to-read-library'

  layout: string;                  // Template: 'grid', 'list', 'reader'
  widgets: WidgetConfig[];         // UI components

  modifiable: string[];            // What Evolve can change
}
```

### Example: Library Screen

```typescript
const libraryScreen: ScreenConfig = {
  id: 'library',
  title: 'My Library',
  contextKey: 'to-read-library',

  layout: 'grid',
  widgets: [
    {
      type: 'Header',
      config: {
        title: 'to-read',
        subtitle: 'My Library',
        showFilter: true,
        showViewToggle: true,
      }
    },
    {
      type: 'BookGrid',
      config: {
        columns: { mobile: 2, tablet: 3, desktop: 4 },
        showProgress: true,
        showStatus: true,
      }
    },
  ],

  modifiable: ['widgets', 'layout'],
};
```

---

## Entity Types

Common entity patterns:

### Content Entity (Book, Recipe)
```typescript
interface ContentEntity {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  // Content-specific fields
}
```

### Progress Entity (ReadingSession)
```typescript
interface ProgressEntity {
  id: string;
  contentId: string;             // Reference to content
  progress: number;              // 0-100
  lastAccessed: Date;
  // Progress-specific fields
}
```

### List Entity (GroceryList)
```typescript
interface ListEntity {
  id: string;
  name: string;
  items: ListItem[];
  sharedWith?: string[];         // User IDs for household sharing
}
```

---

## Navigation Patterns

### Fixed Default
```typescript
defaultScreen: 'library'         // Always starts here
```

### User-Selected Default
```typescript
defaultScreen: 'user-selected'   // User picks their home screen
```

When `user-selected`:
1. First launch shows screen picker
2. User selects preferred default
3. Selection stored in preferences
4. Can be changed in settings

---

## Content Sources

### AI Generated
```
User: "Create a book about space exploration"
AI: Generates book content using persona preferences
```

### URL Import
```
User: "Import this recipe: https://..."
AI: Fetches URL, extracts recipe, creates entity
```

### Photo Import (OCR)
```
User: [Attaches photo of restaurant menu]
AI: Processes image, extracts menu items, creates Menu entity
```

### Manual Entry
```
User: Opens "Add Recipe" form
User: Types in recipe details
System: Creates Recipe entity
```

---

## Data Sharing

### Personal (default)
- Data belongs to single user
- Not visible to others

### Household
- Data shared with household members
- Changes sync across members
- Example: Grocery list

```typescript
dataSharing: {
  GroceryList: 'household',
  GroceryItem: 'household',
  Recipe: 'personal',
}
```

---

## Related

- Engine Overview: [README.md](./README.md)
- Command API: [command-api.md](./command-api.md)
- Widgets: [widgets/README.md](./widgets/README.md)
- Templates: [templates/README.md](./templates/README.md)
