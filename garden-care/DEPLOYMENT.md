# 🚀 Oasis Garden Care - Deployment Guide

This guide will walk you through deploying your Oasis Garden Care application to **Vercel** (frontend) and **Railway** (backend + database).

---

## 📋 Prerequisites

Before starting, make sure you have:

- ✅ GitHub account
- ✅ Git installed and your code pushed to GitHub
- ✅ Node.js installed locally (for testing)

---

## 🎯 Deployment Overview

- **Frontend (Angular)**: Vercel → FREE
- **Backend (NestJS API)**: Railway → FREE tier
- **Database (PostgreSQL)**: Railway → FREE tier (500MB)

**Total Cost**: $0 for demo/development 🎉

---

## Part 1: Deploy Backend to Railway 🚂

### Step 1: Sign Up for Railway

1. Go to https://railway.app
2. Click **"Start a New Project"**
3. Sign in with GitHub
4. Authorize Railway to access your repositories

### Step 2: Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your `oasis` (garden-care) repository
4. Railway will detect it as a Node.js project

### Step 3: Add PostgreSQL Database

1. In your Railway project dashboard, click **"+ New"**
2. Select **"Database"** → **"PostgreSQL"**
3. Railway will automatically:
   - Create a PostgreSQL instance
   - Generate a `DATABASE_URL` environment variable
   - Link it to your API service

### Step 4: Configure API Service

1. Click on your API service in Railway
2. Go to **"Settings"** tab
3. Set the following:

#### Build Settings:
```
Root Directory: (leave empty or set to root)
Build Command: npm install && npm run build:api:prod && npx prisma generate
Start Command: node dist/apps/api/main.js
```

#### Environment Variables:
Click **"Variables"** tab and add:

```env
NODE_ENV=production
PORT=3000
JWT_SECRET=YOUR_SECURE_RANDOM_STRING_HERE
ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
```

**⚠️ IMPORTANT**: 
- `DATABASE_URL` is automatically provided by Railway (don't add it manually)
- Replace `YOUR_SECURE_RANDOM_STRING_HERE` with a secure random string
- You'll update `ALLOWED_ORIGINS` after deploying the frontend

#### Generate Secure JWT Secret:
Run this in your terminal to generate a secure secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 5: Deploy

1. Click **"Deploy"** or push to your GitHub repository
2. Railway will automatically build and deploy
3. Wait 2-5 minutes for the build to complete

### Step 6: Run Database Migrations

1. Once deployed, go to your API service
2. Click **"Settings"** → **"Deploy"**
3. In the deployment logs, you should see Prisma migrations running
4. If migrations didn't run automatically, click on your service and add a **"Run Command"**:
   ```bash
   npx prisma migrate deploy
   ```

### Step 7: Get Your Backend URL

1. Go to your API service in Railway
2. Click **"Settings"** tab
3. Scroll to **"Domains"**
4. Click **"Generate Domain"**
5. Copy the generated URL (e.g., `https://oasis-api-production.up.railway.app`)

**📝 Save this URL** - you'll need it for the frontend!

### Step 8: Test Your Backend

Visit: `https://your-railway-url.railway.app/docs`

You should see the Swagger API documentation! 📚

---

## Part 2: Deploy Frontend to Vercel 🔺

### Step 1: Sign Up for Vercel

1. Go to https://vercel.com
2. Click **"Sign Up"**
3. Sign in with GitHub
4. Authorize Vercel to access your repositories

### Step 2: Import Project

1. Click **"Add New..."** → **"Project"**
2. Find and select your `oasis` (garden-care) repository
3. Click **"Import"**

### Step 3: Configure Build Settings

Vercel should auto-detect the framework, but verify these settings:

```
Framework Preset: Other
Build Command: npm run build:web:prod
Output Directory: dist/apps/web/browser
Install Command: npm install
Root Directory: (leave empty)
```

### Step 4: Add Environment Variables

Before deploying, click **"Environment Variables"** and add:

```env
API_URL=https://your-railway-backend-url.railway.app/api
```

**⚠️ IMPORTANT**: Replace with your actual Railway backend URL from Part 1, Step 7

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait 2-5 minutes for the build to complete
3. Vercel will provide you with a URL (e.g., `https://oasis-garden-care.vercel.app`)

### Step 6: Update Backend CORS

Now that you have your Vercel URL, go back to Railway:

1. Open your Railway project
2. Click on the API service
3. Go to **"Variables"** tab
4. Update `ALLOWED_ORIGINS` to include your Vercel URL:
   ```
   ALLOWED_ORIGINS=https://your-vercel-app.vercel.app,https://oasis-garden-care.vercel.app
   ```
5. Click **"Deploy"** to restart with new variables

---

## Part 3: Verify Deployment ✅

### Test Frontend
1. Visit your Vercel URL
2. You should see the Oasis landing page! 🌿

### Test Backend
1. Visit `https://your-railway-url.railway.app/docs`
2. You should see the Swagger documentation

### Test Database Connection
1. Check Railway deployment logs
2. Look for: `🚀 Application is running on...`
3. No errors means database is connected! ✅

---

## 🔧 Troubleshooting

### Frontend Issues

**Build fails on Vercel:**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify build command is correct

**White screen/blank page:**
- Check browser console for errors
- Verify `API_URL` environment variable is set correctly
- Check that API is running and accessible

### Backend Issues

**Build fails on Railway:**
- Check build logs in Railway dashboard
- Ensure Prisma migrations are running
- Verify `DATABASE_URL` is connected

**500 Internal Server Error:**
- Check Railway logs
- Verify database connection
- Check environment variables

**CORS errors:**
- Update `ALLOWED_ORIGINS` in Railway to include your Vercel domain
- Redeploy the backend

---

## 📊 Monitoring & Logs

### Railway Logs
1. Go to Railway dashboard
2. Click on your API service
3. Click **"Deployments"** tab
4. View real-time logs

### Vercel Logs
1. Go to Vercel dashboard
2. Click on your project
3. Click **"Deployments"**
4. Click on a deployment to view logs

---

## 🔄 Continuous Deployment

Both platforms are now set up for automatic deployments:

- **Push to GitHub** → Both Railway and Vercel auto-deploy
- **Frontend changes**: Push to main branch → Vercel deploys
- **Backend changes**: Push to main branch → Railway deploys

---

## 💰 Cost Breakdown (Free Tier)

| Service | Free Tier | Limits |
|---------|-----------|--------|
| **Vercel** | ✅ Free | Unlimited bandwidth, 100 GB-hours/month |
| **Railway** | ✅ Free | 500 hours/month, $5 credit |
| **Railway PostgreSQL** | ✅ Free | 500 MB storage, included in credit |

**Total: $0/month** for demonstration! 🎉

---

## 🚀 Next Steps

1. **Custom Domain** (optional):
   - Buy a domain (~$12/year)
   - Add to Vercel and Railway
   
2. **Monitoring** (optional):
   - Set up uptime monitoring (e.g., UptimeRobot - free)
   
3. **SSL/HTTPS**:
   - Both Vercel and Railway provide free SSL automatically ✅

---

## 📞 Need Help?

If you encounter any issues:

1. Check the troubleshooting section above
2. Review deployment logs in Railway/Vercel
3. Verify all environment variables are set correctly
4. Ensure GitHub repository is up to date

---

## 🎉 Congratulations!

Your Oasis Garden Care website is now live! 🌿

- **Frontend**: https://your-app.vercel.app
- **Backend API**: https://your-api.railway.app
- **API Docs**: https://your-api.railway.app/docs

Share your demo URL with clients and start showcasing your garden services! 🏡
