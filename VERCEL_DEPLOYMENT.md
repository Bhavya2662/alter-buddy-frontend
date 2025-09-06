# AlterBuddy Frontend - Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **Production API**: Ensure your backend API is deployed (Railway, Heroku, etc.)

## Step 1: Environment Variables Setup

Before deploying, you need to configure the following environment variables in Vercel:

### Required Environment Variables:

```bash
# API Configuration
REACT_APP_BACKEND_URL=https://your-api-domain.railway.app/api/1.0
REACT_APP_API_URL=https://your-api-domain.railway.app/api/1.0
REACT_APP_SOCKET_SERVER=https://your-api-domain.railway.app

# Environment
REACT_APP_ENVIRONMENT=production

# Build Configuration
NODE_OPTIONS=--max_old_space_size=4096

# Ably Configuration (Optional - for real-time features)
REACT_APP_ABLY_KEY=your-production-ably-api-key-here

# Build Optimization
GENERATE_SOURCEMAP=false
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings:
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

5. Add environment variables in the "Environment Variables" section
6. Click "Deploy"

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel --prod
```

## Step 3: Configure Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

## Step 4: Update Backend CORS

Ensure your backend API allows requests from your Vercel domain:

```javascript
// In your backend CORS configuration
const allowedOrigins = [
  'https://your-vercel-app.vercel.app',
  'https://your-custom-domain.com'
];
```

## Troubleshooting

### Common Issues:

1. **Build Failures**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Verify environment variables are set correctly

2. **API Connection Issues**
   - Verify `REACT_APP_API_URL` is correct
   - Check backend CORS configuration
   - Ensure backend is accessible from Vercel

3. **Large Bundle Size Warning**
   - The app has a large bundle (2.93 MB)
   - Consider implementing code splitting
   - This won't prevent deployment but may affect performance

4. **Environment Variables Not Working**
   - Ensure variables start with `REACT_APP_`
   - Redeploy after adding new variables
   - Check variables are set in Vercel dashboard

### Build Warnings (Non-blocking):

The following warnings appear during build but don't prevent deployment:
- ESLint warnings about unused variables
- React hooks dependency warnings
- Bundle size recommendations

## Performance Optimization

1. **Enable Compression**: Already configured in `vercel.json`
2. **Static Asset Caching**: Configured for 1 year
3. **Bundle Analysis**: Run `npm run build` and check the size report

## Monitoring

1. **Vercel Analytics**: Enable in project settings
2. **Error Tracking**: Consider adding Sentry or similar
3. **Performance**: Monitor Core Web Vitals in Vercel dashboard

## Security Checklist

- [ ] No sensitive data in environment variables
- [ ] API endpoints use HTTPS
- [ ] CORS properly configured
- [ ] Source maps disabled in production (`GENERATE_SOURCEMAP=false`)

## Post-Deployment Testing

1. Test mentor login functionality
2. Verify API connectivity
3. Test real-time features (if using Ably)
4. Check responsive design on mobile
5. Verify all routes work correctly

---

**Note**: Replace `your-api-domain.railway.app` with your actual backend API URL before deployment.