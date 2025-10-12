# DevQnA - Developer Q&A Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.5.0-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.18.1-green.svg)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.12-38B2AC.svg)](https://tailwindcss.com/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-5.0.0--beta.29-red.svg)](https://next-auth.js.org/)

A modern, community-driven Q&A platform for developers, built as an enhanced alternative to Stack Overflow. DevQnA enables developers to ask questions, share knowledge, and collaborate with a global community of programmers.

## 🌟 Features

### Core Functionality

- **Question & Answer System**: Post technical questions and provide detailed answers
- **Voting System**: Upvote helpful questions and answers to improve visibility
- **Tag-based Organization**: Categorize questions with relevant technology tags
- **Rich Text Editor**: Create formatted posts with code syntax highlighting
- **Search & Filtering**: Find relevant questions using advanced search and filters

### User Management

- **Authentication**: Secure login/signup with NextAuth.js
- **OAuth Integration**: Sign in with GitHub, Google, and other providers
- **User Profiles**: Personalized profiles with activity history and statistics
- **Reputation System**: Track user engagement through votes and contributions

### Community Features

- **Collections**: Save and organize favorite questions for later reference
- **Job Board**: Browse and post developer job opportunities
- **Community Feed**: Stay updated with latest questions and discussions
- **Interactive Discussions**: Comment and engage with the community

### User Experience

- **Dark/Light Theme**: Choose your preferred visual experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Updates**: Live notifications and activity feeds
- **Accessibility**: Built with inclusive design principles

## 🚀 Tech Stack

### Frontend

- **Next.js 15.5.0** - React framework with App Router
- **React 19.1.0** - Modern React with concurrent features
- **TypeScript 5** - Type-safe JavaScript development
- **Tailwind CSS 4.1.12** - Utility-first CSS framework

### Backend & Database

- **NextAuth.js 5.0.0-beta.29** - Authentication and session management
- **MongoDB 8.18.1** - NoSQL database with Mongoose ODM
- **bcryptjs** - Password hashing and security

### Development Tools

- **ESLint 9** - Code linting and quality assurance
- **Prettier** - Code formatting and consistency
- **Turbopack** - Fast development and build tooling

### UI Components & Libraries

- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation
- **Sonner** - Toast notifications
- **Next Themes** - Theme switching functionality

### Rich Text & AI

- **@mdxeditor/editor** - Advanced markdown editing
- **AI SDK** - Integration with AI services for enhanced features
- **Bright** - Code syntax highlighting

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **MongoDB** database instance
- **Git** for version control

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/md-zeon/DevQnA.git
   cd DevQnA
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory with the following variables:

   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # NextAuth.js Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret

   # OAuth Providers (optional)
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # AI Integration (optional)
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## 📜 Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## 🏗️ Project Structure

```
DevQnA/
├── app/                    # Next.js App Router pages and layouts
│   ├── (auth)/            # Authentication pages
│   ├── (root)/            # Main application pages
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable React components
│   ├── cards/            # Card components (Question, Answer, etc.)
│   ├── forms/            # Form components
│   ├── navigation/       # Navigation components
│   ├── ui/               # Base UI components
│   └── ...
├── database/             # Database models and schemas
├── lib/                  # Utility functions and configurations
│   ├── actions/          # Server actions
│   ├── handlers/         # API handlers
│   └── ...
├── constants/            # Application constants
├── types/                # TypeScript type definitions
├── public/               # Static assets
└── ...
```

## 🎯 Key Features Deep Dive

### Question Management

- Create, edit, and delete questions
- Rich text formatting with code syntax highlighting
- Tag-based categorization for better organization
- Question metrics (views, votes, answers)

### Answer System

- Provide comprehensive answers to questions
- Vote on answer quality and helpfulness
- Mark accepted answers for solved questions

### User Engagement

- User reputation and badge system
- Activity feeds and notifications
- Profile customization and statistics

### Search & Discovery

- Full-text search across questions and answers
- Advanced filtering by tags, date, and activity
- Related questions suggestions

## 🔧 Configuration

### Next.js Configuration

The project uses Next.js 15 with the App Router. Key configurations in `next.config.ts`:

- External packages for server-side logging
- MDX remote transpilation
- Image optimization with remote patterns

### Database Models

MongoDB collections for:

- Users and authentication accounts
- Questions and answers
- Tags and tag-question relationships
- Votes and interactions
- Collections and user preferences

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Environment Variables for Production

Ensure all environment variables are properly set in your deployment platform:

- Database connection strings
- OAuth provider credentials
- API keys for external services

## 🤝 Contributing

We welcome contributions from the developer community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** and test thoroughly
4. **Commit your changes** (`git commit -m 'Add amazing feature'`)
5. **Push to the branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure responsive design principles

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
- **Vercel** for platform and deployment insights
- **Radix UI** for accessible component primitives
- **Tailwind CSS** for utility-first styling
- **MongoDB** for the flexible database solution

## 🔐 Authentication & Security

### Supported Providers

- **GitHub OAuth** - Social login with GitHub accounts
- **Google OAuth** - Social login with Google accounts
- **Email/Password** - Traditional credential-based authentication

### Security Features

- **Password Hashing** - Secure password storage with bcryptjs
- **Session Management** - Secure JWT-based sessions
- **Input Validation** - Comprehensive form validation with Zod schemas
- **Rate Limiting** - API protection against abuse

## 🏢 API Integration

### External Services

- **Job Search API** - Integration with JSearch (RapidAPI) for job listings
- **IP Geolocation** - Location detection for personalized content
- **Country Data** - REST Countries API for location-based features

### Internal API Routes

- **Authentication** (`/api/auth/*`) - User authentication and session management
- **Questions** (`/api/questions/*`) - Q&A functionality
- **Users** (`/api/users/*`) - User profile management
- **AI** (`/api/ai/*`) - AI-powered features and suggestions

## 📈 Performance & Scalability

### Optimization Features

- **Turbopack** - Fast development and build performance
- **Image Optimization** - Next.js built-in image optimization
- **Code Splitting** - Automatic route-based code splitting
- **Database Indexing** - Optimized MongoDB queries with proper indexing

### Monitoring & Logging

- **Pino Logger** - High-performance logging system
- **Error Handling** - Comprehensive error management and reporting
- **Request Tracking** - API request monitoring and analytics

## 🧪 Development Workflow

### Code Quality

- **TypeScript** - Full type safety across the application
- **ESLint** - Code linting and style enforcement
- **Prettier** - Automatic code formatting
- **Pre-commit Hooks** - Automated quality checks

### Database Schema

The application uses MongoDB with the following main collections:

```javascript
// Core Models
- Users: Developer profiles and authentication
- Questions: Technical questions and discussions
- Answers: Responses to questions
- Tags: Technology categorization
- Votes: User voting on content
- Collections: Saved question collections
- Interactions: User activity tracking
- Jobs: Job posting and applications
```

## 🚀 Getting Started (Quick Setup)

### 1. Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Edit with your configuration
nano .env.local
```

### 2. Database Setup

```bash
# For local MongoDB
mongod

# Or use MongoDB Atlas (recommended for production)
# Create cluster at https://mongodb.com/atlas
```

### 3. Development Server

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## 📊 Feature Comparison

| Feature        | DevQnA          | Stack Overflow   |
| -------------- | --------------- | ---------------- |
| Modern UI/UX   | ✅ Next.js 15   | ❌ Legacy design |
| Dark Mode      | ✅ Built-in     | ❌ Limited       |
| Rich Editor    | ✅ MDX Editor   | ✅ Basic editor  |
| Job Board      | ✅ Integrated   | ❌ Separate      |
| AI Integration | ✅ AI SDK       | ❌ None          |
| Real-time      | ✅ Live updates | ✅ Partial       |
| Mobile First   | ✅ Responsive   | ❌ Limited       |

## 🛣️ Roadmap

### Upcoming Features

- [ ] **Real-time Chat** - Instant messaging between developers
- [ ] **Code Playground** - Integrated code execution environment
- [ ] **Advanced Analytics** - Detailed usage and performance metrics
- [ ] **API Documentation** - Built-in API documentation system
- [ ] **Mobile App** - React Native companion application
- [ ] **Team Collaboration** - Organization and team management features

### Recent Updates

- ✅ **Next.js 15** upgrade with App Router
- ✅ **TypeScript 5** migration
- ✅ **Tailwind CSS 4** styling updates
- ✅ **Enhanced search** with global search functionality
- ✅ **Job board** integration with external APIs

## 📞 Support & Community

### Getting Help

- **📖 Documentation** - Comprehensive setup and API guides
- **💬 GitHub Discussions** - Community conversations and Q&A
- **🐛 Issue Tracker** - Bug reports and feature requests
- **📧 Email Support** - Direct contact with maintainers

### Community Guidelines

- Be respectful and inclusive to all community members
- Use clear, descriptive titles for questions and issues
- Provide code examples when asking technical questions
- Help others by answering questions when possible

### Contributing

We welcome contributions from everyone! See our [Contributing Guide](CONTRIBUTING.md) for details.

---

**DevQnA** - The future of developer Q&A platforms. 🚀
