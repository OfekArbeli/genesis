# Renderer

> Experience Plan + Data → UI Output

---

## Overview

The Renderer converts an Experience Plan into rendered UI. It has **no smart logic** — it follows the plan deterministically.

```
┌─────────────────────────────────────────────────────────────┐
│                    RENDERER PIPELINE                         │
│                                                             │
│   Experience Plan                                           │
│        │                                                    │
│        ▼                                                    │
│   ┌──────────────────────────────────────────────────────┐ │
│   │ 1. BLOCK RESOLUTION                                   │ │
│   │    Plan blocks → Widget implementations              │ │
│   └──────────────────────────────────────────────────────┘ │
│        │                                                    │
│        ▼                                                    │
│   ┌──────────────────────────────────────────────────────┐ │
│   │ 2. POLICY APPLICATION                                 │ │
│   │    Policies → Widget props and styles                │ │
│   └──────────────────────────────────────────────────────┘ │
│        │                                                    │
│        ▼                                                    │
│   ┌──────────────────────────────────────────────────────┐ │
│   │ 3. DATA BINDING                                       │ │
│   │    Data slots → Widget data props                    │ │
│   └──────────────────────────────────────────────────────┘ │
│        │                                                    │
│        ▼                                                    │
│   ┌──────────────────────────────────────────────────────┐ │
│   │ 4. LAYOUT COMPOSITION                                 │ │
│   │    Stages → Screens, Blocks → Layout positions       │ │
│   └──────────────────────────────────────────────────────┘ │
│        │                                                    │
│        ▼                                                    │
│   ┌──────────────────────────────────────────────────────┐ │
│   │ 5. STYLING                                            │ │
│   │    Design tokens → CSS/styles                        │ │
│   └──────────────────────────────────────────────────────┘ │
│        │                                                    │
│        ▼                                                    │
│   UI Output                                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Input

```typescript
interface RenderInput {
  plan: ExperiencePlan;
  data: Record<string, Entity | Entity[]>;
  tokens: DesignTokens;
  viewport: {
    width: number;
    height: number;
    type: 'mobile' | 'tablet' | 'desktop';
  };
}
```

---

## 1. Block Resolution

Map abstract blocks to concrete widget implementations.

```typescript
const blockToWidget: Record<string, WidgetComponent> = {
  'Hero': HeroWidget,
  'List': ListWidget,
  'Card': CardWidget,
  'Timeline': TimelineWidget,
  'Compare': CompareWidget,
  'Insight': InsightWidget,
  'ActionDock': ActionDockWidget,
  'Empty': EmptyWidget,
};

// Special cases based on entity type
function resolveWidget(block: BlockInstance, data: Entity | Entity[]) {
  if (block.type === 'Card' && data?.type === 'Recipe') {
    return RecipeCard;  // Domain-specific widget
  }
  if (block.type === 'Card' && data?.type === 'Book') {
    return BookCard;    // Domain-specific widget
  }
  return blockToWidget[block.type];
}
```

---

## 2. Policy Application

Convert policies to concrete rendering decisions.

```typescript
function applyPolicies(policies: ResolvedPolicies): WidgetStyles {
  return {
    // Density
    spacing: policies.density === 'low' ? 'spacious' :
             policies.density === 'high' ? 'compact' : 'normal',
    itemsPerRow: policies.density === 'low' ? 2 :
                 policies.density === 'high' ? 4 : 3,

    // Verbosity
    showDescription: policies.verbosity !== 'minimal',
    showMetadata: policies.verbosity === 'detailed',
    textLength: policies.verbosity === 'minimal' ? 'truncated' : 'full',

    // Pace
    animation: policies.pace === 'fast' ? 'none' :
               policies.pace === 'calm' ? 'slow' : 'normal',
    progressiveReveal: policies.pace === 'calm',

    // Tone
    copyStyle: policies.tone,  // 'neutral' | 'warm' | 'playful'

    // CTA Strength
    buttonStyle: policies.ctaStrength,  // 'soft' | 'clear' | 'urgent'

    // Confidence
    recommendationEmphasis: policies.confidence === 'assertive' ? 'strong' :
                            policies.confidence === 'cautious' ? 'subtle' : 'normal',
  };
}
```

---

## 3. Data Binding

Connect data to widget props.

```typescript
function bindData(block: BlockInstance, resolvedData: Record<string, any>) {
  const dataKey = block.data;
  const data = resolvedData[dataKey];

  // Apply block-specific data transformation
  switch (block.type) {
    case 'Hero':
      return {
        title: data.title,
        subtitle: data.subtitle,
        image: data.image,
        context: block.props?.context,
      };
    case 'List':
      return {
        items: Array.isArray(data) ? data : [data],
        emptyMessage: block.props?.emptyMessage,
      };
    case 'Card':
      return mapEntityToCard(data);
    // ... etc
  }
}
```

---

## 4. Layout Composition

Arrange widgets according to stage and position.

```typescript
function composeLayout(plan: ExperiencePlan, widgets: WidgetInstance[]) {
  const layout = {
    type: inferLayoutType(plan),
    sections: [],
  };

  for (const stage of plan.stages) {
    const section = {
      id: stage.id,
      title: stage.title,
      blocks: stage.blocks.map(block => ({
        widget: widgets.find(w => w.id === block.id),
        position: block.position ?? 'main',
      })),
    };
    layout.sections.push(section);
  }

  return layout;
}

function inferLayoutType(plan: ExperiencePlan) {
  const hasTimeline = plan.stages.some(s =>
    s.blocks.some(b => b.type === 'Timeline'));
  const hasSidebar = plan.stages.some(s =>
    s.blocks.some(b => b.position === 'sidebar'));

  if (hasSidebar) return 'split';
  if (hasTimeline) return 'full-screen';
  return 'full-screen';
}
```

---

## 5. Styling

Apply design tokens to produce final styles.

```typescript
function applyTokens(tokens: DesignTokens, miniapp: string) {
  return {
    colors: {
      primary: tokens.colors.primary,
      accent: tokens.miniapps[miniapp]?.accent ?? tokens.colors.accent,
      background: tokens.colors.background,
      text: tokens.colors.text,
    },
    typography: {
      heading: tokens.fonts.heading,
      body: tokens.fonts.body,
      scale: tokens.fontScale,
    },
    spacing: tokens.spacing,
    borderRadius: tokens.borderRadius,
    shadows: tokens.shadows,
  };
}
```

---

## Render Targets

The renderer handles multiple output targets:

### Screen

Full UI rendering:
```typescript
if (plan.renderTarget === 'screen') {
  return renderFullScreen(layout, styles);
}
```

### Chat

Inline chat components:
```typescript
if (plan.renderTarget === 'chat') {
  return renderChatMessage(layout, styles);
}
```

### Hybrid

Mix of chat and screen:
```typescript
if (plan.renderTarget === 'hybrid') {
  return {
    chatPreview: renderChatMessage(layout.stages[0], styles),
    fullView: renderFullScreen(layout, styles),
  };
}
```

---

## Caching

Rendered output can be cached when:
- Plan has `cacheable: true`
- Data has not changed (by hash)
- Policies have not changed

```typescript
const cacheKey = hash(plan.id, plan.version, dataHash);
if (cache.has(cacheKey)) {
  return cache.get(cacheKey);
}
```

---

## No Smart Logic

The Renderer NEVER:
- Makes decisions about what to show
- Fetches data
- Interprets user intent
- Chooses between alternatives

It ONLY:
- Follows the plan exactly
- Applies policies deterministically
- Produces consistent output

All intelligence lives in the Experience Planner.

---

## Related

- Experience Plan: [../experience/plan-schema.json](../experience/plan-schema.json)
- Blocks: [../experience/blocks.md](../experience/blocks.md)
- Widgets: [widgets/README.md](./widgets/README.md)
- Design Tokens: [../../branding/](../../branding/)
