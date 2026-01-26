# 🚀 Quick Deployment Checklist

## Before You Start

### 1. Push Your Code to GitHub
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

---

## 🚂 Railway (Backend) Setup - 10 minutes

### Quick Steps:
1. ✅ Go to https://railway.app
2. ✅ Sign in with GitHub
3. ✅ Click "New Project" → "Deploy from GitHub repo"
4. ✅ Select your `oasis` repository
5. ✅ Click "+ New" → "Database" → "PostgreSQL"
6. ✅ Click on API service → "Variables" → Add these:

```env
NODE_ENV=production
PORT=3000
JWT_SECRET=<GENERATE_THIS_BELOW>
ALLOWED_ORIGINS=<YOUR_VERCEL_URL_HERE>
```

### Generate JWT Secret:
Run in terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

7. ✅ Settings → Domains → "Generate Domain"
8. ✅ **COPY YOUR RAILWAY URL** (e.g., `oasis-api.railway.app`)

---

## 🔺 Vercel (Frontend) Setup - 5 minutes

### Quick Steps:
1. ✅ Go to https://vercel.com
2. ✅ Sign in with GitHub
3. ✅ "Add New..." → "Project"
4. ✅ Import your `oasis` repository
5. ✅ Configure:
   - Build Command: `npm run build:web:prod`
   - Output Directory: `dist/apps/web/browser`
6. ✅ Add Environment Variable:

```env
API_URL=https://<YOUR_RAILWAY_URL>/api
```

7. ✅ Click "Deploy"
8. ✅ **COPY YOUR VERCEL URL**

---

## 🔄 Final Step: Update CORS

1. Go back to Railway
2. Open your API service
3. Update `ALLOWED_ORIGINS` variable:
```
ALLOWED_ORIGINS=https://your-actual-vercel-url.vercel.app
```
4. Click "Deploy" to restart

---

## ✅ Verification

### Check Frontend:
- Visit: `https://your-vercel-url.vercel.app`
- Should see: Oasis landing page 🌿

### Check Backend:
- Visit: `https://your-railway-url.railway.app/docs`
- Should see: Swagger API documentation 📚

---

## 🎯 What You Need From Each Platform

### From Railway:
- ❌ **NO CREDIT CARD REQUIRED** for free tier
- 📧 Just your GitHub account

### From Vercel:
- ❌ **NO CREDIT CARD REQUIRED** for free tier
- 📧 Just your GitHub account

---

## 🔧 Quick Fixes

### If Frontend Shows Blank:
- Check browser console (F12)
- Verify `API_URL` in Vercel environment variables
- Make sure it ends with `/api`

### If Backend Won't Start:
- Check Railway logs
- Verify `DATABASE_URL` is automatically set
- Make sure Prisma migrations ran

### If CORS Errors:
- Update `ALLOWED_ORIGINS` in Railway
- Include your full Vercel URL
- Redeploy backend

---

## 📱 Share Your Demo

Once deployed:
- **Website**: `https://your-app.vercel.app`
- **API Docs**: `https://your-api.railway.app/docs`

Share these with clients! 🎉

---

## 🆘 Need Help?

See full guide: [DEPLOYMENT.md](./DEPLOYMENT.md)
