# 🚀 PausePad Deployment Guide

This guide will help you deploy your PausePad application to GitHub Pages for free hosting.

## 📋 Prerequisites

- GitHub account
- Git installed on your computer
- Node.js and npm installed

## 🔧 Step 1: Prepare Your Repository

### 1.1 Initialize Git Repository (if not already done)
```bash
git init
git add .
git commit -m "Initial commit: PausePad Pomodoro Timer"
```

### 1.2 Create GitHub Repository
1. Go to [GitHub.com](https://github.com)
2. Click "New repository" (green button)
3. Name your repository: `pausepad` (or any name you prefer)
4. Make it **Public** (required for free GitHub Pages)
5. Don't initialize with README (we already have files)
6. Click "Create repository"

### 1.3 Connect Local Repository to GitHub
```bash
# Replace 'yourusername' with your actual GitHub username
git remote add origin https://github.com/yourusername/pausepad.git
git branch -M main
git push -u origin main
```

## 🌐 Step 2: Configure GitHub Pages

### 2.1 Update Repository Name in Config
If your repository name is different from "pausepad", update the base path in `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/your-repository-name/', // Replace with your actual repo name
  // ... rest of config
})
```

### 2.2 Enable GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "GitHub Actions"
5. The workflow will automatically deploy when you push to main branch

## 🚀 Step 3: Deploy

### 3.1 Push Your Code
```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```

### 3.2 Monitor Deployment
1. Go to your repository on GitHub
2. Click "Actions" tab
3. You'll see the deployment workflow running
4. Wait for it to complete (usually 2-3 minutes)

### 3.3 Access Your Live Site
Once deployment completes, your site will be available at:
```
https://yourusername.github.io/pausepad/
```

## 🔄 Step 4: Automatic Updates

Every time you push changes to the `main` branch, GitHub Actions will automatically:
1. Build your application
2. Deploy the updated version to GitHub Pages
3. Your live site will be updated within minutes

## 🛠️ Alternative Deployment Options

### Option 1: Vercel (Recommended for React apps)
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your repository
5. Vercel will auto-detect Vite and deploy
6. Get a custom domain like `pausepad.vercel.app`

### Option 2: Netlify
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "New site from Git"
4. Choose your repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Deploy!

### Option 3: Surge.sh (Simple CLI deployment)
```bash
npm install -g surge
npm run build
cd dist
surge
```

## 🎯 Custom Domain (Optional)

### For GitHub Pages:
1. Buy a domain from any registrar
2. Add a `CNAME` file to your `public` folder with your domain
3. Configure DNS settings with your registrar
4. Enable custom domain in GitHub Pages settings

### For Vercel/Netlify:
- Both platforms provide easy custom domain setup in their dashboards

## 🔧 Troubleshooting

### Common Issues:

**1. 404 Error on Refresh**
- This is normal for SPAs on GitHub Pages
- Users can navigate using the app's internal routing

**2. Assets Not Loading**
- Check that `base` path in `vite.config.ts` matches your repository name
- Ensure all asset paths are relative

**3. Build Fails**
- Check the Actions tab for error details
- Ensure all dependencies are in `package.json`
- Run `npm run build` locally to test

**4. YouTube Player Issues**
- YouTube embeds work fine on HTTPS (GitHub Pages uses HTTPS)
- No additional configuration needed

## 📱 PWA Features

Your app is already configured as a Progressive Web App (PWA):
- ✅ Installable on mobile devices
- ✅ Works offline (basic functionality)
- ✅ App-like experience
- ✅ Custom app icons

## 🎉 You're Live!

Congratulations! Your PausePad Pomodoro Timer is now live and accessible to anyone on the internet. Share your URL and let people enjoy your beautiful, functional timer app!

### Next Steps:
- Share your app with friends and colleagues
- Consider adding analytics (Google Analytics, etc.)
- Collect user feedback for improvements
- Add more features based on user requests

---

**Need Help?** 
- Check GitHub Actions logs for deployment issues
- Ensure your repository is public for free GitHub Pages
- Verify all file paths are correct in your code