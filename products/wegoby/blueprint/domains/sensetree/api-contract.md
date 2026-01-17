# Sensetree API Contract

API specification for integrating with Sensetree.

## Base URL

```
https://api.wegoby.ai/sensetree/v1
```

## Authentication

All requests require Bearer token:
```
Authorization: Bearer {access_token}
```

## Endpoints

### Get Persona

Retrieve user's persona data.

```http
GET /persona/{userId}
```

**Response**:
```json
{
  "userId": "user-123",
  "version": "2026-01-09T10:00:00Z",
  "level1": {
    "resourceLevels": {
      "energy": 0.7,
      "attention": 0.8,
      "cognitiveLoad": 0.3
    }
  },
  "level2": { ... },
  "level3": { ... },
  "level4": { ... },
  "wrapper": { ... }
}
```

### Update Persona

Update specific persona dimensions.

```http
PATCH /persona/{userId}
```

**Request**:
```json
{
  "level1": {
    "resourceLevels": {
      "energy": 0.5
    }
  }
}
```

**Response**:
```json
{
  "userId": "user-123",
  "version": "2026-01-09T10:05:00Z",
  "updated": ["level1.resourceLevels.energy"]
}
```

### Record Interaction

Record user interaction for persona adaptation.

```http
POST /interaction
```

**Request**:
```json
{
  "userId": "user-123",
  "event": {
    "type": "reading_session",
    "data": {
      "duration": 1800,
      "pagesRead": 25,
      "timeOfDay": "morning"
    }
  },
  "context": {
    "domain": "to-read",
    "view": "book-detail"
  }
}
```

**Response**:
```json
{
  "processed": true,
  "adaptations": [
    {
      "dimension": "level1.resourceLevels.attention",
      "change": 0.05
    }
  ]
}
```

### Get Preferences

Get UI/content preferences based on persona.

```http
GET /preferences/{userId}
```

**Query Parameters**:
- `domain` (optional): Miniapp domain (e.g., "to-read")
- `context` (optional): Current context JSON

**Response**:
```json
{
  "ui": {
    "theme": "light",
    "pacing": "relaxed",
    "density": "comfortable",
    "fontSize": "medium"
  },
  "content": {
    "complexity": "moderate",
    "tone": "friendly",
    "verbosity": "concise"
  },
  "interaction": {
    "feedbackStyle": "subtle",
    "confirmations": "minimal"
  }
}
```

### Get Onboarding Questions

Get persona questions for a domain.

```http
GET /questions/{domain}
```

**Response**:
```json
{
  "domain": "to-read",
  "questions": [
    {
      "id": "reading-pace",
      "question": "How many pages do you typically read per day?",
      "type": "range",
      "options": {
        "min": 0,
        "max": 100,
        "step": 10
      }
    },
    {
      "id": "preferred-genres",
      "question": "What genres do you enjoy?",
      "type": "multiselect",
      "options": ["Fiction", "Non-fiction", "Sci-fi", "Biography"]
    }
  ]
}
```

### Submit Answers

Submit answers to persona questions.

```http
POST /questions/{domain}/answers
```

**Request**:
```json
{
  "userId": "user-123",
  "answers": {
    "reading-pace": 30,
    "preferred-genres": ["Fiction", "Sci-fi"]
  }
}
```

**Response**:
```json
{
  "processed": true,
  "personaUpdated": true
}
```

## Error Responses

### 400 Bad Request

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid persona dimension",
    "details": { "field": "level1.invalid" }
  }
}
```

### 401 Unauthorized

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token"
  }
}
```

### 404 Not Found

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "User persona not found"
  }
}
```

### 500 Internal Server Error

```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred",
    "requestId": "req-abc123"
  }
}
```

## Rate Limiting

- 100 requests per minute per user
- 429 Too Many Requests when exceeded
- `X-RateLimit-Remaining` header included

## Webhooks

Subscribe to persona change events:

```http
POST /webhooks
```

**Request**:
```json
{
  "url": "https://your-service.com/webhook",
  "events": ["persona.updated", "preferences.changed"]
}
```

## SDK Usage

```typescript
import { SensetreeClient } from '@wegoby/sensetree';

const client = new SensetreeClient({ apiKey: 'your-api-key' });

// Get persona
const persona = await client.getPersona(userId);

// Get preferences
const prefs = await client.getPreferences(userId, {
  domain: 'to-read'
});

// Record interaction
await client.recordInteraction({
  userId,
  event: { type: 'reading_session', data: { ... } }
});
```
