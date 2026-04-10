@echo off
echo ========================================
echo  LoL Live Esports - Local Dev Setup
echo ========================================
echo.

if not exist "node_modules\" (
    echo [1/2] Installing dependencies...
    npm install --legacy-peer-deps
    if errorlevel 1 (
        echo.
        echo ERROR: npm install failed. Make sure Node.js is installed.
        echo Download Node.js from: https://nodejs.org
        pause
        exit /b 1
    )
    echo Dependencies installed!
) else (
    echo [1/2] Dependencies already installed, skipping...
)

echo.
echo [2/2] Starting dev server...
echo App will open at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

npm start
