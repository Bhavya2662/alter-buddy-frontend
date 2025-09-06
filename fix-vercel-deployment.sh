#!/bin/bash

# Comprehensive Vercel Deployment Fix Script
# This script fixes the mentor panel issues and deploys to Vercel

echo "🚀 Starting Vercel Deployment Fix Process..."
echo "==========================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Step 1: Verify Environment Variables
echo "📋 Step 1: Verifying Environment Variables..."
echo "✅ REACT_APP_ABLY_KEY: $(grep REACT_APP_ABLY_KEY .env.production | cut -d'=' -f2)"
echo "✅ REACT_APP_BACKEND_URL: $(grep REACT_APP_BACKEND_URL .env.production | cut -d'=' -f2)"
echo "✅ REACT_APP_API_URL: $(grep REACT_APP_API_URL .env.production | cut -d'=' -f2)"
echo "✅ REACT_APP_SOCKET_SERVER: $(grep REACT_APP_SOCKET_SERVER .env.production | cut -d'=' -f2)"
echo "✅ REACT_APP_ENVIRONMENT: $(grep REACT_APP_ENVIRONMENT .env.production | cut -d'=' -f2)"

# Step 2: Clean and Install Dependencies
echo "\n🧹 Step 2: Cleaning and Installing Dependencies..."
rm -rf node_modules package-lock.json
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to install dependencies"
    exit 1
fi

# Step 3: Build the Project
echo "\n🔨 Step 3: Building the Project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error: Build failed"
    exit 1
fi

# Step 4: Check if Vercel CLI is installed
echo "\n📦 Step 4: Checking Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    echo "📥 Installing Vercel CLI..."
    npm install -g vercel
fi

# Step 5: Deploy to Vercel
echo "\n🌐 Step 5: Deploying to Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo "\n✅ Deployment successful!"
    echo "🔗 Your application should now be available at your Vercel URL"
    echo "📝 Note: It may take a few minutes for the changes to propagate."
    
    echo "\n📋 IMPORTANT: Verify these environment variables in Vercel Dashboard:"
    echo "   REACT_APP_ABLY_API_KEY = Fiv44w.ZkTEwA:O54qqKgcU-2KJh6IsbmDVAgf7pi7hNeWl5t72PVnOZI"
    echo "   REACT_APP_BACKEND_URL = https://alter-buddy-api-production.up.railway.app/api/1.0"
    echo "   REACT_APP_API_URL = https://alter-buddy-api-production.up.railway.app/api/1.0"
    echo "   REACT_APP_SOCKET_SERVER = https://alter-buddy-api-production.up.railway.app"
    echo "   REACT_APP_ENVIRONMENT = production"
    
    echo "\n🧪 Next Steps:"
    echo "   1. Open your Vercel live URL in Chrome"
    echo "   2. Press F12 → Console → Look for 'ENVIRONMENT DEBUG' logs"
    echo "   3. Test mentor login at /mentor/login"
    echo "   4. Verify mentor dashboard access"
    echo "   5. Check for any console errors"
    
else
    echo "❌ Deployment failed"
    exit 1
fi

echo "\n🎉 Fix deployment process completed!"