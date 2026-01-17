# Miniapp Onboarding Questions

> **Persona Data Collection** — Questions that feed into the Persona model and generate Context items.

---

## Overview

Each miniapp has an onboarding flow that collects domain-specific preferences. These preferences are:
1. **Stored** in the Persona model (structured data)
2. **Converted** to Context items (natural language for AI)

---

## to-read Miniapp

### Question 1: Story Pace
**Maps to**: `level1.innateAffordances.preferredPace`

| UI | Question |
|----|----------|
| Type | Single select |
| Prompt | "How do you like stories to unfold?" |

| Option | Persona Mapping | Context Generated |
|--------|-----------------|-------------------|
| Slowly and gradually | `preferredPace: "slow"` | "Story pace: Slowly and gradually" |
| Faster, straight into the action | `preferredPace: "fast"` | "Story pace: Faster, straight into the action" |
| Depends on the story | `preferredPace: "moderate"` | "Story pace: Depends on the story" |

---

### Question 2: Reading Breakers
**Maps to**: `level2.somaticMarkers.negativeAssociations`

| UI | Question |
|----|----------|
| Type | Multi-select (max 2) |
| Prompt | "What usually breaks your reading flow?" |

| Option | Persona Mapping |
|--------|-----------------|
| Too much tension | `negativeAssociations: ["high-tension"]` |
| Too much information too fast | `negativeAssociations: ["info-overload"]` |
| Long conversations with no direction | `negativeAssociations: ["aimless-dialogue"]` |
| Stories that don't feel emotional | `negativeAssociations: ["emotionless-narrative"]` |
| Nothing really breaks it | `negativeAssociations: []` |

---

### Question 3: Reading Motivation
**Maps to**: `wrapper.narrativeProcessing.meaningMaking`

| UI | Question |
|----|----------|
| Type | Single select |
| Prompt | "When you read, what matters most to you?" |

| Option | Persona Mapping |
|--------|-----------------|
| Connecting with characters | `meaningMaking: "character-connection"` |
| Exploring ideas | `meaningMaking: "idea-exploration"` |
| Using imagination | `meaningMaking: "imaginative-engagement"` |
| Just relaxing and flowing | `meaningMaking: "relaxation"` |

---

### Question 4: Distance from Reality
**Maps to**: `wrapper.narrativeProcessing.storyPreference`

| UI | Question |
|----|----------|
| Type | Single select |
| Prompt | "When you enter a story, what feels more natural?" |

| Option | Persona Mapping |
|--------|-----------------|
| Staying close to reality | `storyPreference: "realistic"` |
| Going far into imagination | `storyPreference: "fantastical"` |
| Somewhere in between | `storyPreference: "balanced"` |

---

## to-eat Miniapp

### Question 1: Diet Preferences
**Maps to**: `level2.culturalNorms.diet`

| UI | Question |
|----|----------|
| Type | Multi-select |
| Prompt | "Do you have any dietary preferences or restrictions?" |

| Option | Persona Mapping | Context Generated |
|--------|-----------------|-------------------|
| Vegetarian | `diet: ["vegetarian"]` | "User follows vegetarian diet" |
| Vegan | `diet: ["vegan"]` | "User follows vegan diet" |
| Gluten-free | `diet: ["gluten-free"]` | "User avoids gluten" |
| Dairy-free | `diet: ["dairy-free"]` | "User avoids dairy" |
| No restrictions | `diet: []` | (no context item) |

### Question 2: Cooking Comfort
**Maps to**: `wrapper.identity.selfConcept`

| UI | Question |
|----|----------|
| Type | Single select |
| Prompt | "How comfortable are you in the kitchen?" |

| Option | Persona Mapping | Context Generated |
|--------|-----------------|-------------------|
| Just starting out | `cookingLevel: "beginner"` | "User is a beginner cook" |
| Can follow recipes | `cookingLevel: "intermediate"` | "User can follow recipes confidently" |
| Love experimenting | `cookingLevel: "advanced"` | "User enjoys experimenting with cooking" |

### Question 3: Cooking Time
**Maps to**: `level1.innateAffordances.preferredPace`

| UI | Question |
|----|----------|
| Type | Single select |
| Prompt | "How much time do you usually have for cooking?" |

| Option | Persona Mapping | Context Generated |
|--------|-----------------|-------------------|
| Quick meals (under 30 min) | `cookingTime: "quick"` | "User prefers quick meals under 30 minutes" |
| Moderate (30-60 min) | `cookingTime: "moderate"` | "User has moderate time for cooking" |
| I enjoy taking my time | `cookingTime: "relaxed"` | "User enjoys leisurely cooking" |

---

## to-note Miniapp (Planned)

| Question | Options | Maps To |
|----------|---------|---------|
| Note organization style | Folders / Tags / Both | `level4.attentionModel` |
| Note length preference | Short & quick / Detailed & thorough | `level1.preferredPace` |
| Review frequency | Daily / Weekly / When needed | `level4.habitStrength` |

---

## Context Generation

After onboarding, Context items are generated:

```typescript
function generateContextFromOnboarding(
  miniappId: string,
  answers: OnboardingAnswers
): ContextItem[] {
  // Each answer generates a natural language context item
  return answers.map(answer => ({
    layer: answer.contextLayer,  // 'cognition', 'intent', etc.
    text: answer.contextText,    // Human-readable preference
    isBaseline: true,            // Locked (from onboarding)
    source: 'onboarding',
  }));
}
```

---

## Related

- Persona Schema: [schema.json](./schema.json)
- Baseline Data: [baseline.json](./baseline.json)
- Context Domain: [../context/](../context/)
