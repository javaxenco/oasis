# 📝 Deployment Notes & Configuration

## ✅ What's Been Configured

Your Oasis Garden Care application is now ready for deployment! Here's what's been set up:

### 1. Environment Variables ✅
- ✅ `.env.example` - Template for backend environment variables
- ✅ `apps/web/.env.example` - Template for frontend environment variables
- ✅ `.gitignore` updated to prevent committing secrets

### 2. Build Scripts ✅
Added to `package.json`:
```json
"build:web:prod": "nx build web --configuration=production"
"build:api:prod": "nx build api --configuration=production"
"prisma:migrate": "prisma migrate deploy"
"prisma:generate": "prisma generate"
```

### 3. Deployment Configs ✅
- ✅ `vercel.json` - Vercel configuration for frontend
- ✅ `railway.json` - Railway configuration for backend
- ✅ `Procfile` - Alternative deployment configuration

### 4. Database ✅
- ✅ Prisma schema updated with `DATABASE_URL` from environment
- ✅ Migrations ready to deploy

### 5. API Configuration ✅
- ✅ CORS configured to read from `ALLOWED_ORIGINS` environment variable
- ✅ Port configuration from environment
- ✅ Swagger docs updated with Oasis branding

### 6. Frontend Configuration ✅
- ✅ Environment files created (`environment.ts`, `environment.prod.ts`)
- ✅ API service updated to use environment configuration
- ✅ Build configuration updated for production environment

---

## 🔑 What You Need to Provide

### For Railway (Backend):

**JWT_SECRET**: 
Generate a secure random string:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output and use it as your `JWT_SECRET` in Railway environment variables.

**ALLOWED_ORIGINS**: 
After deploying to Vercel, update this with your Vercel URL:
```
ALLOWED_ORIGINS=https://your-app.vercel.app
```

### For Vercel (Frontend):

**API_URL**: 
After deploying to Railway, update this with your Railway backend URL:
```
API_URL=https://your-railway-app.railway.app/api
```

⚠️ **IMPORTANT**: Make sure to include `/api` at the end!

---

## 📋 Deployment Checklist

### Before Deployment:
- [ ] Code is pushed to GitHub
- [ ] All files are committed
- [ ] `.env` files are in `.gitignore` (already done ✅)

### Railway Setup:
- [ ] Create Railway account
- [ ] Deploy from GitHub repository
- [ ] Add PostgreSQL database
- [ ] Set environment variables:
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=3000`
  - [ ] `JWT_SECRET=<your-generated-secret>`
  - [ ] `ALLOWED_ORIGINS=<your-vercel-url>`
- [ ] Generate domain
- [ ] Copy Railway URL

### Vercel Setup:
- [ ] Create Vercel account
- [ ] Import project from GitHub
- [ ] Configure build settings:
  - [ ] Build Command: `npm run build:web:prod`
  - [ ] Output Directory: `dist/apps/web/browser`
- [ ] Set environment variable:
  - [ ] `API_URL=<your-railway-url>/api`
- [ ] Deploy
- [ ] Copy Vercel URL

### Final Steps:
- [ ] Update `ALLOWED_ORIGINS` in Railway with Vercel URL
- [ ] Test frontend at Vercel URL
- [ ] Test backend at Railway URL + `/docs`
- [ ] Verify API calls are working

---

## 🔧 Important Files

### Backend Environment Variables (Railway):
```env
DATABASE_URL=<automatically-provided-by-railway>
NODE_ENV=production
PORT=3000
JWT_SECRET=<generate-secure-random-string>
ALLOWED_ORIGINS=<your-vercel-url>
```

### Frontend Configuration:
File: `apps/web/src/environments/environment.prod.ts`
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-railway-url.railway.app/api'
};
```

⚠️ **After getting your Railway URL**, update this file and commit the changes!

---

## 🎯 Next Steps

1. **Read the deployment guides**:
   - Quick Start: [DEPLOYMENT-QUICKSTART.md](./DEPLOYMENT-QUICKSTART.md)
   - Full Guide: [DEPLOYMENT.md](./DEPLOYMENT.md)

2. **Deploy Backend to Railway** (follow guide)

3. **Deploy Frontend to Vercel** (follow guide)

4. **Update Environment Variables**:
   - Update `environment.prod.ts` with your Railway URL
   - Push changes to GitHub
   - Both platforms will auto-redeploy

5. **Test Everything**:
   - Frontend loads correctly
   - API calls work
   - No CORS errors
   - Swagger docs accessible

---

## 📞 Common Issues & Solutions

### Issue: Frontend shows blank page
**Solution**: 
- Check browser console (F12)
- Verify `environment.prod.ts` has correct Railway URL
- Ensure Railway backend is running

### Issue: CORS errors
**Solution**:
- Update `ALLOWED_ORIGINS` in Railway
- Include full Vercel URL (with https://)
- Redeploy backend

### Issue: 404 on API calls
**Solution**:
- Verify Railway URL ends with `/api` in frontend config
- Check Railway logs for errors
- Ensure database migrations ran

### Issue: Database connection failed
**Solution**:
- Check Railway PostgreSQL is running
- Verify `DATABASE_URL` is set automatically
- Check deployment logs for migration errors

---

## 🎉 Success Indicators

You'll know deployment was successful when:

✅ Vercel shows: "Deployment completed successfully"
✅ Railway shows: "Deploy successful" with green checkmark
✅ Frontend loads at your Vercel URL
✅ Swagger docs load at Railway URL + `/docs`
✅ No errors in browser console
✅ API calls from frontend work correctly

---

## 💰 Cost Reminder

- **Railway Free Tier**: 500 hours/month (enough for 24/7 demo)
- **Vercel Free Tier**: Unlimited deployments
- **Total Cost**: $0 for demonstration purposes! 🎉

---

## 📊 Monitoring Your Apps

### Railway:
- Dashboard → Your Project → Deployments
- View logs in real-time
- Check database metrics

### Vercel:
- Dashboard → Your Project → Deployments
- View build logs
- Check analytics

---

## 🚀 Ready to Deploy!

Everything is configured and ready. Follow the deployment guides and you'll have your site live in about 15 minutes!

**Start here**: [DEPLOYMENT-QUICKSTART.md](./DEPLOYMENT-QUICKSTART.md)

Good luck! 🌿
