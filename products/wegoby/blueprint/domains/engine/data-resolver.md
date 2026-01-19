# Data Resolver

> Data requirements → Normalized entities

---

## Overview

The Data Resolver fetches and normalizes data declared in Experience Plans. It's the bridge between what the Planner needs and what the database has.

```
┌─────────────────────────────────────────────────────────────┐
│                    DATA RESOLVER                             │
│                                                             │
│   Experience Plan                                           │
│   dataRequirements: [                                       │
│     { key: "recipes", type: "Recipe", query: {...} },       │
│     { key: "user", type: "User", query: { id: "current" } } │
│   ]                                                         │
│        │                                                    │
│        ▼                                                    │
│   ┌──────────────────────────────────────────────────────┐ │
│   │                 DATA RESOLVER                         │ │
│   │                                                       │ │
│   │   1. Parse requirements                               │ │
│   │   2. Route to data sources                           │ │
│   │   3. Execute queries                                  │ │
│   │   4. Normalize to Entity format                      │ │
│   │   5. Cache results                                    │ │
│   │                                                       │ │
│   └──────────────────────────────────────────────────────┘ │
│        │                                                    │
│        ▼                                                    │
│   Resolved Data                                             │
│   {                                                         │
│     recipes: [Entity, Entity, ...],                        │
│     user: Entity                                           │
│   }                                                         │
│        │                                                    │
│        ▼                                                    │
│   Renderer                                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Principles

### 1. Resolver Doesn't Know UI

The Data Resolver never knows:
- Which blocks will use the data
- How it will be displayed
- What policies are active

It only knows:
- What data is requested
- Where to get it
- How to normalize it

### 2. Planner Doesn't Know Sources

The Experience Planner never knows:
- Which database to query
- How data is stored
- What API to call

It only knows:
- What entities it needs
- What filters to apply

---

## Data Requirement Format

From Experience Plan:

```typescript
interface DataRequirement {
  key: string;              // Reference key for blocks
  type: string;             // Entity type: "Recipe", "Book", "User"
  query: {
    id?: string;            // Fetch single by ID
    filters?: Record<string, any>;  // Filter conditions
    sort?: string;          // Sort field
    sortOrder?: 'asc' | 'desc';
    limit?: number;         // Max results
    offset?: number;        // Pagination
  };
  required?: boolean;       // Fail if not found?
}
```

---

## Entity Format

Normalized output:

```typescript
interface Entity {
  id: string;               // Unique identifier
  type: string;             // Entity type

  // Type-specific fields
  [key: string]: any;

  // Standard metadata
  meta?: {
    freshness: number;      // 0-1, how recently updated
    confidence: number;     // 0-1, data quality score
    source: string;         // Where this came from
    fetchedAt: string;      // When resolved
  };
}
```

### Example: Recipe Entity

```typescript
{
  id: "recipe-123",
  type: "Recipe",

  title: "Veggie Stir-fry",
  description: "Quick and healthy vegetable stir-fry",
  cuisine: "Asian",
  prepTime: 10,
  cookTime: 15,
  servings: 4,
  ingredients: [
    { name: "broccoli", amount: "2 cups" },
    { name: "carrots", amount: "1 cup" }
  ],
  steps: [
    "Heat oil in wok",
    "Add vegetables",
    "Stir-fry 5 minutes"
  ],
  tags: ["vegetarian", "quick", "healthy"],
  image: "https://...",

  meta: {
    freshness: 1.0,
    confidence: 0.95,
    source: "ai-generated",
    fetchedAt: "2024-01-15T10:30:00Z"
  }
}
```

---

## Resolution Process

### 1. Parse Requirements

```typescript
function parseRequirements(requirements: DataRequirement[]) {
  return requirements.map(req => ({
    ...req,
    resolver: getResolverForType(req.type),
    priority: req.required ? 'high' : 'normal',
  }));
}
```

### 2. Route to Data Sources

Different entity types may have different sources:

```typescript
const resolvers: Record<string, DataSource> = {
  'Recipe': recipeDatabase,
  'Book': bookDatabase,
  'User': userService,
  'MenuItem': menuOCRService,
  'Recommendation': aiRecommendationService,
};
```

### 3. Execute Queries

Queries run in parallel when possible:

```typescript
async function resolveAll(requirements: DataRequirement[]) {
  // Group by resolver for batching
  const grouped = groupByResolver(requirements);

  // Execute in parallel
  const results = await Promise.all(
    Object.entries(grouped).map(([resolver, reqs]) =>
      executeGroup(resolver, reqs)
    )
  );

  // Combine results
  return mergeResults(requirements, results);
}
```

### 4. Normalize to Entity Format

All sources output standard Entity format:

```typescript
function normalizeEntity(raw: any, type: string): Entity {
  return {
    id: raw.id || raw._id || generateId(),
    type: type,
    ...mapFields(raw, type),
    meta: {
      freshness: calculateFreshness(raw.updatedAt),
      confidence: raw.confidence ?? 1.0,
      source: raw.source ?? 'database',
      fetchedAt: new Date().toISOString(),
    }
  };
}
```

### 5. Cache Results

```typescript
const cache = new Map<string, CacheEntry>();

async function resolve(requirement: DataRequirement) {
  const cacheKey = buildCacheKey(requirement);

  if (cache.has(cacheKey)) {
    const entry = cache.get(cacheKey);
    if (!isExpired(entry)) {
      return entry.data;
    }
  }

  const data = await fetchFromSource(requirement);
  cache.set(cacheKey, { data, timestamp: Date.now() });
  return data;
}
```

---

## Query Types

### Single by ID

```typescript
{
  key: "recipe",
  type: "Recipe",
  query: { id: "recipe-123" }
}
// Returns: Entity
```

### List with Filters

```typescript
{
  key: "recipes",
  type: "Recipe",
  query: {
    filters: { vegetarian: true, prepTime: { $lte: 30 } },
    sort: "rating",
    sortOrder: "desc",
    limit: 10
  }
}
// Returns: Entity[]
```

### Current User

```typescript
{
  key: "user",
  type: "User",
  query: { id: "current" }  // Special value
}
// Returns: Entity (current authenticated user)
```

### Recommendations

```typescript
{
  key: "recommendations",
  type: "Recommendation",
  query: {
    forUser: "current",
    entityType: "Recipe",
    limit: 5
  }
}
// Returns: Entity[] with confidence scores
```

---

## Error Handling

### Required Data Missing

```typescript
if (requirement.required && !result) {
  throw new DataNotFoundError(
    `Required data not found: ${requirement.key}`
  );
}
```

### Partial Results

Non-required data returns null without failing:

```typescript
{
  key: "recommendations",
  type: "Recommendation",
  required: false  // Will be null if service unavailable
}
```

### Fallbacks

```typescript
{
  key: "recipes",
  type: "Recipe",
  query: { filters: {...} },
  fallback: {
    type: "Recipe",
    query: {}  // All recipes if filters match nothing
  }
}
```

---

## Performance

### Batching

Multiple queries to same source are batched:

```typescript
// These two requirements...
{ key: "recipe1", type: "Recipe", query: { id: "r1" } }
{ key: "recipe2", type: "Recipe", query: { id: "r2" } }

// ...become one database call:
SELECT * FROM recipes WHERE id IN ('r1', 'r2')
```

### Parallel Execution

Independent queries run in parallel:

```typescript
// These run simultaneously
await Promise.all([
  recipeDatabase.query(...),
  userService.get(...),
  aiService.recommend(...)
]);
```

### Caching

Results are cached with configurable TTL:

| Entity Type | Default TTL | Notes |
|-------------|-------------|-------|
| User | 5 min | Can change often |
| Recipe | 1 hour | Stable content |
| Book | 1 hour | Stable content |
| Recommendation | 15 min | Based on changing context |

---

## Related

- Experience Plan: [../experience/plan-schema.json](../experience/plan-schema.json)
- Renderer: [renderer.md](./renderer.md)
- Engine Overview: [README.md](./README.md)
