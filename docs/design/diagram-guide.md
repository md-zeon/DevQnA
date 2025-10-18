# DevQnA Design Diagrams Guide

## 📋 Overview

This document provides a comprehensive guide to all design diagrams available for the DevQnA platform. These diagrams help developers understand the system architecture, workflows, and processes.

## 🗂️ Available Diagrams

### 1. **Class Diagram** (`class_diagram.plantuml`)

**Purpose**: Shows the object-oriented structure of the system

**Contents**:

- Core entities (User, Question, Answer, Tag, Vote, Collection, etc.)
- Entity relationships and cardinalities
- Key attributes and methods
- Database schema representation

**When to Use**:

- Understanding data model structure
- Database schema design
- Entity relationship planning
- New developer onboarding

---

### 2. **Entity-Relationship Diagram** (`er_diagram.plantuml`)

**Purpose**: Database schema with relationships and constraints

**Contents**:

- MongoDB collection schemas
- Field types and constraints
- Primary and foreign key relationships
- Index strategies
- Cardinality notations

**When to Use**:

- Database optimization
- Query planning
- Data integrity verification
- Migration planning

---

### 3. **Authentication Flow Diagram** (`auth-flow.plantuml`)

**Purpose**: Complete authentication and authorization workflows

**Contents**:

- OAuth 2.0 flow (GitHub/Google)
- Credentials registration flow
- Login process
- Session management
- Password hashing and security
- Middleware authentication checks
- Sign out process
- Error handling scenarios

**When to Use**:

- Implementing authentication features
- Debugging login issues
- Security audits
- Understanding session management
- OAuth provider integration

**Key Processes**:

1. **OAuth Registration**: Third-party authentication flow
2. **Credentials Registration**: Email/password signup
3. **Credentials Login**: Email/password signin
4. **Session Validation**: Middleware checks
5. **Sign Out**: Session termination

---

### 4. **Question Workflow Diagram** (`question-workflow.plantuml`)

**Purpose**: Question lifecycle management

**Contents**:

- Ask question process
- Edit question flow
- Delete question flow
- View increment tracking
- Tag management
- Transaction handling
- Cascading deletes

**When to Use**:

- Implementing question features
- Understanding content moderation
- Tag system integration
- Transaction management
- Data consistency checks

**Key Processes**:

1. **Ask Question**: Creating new questions with tags
2. **Edit Question**: Modifying existing questions
3. **Delete Question**: Removing questions with cleanup
4. **View Tracking**: Incrementing view counts

---

### 5. **Voting Workflow Diagram** (`voting-workflow.plantuml`)

**Purpose**: Voting system and reputation management

**Contents**:

- Upvote/downvote processes
- Vote changes and removal
- Reputation calculations
- Badge system integration
- Self-voting prevention
- Concurrent vote handling
- Optimistic UI updates

**When to Use**:

- Implementing voting features
- Reputation system development
- Badge milestone tracking
- Preventing vote manipulation
- Performance optimization

**Key Processes**:

1. **Initial Vote**: Creating new votes
2. **Change Vote**: Switching between upvote/downvote
3. **Remove Vote**: Unvoting
4. **Reputation Update**: Automatic reputation changes
5. **Badge Awards**: Milestone achievements

---

### 6. **Answer Workflow Diagram** (`answer-workflow.plantuml`)

**Purpose**: Answer management and acceptance

**Contents**:

- Post answer flow
- Edit answer process
- Delete answer flow
- Answer acceptance by question author
- Answer sorting and display
- Quality guidelines
- Notification system

**When to Use**:

- Implementing answer features
- Understanding acceptance logic
- Quality control implementation
- Notification triggers
- Answer ranking algorithms

**Key Processes**:

1. **Post Answer**: Creating answers to questions
2. **Edit Answer**: Modifying own answers
3. **Delete Answer**: Removing answers
4. **Accept Answer**: Marking best answer (question author only)
5. **View Answers**: Sorting and display logic

---

### 7. **Search Workflow Diagram** (`search-workflow.plantuml`)

**Purpose**: Search, filter, and discovery systems

**Contents**:

- Global search across all content
- Local search within pages
- Advanced filtering
- Tag-based discovery
- User search
- AI recommendations
- Autocomplete suggestions
- Search analytics

**When to Use**:

- Implementing search features
- Optimizing search performance
- Understanding recommendation engine
- Cache strategy planning
- Search result ranking

**Key Processes**:

1. **Global Search**: Multi-entity search
2. **Local Search**: Page-specific filtering
3. **Advanced Filtering**: Complex query building
4. **Tag-based Search**: Tag filtering
5. **User Search**: Finding users
6. **AI Recommendations**: Personalized suggestions

---

### 8. **Sequence Diagram** (`sequence_diagram.plantuml`)

**Purpose**: User interaction flows and API calls

**Contents**:

- User authentication sequence
- Question posting sequence
- Answer submission flow
- Voting interaction
- Search functionality
- Job integration
- Collection management

**When to Use**:

- Understanding API endpoints
- Frontend-backend integration
- Debugging request flows
- API documentation
- End-to-end testing

---

### 9. **System Architecture** (`architect.plantuml`)

**Purpose**: High-level system architecture

**Contents**:

- Application layers
- Component relationships
- Technology stack
- External integrations
- Data flow

**When to Use**:

- Architecture planning
- Technology decisions
- Scaling strategies
- Integration planning

---

### 10. **UI Navigation** (`ui_navigation.plantuml`)

**Purpose**: User interface navigation structure

**Contents**:

- Page hierarchy
- Navigation flows
- Route structure
- Protected routes
- User journeys

**When to Use**:

- UI/UX design
- Route planning
- Navigation implementation
- User flow optimization

---

## 🔧 Viewing Diagrams

### Prerequisites

To view and edit PlantUML diagrams, you need:

1. **PlantUML Extension** for VS Code
2. **Java Runtime** (required by PlantUML)
3. **Graphviz** (optional, for better rendering)

### Installation

#### VS Code Extension

```bash
# Install PlantUML extension
code --install-extension jebbs.plantuml
```

#### Java (if not installed)

```bash
# Ubuntu/Debian
sudo apt-get install default-jre

# macOS
brew install openjdk
```

#### Graphviz (Optional)

```bash
# Ubuntu/Debian
sudo apt-get install graphviz

# macOS
brew install graphviz
```

### Viewing in VS Code

1. Open any `.plantuml` file
2. Press `Alt+D` to preview diagram
3. Or right-click → "Preview Current Diagram"

### Exporting Diagrams

1. Open PlantUML file in VS Code
2. Press `Ctrl+Shift+P` (Command Palette)
3. Select "PlantUML: Export Current Diagram"
4. Choose format (PNG, SVG, PDF)

---

## 📊 Diagram Conventions

### Color Coding

- **Blue**: Primary flow/success path
- **Red**: Error conditions
- **Green**: Alternative paths
- **Yellow**: Warnings/notes

### Notation

- **Solid lines**: Direct calls/relationships
- **Dashed lines**: Async operations/callbacks
- **Thick lines**: Critical paths
- **Arrows**: Data flow direction

### Participants

- **Actor**: End user
- **Participant**: System component
- **Database**: Data storage
- **External**: Third-party services

---

## 🔄 Updating Diagrams

### When to Update

- Adding new features
- Changing workflows
- Modifying database schema
- Refactoring architecture
- Bug fixes affecting flow

### Update Process

1. Identify affected diagrams
2. Update PlantUML source
3. Preview changes
4. Export new versions
5. Update this guide if needed
6. Commit changes with description

### Best Practices

- Keep diagrams simple and focused
- Use consistent notation
- Add notes for complex logic
- Include error handling
- Document assumptions
- Version control diagrams

---

## 📖 Related Documentation

### Technical Docs

- [System Design Document](./system_design.md)
- [API Endpoints](../api-endpoints.md)
- [Deployment Guide](../deployment-guide.md)

### Development Docs

- [Preliminary Design Review](./pdr.md)
- [File Tree Structure](./file_tree.md)
- [Build Errors Tracking](../build-errors-tracking.md)

---

## 🎯 Use Cases by Role

### For Frontend Developers

**Priority Diagrams**:

1. Sequence Diagram - API integration
2. UI Navigation - Route structure
3. Authentication Flow - Login/signup
4. Search Workflow - Search features

### For Backend Developers

**Priority Diagrams**:

1. Class Diagram - Data models
2. ER Diagram - Database schema
3. Sequence Diagram - API flows
4. All Workflow Diagrams - Business logic

### For DevOps Engineers

**Priority Diagrams**:

1. System Architecture - Infrastructure
2. Deployment workflow (if available)
3. ER Diagram - Database planning

### For Product Managers

**Priority Diagrams**:

1. UI Navigation - User flows
2. Sequence Diagram - Features
3. Workflow Diagrams - Business processes

### For New Developers

**Recommended Order**:

1. System Architecture - Overall structure
2. Class Diagram - Data models
3. Authentication Flow - User system
4. Question Workflow - Core feature
5. Answer Workflow - Core feature
6. Voting Workflow - Engagement
7. Search Workflow - Discovery

---

## 🔍 Troubleshooting

### Diagram Not Rendering

**Issue**: PlantUML preview shows error

**Solutions**:

1. Check Java installation: `java -version`
2. Restart VS Code
3. Check PlantUML syntax
4. View Output panel for errors

### Slow Rendering

**Issue**: Diagrams take long to render

**Solutions**:

1. Install Graphviz for faster rendering
2. Simplify complex diagrams
3. Split large diagrams into smaller ones
4. Use local PlantUML server

### Export Issues

**Issue**: Cannot export diagrams

**Solutions**:

1. Check file permissions
2. Ensure output directory exists
3. Try different export format
4. Check PlantUML logs

---

## 📝 Diagram Maintenance Schedule

### Weekly

- Review for accuracy with latest code
- Check for broken references
- Update sequence diagrams for new APIs

### Monthly

- Comprehensive review of all diagrams
- Update system architecture if needed
- Export updated versions

### Per Release

- Update all affected diagrams
- Export final versions
- Archive old versions

---

## 🤝 Contributing to Diagrams

### Adding New Diagrams

1. Identify the need for new diagram
2. Choose appropriate diagram type
3. Follow existing conventions
4. Add to this guide
5. Submit for review

### Diagram Types to Consider

- Activity diagrams for complex workflows
- State diagrams for entity states
- Component diagrams for modules
- Deployment diagrams for infrastructure

---

## 📧 Support

For questions about diagrams:

- Check existing documentation
- Review similar diagrams
- Consult team members
- Update this guide with findings

---

## 🎓 Learning Resources

### PlantUML

- [Official Documentation](https://plantuml.com/)
- [Cheat Sheet](https://plantuml.com/guide)
- [Examples](https://real-world-plantuml.com/)

### UML Diagrams

- [UML Basics](https://www.uml-diagrams.org/)
- [Sequence Diagrams](https://www.uml-diagrams.org/sequence-diagrams.html)
- [Class Diagrams](https://www.uml-diagrams.org/class-diagrams-overview.html)

---

## ✅ Diagram Quality Checklist

Before finalizing any diagram:

- [ ] Clear title and purpose
- [ ] Consistent notation used
- [ ] All participants labeled
- [ ] Error handling shown
- [ ] Notes explain complex logic
- [ ] Legend included if needed
- [ ] Proper formatting
- [ ] No truncated text
- [ ] Renders correctly
- [ ] Matches current codebase
- [ ] Reviewed by team
- [ ] Documentation updated

---

_Last Updated: October 2025_
_Maintained by: Development Team_
_Version: 1.0_
