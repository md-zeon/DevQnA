# System Design Document - DevQnA Platform

## 📋 Document Information

- **Document Version**: 1.0
- **Last Updated**: October 2025
- **Prepared by**: Architecture Team
- **Classification**: Internal Use

---

## 🎯 System Overview

### Purpose

DevQnA is a modern, full-stack Q&A platform designed specifically for developers. It serves as an enhanced alternative to Stack Overflow, providing a better user experience, modern technology stack, and developer-focused features.

### Scope

- **In Scope**: Q&A functionality, user management, content organization, job board, search capabilities
- **Out of Scope**: Mobile application (future phase), real-time chat (future phase), advanced analytics dashboard

### Assumptions

- Users have modern web browsers with JavaScript enabled
- Stable internet connection for real-time features
- MongoDB Atlas or local MongoDB instance available
- OAuth providers (GitHub, Google) properly configured

## 🏗️ System Architecture

### 3-Tier Architecture

```
┌─────────────────┐
│   Presentation  │ ← Next.js 15, React 19, TypeScript 5
│      Layer      │   Tailwind CSS, Radix UI Components
├─────────────────┤
│   Application   │ ← NextAuth.js, Server Actions, API Routes
│      Layer      │   Business Logic, Validation, Security
├─────────────────┤
│     Data        │ ← MongoDB, Mongoose ODM, External APIs
│     Layer       │   Job Search API, OAuth Providers
└─────────────────┘
```

### Component Architecture

```
User Request → Next.js Router → API Routes → Server Actions → Database
                     ↓              ↓            ↓           ↓
                Page Components → Validation → Business Logic → Data Models
                     ↓              ↓            ↓           ↓
                React Hooks ← Response ← Error Handling ← Connection
```

## 🗄️ Database Design

### Conceptual Data Model

#### Core Entities

**User Entity**

- Manages developer profiles and authentication
- Supports social login integration
- Tracks reputation and activity metrics

**Question Entity**

- Stores technical questions and discussions
- Supports rich text content with code syntax
- Tracks engagement metrics (views, votes, answers)

**Answer Entity**

- Contains responses to questions
- Supports rich text formatting
- Tracks community feedback through voting

**Tag Entity**

- Provides content categorization
- Supports hierarchical tag relationships
- Tracks usage statistics for trending topics

### Physical Data Model

#### MongoDB Collections

```javascript
// User Management
db.users.insertOne({
  _id: ObjectId(),
  name: "John Doe",
  username: "johndoe",
  email: "john@example.com",
  image: "https://avatar.url",
  reputation: 150,
  badge: "bronze",
  joinedAt: ISODate(),
  preferences: {
    theme: "dark",
    notifications: true,
    emailDigest: "weekly",
  },
});

// Question Storage
db.questions.insertOne({
  _id: ObjectId(),
  title: "How to implement JWT authentication in Next.js?",
  content: "I'm working on a Next.js project and need to...",
  author: ObjectId(), // Reference to User
  tags: [ObjectId(), ObjectId()], // References to Tags
  views: 245,
  upvotes: 12,
  downvotes: 1,
  answers: 3,
  isResolved: true,
  acceptedAnswer: ObjectId(), // Reference to Answer
  createdAt: ISODate(),
  updatedAt: ISODate(),
});

// Voting System (Polymorphic)
db.votes.insertOne({
  _id: ObjectId(),
  user: ObjectId(), // Reference to User
  targetType: "question", // "question" | "answer"
  targetId: ObjectId(), // Reference to Question or Answer
  voteType: "upvote", // "upvote" | "downvote"
  createdAt: ISODate(),
});
```

### Indexing Strategy

```javascript
// Performance-critical indexes
db.questions.createIndex({ createdAt: -1 }); // Recent questions
db.questions.createIndex({ upvotes: -1, createdAt: -1 }); // Popular questions
db.questions.createIndex({ tags: 1, createdAt: -1 }); // Tag-based queries
db.questions.createIndex({ author: 1, createdAt: -1 }); // User questions
db.questions.createIndex({ title: "text", content: "text" }); // Full-text search

db.users.createIndex({ email: 1 }, { unique: true }); // Unique emails
db.users.createIndex({ username: 1 }, { unique: true }); // Unique usernames
db.users.createIndex({ reputation: -1 }); // Leaderboard queries

db.votes.createIndex({ user: 1, targetType: 1, targetId: 1 }, { unique: true }); // One vote per user per content
```

## 🔐 Security Architecture

### Authentication Flow

#### OAuth Integration

```mermaid
graph TD
    A[User Clicks Login] --> B{NextAuth.js Handler}
    B --> C[Redirect to OAuth Provider]
    C --> D[GitHub/Google Auth Page]
    D --> E[User Authentication]
    E --> F[OAuth Provider Returns Token]
    F --> G[NextAuth Verifies Token]
    G --> H{User Exists in DB?}
    H -->|Yes| I[Create Session]
    H -->|No| J[Create User Account]
    J --> K[Create Session]
    I --> L[Redirect to Dashboard]
    K --> L
```

#### Session Management

- **JWT Strategy**: Secure token-based sessions
- **Expiration**: 30-day session duration with refresh capability
- **Security**: HttpOnly cookies, secure flag in production
- **CSRF Protection**: Built-in NextAuth.js protection

### Authorization Matrix

| Role          | Questions              | Answers                | Votes       | Admin Panel |
| ------------- | ---------------------- | ---------------------- | ----------- | ----------- |
| Anonymous     | Read                   | Read                   | ❌          | ❌          |
| Authenticated | Read, Create           | Read, Create           | ✅          | ❌          |
| Expert        | Read, Create, Edit Own | Read, Create, Edit Own | ✅          | ❌          |
| Moderator     | Read, Create, Edit All | Read, Create, Edit All | ✅          | Limited     |
| Admin         | Full Access            | Full Access            | Full Access | Full Access |

## 🚀 API Design

### RESTful API Structure

#### Question Management

```typescript
GET / api / questions; // List questions with pagination
POST / api / questions; // Create new question
GET / api / questions / [id]; // Get question details
PUT / api / questions / [id]; // Update question (author only)
DELETE / api / questions / [id]; // Delete question (author/admin)

GET / api / questions / [id] / answers; // Get question answers
POST / api / questions / [id] / answers; // Add answer to question
```

#### Search & Discovery

```typescript
GET / api / search; // Global search across all content
GET / api / questions / search; // Search within questions
GET / api / tags / search; // Search and suggest tags
GET / api / users / search; // Search users by username/skill
```

#### Social Features

```typescript
POST / api / votes; // Cast vote on content
DELETE / api / votes / [id]; // Remove vote

GET / api / collections; // Get user collections
POST / api / collections; // Create new collection
PUT / api / collections / [id]; // Update collection
POST / api / collections / [id] / questions; // Add question to collection
```

### API Response Standards

#### Success Response

```typescript
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "title": "How to implement JWT in Next.js?",
    "content": "...",
    "author": {
      "id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "username": "johndoe",
      "image": "https://avatar.url"
    },
    "tags": [
      {
        "id": "507f1f77bcf86cd799439013",
        "name": "nextjs",
        "color": "#000000"
      }
    ],
    "metrics": {
      "views": 245,
      "upvotes": 12,
      "downvotes": 1,
      "answers": 3
    }
  },
  "meta": {
    "timestamp": "2025-01-15T10:30:00Z",
    "version": "1.0",
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
}
```

#### Error Response

```typescript
{
  "success": false,
  "error": {
    "message": "Question not found",
    "code": "QUESTION_NOT_FOUND",
    "details": {
      "questionId": "507f1f77bcf86cd799439011"
    }
  },
  "meta": {
    "timestamp": "2025-01-15T10:30:00Z",
    "version": "1.0"
  }
}
```

## 🎨 User Interface Design

### Design System

#### Color Palette

```css
/* Light Theme */
--primary: #3b82f6; /* Blue */
--secondary: #64748b; /* Slate */
--success: #10b981; /* Emerald */
--warning: #f59e0b; /* Amber */
--danger: #ef4444; /* Red */
--background: #ffffff; /* White */
--surface: #f8fafc; /* Gray-50 */
--text-primary: #1e293b; /* Gray-800 */
--text-secondary: #64748b; /* Gray-500 */

/* Dark Theme */
--primary: #60a5fa; /* Light Blue */
--secondary: #94a3b8; /* Light Slate */
--success: #34d399; /* Light Emerald */
--warning: #fbbf24; /* Light Amber */
--danger: #f87171; /* Light Red */
--background: #0f172a; /* Gray-900 */
--surface: #1e293b; /* Gray-800 */
--text-primary: #f8fafc; /* Gray-50 */
--text-secondary: #cbd5e1; /* Gray-300 */
```

#### Typography Scale

```css
--font-family-sans: "Inter", "Space Grotesk", system-ui, sans-serif;
--font-size-xs: 0.75rem; /* 12px */
--font-size-sm: 0.875rem; /* 14px */
--font-size-base: 1rem; /* 16px */
--font-size-lg: 1.125rem; /* 18px */
--font-size-xl: 1.25rem; /* 20px */
--font-size-2xl: 1.5rem; /* 24px */
--font-size-3xl: 1.875rem; /* 30px */
--font-size-4xl: 2.25rem; /* 36px */
```

### Component Architecture

#### Layout Components

1. **Root Layout** (`app/layout.tsx`)
   - HTML structure and metadata
   - Global providers (Theme, Auth)
   - Navigation structure

2. **Page Layouts** (`app/(root)/layout.tsx`)
   - Sidebar navigation
   - Main content area
   - Responsive breakpoints

3. **Auth Layout** (`app/(auth)/layout.tsx`)
   - Authentication-specific styling
   - Centered form layouts

#### Feature Components

1. **Question Components**
   - `QuestionCard`: Compact question display
   - `QuestionForm`: Rich text question creation
   - `QuestionDetail`: Full question view with answers

2. **Answer Components**
   - `AnswerCard`: Individual answer display
   - `AnswerForm`: Rich text answer creation
   - `AllAnswers`: Answer list with sorting

3. **Navigation Components**
   - `LeftSidebar`: Main navigation menu
   - `RightSidebar`: Trending content and users
   - `Navbar`: Top navigation with search

## 📊 Performance Architecture

### Performance Budget

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s
- **Bundle Size**: < 500KB gzipped

### Optimization Techniques

#### Code Splitting

```typescript
// Automatic route-based splitting
const HomePage = lazy(() => import("./pages/Home"));
const QuestionPage = lazy(() => import("./pages/Question"));

// Component-based splitting
const RichEditor = lazy(() => import("./components/RichEditor"));
const JobBoard = lazy(() => import("./components/JobBoard"));
```

#### Caching Strategy

```typescript
// Database query caching
const cachedQuestions = await cache.get("popular-questions");
if (!cachedQuestions) {
  cachedQuestions = await Question.find({}).sort({ upvotes: -1 }).limit(10).cache(300); // 5-minute cache
}

// API response caching
export const revalidate = 3600; // ISR every hour
export const dynamic = "force-static"; // Static generation
```

#### Image Optimization

```typescript
// Next.js Image component with optimization
<Image
  src="/user-avatar.jpg"
  alt="User avatar"
  width={64}
  height={64}
  priority // Preload critical images
  placeholder="blur" // Blur placeholder
/>
```

## 🔧 Deployment Architecture

### Environment Configuration

#### Development Environment

```bash
# .env.local
MONGODB_URI=mongodb://localhost:27017/devqna
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=development-secret-key
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

#### Production Environment

```bash
# .env.production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/devqna
NEXTAUTH_URL=https://devqna.com
NEXTAUTH_SECRET=production-secret-key
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-id
RAPID_API_KEY=your-job-search-api-key
```

### Deployment Pipeline

#### Build Process

```mermaid
graph LR
    A[Git Push] --> B[GitHub Actions]
    B --> C[Install Dependencies]
    C --> D[Run Tests]
    D --> E[Build Application]
    E --> F[Docker Build]
    F --> G[Deploy to Production]
    G --> H[Health Check]
    H --> I[Traffic Switch]
```

#### Monitoring Setup

- **Error Tracking**: Sentry integration
- **Performance Monitoring**: Web Vitals tracking
- **Database Monitoring**: MongoDB Atlas monitoring
- **API Monitoring**: Response time and error rate tracking

## 📋 Quality Assurance

### Testing Strategy

#### Unit Tests

```typescript
// Component testing with React Testing Library
test('QuestionCard displays question data', () => {
  render(<QuestionCard question={mockQuestion} />);
  expect(screen.getByText(mockQuestion.title)).toBeInTheDocument();
});

// API testing with Jest
test('POST /api/questions creates question', async () => {
  const response = await request(app)
    .post('/api/questions')
    .send(validQuestionData);
  expect(response.status).toBe(201);
});
```

#### Integration Tests

```typescript
// End-to-end user flows
test("user can ask question and get answer", async () => {
  // Login
  await page.goto("/sign-in");
  await page.fill('[data-testid="email"]', "user@test.com");
  await page.click('[data-testid="submit"]');

  // Ask question
  await page.goto("/ask-question");
  await page.fill('[data-testid="title"]', "Test Question");
  await page.click('[data-testid="submit"]');

  // Verify creation
  expect(page.url()).toContain("/questions/");
});
```

### Code Quality Gates

- **ESLint**: Code style and error checking
- **Prettier**: Code formatting consistency
- **TypeScript**: Strict type checking
- **Pre-commit Hooks**: Automated quality checks
- **Coverage Threshold**: Minimum 80% test coverage

## 🔄 Maintenance & Operations

### Backup Strategy

- **Database**: Daily MongoDB backups with 30-day retention
- **File Storage**: Regular backup of uploaded assets
- **Configuration**: Version-controlled environment files

### Monitoring & Alerting

- **Application Metrics**: Response times, error rates, throughput
- **Database Metrics**: Query performance, connection pool, replication lag
- **User Analytics**: Feature usage, user engagement, conversion rates

### Incident Response

1. **Detection**: Automated monitoring alerts
2. **Assessment**: Impact analysis and root cause identification
3. **Mitigation**: Immediate fixes and workarounds
4. **Recovery**: Full system restoration procedures
5. **Post-mortem**: Lessons learned and preventive measures

## 📚 Documentation

### Documentation Structure

```
docs/
├── 📁 design/                    # System design documents
│   ├── 📄 architect.plantuml     # Architecture diagrams
│   ├── 📄 class_diagram.plantuml # Class relationships
│   ├── 📄 er_diagram.plantuml    # Database schema
│   ├── 📄 pdr.md                 # Preliminary design review
│   ├── 📄 sequence_diagram.plantuml # User flows
│   ├── 📄 system_design.md       # This document
│   └── 📄 ui_navigation.plantuml # UI navigation
│
├── 📁 api/                       # API documentation
├── 📁 deployment/                # Deployment guides
├── 📁 user-guide/                # User documentation
└── 📄 README.md                  # Project overview
```

## 🔮 Future Considerations

### Scalability Planning

- **Horizontal Scaling**: Load balancer with multiple Next.js instances
- **Database Sharding**: When user base exceeds 1M users
- **CDN Integration**: Global content distribution
- **Microservices**: Potential API extraction for heavy workloads

### Feature Roadmap

- **Phase 3**: Real-time chat, code playground, mobile app
- **Phase 4**: Advanced analytics, team collaboration features
- **Phase 5**: API marketplace, plugin system, internationalization

---

## ✅ Approval & Sign-off

This System Design Document has been reviewed and approved by:

- **Architecture Team**: ********\_\_\_******** Date: ****\_****
- **Development Team**: ********\_\_\_******** Date: ****\_****
- **Product Team**: ********\_\_\_******** Date: ****\_****
- **Security Team**: ********\_\_\_******** Date: ****\_****

**Document Status**: ✅ **APPROVED FOR IMPLEMENTATION**

---

_This document serves as the authoritative technical specification for the DevQnA platform. All development activities should align with the architecture and design decisions outlined herein._
