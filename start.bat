@echo off
echo ========================================
echo    RendezVous Pro - Starting Server
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if dependencies are installed
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install dependencies!
        pause
        exit /b 1
    )
)

echo Starting RendezVous Pro server...
echo.
echo Frontend: http://localhost:3000
echo API: http://localhost:3000/api
echo Health: http://localhost:3000/api/health
echo.
echo Press Ctrl+C to stop the server
echo.

npm start

pause 