#!/bin/bash

# PausePad Deployment Script
# This script will help you deploy your PausePad app to GitHub Pages

echo "🍅 PausePad Deployment Script"
echo "=============================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: PausePad Pomodoro Timer"
else
    echo "✅ Git repository already initialized"
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo ""
    echo "🔗 Please add your GitHub repository URL:"
    echo "Example: https://github.com/yourusername/pausepad.git"
    read -p "Enter your GitHub repository URL: " repo_url
    
    git remote add origin "$repo_url"
    echo "✅ Remote origin added: $repo_url"
else
    echo "✅ Remote origin already configured"
fi

# Build the project
echo ""
echo "🔨 Building project for production..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
else
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

# Commit and push changes
echo ""
echo "📤 Committing and pushing changes..."
git add .
git commit -m "Deploy: Update PausePad with latest changes"
git branch -M main
git push -u origin main

echo ""
echo "🚀 Deployment initiated!"
echo ""
echo "Next steps:"
echo "1. Go to your GitHub repository"
echo "2. Click 'Settings' tab"
echo "3. Scroll to 'Pages' section"
echo "4. Select 'GitHub Actions' as source"
echo "5. Wait for deployment to complete (2-3 minutes)"
echo ""
echo "Your app will be available at:"
echo "https://yourusername.github.io/pausepad/"
echo ""
echo "🎉 Happy productivity with PausePad!"