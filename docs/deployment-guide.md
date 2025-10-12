# Deployment Guide - DevQnA Platform

## 📋 Overview

This guide provides comprehensive instructions for deploying the DevQnA platform to various hosting environments. Choose the deployment method that best fits your infrastructure and requirements.

## 🚀 Quick Deploy

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Fork the repository to your GitHub account
   # Connect to Vercel at vercel.com
   # Import your forked repository
   ```

2. **Environment Variables**
   Set these in your Vercel dashboard:
   ```env
   MONGODB_URI=your_mongodb_atlas_uri
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=your-generated-secret
   GITHUB_CLIENT_ID=your_github_oauth_client_id
   GITHUB_CLIENT_SECRET=your_github_oauth_client_secret
   ```

3. **Deploy**
   ```bash
   # Vercel auto-deploys on git push
   git push origin main
   ```

### Option 2: Railway

1. **Create Railway Project**
   - Go to railway.app and create a new project
   - Connect your GitHub repository

2. **Add MongoDB**
   - Add MongoDB Atlas as an external service
   - Or use Railway's PostgreSQL (requires code changes)

3. **Configure Variables**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/devqna
   NEXTAUTH_URL=https://your-app.railway.app
   NEXTAUTH_SECRET=your-secret-key
   ```

## 🐳 Docker Deployment

### Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  devqna:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/devqna
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=your-secret-key
    depends_on:
      - mongodb

  mongodb:
    image: mongo:7.0
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      - MONGO_INITDB_DATABASE=devqna

volumes:
  mongodb_data:
```

## ☁️ Cloud Platform Deployment

### AWS Deployment

#### Using AWS Amplify
1. **Connect Repository**
   - Connect your GitHub repository to AWS Amplify
   - Choose Next.js as the framework

2. **Environment Variables**
   ```env
   MONGODB_URI=your_mongodb_atlas_uri
   NEXTAUTH_URL=https://main.your-app.amplifyapp.com
   NEXTAUTH_SECRET=your-generated-secret
   ```

#### Using EC2 + PM2
```bash
# On EC2 instance
sudo yum update -y
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Clone and setup
git clone https://github.com/your-username/DevQnA.git
cd DevQnA
npm install
npm run build

# Install PM2
npm install -g pm2

# Start with PM2
pm2 start npm --name "devqna" -- start
pm2 startup
pm2 save
```

### Google Cloud Platform

#### Using Cloud Run
```bash
# Build and push container
gcloud builds submit --tag gcr.io/your-project/devqna

# Deploy to Cloud Run
gcloud run deploy --image gcr.io/your-project/devqna \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

#### Using App Engine
```yaml
# app.yaml
runtime: nodejs18
env: standard

env_variables:
  MONGODB_URI: your_mongodb_uri
  NEXTAUTH_URL: https://your-project.appspot.com
  NEXTAUTH_SECRET: your-secret

handlers:
  - url: /.*
    script: auto
```

### Azure Deployment

#### Using Azure App Service
1. **Create Web App**
   ```bash
   az webapp up --name your-devqna-app --resource-group your-rg
   ```

2. **Configure Environment**
   ```bash
   az webapp config appsettings set \
     --name your-devqna-app \
     --resource-group your-rg \
     --settings MONGODB_URI=your_mongodb_uri
   ```

## 🔧 Production Configuration

### Environment Variables Checklist

#### Required Variables
- ✅ `MONGODB_URI` - MongoDB connection string
- ✅ `NEXTAUTH_URL` - Your production domain
- ✅ `NEXTAUTH_SECRET` - Random 32-character string

#### Optional but Recommended
- ✅ `GITHUB_CLIENT_ID` - GitHub OAuth app ID
- ✅ `GITHUB_CLIENT_SECRET` - GitHub OAuth secret
- ✅ `GOOGLE_CLIENT_ID` - Google OAuth client ID
- ✅ `GOOGLE_CLIENT_SECRET` - Google OAuth secret

#### Production Optimizations
- ✅ `NODE_ENV=production` - Enable production mode
- ✅ `NEXT_PUBLIC_API_URL` - Your API base URL
- ✅ `REDIS_URL` - Redis for session storage (optional)

### Security Hardening

#### HTTPS Configuration
```nginx
# Nginx configuration for SSL
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

#### Security Headers
```typescript
// next.config.ts security headers
const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]
```

## 📊 Monitoring & Logging

### Application Monitoring

#### Using PM2 Monitoring
```bash
# Install PM2 monitoring
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 10

# Real-time monitoring
pm2 monit
```

#### Using Application Insights
```typescript
// lib/monitoring.ts
import { ApplicationInsights } from '@microsoft/applicationinsights-web'

const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: process.env.APP_INSIGHTS_KEY,
    enableAutoRouteTracking: true
  }
})

export default appInsights
```

### Database Monitoring

#### MongoDB Atlas Monitoring
1. **Enable Atlas Monitoring**
   - Go to MongoDB Atlas dashboard
   - Enable monitoring for your cluster
   - Set up alerts for performance metrics

2. **Key Metrics to Monitor**
   - Connection count and utilization
   - Query performance and slow queries
   - Replication lag (for clusters)
   - Storage utilization

### Log Aggregation

#### Using Winston for Logging
```typescript
// lib/logger.ts
import winston from 'winston'

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'devqna' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
})
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm run test

      - name: Build application
        run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v3
      - uses: supercharge/redis-github-action@1.5.0
        with:
          redis-version: 6

      - name: Deploy to Vercel
        uses: vercel/action@v23
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 🚨 Troubleshooting

### Common Deployment Issues

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build

# Clear npm cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### MongoDB Connection Issues
```bash
# Test MongoDB connection
npm install -g mongodb-connection-test
mongodb-connection-test your_connection_string

# Check MongoDB Atlas IP whitelist
# Ensure your deployment IP is whitelisted
```

#### OAuth Configuration Issues
```bash
# Verify OAuth configuration
curl -H "Authorization: Bearer $NEXTAUTH_SECRET" \
  https://your-domain.com/api/auth/providers

# Check OAuth callback URLs in provider settings
# GitHub: https://your-domain.com/api/auth/callback/github
# Google: https://your-domain.com/api/auth/callback/google
```

### Performance Issues

#### Memory Optimization
```bash
# PM2 memory limit
pm2 start npm --name "devqna" --max-memory-restart 1G -- start

# Node.js memory settings
NODE_OPTIONS="--max-old-space-size=8192" npm start
```

#### Database Query Optimization
```javascript
// Add database indexes
db.questions.createIndex({ "tags": 1, "createdAt": -1 })
db.questions.createIndex({ "author": 1, "createdAt": -1 })
db.questions.createIndex({
  "title": "text",
  "content": "text"
})
```

## 📋 Pre-Deployment Checklist

### ✅ Code Quality
- [ ] All tests passing
- [ ] No ESLint errors or warnings
- [ ] Build completes successfully
- [ ] Dependencies are up to date

### ✅ Environment Setup
- [ ] MongoDB Atlas cluster created and configured
- [ ] OAuth applications configured (GitHub, Google)
- [ ] Domain name purchased and configured
- [ ] SSL certificate obtained (for custom domains)

### ✅ Security
- [ ] NEXTAUTH_SECRET is a strong, random string
- [ ] MongoDB URI uses strong credentials
- [ ] OAuth secrets are properly stored
- [ ] Security headers configured

### ✅ Performance
- [ ] Database indexes created
- [ ] Images optimized for production
- [ ] Bundle analyzer checked for large dependencies
- [ ] Caching strategies implemented

## 🔧 Post-Deployment Steps

### 1. Verify Deployment
```bash
# Check application health
curl https://your-domain.com/api/health

# Verify database connection
curl https://your-domain.com/api/questions?limit=1

# Test authentication flow
# Visit https://your-domain.com/sign-in
```

### 2. Set Up Monitoring
- Configure error tracking (Sentry, LogRocket)
- Set up performance monitoring (Web Vitals)
- Configure database monitoring alerts
- Set up uptime monitoring (Pingdom, UptimeRobot)

### 3. DNS Configuration
```bash
# Example DNS records
Type: A
Name: @
Value: your-server-ip

Type: CNAME
Name: www
Value: your-domain.com

Type: TXT
Name: @
Value: "v=spf1 include:_spf.google.com ~all"
```

### 4. SEO and Analytics
- Submit sitemap to Google Search Console
- Set up Google Analytics
- Configure meta tags for social sharing
- Add structured data markup

## 📞 Support

### Getting Help
- **📖 Documentation**: Check this deployment guide
- **🐛 Issues**: Report problems on GitHub
- **💬 Discussions**: Ask questions in GitHub Discussions
- **📧 Email**: Contact maintainers for urgent issues

### Emergency Contacts
- **Technical Lead**: dev-team@your-company.com
- **DevOps Team**: devops@your-company.com
- **Security Team**: security@your-company.com

---

**Deployment Status**: ✅ **READY FOR PRODUCTION**

*This deployment guide is maintained by the DevOps team and updated with each release. Always use the latest version for new deployments.*
