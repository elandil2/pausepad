@echo off
echo 🍅 PausePad Deployment Script
echo ==============================

REM Check if git is initialized
if not exist ".git" (
    echo 📁 Initializing Git repository...
    git init
    git add .
    git commit -m "Initial commit: PausePad Pomodoro Timer"
) else (
    echo ✅ Git repository already initialized
)

REM Check if remote origin exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo.
    echo 🔗 Please add your GitHub repository URL:
    echo Example: https://github.com/yourusername/pausepad.git
    set /p repo_url="Enter your GitHub repository URL: "
    
    git remote add origin "%repo_url%"
    echo ✅ Remote origin added: %repo_url%
) else (
    echo ✅ Remote origin already configured
)

REM Build the project
echo.
echo 🔨 Building project for production...
call npm run build

if errorlevel 1 (
    echo ❌ Build failed. Please fix the errors and try again.
    pause
    exit /b 1
)

echo ✅ Build completed successfully!

REM Commit and push changes
echo.
echo 📤 Committing and pushing changes...
git add .
git commit -m "Deploy: Update PausePad with latest changes"
git branch -M main
git push -u origin main

echo.
echo 🚀 Deployment initiated!
echo.
echo Next steps:
echo 1. Go to your GitHub repository
echo 2. Click 'Settings' tab
echo 3. Scroll to 'Pages' section
echo 4. Select 'GitHub Actions' as source
echo 5. Wait for deployment to complete (2-3 minutes)
echo.
echo Your app will be available at:
echo https://yourusername.github.io/pausepad/
echo.
echo 🎉 Happy productivity with PausePad!
echo.
pause