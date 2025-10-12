# Troubleshooting Guide - DevQnA Platform

## 🚨 Common Issues and Solutions

This guide covers the most frequently encountered issues and their solutions for the DevQnA platform.

## 🔐 Authentication Issues

### "Can't Log In" or "Invalid Credentials"

#### Symptoms

- Login form rejects valid credentials
- OAuth providers (GitHub/Google) fail to authenticate
- Session not persisting after login

#### Solutions

1. **Check Environment Variables**

   ```bash
   # Verify NextAuth configuration
   echo $NEXTAUTH_URL
   echo $NEXTAUTH_SECRET

   # Should output:
   # http://localhost:3000 (development)
   # https://yourdomain.com (production)
   ```

2. **Clear Browser Data**

   ```bash
   # Clear cookies and local storage
   # Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
   # Try incognito/private browsing mode
   ```

3. **OAuth Configuration Issues**

   ```bash
   # Test OAuth endpoints
   curl -I http://localhost:3000/api/auth/providers

   # Should return 200 OK for development
   # Should return 200 OK for production
   ```

4. **Database Connection**
   ```bash
   # Test MongoDB connection
   npm install -g mongodb-connection-test
   mongodb-connection-test $MONGODB_URI
   ```

### "OAuth Callback URL Mismatch"

#### Symptoms

- OAuth providers redirect to error pages
- "Callback URL not whitelisted" errors
- Authentication fails after provider redirect

#### Solutions

**For GitHub OAuth:**

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Update callback URLs:
   ```
   Development: http://localhost:3000/api/auth/callback/github
   Production: https://yourdomain.com/api/auth/callback/github
   ```

**For Google OAuth:**

1. Go to Google Cloud Console → APIs & Credentials → OAuth 2.0 Client IDs
2. Update authorized redirect URIs:
   ```
   Development: http://localhost:3000/api/auth/callback/google
   Production: https://yourdomain.com/api/auth/callback/google
   ```

## 🗄️ Database Issues

### "Connection Refused" or "MongoDB Connection Failed"

#### Symptoms

- Application fails to start
- Database operations timeout
- "ECONNREFUSED" errors in logs

#### Solutions

1. **Local MongoDB Issues**

   ```bash
   # Check if MongoDB is running
   ps aux | grep mongod
   # or
   brew services list | grep mongodb

   # Start MongoDB if not running
   brew services start mongodb/brew/mongodb-community
   # or
   sudo systemctl start mongod
   ```

2. **MongoDB Atlas Issues**

   ```bash
   # Test connection string
   npm install -g mongodb-connection-test
   mongodb-connection-test "mongodb+srv://username:password@cluster.mongodb.net/test"

   # Check IP whitelist in Atlas dashboard
   # Add your IP: 0.0.0.0/0 for development
   ```

3. **Network/Firewall Issues**

   ```bash
   # Test port connectivity
   telnet localhost 27017
   # or
   nc -zv localhost 27017

   # Check firewall settings
   sudo ufw status
   sudo ufw allow 27017
   ```

### "Database Operation Failed" or "Validation Error"

#### Symptoms

- Form submissions fail
- Data not saving to database
- Validation error messages

#### Solutions

1. **Check Database Indexes**

   ```javascript
   // Connect to MongoDB shell
   mongo

   // Check existing indexes
   use devqna
   db.questions.getIndexes()
   db.users.getIndexes()

   // Create missing indexes if needed
   db.questions.createIndex({ "author": 1 })
   db.questions.createIndex({ "tags": 1 })
   ```

2. **Validate Data Models**
   ```bash
   # Check for schema validation errors
   # Look in application logs for detailed error messages
   tail -f logs/error.log
   ```

## 🚀 Deployment Issues

### "Build Failed" or "Next.js Build Error"

#### Symptoms

- `npm run build` fails
- Deployment pipeline stops
- Production builds error out

#### Solutions

1. **Clear Build Cache**

   ```bash
   # Remove Next.js cache
   rm -rf .next
   npm run build

   # Clear npm cache
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Environment Variables**

   ```bash
   # Check for missing environment variables
   printenv | grep -E "(MONGODB|NEXTAUTH|GITHUB|GOOGLE)"

   # Ensure all required variables are set
   # MONGODB_URI ✓
   # NEXTAUTH_URL ✓
   # NEXTAUTH_SECRET ✓
   ```

3. **Dependency Issues**

   ```bash
   # Check for outdated packages
   npm outdated

   # Update dependencies carefully
   npm update

   # Check for security vulnerabilities
   npm audit
   npm audit fix
   ```

### "Application Won't Start" in Production

#### Symptoms

- Application crashes on startup
- Port binding issues
- Memory allocation errors

#### Solutions

1. **Port Configuration**

   ```bash
   # Check if port 3000 is available
   lsof -i :3000
   # or
   netstat -tulpn | grep :3000

   # Use different port if needed
   PORT=3001 npm start
   ```

2. **Memory Issues**

   ```bash
   # Check available memory
   free -h

   # Node.js memory settings
   NODE_OPTIONS="--max-old-space-size=4096" npm start
   ```

## 🎨 Frontend Issues

### "Styling Not Loading" or "CSS Issues"

#### Symptoms

- Missing styles or broken layout
- Dark mode not working
- Components not rendering correctly

#### Solutions

1. **Tailwind CSS Issues**

   ```bash
   # Rebuild styles
   npm run build-css

   # Check for Tailwind configuration
   cat tailwind.config.js
   ```

2. **Font Loading Issues**

   ```bash
   # Check if font files exist
   ls -la app/fonts/

   # Verify font paths in layout.tsx
   grep -n "font" app/layout.tsx
   ```

3. **Browser Cache Issues**

   ```bash
   # Hard refresh browser
   Ctrl+Shift+R (Linux/Windows)
   Cmd+Shift+R (Mac)

   # Clear browser cache completely
   # Chrome: Settings → Privacy → Clear browsing data
   ```

### "JavaScript Errors" or "Component Crashes"

#### Symptoms

- Console errors in browser
- Components not rendering
- Application becoming unresponsive

#### Solutions

1. **Check Browser Console**

   ```bash
   # Open browser dev tools (F12)
   # Check Console tab for errors
   # Look for specific error messages
   ```

2. **React DevTools**

   ```bash
   # Install React Developer Tools
   # https://react.dev/learn/react-developer-tools

   # Use components tree to debug rendering issues
   ```

3. **Error Boundaries**

   ```typescript
   // Implement error boundaries for better error handling
   class ErrorBoundary extends React.Component {
     constructor(props) {
       super(props);
       this.state = { hasError: false };
     }

     static getDerivedStateFromError(error) {
       return { hasError: true };
     }

     render() {
       if (this.state.hasError) {
         return <h1>Something went wrong.</h1>;
       }
       return this.props.children;
     }
   }
   ```

## 🔍 Search and Filtering Issues

### "Search Not Working" or "No Results Found"

#### Symptoms

- Search queries return no results
- Filters not applying correctly
- Search suggestions not appearing

#### Solutions

1. **Database Indexes**

   ```javascript
   // Ensure text indexes exist
   db.questions.createIndex({
     title: "text",
     content: "text",
   });

   // Check existing indexes
   db.questions.getIndexes();
   ```

2. **Search API Testing**

   ```bash
   # Test search endpoint
   curl "http://localhost:3000/api/search?q=test"

   # Should return search results or empty array
   ```

3. **Client-side Search Issues**
   ```bash
   # Check if search components are rendering
   # Verify search state management
   # Check for JavaScript errors in search components
   ```

## 📱 Mobile and Responsive Issues

### "Layout Broken on Mobile" or "Touch Issues"

#### Symptoms

- Elements overlapping on mobile devices
- Touch interactions not working
- Horizontal scrolling appearing

#### Solutions

1. **Viewport Meta Tag**

   ```html
   <!-- Check if viewport meta tag exists in layout.tsx -->
   <meta
     name="viewport"
     content="width=device-width, initial-scale=1.0"
   />
   ```

2. **Responsive Breakpoints**

   ```css
   /* Check Tailwind responsive classes */
   /* sm: 640px, md: 768px, lg: 1024px, xl: 1280px */
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
   ```

3. **Touch Event Handling**
   ```typescript
   // Ensure touch events are handled properly
   // Use onClick instead of onMouseDown for mobile compatibility
   <button onClick={handleClick}>Click me</button>
   ```

## 🚨 Performance Issues

### "Slow Page Loads" or "High Memory Usage"

#### Symptoms

- Pages taking >3 seconds to load
- Browser showing "high memory usage"
- Application becoming sluggish

#### Solutions

1. **Bundle Analysis**

   ```bash
   # Analyze bundle size
   npm install -g webpack-bundle-analyzer
   npm run analyze

   # Look for large dependencies
   # Check for unused imports
   ```

2. **Image Optimization**

   ```bash
   # Check image sizes and formats
   ls -lh public/images/
   # Use Next.js Image component for optimization
   ```

3. **Database Query Optimization**

   ```javascript
   // Add proper indexes for slow queries
   db.questions.createIndex({ createdAt: -1, upvotes: -1 });

   // Use lean() for read-only operations
   const questions = await Question.find().lean();
   ```

### "High CPU Usage" or "Server Overload"

#### Symptoms

- Server becoming unresponsive
- High CPU utilization
- Slow response times

#### Solutions

1. **Memory Leaks**

   ```bash
   # Monitor memory usage
   pm2 monit

   # Check for memory leaks in code
   # Look for unsubscribed event listeners
   # Check for proper cleanup in useEffect
   ```

2. **Database Connection Pooling**
   ```javascript
   // Configure connection pooling in mongoose.ts
   mongoose.connect(connectionString, {
     maxPoolSize: 10,
     serverSelectionTimeoutMS: 5000,
     socketTimeoutMS: 45000,
   });
   ```

## 🔧 Development Issues

### "Hot Reload Not Working"

#### Symptoms

- Changes not reflecting in browser
- Need to manually refresh page
- Development server not detecting file changes

#### Solutions

1. **File Watcher Issues**

   ```bash
   # Check if files are being watched
   ls -la node_modules/.bin/next

   # Restart development server
   Ctrl+C
   npm run dev
   ```

2. **Node Modules Issues**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

### "TypeScript Errors" or "Type Checking Issues"

#### Symptoms

- Red squiggly lines in editor
- Build failing due to type errors
- IntelliSense not working properly

#### Solutions

1. **TypeScript Configuration**

   ```bash
   # Check TypeScript config
   cat tsconfig.json

   # Ensure proper paths and settings
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["./*"]
       }
     }
   }
   ```

2. **Type Declaration Files**

   ```bash
   # Check for missing type declarations
   npm install -D @types/node @types/react @types/react-dom

   # Generate type declarations if needed
   npm run type-check
   ```

## 📊 Monitoring and Debugging

### Logging Issues

#### 1. **Application Logs**

```bash
# Check application logs
tail -f logs/combined.log
tail -f logs/error.log

# PM2 logs
pm2 logs devqna
pm2 logs devqna --lines 100
```

#### 2. **Database Logs**

```bash
# Enable MongoDB query logging
mongoose.set('debug', true)

// Or check MongoDB logs
tail -f /var/log/mongodb/mongod.log
```

#### 3. **Network Logs**

```bash
# Check network requests in browser dev tools
# Filter by XHR/Fetch requests
# Look for failed requests (red status codes)
```

### Debugging Tools

#### 1. **React Developer Tools**

```bash
# Install browser extension
# https://react.dev/learn/react-developer-tools

# Use to inspect component tree and state
```

#### 2. **Redux DevTools** (if using state management)

```bash
# Install browser extension
# https://github.com/reduxjs/redux-devtools

# Monitor state changes and actions
```

#### 3. **Network Monitoring**

```bash
# Use browser Network tab to monitor:
# - API request/response times
# - Failed requests
# - Resource loading times
# - WebSocket connections
```

## 🚨 Emergency Procedures

### Application Down

#### 1. **Quick Health Check**

```bash
# Test basic connectivity
curl -I http://localhost:3000

# Check API health
curl http://localhost:3000/api/health

# Database connectivity
curl http://localhost:3000/api/questions?limit=1
```

#### 2. **Immediate Actions**

```bash
# Restart application
pm2 restart devqna

# Check system resources
htop
df -h

# Check recent logs
pm2 logs devqna --lines 50
```

### Data Recovery

#### 1. **Database Backup Issues**

```bash
# Check backup status
ls -la /backup/directory/

# Test backup restoration
mongorestore --dry-run /backup/directory/
```

#### 2. **Data Corruption**

```bash
# Check data integrity
db.questions.validateCollection()

# Repair database if needed
db.repairDatabase()
```

## 📞 Getting Help

### Support Channels

#### 1. **Check Documentation First**

- [README.md](README.md) - Project overview
- [CONTRIBUTING.md](CONTRIBUTING.md) - Development guide
- [docs/deployment-guide.md](docs/deployment-guide.md) - Deployment help
- [docs/user-guide.md](docs/user-guide.md) - User manual

#### 2. **Community Support**

- **GitHub Issues**: Bug reports and technical issues
- **GitHub Discussions**: Q&A and community help
- **Stack Overflow**: Tag questions with `devqna`

#### 3. **Professional Support**

- **Email**: maintainers@devqna.com (for urgent issues)
- **Priority Support**: Available for enterprise users

### Issue Reporting Template

When reporting issues, please include:

```markdown
## Issue Description

[Clear, concise description of the problem]

## Steps to Reproduce

1. Step one
2. Step two
3. Expected vs actual result

## Environment Information

- **OS**: [Windows/Mac/Linux]
- **Browser**: [Chrome/Firefox/Safari + version]
- **Node.js Version**: [Run `node --version`]
- **DevQnA Version**: [Check package.json]
- **Database**: [MongoDB Atlas/Local + version]

## Error Messages
```

[Paste any error messages here]

```

## Additional Context
[Any other relevant information, screenshots, etc.]
```

## 🔧 Quick Fixes

### Common Quick Fixes

#### 1. **Restart Everything**

```bash
# Stop all processes
pm2 stop all
pm2 kill

# Clear caches
rm -rf .next
npm cache clean --force

# Restart database
sudo systemctl restart mongod

# Restart application
npm install
npm run build
npm start
```

#### 2. **Environment Reset**

```bash
# Backup current environment
cp .env.local .env.backup

# Reset to defaults
cp .env.example .env.local

# Edit with correct values
nano .env.local
```

#### 3. **Database Reset** (Development Only)

```bash
# ⚠️ WARNING: This will delete all data
# Only run in development environment

# Drop database
mongo devqna --eval "db.dropDatabase()"

# Restart application to recreate collections
npm run dev
```

## 📈 Prevention

### Best Practices to Avoid Issues

#### 1. **Regular Maintenance**

```bash
# Weekly maintenance tasks
npm audit fix          # Fix security vulnerabilities
npm update             # Update dependencies
npm run build          # Verify build still works
npm run test           # Ensure tests pass
```

#### 2. **Monitoring Setup**

```bash
# Set up monitoring for:
# - Application performance
# - Database metrics
# - Error rates
# - User activity
```

#### 3. **Backup Strategy**

```bash
# Regular backups:
# - Database dumps
# - Environment configurations
# - SSL certificates
# - Important user data
```

## 🎯 Issue Categories

| Category         | Priority    | Response Time | Channel            |
| ---------------- | ----------- | ------------- | ------------------ |
| Security Issues  | 🔴 Critical | 2-4 hours     | Email              |
| Data Loss        | 🔴 Critical | 4-8 hours     | Email              |
| Application Down | 🟠 High     | 8-24 hours    | GitHub Issues      |
| Feature Broken   | 🟡 Medium   | 1-3 days      | GitHub Issues      |
| UI/UX Issues     | 🟢 Low      | 1 week        | GitHub Discussions |
| Documentation    | 🟢 Low      | 1 week        | GitHub Issues      |

## 📋 Troubleshooting Checklist

### Before Reporting an Issue

- [ ] **Search existing issues** for similar problems
- [ ] **Check documentation** for known solutions
- [ ] **Try basic troubleshooting** (restart, clear cache)
- [ ] **Test in different environment** (browser, device)
- [ ] **Gather all necessary information** (logs, screenshots)
- [ ] **Check if issue is reproducible** consistently

### When Reporting an Issue

- [ ] **Use clear, descriptive title**
- [ ] **Provide detailed description**
- [ ] **Include steps to reproduce**
- [ ] **Add environment information**
- [ ] **Attach relevant logs/screenshots**
- [ ] **Suggest potential solutions** if known

---

## 🔍 Advanced Debugging

### Database Debugging

#### MongoDB Query Analysis

```javascript
// Enable query profiler
db.setProfilingLevel(2);

// Find slow queries
db.system.profile.find({ millis: { $gt: 100 } }).sort({ millis: -1 });

// Analyze query execution
db.questions.find({ author: ObjectId("...") }).explain("executionStats");
```

#### Application Debugging

```typescript
// Add debug logging
console.log("Debug info:", { userId, action, timestamp });

// Use React DevTools Profiler
// Measure component render times
```

### Network Debugging

#### API Request Debugging

```bash
# Monitor API requests
curl -v http://localhost:3000/api/questions

# Check response headers
curl -I http://localhost:3000/api/questions

# Test with different parameters
curl "http://localhost:3000/api/search?q=test&page=1"
```

---

_This troubleshooting guide is continuously updated based on community feedback and new issues discovered. Last updated: October 2025_

## 🚀 Need More Help?

If you can't find a solution in this guide:

1. **📖 Check the documentation** in the `docs/` folder
2. **🔍 Search GitHub issues** for similar problems
3. **💬 Ask in GitHub Discussions** for community help
4. **📧 Contact maintainers** for urgent or complex issues

**Remember**: Most issues can be resolved with patience and systematic troubleshooting! 🛠️
