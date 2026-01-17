@echo off
REM ============================================
REM Mithivoices Backend Setup Script
REM ============================================

echo ========================================
echo Mithivoices Backend Setup
echo ========================================
echo.

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python not found. Please install Python 3.10+
    pause
    exit /b 1
)

echo [1/5] Creating virtual environment...
python -m venv venv
if errorlevel 1 (
    echo ERROR: Failed to create virtual environment
    pause
    exit /b 1
)

echo [2/5] Activating virtual environment...
call venv\Scripts\activate.bat

echo [3/5] Upgrading pip...
python -m pip install --upgrade pip

echo [4/5] Installing dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo [5/5] Creating required directories...
if not exist "outputs" mkdir outputs
if not exist "models" mkdir models
if not exist "voices" mkdir voices

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next Steps:
echo   1. Copy .env.example to .env
echo   2. Download voice models: python download_models.py
echo   3. Start server: python main.py
echo.
pause