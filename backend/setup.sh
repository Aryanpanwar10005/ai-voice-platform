#!/bin/bash
# ============================================
# Mithivoices Backend Setup Script
# ============================================

echo "========================================"
echo "Mithivoices Backend Setup"
echo "========================================"
echo ""

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 not found. Please install Python 3.10+"
    exit 1
fi

echo "[1/5] Creating virtual environment..."
python3 -m venv venv

echo "[2/5] Activating virtual environment..."
source venv/bin/activate

echo "[3/5] Upgrading pip..."
python -m pip install --upgrade pip

echo "[4/5] Installing dependencies..."
pip install -r requirements.txt

echo "[5/5] Creating required directories..."
mkdir -p outputs models voices

echo ""
echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "Next Steps:"
echo "  1. Copy .env.example to .env"
echo "  2. Download voice models: python download_models.py"
echo "  3. Start server: python main.py"
echo ""