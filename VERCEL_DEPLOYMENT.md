# Deploying MailFlow to Vercel

This guide will help you deploy your MailFlow application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Git Repository**: Your code should be in a Git repository (GitHub, GitLab, or Bitbucket)
3. **SendGrid API Key**: Get your API key from [SendGrid](https://sendgrid.com)

## Step 1: Prepare Your Project

The project is already configured for Vercel deployment with:
- `vercel.json` - Vercel configuration file
- `api/index.ts` - Serverless function entry point
- Build scripts for both client and server

## Step 2: Push to Git Repository

1. Initialize git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Connect to GitHub/GitLab:
   ```bash
   git remote add origin YOUR_REPOSITORY_URL
   git push -u origin main
   ```

## Step 3: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from your project directory:
   ```bash
   vercel
   ```

4. Follow the prompts:
   - Link to existing project or create new one
   - Confirm settings
   - Wait for deployment to complete

### Option B: Using Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will automatically detect the configuration
5. Click "Deploy"

## Step 4: Configure Environment Variables

After deployment, add your environment variables:

1. Go to your project dashboard on Vercel
2. Navigate to Settings → Environment Variables
3. Add the following variables:

   ```
   SENDGRID_API_KEY=your_sendgrid_api_key_here
   NODE_ENV=production
   ```

## Step 5: Redeploy

After adding environment variables:
1. Go to Deployments tab
2. Click the three dots on the latest deployment
3. Select "Redeploy"

## Project Structure for Vercel

```
your-project/
├── api/
│   └── index.ts          # Serverless API functions
├── client/
│   └── src/              # React frontend
├── server/
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Data storage
│   └── services/         # Email service
├── shared/
│   └── schema.ts         # Shared types
├── vercel.json           # Vercel configuration
└── package.json          # Dependencies and scripts
```

## Key Features Supported

✅ **Email Sending**: SendGrid integration for transactional emails
✅ **Template Management**: Create and manage email templates
✅ **Contact Management**: Store and organize contacts
✅ **Analytics**: Track email delivery and performance
✅ **Responsive Design**: Modern glassmorphism UI
✅ **Real-time Updates**: Live dashboard with statistics

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `SENDGRID_API_KEY` | Your SendGrid API key for sending emails | Yes |
| `NODE_ENV` | Set to "production" for production deployment | Yes |

## Custom Domain (Optional)

To add a custom domain:
1. Go to Settings → Domains in your Vercel dashboard
2. Add your domain
3. Configure DNS records as shown
4. Wait for SSL certificate provisioning

## Troubleshooting

### Common Issues:

1. **Build Failures**: Check build logs in Vercel dashboard
2. **API Not Working**: Verify environment variables are set
3. **Email Not Sending**: Confirm SendGrid API key is valid
4. **404 Errors**: Check that `vercel.json` rewrites are correct

### Getting Help:

- Check Vercel deployment logs
- Verify all environment variables
- Test API endpoints directly
- Contact support if issues persist

## Performance Notes

- Frontend is served from Vercel's global CDN
- API routes run as serverless functions
- In-memory storage resets between function calls
- For production, consider upgrading to a persistent database

Your MailFlow application is now deployed and ready to send professional transactional emails!