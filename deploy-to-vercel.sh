#!/bin/bash

# MailFlow Deployment Script for Vercel
echo "🚀 Deploying MailFlow to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Build the project
echo "🔨 Building project..."
npm run build

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Set your SENDGRID_API_KEY in Vercel dashboard"
echo "2. Add NODE_ENV=production environment variable"
echo "3. Redeploy from Vercel dashboard"
echo ""
echo "🔗 Your app will be available at the URL shown above"