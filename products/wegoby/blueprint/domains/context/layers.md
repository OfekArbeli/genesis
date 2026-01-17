# The 5 Context Layers

> **UX Dimensions** — How context items are organized and what each layer means.

---

## Overview

Every context item belongs to one of 5 layers. These layers represent different aspects of the user experience.

```
┌─────────────────────────────────────────────────────────┐
│                    CONTEXT LAYERS                       │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │Presentation │  │  Cognition  │  │  Autonomy   │     │
│  │  (surface)  │  │  (density)  │  │  (agency)   │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│                                                         │
│       ┌─────────────┐       ┌─────────────┐            │
│       │ Continuity  │       │   Intent    │            │
│       │ (temporal)  │       │  (content)  │            │
│       └─────────────┘       └─────────────┘            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 1. Presentation

**Focus**: Surface — How information is displayed

### What It Covers
- Visual style and aesthetics
- Layout and spacing
- Colors and themes
- Typography
- Animations and motion

### Example Items
| Item | Effect |
|------|--------|
| "Clean, distraction-free interface" | Minimal UI elements |
| "Light purple accent color" | Use specific color |
| "Prefer grid view over list view" | Default to grid layout |
| "Large text for comfortable reading" | Increase font size |

---

## 2. Cognition

**Focus**: Density — How content is conveyed

### What It Covers
- Amount of detail
- Tone and formality
- Pacing of information
- Complexity level
- Explanations and guidance

### Example Items
| Item | Effect |
|------|--------|
| "Story pace: Slowly and gradually" | Generate slower-paced stories |
| "Questions are clear and concise" | Simple onboarding questions |
| "User is a beginner cook" | Provide detailed instructions |
| "Reading flow breaks: Too much tension" | Avoid intense content |

---

## 3. Autonomy

**Focus**: Agency — Who leads the experience

### What It Covers
- User control vs system control
- Proactive suggestions
- Confirmations and warnings
- Navigation freedom
- Automation level

### Example Items
| Item | Effect |
|------|--------|
| "User freely navigates, no forced paths" | No mandatory flows |
| "User can skip optional questions" | Allow skipping |
| "Don't show proactive suggestions" | Disable AI suggestions |
| "Always confirm before deleting" | Show confirmation dialogs |

---

## 4. Continuity

**Focus**: Temporal — How time and state are handled

### What It Covers
- Progress saving
- Session persistence
- History and memory
- Cross-device sync
- Resume functionality

### Example Items
| Item | Effect |
|------|--------|
| "Reading progress saved automatically" | Auto-save position |
| "Reading position bookmarked automatically" | Remember last read |
| "Recently used miniapps highlighted" | Show recents |
| "Sync across devices" | Enable sync |

---

## 5. Intent

**Focus**: Content matching — What's relevant to the user

### What It Covers
- User goals
- Interests and preferences
- Constraints and restrictions
- Current task context
- Domain-specific needs

### Example Items
| Item | Effect |
|------|--------|
| "User follows vegetarian diet" | Filter out meat recipes |
| "Reading motivation: Connecting with characters" | Character-driven stories |
| "User prefers quick meals under 30 minutes" | Fast recipes |
| "User is exploring available miniapps" | Discovery mode |

---

## Layer Selection Guide

When creating a context item, choose the layer based on:

| If the item is about... | Use Layer |
|-------------------------|-----------|
| How things **look** | Presentation |
| How things are **explained** | Cognition |
| Who is **in control** | Autonomy |
| How **state/time** is managed | Continuity |
| What the user **wants/needs** | Intent |

---

## Cross-Layer Examples

Some preferences might seem to fit multiple layers. Here's guidance:

| Preference | Could be... | Should be | Why |
|------------|-------------|-----------|-----|
| "User prefers dark mode" | Presentation | **Presentation** | Visual appearance |
| "User is a beginner" | Cognition or Intent | **Cognition** | Affects how content is explained |
| "User follows vegetarian diet" | Cognition or Intent | **Intent** | Content constraint |
| "Save progress automatically" | Autonomy or Continuity | **Continuity** | About persistence |
| "Don't auto-play videos" | Presentation or Autonomy | **Autonomy** | User control issue |

---

## Related

- Context Overview: [README.md](./README.md)
- Context Schema: [schema.json](./schema.json)
