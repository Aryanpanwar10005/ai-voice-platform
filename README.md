# Mithivoices

![CI/CD](https://github.com/mithivoices/ai-voice-platform/workflows/CI%2FCD%20Pipeline/badge.svg)
![License](https://img.shields.io/github/license/mithivoices/ai-voice-platform)
![Version](https://img.shields.io/github/v/release/mithivoices/ai-voice-platform)
![Issues](https://img.shields.io/github/issues/mithivoices/ai-voice-platform)

![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

> Professional AI Voice Platform with Text-to-Speech and Speech-to-Text

## Project Structure

```
ai-voice-platform/
├── backend/           # Python FastAPI server
│   ├── app/
│   │   └── main.py    # Main API server
│   ├── tts.py         # Piper TTS integration
│   └── llm/           # LLM support (optional)
├── frontend/          # React + Vite application
├── models/            # TTS voice models
│   └── tts/           # Piper ONNX models
├── outputs/           # Generated audio files
├── docs/              # Documentation
│   ├── PRD.md         # Product Requirements
│   └── TRD.md         # Technical Requirements
├── requirements.txt   # Python dependencies
├── start_backend.bat  # Start backend server
└── start_all.bat      # Start full stack
```

## Quick Start

### Option 1: Run Everything

```bash
start_all.bat
```

### Option 2: Manual Start

**Backend (Python):**

```bash
python -m uvicorn backend.app.main:app --port 8000
```

**Frontend (React):**

```bash
cd frontend
npm run dev
```

**Access:**

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000

## ⚠️ Important Notes

### Voice Models

Voice models are **NOT included** in this repository due to size constraints (~570 MB total).

**You must download them separately:**

```bash
# Windows
download_models.bat

# Linux/Mac
cd backend
python3 download_models.py
```

Models are downloaded from Hugging Face (Piper TTS project).

### First-Time Setup

1. Clone repository (code only - ~10-50 MB)
2. **Download voice models** (required - ~570 MB)
3. Install dependencies
4. Configure environment (.env files)
5. Run servers

See [docs/MODELS.md](docs/MODELS.md) for detailed model information.

## API Endpoints

| Endpoint            | Method | Description         |
| ------------------- | ------ | ------------------- |
| `/health`           | GET    | Server status       |
| `/api/voices`       | GET    | Available voices    |
| `/api/languages`    | GET    | Supported languages |
| `/api/tts/generate` | POST   | Generate audio      |

## Requirements

- Python 3.11+
- Node.js 18+
- Piper TTS (for real audio generation)

## Setup

1. **Install Python dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

2. **Install frontend dependencies:**

   ```bash
   cd frontend && npm install
   ```

3. **Download Piper model (optional for real TTS):**
   ```bash
   python download_models.py
   ```

## License

MIT
