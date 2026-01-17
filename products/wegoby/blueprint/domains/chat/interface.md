# Chat Interface Specification

> **Persistent AI Assistant** — The always-available chat interface for Use and Evolve modes.

---

## Overview

The Chat Interface is Wegoby's primary interaction mechanism for AI assistance. It provides a persistent, context-aware chat experience.

| Aspect | Description |
|--------|-------------|
| **Position** | Bottom of screen, activated via center nav button |
| **Behavior** | Slides up as 40vh overlay, pushes nav bar up |
| **Persistence** | Chat history preserved across sessions |
| **Context-aware** | Quick actions adapt to current screen |

---

## UI Components

### Bottom Navigation Bar

```
┌─────────────────────────────────────────────┐
│   [Back/History]    [Chat]    [Context/New] │
│                      ⬤                      │
└─────────────────────────────────────────────┘
```

| Position | Chat Closed | Chat Open |
|----------|-------------|-----------|
| Left | Back navigation (Home/Arrow) | History button |
| Center | Chat button (logo, glow effect) | Chat button (active) |
| Right | Context button (Shirt icon) | New Chat button |

### Center Button Design

- **Size**: 64x64px circular
- **Background**: White with animated glow
- **Glow**: Gradient from primary-pink → light-purple → light-teal
- **Animation**: Pulse effect, logo spin on click
- **Logo**: Wegoby bee logo

### Chat Overlay

```
┌─────────────────────────────────────────────┐
│              Messages Area                   │
│  ┌────────────────────────────────┐         │
│  │ 👋 Hey there! I'm your...    │         │
│  └────────────────────────────────┘         │
│                                             │
│                    ┌───────────────────────┐│
│                    │ User message          ││
│                    └───────────────────────┘│
│                                             │
│  ┌─────────────────────────────────────────┐│
│  │ [Quick Action] [Quick Action] [Action]  ││
│  └─────────────────────────────────────────┘│
│                                             │
│  ┌─────────────────────────────────────────┐│
│  │ Ask me anything...            [Send]    ││
│  └─────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
```

---

## Message Styling

### Assistant Messages
```css
background: bg-white/60 dark:bg-card
border: border-border/50
border-radius: rounded-2xl rounded-bl-sm
shadow: shadow-lg
```

### User Messages
```css
background: bg-light-purple/80
border-radius: rounded-2xl rounded-br-sm
shadow: shadow-lg
```

---

## Chat History

### Sidebar
- Opens via History button (left of chat, when chat is open)
- Shows list of past conversations
- Sorted by `lastUpdated` descending
- Title auto-generated from first user message (max 40 chars + "...")

### Conversation Data Model
```typescript
interface ChatConversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  lastUpdated: number;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}
```

---

## Animations

| Element | Animation |
|---------|-----------|
| Chat overlay | Spring slide up (height: 0 → 40vh) |
| Nav bar | Slide up with chat (transition-all) |
| Logo button | Scale on hover (1.1x), spring spin on click |
| Glow effect | Continuous pulse |
| Messages | Fade in on load |

---

## Behavior Rules

1. **Quick actions disappear** after first user message
2. **New chat** creates fresh conversation, preserves history
3. **Reset trigger** clears current conversation messages
4. **Input focus** auto-focuses on chat open
5. **Enter key** sends message

---

## Related

- Chat Overview: [README.md](./README.md)
- Modes: [modes.md](./modes.md)
- Quick Actions: [quick-actions.md](./quick-actions.md)
- Engine Commands: [../engine/command-api.md](../engine/command-api.md)
