# Engine Widget Library

Pre-built UI components for miniapps.

## Overview

Widgets are the building blocks of the Engine UI. They are:
- Configurable via JSON
- Themeable via design tokens
- Accessible by default
- Responsive across devices

## Miniapp-Specific Widgets

### to-read Widgets

| Widget | Purpose |
|--------|---------|
| `BookCard` | Book with cover, title, progress |
| `BookGrid` | Grid of BookCards |
| `ReadingContent` | Text display with settings |
| `ChapterNav` | Previous/next chapter buttons |
| `ProgressBar` | Reading progress indicator |

### to-eat Widgets

| Widget | Purpose |
|--------|---------|
| `RecipeCard` | Recipe with image, time, difficulty |
| `RecipeGrid` | Grid of RecipeCards |
| `GroceryList` | Checklist with categories |
| `GroceryItem` | Single item with checkbox |
| `MenuCard` | Restaurant menu display |

## Common Widgets

### Input Widgets

| Widget | Purpose |
|--------|---------|
| `Button` | Clickable action trigger |
| `Input` | Text input field |
| `Select` | Dropdown selection |
| `Checkbox` | Boolean toggle |
| `Slider` | Range input |
| `SearchBar` | Search input with icon |

### Display Widgets

| Widget | Purpose |
|--------|---------|
| `Header` | Title, subtitle, actions |
| `Card` | Content container |
| `Badge` | Status indicator |
| `Avatar` | User/entity image |
| `Icon` | Symbolic indicator |
| `Progress` | Progress indicator |
| `EmptyState` | No content message |

### Layout Widgets

| Widget | Purpose |
|--------|---------|
| `Container` | Basic wrapper |
| `Stack` | Vertical/horizontal stack |
| `Grid` | Grid layout |
| `Divider` | Visual separator |

### Feedback Widgets

| Widget | Purpose |
|--------|---------|
| `Toast` | Temporary notification |
| `Modal` | Dialog overlay |
| `Spinner` | Loading indicator |
| `Skeleton` | Content placeholder |

### Navigation Widgets

| Widget | Purpose |
|--------|---------|
| `BottomNav` | Bottom navigation with chat button |
| `BackButton` | Navigation back |
| `ViewToggle` | Grid/list view switcher |
| `FilterButton` | Filter trigger |

## Widget Configuration

Each widget accepts a configuration object:

```typescript
interface WidgetConfig {
  type: string;
  config: Record<string, any>;
}
```

### Example: Header

```typescript
{
  type: 'Header',
  config: {
    title: 'to-read',
    subtitle: 'My Library',
    showFilter: true,
    showViewToggle: true,
    actions: [
      { icon: 'Plus', onClick: 'openAddModal' }
    ]
  }
}
```

### Example: BookGrid

```typescript
{
  type: 'BookGrid',
  config: {
    columns: { mobile: 2, tablet: 3, desktop: 4 },
    showProgress: true,
    showStatus: true,
    emptyState: {
      icon: 'Plus',
      title: 'Your library is empty',
      subtitle: 'Want me to suggest a book?',
      action: { label: 'Add Your First Book', command: 'openAddModal' }
    }
  }
}
```

### Example: SearchBar

```typescript
{
  type: 'SearchBar',
  config: {
    placeholder: 'Search your library...',
    icon: 'Search',
    debounceMs: 300,
  }
}
```

## Theming

Widgets use design tokens from branding:

```typescript
// Button uses accent color
{
  type: 'Button',
  config: {
    variant: 'primary',  // Uses miniapp accent color
    label: 'Add Book',
  }
}
```

Accent colors per miniapp:
- to-read: `#C3B1E1` (light purple)
- to-eat: `#A7D1AB` (mint green)

## Accessibility

All widgets include:
- ARIA attributes
- Keyboard navigation
- Focus management
- Screen reader support

## Evolve Mode

Widgets can be added/removed via Evolve Mode:

```typescript
// Add SearchBar to library screen
view.addWidget({
  viewId: 'library',
  widget: { type: 'SearchBar', config: { ... } },
  position: 1,  // After Header
})

// Remove a widget
view.removeWidget({
  viewId: 'library',
  widgetIndex: 1,
})
```

## Related

- Engine Overview: [../README.md](../README.md)
- Templates: [../templates/README.md](../templates/README.md)
- Command API: [../command-api.md](../command-api.md)
