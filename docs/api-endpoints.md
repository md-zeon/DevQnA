# API Endpoints Documentation

## 📋 Overview

This document provides comprehensive documentation for all API endpoints in the DevQnA platform. All endpoints follow RESTful conventions and return standardized response formats.

## 🔐 Authentication Endpoints

### POST `/api/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "username": "johndoe",
      "email": "john@example.com"
    }
  }
}
```

### POST `/api/auth/login`
Authenticate user credentials.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "session": "jwt_token"
  }
}
```

## ❓ Question Management

### GET `/api/questions`
Retrieve paginated list of questions.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 15)
- `sort` (string): Sort field (createdAt, upvotes, views)
- `order` (string): Sort order (asc, desc)
- `tags` (string): Comma-separated tag IDs
- `search` (string): Search query

**Response:**
```json
{
  "success": true,
  "data": {
    "questions": [
      {
        "id": "question_id",
        "title": "How to implement JWT in Next.js?",
        "content": "Question content...",
        "author": { "id": "user_id", "name": "John Doe" },
        "tags": [{ "id": "tag_id", "name": "nextjs" }],
        "metrics": {
          "views": 245,
          "upvotes": 12,
          "answers": 3
        },
        "createdAt": "2025-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 15,
      "total": 150,
      "totalPages": 10
    }
  }
}
```

### POST `/api/questions`
Create a new question.

**Request Body:**
```json
{
  "title": "How to implement JWT authentication in Next.js?",
  "content": "I'm working on a Next.js project and need to implement...",
  "tags": ["tag_id_1", "tag_id_2"]
}
```

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

### GET `/api/questions/[id]`
Retrieve detailed question information.

**Response:**
```json
{
  "success": true,
  "data": {
    "question": { ... },
    "answers": [
      {
        "id": "answer_id",
        "content": "Answer content...",
        "author": { "id": "user_id", "name": "Jane Doe" },
        "upvotes": 5,
        "isAccepted": false,
        "createdAt": "2025-01-15T11:00:00Z"
      }
    ]
  }
}
```

## 💬 Answer Management

### POST `/api/questions/[id]/answers`
Submit an answer to a question.

**Request Body:**
```json
{
  "content": "Here's how you can implement JWT authentication..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "answer": {
      "id": "answer_id",
      "content": "Answer content...",
      "questionId": "question_id",
      "authorId": "user_id"
    }
  }
}
```

### PUT `/api/answers/[id]`
Update an existing answer (author only).

**Request Body:**
```json
{
  "content": "Updated answer content..."
}
```

## 🏷️ Tag Management

### GET `/api/tags`
Retrieve all available tags.

**Query Parameters:**
- `limit` (number): Number of tags to return
- `sort` (string): Sort by (name, usageCount)

**Response:**
```json
{
  "success": true,
  "data": {
    "tags": [
      {
        "id": "tag_id",
        "name": "javascript",
        "description": "JavaScript programming language",
        "usageCount": 1250,
        "color": "#f7df1e"
      }
    ]
  }
}
```

### POST `/api/tags`
Create a new tag (authenticated users).

**Request Body:**
```json
{
  "name": "typescript",
  "description": "TypeScript programming language",
  "color": "#3178c6"
}
```

## 👍 Voting System

### POST `/api/votes`
Cast a vote on content.

**Request Body:**
```json
{
  "targetType": "question", // "question" | "answer"
  "targetId": "target_id",
  "voteType": "upvote" // "upvote" | "downvote"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "vote": {
      "id": "vote_id",
      "userId": "user_id",
      "targetType": "question",
      "targetId": "target_id",
      "voteType": "upvote"
    },
    "updatedScore": 13
  }
}
```

## 💾 Collections

### GET `/api/collections`
Get user's collections.

**Response:**
```json
{
  "success": true,
  "data": {
    "collections": [
      {
        "id": "collection_id",
        "name": "Next.js Questions",
        "description": "Questions about Next.js development",
        "isPublic": true,
        "questionCount": 25,
        "tags": ["tag_id_1", "tag_id_2"]
      }
    ]
  }
}
```

### POST `/api/collections`
Create a new collection.

**Request Body:**
```json
{
  "name": "React Best Practices",
  "description": "Collection of React best practice questions",
  "isPublic": true
}
```

## 👤 User Management

### GET `/api/users/profile`
Get current user profile.

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "username": "johndoe",
      "email": "john@example.com",
      "image": "https://avatar.url",
      "reputation": 150,
      "badge": "bronze",
      "joinedAt": "2025-01-01T00:00:00Z",
      "stats": {
        "questionsAsked": 15,
        "answersProvided": 45,
        "totalVotes": 120
      }
    }
  }
}
```

## 🔍 Search API

### GET `/api/search`
Global search across all content.

**Query Parameters:**
- `q` (string, required): Search query
- `type` (string): Content type (question, answer, user, tag)
- `limit` (number): Results per page
- `page` (number): Page number

**Response:**
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "id": "result_id",
        "title": "How to implement JWT in Next.js?",
        "type": "question",
        "excerpt": "...matching content...",
        "url": "/questions/result_id"
      }
    ],
    "facets": {
      "types": {
        "question": 25,
        "answer": 15,
        "user": 3
      }
    }
  }
}
```

## 👨‍💼 Admin Endpoints

### GET `/api/admin/stats`
Get platform statistics (admin only).

**Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "totalUsers": 15420,
      "totalQuestions": 8930,
      "totalAnswers": 23450,
      "totalVotes": 67890,
      "activeUsers": 2340,
      "questionsToday": 45,
      "topTags": [
        { "name": "javascript", "count": 1250 },
        { "name": "react", "count": 980 }
      ]
    }
  }
}
```

## 🚨 Error Handling

All endpoints follow consistent error response format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "field": "Additional error context"
    }
  }
}
```

### Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid request data |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Access denied |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource conflict |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

## 📊 Response Metadata

All responses include standard metadata:

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2025-01-15T10:30:00Z",
    "version": "1.0",
    "requestId": "req_12345",
    "processingTime": "45ms"
  }
}
```

## 🔒 Rate Limiting

API endpoints are rate-limited to prevent abuse:

- **Authenticated users**: 1000 requests/hour
- **Anonymous users**: 100 requests/hour
- **Search endpoints**: 500 requests/hour

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## 📝 Content Guidelines

### Question Requirements
- Minimum title length: 15 characters
- Minimum content length: 50 characters
- Maximum tags: 5 tags per question
- Required fields: title, content, tags

### Answer Requirements
- Minimum content length: 30 characters
- Maximum content length: 50,000 characters
- Code blocks should be properly formatted

### Tag Guidelines
- Tag names: 2-25 characters
- Only letters, numbers, and hyphens
- No spaces or special characters
- Descriptive and specific tags preferred

## 🔄 Webhooks (Future)

Future webhook support for:
- New question notifications
- Answer updates
- User mentions
- Reputation changes

---

*This API documentation is automatically generated and kept in sync with the codebase. For the most up-to-date information, refer to the source code in `/lib/actions/` and `/app/api/` directories.*
