# Engine Template Library

Layout patterns for miniapp screens.

## Overview

Templates are pre-built page layouts that define the overall structure of a screen. They are:
- Configurable for different content
- Responsive by default
- Consistent across miniapps

## Available Templates

### Grid Template

Multi-column card layout.

```typescript
{
  layout: 'grid',
  config: {
    columns: { mobile: 2, tablet: 3, desktop: 4 },
    gap: 'md',
    padding: 'lg',
  }
}
```

**Use cases**: Library, recipes, menus

### List Template

Single-column item list.

```typescript
{
  layout: 'list',
  config: {
    gap: 'sm',
    dividers: true,
    padding: 'md',
  }
}
```

**Use cases**: Groceries, search results, history

### Reader Template

Full-width content display.

```typescript
{
  layout: 'reader',
  config: {
    maxWidth: '4xl',
    padding: 'xl',
    typography: 'prose',
  }
}
```

**Use cases**: Reading view, recipe details

### Form Template

Input form layout.

```typescript
{
  layout: 'form',
  config: {
    maxWidth: '2xl',
    padding: 'lg',
    labelPosition: 'top',
  }
}
```

**Use cases**: Add recipe, edit settings

### Onboarding Template

Step-by-step wizard.

```typescript
{
  layout: 'onboarding',
  config: {
    showProgress: true,
    showBack: true,
    maxWidth: '2xl',
  }
}
```

**Use cases**: Miniapp onboarding, initial setup

### Dashboard Template

Stats and widgets grid.

```typescript
{
  layout: 'dashboard',
  config: {
    columns: { mobile: 1, tablet: 2, desktop: 3 },
    gap: 'lg',
  }
}
```

**Use cases**: Stats view, overview screens

## Template + Widgets

Templates define layout, widgets fill the content:

```typescript
// Library Screen
{
  layout: 'grid',
  widgets: [
    { type: 'Header', config: { ... } },
    { type: 'BookGrid', config: { ... } },
  ]
}

// Reading Screen
{
  layout: 'reader',
  widgets: [
    { type: 'Header', config: { ... } },
    { type: 'ReadingContent', config: { ... } },
  ]
}
```

## Responsive Behavior

All templates automatically adapt:

| Breakpoint | Width | Behavior |
|------------|-------|----------|
| Mobile | < 640px | Single column, stacked |
| Tablet | 640-1024px | Two columns where appropriate |
| Desktop | > 1024px | Full layout |

## Evolve Mode

Templates can be changed via Evolve Mode:

```typescript
// Change library from grid to list
view.setLayout({
  viewId: 'library',
  layout: 'list',
})
```

## Common Options

All templates support:

| Option | Type | Description |
|--------|------|-------------|
| `padding` | string | Content padding (sm, md, lg, xl) |
| `maxWidth` | string | Maximum content width |
| `gap` | string | Gap between elements |
| `background` | string | Background color/style |

## Related

- Engine Overview: [../README.md](../README.md)
- Widgets: [../widgets/README.md](../widgets/README.md)
- Miniapp Anatomy: [../miniapp-anatomy.md](../miniapp-anatomy.md)
