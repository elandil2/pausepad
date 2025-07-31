# Deployment Guide - GitHub Pages with Custom Domain

## Overview
This guide shows you how to deploy your Pomodoro timer app to GitHub Pages and use your own custom domain name.

## GitHub Pages Deployment Options

### Option 1: GitHub Pages (Free Hosting)
- **Cost**: Free
- **Custom Domain**: Supported
- **SSL**: Automatic with custom domains
- **Build**: Automatic via GitHub Actions

### Option 2: Vercel (Recommended)
- **Cost**: Free for personal projects
- **Custom Domain**: Supported
- **SSL**: Automatic
- **Build**: Automatic on git push
- **Performance**: Excellent with global CDN

### Option 3: Netlify
- **Cost**: Free tier available
- **Custom Domain**: Supported
- **SSL**: Automatic
- **Build**: Automatic on git push

## Step-by-Step Deployment

### 1. GitHub Repository Setup
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/pomodore-app.git
git branch -M main
git push -u origin main
```

### 2. GitHub Pages Setup
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Select **GitHub Actions** as source
5. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      env:
        VITE_SPOTIFY_CLIENT_ID: ${{ secrets.VITE_SPOTIFY_CLIENT_ID }}
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### 3. Custom Domain Setup

#### A. Purchase Domain
- Buy domain from any registrar (Namecheap, GoDaddy, Cloudflare, etc.)
- Popular options: `.com`, `.app`, `.dev`, `.io`

#### B. Configure DNS
Add these DNS records at your domain registrar:

**For Apex Domain (example.com):**
```
Type: A
Name: @
Value: 185.199.108.153

Type: A  
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

**For Subdomain (www.example.com):**
```
Type: CNAME
Name: www
Value: yourusername.github.io
```

#### C. Configure GitHub Pages
1. In repository **Settings** → **Pages**
2. Add your custom domain: `yourdomain.com`
3. Check **Enforce HTTPS**
4. Create `public/CNAME` file:

```
yourdomain.com
```

### 4. Environment Variables Setup
In GitHub repository **Settings** → **Secrets and variables** → **Actions**:

Add these secrets:
- `VITE_SPOTIFY_CLIENT_ID`: Your Spotify app client ID
- `VITE_SPOTIFY_REDIRECT_URI`: `https://yourdomain.com/callback`

### 5. Vite Configuration for GitHub Pages
Update `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Use '/' for custom domain, '/repo-name/' for github.io subdomain
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
```

## Alternative: Vercel Deployment (Recommended)

### Why Vercel?
- Faster builds and deployments
- Better performance with global CDN
- Automatic preview deployments for PRs
- Superior developer experience

### Setup Steps:
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Add environment variables:
   - `VITE_SPOTIFY_CLIENT_ID`
   - `VITE_SPOTIFY_REDIRECT_URI`
5. Deploy automatically

### Custom Domain on Vercel:
1. Go to project **Settings** → **Domains**
2. Add your custom domain
3. Configure DNS as instructed by Vercel
4. SSL certificate is automatic

## Spotify App Configuration

### Update Redirect URIs
In your Spotify Developer Dashboard:
1. Edit your app settings
2. Add redirect URIs:
   - `https://yourdomain.com/callback`
   - `http://localhost:5173/callback` (for development)

## Cost Breakdown

### GitHub Pages + Custom Domain
- **Hosting**: Free
- **Domain**: $10-15/year
- **Total**: ~$12/year

### Vercel + Custom Domain  
- **Hosting**: Free (hobby plan)
- **Domain**: $10-15/year
- **Total**: ~$12/year

## Performance Optimizations

### 1. Build Optimizations
```json
{
  "scripts": {
    "build": "tsc && vite build --mode production",
    "build:analyze": "npm run build && npx vite-bundle-analyzer"
  }
}
```

### 2. Caching Headers
For GitHub Pages, add `public/_headers`:
```
/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=0, must-revalidate

/service-worker.js
  Cache-Control: public, max-age=0, must-revalidate
```

### 3. Compression
Enable gzip compression in build:
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    compression()
  ]
})
```

## Monitoring and Analytics

### 1. Google Analytics (Optional)
Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Web Vitals Monitoring
```typescript
// src/utils/analytics.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric: any) {
  // Send to your analytics service
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

## Summary

**Recommended Setup:**
1. **Hosting**: Vercel (free, excellent performance)
2. **Domain**: Purchase from Cloudflare or Namecheap
3. **Total Cost**: ~$12/year for domain only
4. **Deployment**: Automatic on git push

This setup gives you:
- Professional custom domain
- Automatic HTTPS/SSL
- Global CDN for fast loading
- Automatic deployments
- Zero hosting costs

The app will be fully production-ready and accessible worldwide at your custom domain!