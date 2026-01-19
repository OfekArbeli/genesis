# Universal Blocks

> The 8 building blocks of all Wegoby experiences.

---

## Overview

Blocks are **universal, policy-aware UI components**. They:

- Accept data (entities)
- Respect policies (density, pace, tone, etc.)
- Know nothing about business logic
- Are composable into any experience

```
┌─────────────────────────────────────────────────────────────┐
│                    THE 8 BLOCKS                              │
│                                                             │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐              │
│  │  Hero  │ │  List  │ │  Card  │ │Timeline│              │
│  └────────┘ └────────┘ └────────┘ └────────┘              │
│                                                             │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐              │
│  │Compare │ │Insight │ │Action  │ │ Empty  │              │
│  │        │ │        │ │  Dock  │ │        │              │
│  └────────┘ └────────┘ └────────┘ └────────┘              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Block Catalog

### 1. Hero

**Purpose**: Primary focal point with headline and context.

**When to use**:
- Start of an experience
- Introducing a single item
- Setting context

**Data slots**:
```typescript
{
  title: string;
  subtitle?: string;
  image?: string;
  badge?: string;
  context?: string;  // "Based on your preferences"
}
```

**Policy effects**:
| Policy | Effect |
|--------|--------|
| `density: low` | Large image, minimal text |
| `density: high` | Compact, more text visible |
| `tone: warm` | Friendly copy |
| `verbosity: minimal` | Title only |

---

### 2. List

**Purpose**: Display collection of items.

**When to use**:
- Browsing content
- Search results
- Multi-item selection

**Data slots**:
```typescript
{
  items: Array<{
    id: string;
    title: string;
    subtitle?: string;
    image?: string;
    metadata?: Record<string, any>;
  }>;
  emptyMessage?: string;
}
```

**Policy effects**:
| Policy | Effect |
|--------|--------|
| `density: low` | Large cards, few visible |
| `density: high` | Compact rows, many visible |
| `chunking: small` | Show 3-5 items at a time |
| `chunking: large` | Show 10+ items |

**Variants**: Grid mode, List mode, Carousel mode

---

### 3. Card

**Purpose**: Single item with hierarchy.

**When to use**:
- Detail view of single item
- Recommendation result
- Generated content

**Data slots**:
```typescript
{
  title: string;
  subtitle?: string;
  image?: string;
  body?: string;
  sections?: Array<{
    heading: string;
    content: string | string[];
  }>;
  footer?: string;
  actions?: Action[];
}
```

**Policy effects**:
| Policy | Effect |
|--------|--------|
| `density: low` | Spacious, one section visible |
| `verbosity: detailed` | All sections expanded |
| `pace: calm` | Reveal sections progressively |

---

### 4. Timeline

**Purpose**: Sequence, history, or progression.

**When to use**:
- Recipe steps
- Reading progress
- Activity history
- Meal planning

**Data slots**:
```typescript
{
  items: Array<{
    id: string;
    title: string;
    description?: string;
    timestamp?: string;
    status?: 'completed' | 'current' | 'upcoming';
    duration?: string;
  }>;
  orientation?: 'vertical' | 'horizontal';
}
```

**Policy effects**:
| Policy | Effect |
|--------|--------|
| `pace: fast` | All steps visible |
| `pace: calm` | One step at a time |
| `chunking: small` | 2-3 steps visible |

---

### 5. Compare

**Purpose**: Side-by-side evaluation.

**When to use**:
- Comparing 2-3 options
- Decision support
- Trade-off visualization

**Data slots**:
```typescript
{
  items: Array<{
    id: string;
    title: string;
    image?: string;
    attributes: Record<string, any>;
  }>;
  highlightWinner?: boolean;
  comparisonCriteria?: string[];
}
```

**Policy effects**:
| Policy | Effect |
|--------|--------|
| `confidence: assertive` | Clear winner highlighted |
| `confidence: cautious` | Neutral presentation |
| `autonomy: system-led` | Recommendation prominent |

---

### 6. Insight

**Purpose**: AI-generated summary or observation.

**When to use**:
- Explaining a recommendation
- Summarizing content
- Providing context

**Data slots**:
```typescript
{
  text: string;
  icon?: string;
  type?: 'info' | 'recommendation' | 'warning' | 'tip';
  expandable?: boolean;
  source?: string;  // "Based on your reading history"
}
```

**Policy effects**:
| Policy | Effect |
|--------|--------|
| `tone: neutral` | Factual, informational |
| `tone: warm` | Friendly, encouraging |
| `tone: playful` | Light, possibly humorous |
| `confidence: assertive` | "You'll love this" |
| `confidence: cautious` | "You might enjoy this" |

---

### 7. ActionDock

**Purpose**: Available actions for current context.

**When to use**:
- Bottom of detail views
- After generation
- Decision points

**Data slots**:
```typescript
{
  actions: Array<{
    id: string;
    label: string;
    icon?: string;
    type: 'primary' | 'secondary' | 'destructive';
    disabled?: boolean;
  }>;
  layout?: 'row' | 'stack';
}
```

**Policy effects**:
| Policy | Effect |
|--------|--------|
| `ctaStrength: soft` | Subtle buttons, text links |
| `ctaStrength: clear` | Visible buttons |
| `ctaStrength: urgent` | Prominent, attention-grabbing |
| `autonomy: system-led` | Primary action emphasized |

---

### 8. Empty

**Purpose**: Placeholder for missing data, loading, or transitions.

**When to use**:
- No results
- Loading state
- First-time empty state
- Between transitions

**Data slots**:
```typescript
{
  type: 'loading' | 'empty' | 'error' | 'transition';
  title?: string;
  message?: string;
  icon?: string;
  action?: {
    label: string;
    id: string;
  };
}
```

**Policy effects**:
| Policy | Effect |
|--------|--------|
| `tone: warm` | Encouraging empty state |
| `pace: calm` | Slower loading animation |

---

## Block Composition

Blocks combine into experiences:

### Recipe Detail (to-eat)
```
Hero (recipe image + title)
Insight (why we recommend this)
Timeline (cooking steps)
ActionDock (save, share, scale)
```

### Book Library (to-read)
```
Hero (welcome message)
List (books in library)
ActionDock (create, filter)
```

### Menu Scan Result (to-eat)
```
Hero (restaurant name)
List (menu items with highlights)
Insight (recommendations based on preferences)
ActionDock (save menu, order)
```

---

## Policy Application

Blocks receive resolved policies from the Experience Plan:

```typescript
interface BlockProps<T> {
  data: T;
  policies: ResolvedPolicies;
  actions?: Action[];
}

// Block renders differently based on policies
function Card({ data, policies }: BlockProps<CardData>) {
  const className = cn(
    'card',
    policies.density === 'low' && 'card--spacious',
    policies.density === 'high' && 'card--compact',
  );
  // ...
}
```

---

## Related

- Experience Plan: [plan-schema.json](./plan-schema.json)
- Block Mapper: [block-mapper.md](./block-mapper.md)
- Engine Widgets: [../engine/widgets/](../engine/widgets/)
