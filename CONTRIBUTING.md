# Contributing to DevQnA

## 🌟 Welcome!

Thank you for your interest in DevQnA! This is a personal portfolio project built by **Zeanur Rahaman Zeon** to showcase full-stack development skills. While this is primarily a personal project, I welcome feedback, suggestions, and constructive input from the developer community.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Workflow](#contributing-workflow)
- [Code Standards](#code-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Community Guidelines](#community-guidelines)
- [Recognition](#recognition)

## 🚀 Getting Started

### 1. Fork the Repository

1. **Fork** the [DevQnA repository](https://github.com/md-zeon/DevQnA) to your GitHub account
2. **Clone** your fork locally:

   ```bash
   git clone https://github.com/your-username/DevQnA.git
   cd DevQnA
   ```

3. **Add** the upstream remote:
   ```bash
   git remote add upstream https://github.com/md-zeon/DevQnA.git
   ```

### 2. Choose Your Contribution Type

#### 🐛 Bug Reports

- **Reproduce** the issue before reporting
- **Include** detailed steps to reproduce
- **Provide** environment information
- **Suggest** potential solutions if possible

#### ✨ Feature Requests

- **Explain** the problem you're trying to solve
- **Describe** the proposed solution
- **Consider** edge cases and alternatives
- **Include** mockups or examples if applicable

#### 💻 Code Contributions

- **Fix bugs** or implement new features
- **Improve** existing code or documentation
- **Add** tests for better coverage
- **Optimize** performance or user experience

## 🔧 Development Setup

### Prerequisites

- **Node.js** 18+ ([Download here](https://nodejs.org/))
- **npm** or **yarn** package manager
- **MongoDB** (local installation or MongoDB Atlas)
- **Git** for version control

### Local Development Environment

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Environment Setup**

   ```bash
   # Copy environment template
   cp .env.example .env.local

   # Edit with your configuration
   nano .env.local
   ```

3. **Required Environment Variables**

   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/devqna

   # NextAuth.js
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key

   # OAuth (optional for development)
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   ```

4. **Start Development Server**

   ```bash
   npm run dev
   ```

5. **Verify Setup**
   - Open [http://localhost:3000](http://localhost:3000)
   - Create test accounts and explore features
   - Test the full user journey

## 🔄 Contributing Workflow

### 1. Choose an Issue

- **Browse** [existing issues](https://github.com/md-zeon/DevQnA/issues)
- **Check** labels: `good first issue`, `help wanted`, `bug`, `enhancement`
- **Comment** on issues you're interested in
- **Ask** for clarification if needed

### 2. Create a Feature Branch

```bash
# Fetch latest changes
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/amazing-feature-name
# or
git checkout -b fix/bug-description
# or
git checkout -b docs/update-documentation
```

### 3. Make Your Changes

#### Code Changes

```bash
# Make your changes
# Follow the code standards (see below)
# Add tests for new functionality
# Update documentation if needed
```

#### Commit Guidelines

```bash
# Stage your changes
git add .

# Write clear commit messages
git commit -m "feat: add user profile editing functionality"

git commit -m "fix: resolve authentication redirect issue"

git commit -m "docs: update API documentation for new endpoints"

git commit -m "test: add unit tests for user authentication"

git commit -m "refactor: optimize database queries in question service"
```

#### Commit Message Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `test`: Testing related changes
- `refactor`: Code refactoring
- `style`: Code style changes
- `chore`: Maintenance tasks

### 4. Test Your Changes

```bash
# Run linting
npm run lint

# Run tests
npm run test

# Build the application
npm run build

# Test manually in browser
npm run dev
```

### 5. Push and Create Pull Request

```bash
# Push to your fork
git push origin feature/amazing-feature-name

# Create Pull Request
# Go to GitHub and create PR from your branch
```

### 6. Pull Request Guidelines

#### PR Title Format

```
feat: add dark mode toggle component
fix: resolve memory leak in question list
docs: update deployment guide for AWS
```

#### PR Description Template

```markdown
## Description

Brief description of changes made.

## Related Issues

Fixes #123
Closes #456

## Changes Made

- Added new component for user preferences
- Updated API endpoints for better error handling
- Added comprehensive tests

## Testing

- [x] Unit tests added/updated
- [x] Manual testing completed
- [x] Browser compatibility verified

## Screenshots

[Before/After screenshots if applicable]

## Checklist

- [x] Code follows project standards
- [x] Tests pass
- [x] Documentation updated
- [x] No breaking changes
```

## 📏 Code Standards

### TypeScript Guidelines

#### 1. Type Safety

```typescript
// ✅ Good: Explicit types
interface User {
  id: string;
  name: string;
  email: string;
  preferences: UserPreferences;
}

function getUser(id: string): Promise<User> {
  // implementation
}

// ❌ Avoid: Implicit any
function getUser(id) {
  // Missing type annotation
  // implementation
}
```

#### 2. Interface vs Type

```typescript
// ✅ Use interfaces for object types
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

// ✅ Use type aliases for unions or primitives
type UserRole = "admin" | "moderator" | "user";
type StatusCode = 200 | 201 | 400 | 404 | 500;
```

### React Component Standards

#### 1. Component Structure

```typescript
// ✅ Good: Proper component structure
interface QuestionCardProps {
  question: Question;
  showActions?: boolean;
  onVote?: (questionId: string, voteType: 'up' | 'down') => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  showActions = false,
  onVote
}) => {
  // Component logic here

  return (
    <div className="question-card">
      {/* JSX here */}
    </div>
  );
};
```

#### 2. Custom Hooks

```typescript
// ✅ Good: Custom hook pattern
export const useQuestion = (questionId: string) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQuestion(questionId)
      .then(setQuestion)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [questionId]);

  return { question, loading, error };
};
```

### CSS and Styling

#### 1. Tailwind CSS Best Practices

```css
/* ✅ Good: Utility-first approach */
.card {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-md p-6;
  @apply hover:shadow-lg transition-shadow duration-200;
}

/* ❌ Avoid: Custom CSS when utilities work */
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
}
```

#### 2. Responsive Design

```jsx
// ✅ Good: Mobile-first responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{/* Card components */}</div>
```

## 🧪 Testing Guidelines

### Testing Structure

#### 1. Unit Tests

```typescript
// components/__tests__/QuestionCard.test.tsx
import { render, screen } from '@testing-library/react';
import QuestionCard from '../QuestionCard';

describe('QuestionCard', () => {
  const mockQuestion: Question = {
    id: '1',
    title: 'Test Question',
    content: 'Test content',
    author: { id: '1', name: 'John Doe' },
    tags: [{ id: '1', name: 'react' }],
    metrics: { views: 10, upvotes: 5, answers: 2 },
    createdAt: new Date().toISOString()
  };

  it('renders question title', () => {
    render(<QuestionCard question={mockQuestion} />);
    expect(screen.getByText('Test Question')).toBeInTheDocument();
  });

  it('displays correct vote count', () => {
    render(<QuestionCard question={mockQuestion} />);
    expect(screen.getByText('5')).toBeInTheDocument(); // upvotes
  });
});
```

#### 2. Integration Tests

```typescript
// tests/integration/auth.test.ts
describe("Authentication Flow", () => {
  it("should complete full login flow", async () => {
    // Test complete user journey
    // from login to dashboard
  });
});
```

#### 3. API Tests

```typescript
// tests/api/questions.test.ts
import request from "supertest";
import app from "../../app";

describe("Question API", () => {
  it("should create question with valid data", async () => {
    const response = await request(app)
      .post("/api/questions")
      .send({
        title: "Test Question",
        content: "Test content",
        tags: ["react", "javascript"],
      })
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.question).toBeDefined();
  });
});
```

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm run test QuestionCard.test.tsx

# Run tests with coverage
npm run test:coverage

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration
```

## 📚 Documentation

### When to Update Documentation

- **New Features**: Document how to use new functionality
- **API Changes**: Update endpoint documentation
- **Configuration Changes**: Update setup instructions
- **Bug Fixes**: Document workarounds if needed

### Documentation Structure

```
docs/
├── 📄 README.md                    # Main project overview
├── 📄 CONTRIBUTING.md             # This file
├── 📄 api-endpoints.md            # API documentation
├── 📄 deployment-guide.md         # Deployment instructions
├── 📄 user-guide.md               # User manual
└── 📁 design/                     # Technical documentation
    ├── 📄 system_design.md        # System architecture
    ├── 📄 pdr.md                  # Design review
    └── 📄 *.plantuml              # Architecture diagrams
```

### Writing Documentation

#### 1. Clear and Concise

```markdown
# ✅ Good: Clear and direct

## API Endpoints

### POST /api/questions

Creates a new question.

# ❌ Avoid: Verbose and unclear

## Application Programming Interface Endpoints

### POST method for /api/questions path

This endpoint allows for the creation of a new question resource.
```

#### 2. Include Examples

````markdown
# ✅ Good: Include practical examples

```javascript
// Example: Creating a question
const response = await fetch("/api/questions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    title: "How to use React hooks?",
    content: "I want to learn about useState and useEffect...",
    tags: ["react", "hooks"],
  }),
});
```
````

# ❌ Avoid: Missing examples

To create a question, send a POST request to /api/questions.

````

#### 3. Use Consistent Formatting
```markdown
# ✅ Consistent structure
## Section Title

### Subsection

#### Sub-subsection

- List item 1
- List item 2

**Bold text** and *italic text*

`inline code`

```javascript
// Code blocks
function example() {
  return 'code';
}
````

````

## 🤝 Community Guidelines

### Communication

#### 1. Be Respectful
- Treat all contributors with respect
- Use inclusive language
- Be patient with newcomers
- Provide constructive feedback

#### 2. Effective Communication
```markdown
# ✅ Good: Clear and helpful
"Great work on this feature! I noticed a small issue with the error handling.
Could we add validation for empty input fields?"

# ❌ Avoid: Unhelpful criticism
"This is wrong. You should have done it differently."
````

### Code Review Process

#### 1. Reviewer's Responsibilities

- **Be thorough** but not nitpicky
- **Explain** your reasoning clearly
- **Suggest** improvements, don't just criticize
- **Approve** when requirements are met

#### 2. Author's Responsibilities

- **Respond** to all review comments
- **Make requested changes** or explain why not
- **Test** changes thoroughly
- **Keep PR updated** with main branch

### Issue Management

#### 1. Reporting Bugs

```markdown
**Bug Report Template:**

## Description

[Clear description of the bug]

## Steps to Reproduce

1. Step one
2. Step two
3. Expected vs actual result

## Environment

- OS: [Windows/Mac/Linux]
- Browser: [Chrome/Firefox/Safari]
- Version: [DevQnA version]

## Additional Context

[Any other relevant information]
```

#### 2. Feature Requests

```markdown
**Feature Request Template:**

## Problem Statement

[What problem does this solve?]

## Proposed Solution

[How would you implement this?]

## Alternatives Considered

[Other approaches you considered]

## Additional Context

[Mockups, examples, or related issues]
```

## 🏆 Recognition

### Contribution Recognition

#### 1. Types of Contributions

- **🐛 Bug Fixes** - Fixing reported issues
- **✨ Features** - Implementing new functionality
- **📚 Documentation** - Improving guides and docs
- **🧪 Tests** - Adding test coverage
- **🎨 UI/UX** - Improving user experience
- **🔧 Tooling** - Development tools and scripts

#### 2. Recognition Methods

- **GitHub Stars** ⭐ - Public recognition
- **Contributors List** - Featured in README
- **Special Badges** 🏷️ - Platform-specific recognition
- **Shoutouts** 📢 - Social media mentions
- **Priority Support** 🎯 - Direct access to maintainers

### Hall of Fame

_Contributors who have made significant impact on the project will be featured here._

## 📋 Contribution Checklist

### Before Submitting a PR

- [ ] **Issue exists** or **feature request created**
- [ ] **Code follows** project standards
- [ ] **Tests added** or updated
- [ ] **Documentation updated** if needed
- [ ] **Linting passes** without errors
- [ ] **Build succeeds** locally
- [ ] **Manual testing** completed

### PR Review Process

- [ ] **CI/CD passes** (automated checks)
- [ ] **Code review** completed by maintainers
- [ ] **Feedback addressed** by contributor
- [ ] **Final approval** from maintainers
- [ ] **Merge** to main branch

## 🔗 Additional Resources

### Learning Resources

- **[Next.js Documentation](https://nextjs.org/docs)** - Framework guide
- **[React Documentation](https://react.dev/)** - UI library guide
- **[TypeScript Handbook](https://typescriptlang.org/docs/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Styling guide
- **[MongoDB Guide](https://docs.mongodb.com/)** - Database guide

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Jest](https://jestjs.io/)** - Testing framework
- **[React Testing Library](https://testing-library.com/)** - Component testing

### Community Resources

- **[GitHub Issues](https://github.com/md-zeon/DevQnA/issues)** - Bug reports and features
- **[GitHub Discussions](https://github.com/md-zeon/DevQnA/discussions)** - Q&A and conversations
- **[Discord Community](https://discord.gg/devqna)** - Real-time chat (coming soon)

## 📞 Getting Help

### Support Channels

#### 1. **GitHub Issues**

- Bug reports and feature requests
- Technical questions and discussions
- Project feedback and suggestions

#### 2. **Email Support**

- **zeon.cse@gmail.com** - Direct contact for questions or collaboration opportunities
- Perfect for discussing ideas, reporting issues, or exploring the codebase

#### 3. **Portfolio & LinkedIn**

- **Portfolio**: [zeon-portfolio.netlify.app](https://zeon-portfolio.netlify.app/) - View more projects and get in touch
- **LinkedIn**: [linkedin.com/in/zeanur-rahaman-zeon](https://www.linkedin.com/in/zeanur-rahaman-zeon/) - Connect professionally

### About This Project

This DevQnA platform serves as a comprehensive portfolio piece demonstrating:

- **Modern Web Development** with Next.js 15, React 19, and TypeScript 5
- **Full-Stack Architecture** including MongoDB, API design, and authentication
- **UI/UX Best Practices** with responsive design and accessibility
- **Development Workflow** showcasing clean code, testing, and documentation
- **Project Management** from conception to deployment

Feel free to use this project as:
- **Learning Resource** - Study the code structure and patterns
- **Portfolio Reference** - See how a complete full-stack application is built
- **Collaboration Opportunity** - Reach out for similar projects or improvements
- **Inspiration** - Fork and modify for your own portfolio projects

## 🎯 Project Roadmap

### Current Phase (Phase 2)

- [x] Enhanced UI/UX with dark mode
- [x] Advanced search and filtering
- [x] Collections and bookmarks
- [x] Job board integration
- [ ] Real-time notifications

### Next Phase (Phase 3)

- [ ] Real-time chat system
- [ ] Code playground integration
- [ ] Advanced analytics dashboard
- [ ] Mobile application
- [ ] API rate limiting

### Future Vision (Phase 4+)

- [ ] Plugin system for extensions
- [ ] Team collaboration features
- [ ] Advanced moderation tools
- [ ] Internationalization (i18n)
- [ ] Enterprise features

## 💡 Tips for Contributors

### 1. Start Small

```markdown
Begin with:

- Fixing typos in documentation
- Adding comments to complex code
- Writing tests for existing functionality
- Improving error messages
```

### 2. Learn the Codebase

```markdown
Tips for understanding the code:

- Start with the main page components
- Look at the data models in database/
- Check the API routes in app/api/
- Review the utility functions in lib/
```

### 3. Ask Questions

```markdown
Don't hesitate to ask:

- "How does this component work?"
- "Why was this approach chosen?"
- "What tests should I write?"
- "How can I improve this code?"
```

### 4. Be Patient

```markdown
Remember:

- Code reviews take time
- Maintainers are volunteers
- Quality is more important than speed
- Every contribution matters
```

## 🎉 Thank You!

Your contributions make DevQnA better for everyone. Whether you're fixing a bug, adding a feature, improving documentation, or helping other contributors, your work is valued and appreciated.

**Happy Contributing!** 🚀

---

_This contributing guide is maintained by the DevQnA community. Suggestions for improvements are always welcome!_

## 📈 Your Contribution Journey

```markdown
🔰 New Contributor
↓ (Fix documentation, add comments)
🟡 Active Contributor
↓ (Fix bugs, add small features)
🟢 Regular Contributor
↓ (Implement major features, review PRs)
🔴 Core Contributor
↓ (Maintain codebase, mentor others)
```

_Every journey starts with a single contribution! 🌟_
