# Sensetree Architecture

How the empathic AI system works.

## Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      SENSETREE                               │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Persona    │  │  Adaptation  │  │ Preferences  │      │
│  │    Store     │  │    Engine    │  │   Generator  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────────────────────────────────────────┐      │
│  │                    API Layer                      │      │
│  └──────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
                           ↑
         ┌─────────────────┼─────────────────┐
         ↓                 ↓                 ↓
    ┌─────────┐      ┌─────────┐      ┌─────────┐
    │ Percepta│      │ Miniapps│      │ Backend │
    └─────────┘      └─────────┘      └─────────┘
```

## Components

### 1. Persona Store

Stores and retrieves user persona data.

**Responsibilities**:
- CRUD operations on persona data
- Version history tracking
- Privacy controls

**Data Model**:
```typescript
interface PersonaStore {
  getPersona(userId: string): Promise<Persona>;
  updatePersona(userId: string, updates: Partial<Persona>): Promise<Persona>;
  getHistory(userId: string): Promise<PersonaVersion[]>;
}
```

### 2. Adaptation Engine

Processes interactions and updates persona.

**Responsibilities**:
- Analyze user interactions
- Detect patterns and changes
- Update persona dimensions
- Manage temporal decay

**Process Flow**:
```
Interaction Event
       ↓
  Parse & Classify
       ↓
  Extract Signals
       ↓
  Update Dimensions
       ↓
  Propagate Changes
```

### 3. Preferences Generator

Converts persona into actionable preferences.

**Responsibilities**:
- Generate UI preferences from persona
- Recommend content based on persona
- Suggest adaptations to miniapps

**Output Types**:
```typescript
interface Preferences {
  ui: UIPreferences;      // Theme, layout, pacing
  content: ContentPrefs;  // Topics, tone, complexity
  interaction: InteractionPrefs;  // Input, feedback style
}
```

## Data Flow

### Onboarding Flow

```
User Registration
       ↓
Onboarding Questions
       ↓
Initial Persona Creation
       ↓
Store in Persona Store
       ↓
Generate Initial Preferences
```

### Continuous Adaptation

```
User Interaction
       ↓
Event Captured
       ↓
Sent to Adaptation Engine
       ↓
Persona Updated
       ↓
New Preferences Generated
       ↓
Percepta Notified
       ↓
UI Adapts
```

## Persona Levels

### Level 1: Sensorimotor & Virtual Homeostasis

Basic system state tracking:
- Energy/fatigue levels
- Cognitive load
- Attention capacity

### Level 2: Affective Construction & Cultural Priors

Emotional and cultural context:
- Cultural norms
- Emotional patterns
- Communication preferences

### Level 3: Conceptual World-Model

Beliefs and goals:
- Values and priorities
- Goals and aspirations
- Mental models

### Level 4: Attentional Schema

Focus and strategy:
- Attention patterns
- Decision-making style
- Information processing preferences

### Wrapper: Identity & Plasticity

Meta-level characteristics:
- How fast they adapt
- Self-concept
- Openness to change

## Integration Points

### With Percepta

```typescript
// Percepta requests preferences
const prefs = await sensetree.getPreferences(userId, {
  domain: 'to-read',
  context: { currentView: 'reading-list' }
});

// Apply to UI
percepta.applyTheme(prefs.ui.theme);
percepta.setPacing(prefs.ui.pacing);
```

### With Miniapps

```typescript
// Miniapp gets persona questions
const questions = await sensetree.getQuestions('to-read');

// User answers stored
await sensetree.processAnswers(userId, answers);
```

## Scaling Considerations

- Persona data partitioned by user
- Caching layer for frequent reads
- Async processing for updates
- Event sourcing for history

## Security

- Persona data is user-owned
- Encryption at rest
- No sharing without consent
- GDPR-compliant deletion
