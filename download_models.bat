@echo off
REM Download voice models

echo ========================================
echo Downloading Piper Voice Models
echo ========================================
echo.
echo This will download ~570 MB of voice models
echo from Hugging Face.
echo.
pause

cd backend
python download_models.py

if errorlevel 1 (
    echo.
    echo ERROR: Download failed
    pause
    exit /b 1
)

echo.
echo ========================================
echo Download Complete!
echo ========================================
pause