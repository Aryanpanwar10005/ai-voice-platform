# Local AI Voice Platform

A fully local, offline AI voice assistant powered by Ollama. No cloud APIs, no internet dependency, complete privacy.

## Overview

This project implements a complete voice interaction pipeline that runs entirely on your machine. Speak into your microphone, get AI-generated responses, and hear them played back—all without sending data to external servers.

**Current Status:** Functional on Windows 10/11. Audio pipeline tested and working.

## Features

- **Fully Local & Offline** - No cloud APIs, no telemetry, no data leaves your machine
- **Voice Input** - Real-time speech recognition via Whisper
- **LLM Reasoning** - Powered by Ollama (supports any model: llama3, phi3, mistral, etc.)
- **Voice Output** - Natural text-to-speech via Piper TTS
- **Simple UI** - Gradio-based web interface for voice interaction
- **API-First Design** - FastAPI backend ready for automation tools (n8n, etc.)
- **Privacy-Focused** - All processing happens on your hardware

## Architecture
```
User speaks → Whisper STT → Ollama LLM → Piper TTS → Audio playback
                ↓              ↓            ↓
            (audio.wav)   (text response) (output.wav)
```

**Technology Stack:**
- Speech-to-Text: OpenAI Whisper
- LLM: Ollama (local inference)
- Text-to-Speech: Piper TTS
- Backend: FastAPI
- UI: Gradio

## Requirements

### System Requirements
- **OS:** Windows 10/11 (tested), Linux/macOS (should work, untested)
- **RAM:** 8GB minimum, 16GB recommended
- **Storage:** 5-10GB for models
- **CPU/GPU:** GPU recommended for faster inference (Ollama supports CUDA/ROCm)

### Software Dependencies
- Python 3.10+
- [Ollama](https://ollama.ai) (must be installed separately)
- FFmpeg (for audio processing)

## Installation & Setup

### 1. Install Ollama

Download and install Ollama from [https://ollama.ai](https://ollama.ai)

After installation, pull a model (recommended for testing):
```bash
ollama pull phi3:mini
```

For better responses (requires more RAM):
```bash
ollama pull llama3
```

### 2. Install FFmpeg

**Windows:**
- Download from [https://ffmpeg.org/download.html](https://ffmpeg.org/download.html)
- Extract and add to PATH, or use: `choco install ffmpeg` (if you have Chocolatey)

**Linux:**
```bash
sudo apt install ffmpeg
```

### 3. Clone Repository
```bash
git clone https://github.com/Aryanpanwar10005/ai-voice-platform.git
cd ai-voice-platform
```

### 4. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 5. Download Piper TTS Voice Model

Piper voices are **not included** in this repository. You must download them separately.

1. Go to [Piper Voices Repository](https://github.com/rhasspy/piper/releases)
2. Download a voice model (`.onnx` file) and its config (`.onnx.json` file)
   - Recommended: `en_US-lessac-medium.onnx` (clear, natural voice)
3. Place both files in `models/tts/` directory:
```
   models/tts/
   ├── en_US-lessac-medium.onnx
   └── en_US-lessac-medium.onnx.json
```

### 6. Configure Model Paths

Edit `backend/config.py` and update:
```python
PIPER_MODEL = "models/tts/en_US-lessac-medium.onnx"  # Your voice model path
OLLAMA_MODEL = "phi3:mini"  # The Ollama model you pulled
```

## Running the Application

### Option 1: Run UI (Recommended for Testing)
```bash
python backend/ui/app.py
```

This starts a Gradio interface at `http://127.0.0.1:7860`

### Option 2: Run Backend API
```bash
uvicorn backend.main:app --reload
```

API will be available at `http://127.0.0.1:8000`

API Documentation: `http://127.0.0.1:8000/docs`

### Using the UI

1. Open the Gradio interface in your browser
2. Click the microphone icon and speak
3. Wait for transcription → LLM response → audio playback
4. Response audio plays automatically in the browser

## Notes & Limitations

### Performance
- **Speech-to-Text:** 2-5 seconds (depends on audio length and hardware)
- **LLM Response:** 5-30 seconds (depends on model size and prompt complexity)
- **Text-to-Speech:** 1-3 seconds

Local inference is **slower** than cloud APIs. This is expected. GPU acceleration helps significantly.

### Known Issues
- First request is slow (model loading)
- Large Ollama models (70B+) may require 32GB+ RAM
- Whisper model downloads automatically on first run (~1.5GB for `base` model)

### Privacy Note
All audio and text data stays on your machine. No analytics, no logging to external services.

## Roadmap

- [ ] Add voice activity detection (VAD) for better mic control
- [ ] Support for conversation history/context
- [ ] Model selection in UI (switch Ollama models dynamically)
- [ ] Add wake word detection
- [ ] Docker containerization for easier deployment
- [ ] Linux/macOS testing and documentation

## File Structure
```
ai-voice-platform/
├── backend/
│   ├── main.py              # FastAPI backend
│   ├── stt.py               # Whisper speech-to-text
│   ├── tts.py               # Piper text-to-speech
│   ├── config.py            # Configuration settings
│   ├── llm/
│   │   ├── base.py          # LLM interface
│   │   └── ollama_llm.py    # Ollama implementation
│   └── ui/
│       └── app.py           # Gradio UI
├── models/
│   └── tts/                 # Piper voice models (not in repo)
├── outputs/                 # Runtime audio files (gitignored)
├── requirements.txt
├── README.md
├── .gitignore
└── LICENSE
```

## License

MIT License - See LICENSE file for details

## Contributing

This is a personal project, but contributions are welcome. Please open an issue before submitting major changes.

## Acknowledgments

- [Ollama](https://ollama.ai) - Local LLM inference
- [OpenAI Whisper](https://github.com/openai/whisper) - Speech recognition
- [Piper TTS](https://github.com/rhasspy/piper) - Text-to-speech synthesis
- [FastAPI](https://fastapi.tiangolo.com/) - Backend framework
- [Gradio](https://gradio.app/) - UI framework

---

**Questions?** Open an issue on GitHub: https://github.com/Aryanpanwar10005/ai-voice-platform
