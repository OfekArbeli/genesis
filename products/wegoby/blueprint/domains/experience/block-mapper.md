# Block Mapper

> Entity × Intent → Block mapping rules.

---

## Overview

The Block Mapper determines which blocks to use based on:
- **Entity type**: What kind of data (Book, Recipe, Menu)
- **Intent**: What the user wants to do
- **Policies**: How to present it

```
┌─────────────────────────────────────────────────────────────┐
│                    BLOCK MAPPING                             │
│                                                             │
│   Entity Type + Intent                                      │
│            │                                                │
│            ▼                                                │
│   ┌──────────────────────────────────────────────────────┐ │
│   │              BLOCK MAPPER                             │ │
│   │                                                       │ │
│   │   Recipe + BrowseRecipes → [Hero, List<Card>]        │ │
│   │   Recipe + DeepDive → [Hero, Card, Timeline]         │ │
│   │   Menu + ScanMenu → [Hero, List, Insight]            │ │
│   │                                                       │ │
│   └──────────────────────────────────────────────────────┘ │
│            │                                                │
│            ▼                                                │
│   Block Configuration for Experience Plan                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Mapping Rules

### to-read Mappings

| Entity | Intent | Blocks |
|--------|--------|--------|
| Book | BrowseLibrary | `Hero`, `List<Card>` |
| Book | DeepDive | `Hero`, `Card`, `Timeline`, `ActionDock` |
| Book | ContinueReading | `Hero`, `Timeline` (progress) |
| Book[] | DiscoverNew | `Hero`, `List<Card>`, `Insight` |
| Book | CreateBook | `Hero`, `Card` (preview), `ActionDock` |

### to-eat Mappings

| Entity | Intent | Blocks |
|--------|--------|--------|
| Recipe | BrowseRecipes | `Hero`, `List<Card>` |
| Recipe | DeepDive | `Hero`, `Card`, `Timeline` (steps), `ActionDock` |
| Recipe | DecideNow | `Hero`, `Card`, `Insight`, `ActionDock` |
| Recipe | CreateRecipe | `Hero`, `Card`, `Timeline`, `ActionDock` |
| Menu | ScanMenu | `Hero`, `List<Card>`, `Insight`, `ActionDock` |
| GroceryList | ManageGroceries | `List`, `ActionDock` |
| MealPlan | PlanMeals | `Timeline`, `Card`, `ActionDock` |

---

## Global Intent Mappings

These apply regardless of entity type:

| Intent | Default Blocks |
|--------|---------------|
| Browse | `Hero`, `List` |
| Search | `List`, `Empty` (no results) |
| DeepDive | `Hero`, `Card`, `ActionDock` |
| Create | `Hero`, `Card` (preview), `ActionDock` |
| Refine | `Card`, `ActionDock` |
| Compare | `Compare`, `Insight`, `ActionDock` |
| Save | `Card` (confirmation) |

---

## Entity → Card Mapping

When entities render as Card blocks, this defines the slot mapping:

### Book → Card
```typescript
{
  title: book.title,
  subtitle: book.author,
  image: book.coverImage,
  body: book.description,
  sections: [
    { heading: "Genre", content: book.genre },
    { heading: "Progress", content: `${book.progress}%` }
  ],
  footer: book.readingTime
}
```

### Recipe → Card
```typescript
{
  title: recipe.title,
  subtitle: recipe.cuisine,
  image: recipe.image,
  body: recipe.description,
  sections: [
    { heading: "Ingredients", content: recipe.ingredients },
    { heading: "Time", content: recipe.prepTime + recipe.cookTime }
  ],
  footer: `${recipe.servings} servings`
}
```

### MenuItem → Card
```typescript
{
  title: item.name,
  subtitle: item.price,
  image: null,  // menus rarely have images
  body: item.description,
  sections: [
    { heading: "Contains", content: item.allergens }
  ],
  badge: item.recommended ? "Recommended" : null
}
```

---

## Policy-Driven Variations

Same entity × intent can produce different blocks based on policies:

### Recipe + DeepDive

**With `verbosity: minimal`**:
```
Hero (title + image)
ActionDock (quick actions only)
```

**With `verbosity: detailed`**:
```
Hero (title + image + description)
Card (full ingredients, nutrition)
Timeline (detailed steps with tips)
Insight (why this matches you)
ActionDock (all actions)
```

### Book + BrowseLibrary

**With `density: low`**:
```
Hero (welcome)
List<Card> (large cards, 4 visible)
```

**With `density: high`**:
```
List<Card> (compact rows, 12 visible)
ActionDock (filter, sort)
```

---

## Conditional Blocks

Some blocks appear only under certain conditions:

```typescript
const blocks = [
  { type: "Hero", data: "recipe" },
  { type: "Card", data: "recipe" },
  {
    type: "Insight",
    data: "recommendation",
    condition: "data.confidence > 0.7"  // Only if high confidence
  },
  {
    type: "Compare",
    data: "alternatives",
    condition: "data.alternatives.length > 1"  // Only if alternatives exist
  },
  { type: "ActionDock", data: "actions" }
];
```

---

## Custom Block Composition

The Experience Planner can override default mappings for specific experiences:

```typescript
// Planner decides: for "quick decision" context, simplify blocks
if (context.mood.urgency === "urgent") {
  return [
    { type: "Card", data: "topRecommendation" },
    { type: "ActionDock", data: "quickActions" }
  ];
}
```

---

## Implementation

The Block Mapper is a pure function:

```typescript
function mapBlocks(
  entityType: string,
  intent: string,
  policies: ResolvedPolicies,
  context?: ContextSnapshot
): BlockInstance[] {
  // 1. Get default mapping for entity × intent
  const defaultBlocks = MAPPING_TABLE[entityType]?.[intent]
    ?? GLOBAL_MAPPING[intent]
    ?? [{ type: "Card" }];

  // 2. Apply policy modifications
  const policyAdjusted = applyPolicyVariations(defaultBlocks, policies);

  // 3. Apply context modifications
  const contextAdjusted = applyContextVariations(policyAdjusted, context);

  return contextAdjusted;
}
```

---

## Related

- Blocks: [blocks.md](./blocks.md)
- Experience Plan: [plan-schema.json](./plan-schema.json)
- Intent Taxonomy: [../intent/taxonomy.json](../intent/taxonomy.json)
