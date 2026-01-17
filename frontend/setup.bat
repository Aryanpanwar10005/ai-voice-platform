@echo off
REM ============================================
REM Mithivoices Frontend Setup Script
REM ============================================

echo ========================================
echo Mithivoices Frontend Setup
echo ========================================
echo.

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not found. Please install Node.js 18+
    pause
    exit /b 1
)

echo [1/2] Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo [2/2] Setup complete!

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next Steps:
echo   1. Copy .env.example to .env.local
echo   2. Start dev server: npm run dev
echo   3. Build for production: npm run build
echo.
pause