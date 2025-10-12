# DevQnA - Project File Structure

```
DevQnA/
├── 📁 docs/                          # Documentation and diagrams
│   └── 📁 design/                    # System design documents
│       ├── 📄 architect.plantuml     # System architecture diagram
│       ├── 📄 class_diagram.plantuml # Class relationship diagram
│       ├── 📄 er_diagram.plantuml    # Entity relationship diagram
│       ├── 📄 file_tree.md           # Project structure (this file)
│       ├── 📄 pdr.md                 # Preliminary design review
│       ├── 📄 sequence_diagram.plantuml # User interaction flows
│       ├── 📄 system_design.md       # System design document
│       └── 📄 ui_navigation.plantuml # UI navigation flow
│
├── 📁 app/                           # Next.js App Router
│   ├── 📁 (auth)/                    # Authentication pages
│   │   ├── 📁 sign-in/               # Sign in page
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 sign-up/               # Sign up page
│   │   │   └── 📄 page.tsx
│   │   └── 📁 layout.tsx             # Auth layout
│   │
│   ├── 📁 (root)/                    # Main application pages
│   │   ├── 📁 ask-question/          # Ask question page
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 collections/           # User collections page
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 community/             # Community feed page
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 jobs/                  # Job listings page
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 profile/               # User profile pages
│   │   │   └── 📄 [id]/page.tsx
│   │   ├── 📁 questions/             # Question detail pages
│   │   │   └── 📄 [id]/page.tsx
│   │   ├── 📁 tags/                  # Tags listing page
│   │   │   └── 📄 page.tsx
│   │   ├── 📄 layout.tsx             # Root layout
│   │   └── 📄 page.tsx               # Home page
│   │
│   ├── 📁 api/                       # API routes
│   │   ├── 📁 accounts/              # Account management APIs
│   │   ├── 📁 ai/                    # AI service APIs
│   │   ├── 📁 auth/                  # Authentication APIs
│   │   └── 📁 users/                 # User management APIs
│   │
│   ├── 📁 fonts/                     # Font files
│   │   ├── 📄 InterVF.ttf            # Inter variable font
│   │   └── 📄 SpaceGroteskVF.ttf     # Space Grotesk variable font
│   │
│   ├── 📄 favicon.ico                # Site favicon
│   ├── 📄 globals.css                # Global CSS styles
│   └── 📄 layout.tsx                 # Root layout
│
├── 📁 components/                    # Reusable React components
│   ├── 📁 answers/                   # Answer-related components
│   │   └── 📄 AllAnswers.tsx         # Display all answers
│   │
│   ├── 📁 cards/                     # Card components
│   │   ├── 📄 AnswerCard.tsx         # Answer display card
│   │   ├── 📄 JobCard.tsx            # Job listing card
│   │   ├── 📄 QuestionCard.tsx       # Question display card
│   │   ├── 📄 TagCard.tsx            # Tag display card
│   │   └── 📄 UserCard.tsx           # User profile card
│   │
│   ├── 📁 editor/                    # Rich text editor components
│   │   ├── 📄 dark-editor.css        # Dark theme editor styles
│   │   ├── 📄 index.tsx              # Main editor component
│   │   └── 📄 Preview.tsx            # Preview component
│   │
│   ├── 📁 filters/                   # Filtering components
│   │   ├── 📄 CommonFilter.tsx       # Common filter component
│   │   ├── 📄 GlobalFilter.tsx       # Global search filter
│   │   ├── 📄 HomeFilter.tsx         # Home page filter
│   │   └── 📄 JobFilter.tsx          # Job search filter
│   │
│   ├── 📁 forms/                     # Form components
│   │   ├── 📄 AnswerForm.tsx         # Answer submission form
│   │   ├── 📄 AuthForm.tsx           # Authentication form
│   │   ├── 📄 ProfileForm.tsx        # Profile editing form
│   │   ├── 📄 QuestionForm.tsx       # Question submission form
│   │   └── 📄 SocialAuthForm.tsx     # Social auth form
│   │
│   ├── 📁 navigation/                # Navigation components
│   │   ├── 📄 LeftSidebar.tsx        # Left sidebar navigation
│   │   ├── 📄 RightSidebar.tsx       # Right sidebar content
│   │   └── 📁 navbar/                # Navbar components
│   │
│   ├── 📁 questions/                 # Question-related components
│   │   └── 📄 SaveQuestion.tsx       # Save question component
│   │
│   ├── 📁 search/                    # Search components
│   │   ├── 📄 GlobalSearch.tsx       # Global search component
│   │   └── 📄 LocalSearch.tsx        # Local search component
│   │
│   ├── 📁 ui/                        # Base UI components
│   │   ├── 📄 alert-dialog.tsx       # Alert dialog component
│   │   ├── 📄 avatar.tsx             # Avatar component
│   │   ├── 📄 badge.tsx              # Badge component
│   │   ├── 📄 button.tsx             # Button component
│   │   ├── 📄 dropdown-menu.tsx      # Dropdown menu component
│   │   ├── 📄 form.tsx               # Form component
│   │   ├── 📄 input.tsx              # Input component
│   │   ├── 📄 label.tsx              # Label component
│   │   ├── 📄 select.tsx             # Select component
│   │   ├── 📄 sheet.tsx              # Sheet component
│   │   ├── 📄 skeleton.tsx           # Skeleton loader component
│   │   ├── 📄 sonner.tsx             # Toast notifications
│   │   ├── 📄 tabs.tsx               # Tabs component
│   │   └── 📄 textarea.tsx           # Textarea component
│   │
│   ├── 📁 user/                      # User-related components
│   │   ├── 📄 EditDeleteAction.tsx   # Edit/delete actions
│   │   ├── 📄 ProfileLink.tsx        # Profile link component
│   │   └── 📄 Stats.tsx              # User statistics component
│   │
│   ├── 📁 votes/                     # Voting components
│   │   └── 📄 Votes.tsx              # Voting interface
│   │
│   ├── 📄 DataRenderer.tsx           # Data rendering component
│   ├── 📄 GlobalResult.tsx           # Global search results
│   ├── 📄 Metric.tsx                 # Metric display component
│   ├── 📄 Pagination.tsx             # Pagination component
│   └── 📄 UserAvatar.tsx             # User avatar component
│
├── 📁 constants/                     # Application constants
│   ├── 📄 filters.ts                 # Filter definitions
│   ├── 📄 index.ts                   # Main constants export
│   ├── 📄 routes.ts                  # Route definitions
│   ├── 📄 states.ts                  # State constants
│   ├── 📄 techDescriptionMap.ts      # Technology descriptions
│   └── 📄 techMap.ts                 # Technology mappings
│
├── 📁 context/                       # React context providers
│   └── 📄 Theme.tsx                  # Theme context provider
│
├── 📁 database/                      # Database models and schemas
│   ├── 📄 account.model.ts           # Account model
│   ├── 📄 answer.model.ts            # Answer model
│   ├── 📄 collection.model.ts        # Collection model
│   ├── 📄 index.ts                   # Database exports
│   ├── 📄 interaction.model.ts       # Interaction model
│   ├── 📄 question.model.ts          # Question model
│   ├── 📄 tag-question.model.ts      # Tag-Question model
│   ├── 📄 tag.model.ts               # Tag model
│   ├── 📄 template.model.ts          # Template model
│   ├── 📄 user.model.ts              # User model
│   └── 📄 vote.model.ts              # Vote model
│
├── 📁 lib/                           # Utility libraries and configurations
│   ├── 📁 actions/                   # Server actions
│   │   ├── 📄 answer.action.ts       # Answer server actions
│   │   ├── 📄 auth.action.ts         # Authentication actions
│   │   ├── 📄 collection.action.ts   # Collection actions
│   │   ├── 📄 general.action.ts      # General server actions
│   │   ├── 📄 interaction.action.ts  # Interaction actions
│   │   ├── 📄 job.action.ts          # Job-related actions
│   │   ├── 📄 question.action.ts     # Question actions
│   │   ├── 📄 tag.action.ts          # Tag management actions
│   │   ├── 📄 user.action.ts         # User management actions
│   │   └── 📄 vote.action.ts         # Voting actions
│   │
│   ├── 📁 handlers/                  # API handlers
│   │   ├── 📄 action.ts              # Action handler
│   │   ├── 📄 error.ts               # Error handler
│   │   └── 📄 fetch.ts               # Fetch handler
│   │
│   ├── 📄 api.ts                     # API configuration
│   ├── 📄 http-errors.ts             # HTTP error utilities
│   ├── 📄 logger.ts                  # Logging configuration
│   ├── 📄 mongoose.ts                # MongoDB connection
│   ├── 📄 url.ts                     # URL utilities
│   ├── 📄 utils.ts                   # General utilities
│   └── 📄 validations.ts             # Input validation schemas
│
├── 📁 public/                        # Static assets
│   ├── 📁 icons/                     # Icon files
│   │   ├── 📄 account.svg            # Account icon
│   │   ├── 📄 arrow-left.svg         # Arrow left icon
│   │   ├── 📄 arrow-right.svg        # Arrow right icon
│   │   ├── 📄 chevron-down.svg       # Chevron down icon
│   │   └── 📄 ...                    # More icons
│   │
│   ├── 📁 images/                    # Image assets
│   ├── 📄 file.svg                   # File icon
│   ├── 📄 globe.svg                  # Globe icon
│   ├── 📄 next.svg                   # Next.js logo
│   ├── 📄 vercel.svg                 # Vercel logo
│   └── 📄 window.svg                 # Window icon
│
├── 📁 types/                         # TypeScript type definitions
│   ├── 📄 action.d.ts                # Action types
│   └── 📄 global.d.ts                # Global types
│
├── 📄 .env.local                     # Environment variables (local)
├── 📄 .gitignore                    # Git ignore file
├── 📄 auth.ts                        # NextAuth configuration
├── 📄 components.json                # UI components configuration
├── 📄 eslint.config.mjs              # ESLint configuration
├── 📄 middleware.ts                  # Next.js middleware
├── 📄 next.config.ts                 # Next.js configuration
├── 📄 package.json                   # Dependencies and scripts
├── 📄 package-lock.json              # Lock file
├── 📄 postcss.config.mjs             # PostCSS configuration
├── 📄 README.md                      # Project documentation
├── 📄 tsconfig.json                  # TypeScript configuration
└── 📄 next-env.d.ts                  # Next.js type definitions
```

## 📊 Project Statistics

- **Total Files**: 150+ files
- **Lines of Code**: 15,000+ lines
- **Components**: 30+ reusable components
- **Database Models**: 10+ data models
- **API Endpoints**: 15+ API routes
- **Technologies**: 20+ integrated technologies

## 🏗️ Architecture Layers

1. **Presentation Layer** (`app/`) - Next.js pages and routing
2. **Component Layer** (`components/`) - Reusable UI components
3. **Business Logic Layer** (`lib/actions/`) - Server-side actions
4. **Data Access Layer** (`database/`) - Database models and schemas
5. **Utility Layer** (`lib/`) - Helper functions and configurations
6. **Type System** (`types/`) - TypeScript definitions

## 🔗 Key Relationships

- **Pages → Components**: UI composition and data flow
- **Components → Actions**: User interactions trigger server actions
- **Actions → Database**: Business logic interacts with data models
- **Models → MongoDB**: Object-document mapping to database collections
- **API Routes → Actions**: HTTP endpoints call server actions

This structure provides a scalable, maintainable foundation for the DevQnA platform with clear separation of concerns and modern development practices.
