# VoxAI – AI Voice Platform

A local-first AI voice platform for text-to-speech, speech-to-text, and voice-based AI interactions. All processing runs locally using open-source models to ensure privacy and low latency.

## Features

- **Text-to-Speech (TTS)** – Convert text into natural-sounding speech with adjustable speed, pitch, and stability
- **Speech-to-Text (STT)** – Transcribe audio from recordings or file uploads using Whisper
- **Voice Chat** – Have AI conversations using your voice (STT → LLM → TTS pipeline)
- **Audio History** – Session-based history (Phase 2) with play, download, and management features
- **Waveform Visualization** – Visual representation of generated audio
- **Edit Mode (Planned)** – Non-destructive audio trimming and regeneration

## Status

**Phase 1:** Complete – Core backend functionality (TTS, STT, Voice Chat)  
**Phase 2:** In Progress – Professional UI implementation  
**Phase 3:** Planned – User authentication, database persistence, cloud deployment

## Technology Stack

### Frontend
- React 18 with TypeScript
- Vite build tool
- Tailwind CSS
- Native browser APIs (MediaRecorder, HTMLAudioElement)

### Backend
- FastAPI (Python)
- Piper TTS (local text-to-speech)
- Whisper (base model, local speech-to-text)
- Ollama with Llama3 (local language model)
- File-based storage

### Infrastructure
- Local development environment
- Docker containerization (in progress)
- Oracle Cloud deployment (planned)

## Project Structure

```
ai-voice-platform/
├── backend/           # FastAPI application
│   ├── main.py       # API endpoints
│   ├── tts.py        # Piper TTS integration
│   ├── stt.py        # Whisper STT integration
│   └── llm/          # Ollama LLM integration
├── frontend/          # React application (in progress)
├── models/           # Local AI model files
│   └── tts/         # Piper voice models
├── outputs/          # Generated audio files
├── docs/
│   ├── PRD.md       # Product Requirements Document
│   └── TRD.md       # Technical Requirements Document
├── requirements.txt  # Python dependencies
└── README.md
```

## Local Setup

### Prerequisites

- Python 3.10+
- Node.js 18+ (for frontend)
- Piper TTS (https://github.com/rhasspy/piper)
- Ollama running locally (for voice chat)

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/Aryanpanwar10005/ai-voice-platform.git
cd ai-voice-platform
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Download Piper TTS models:
```bash
# Place models in models/tts/ directory
# Required: en_US-lessac-medium.onnx and config file
```

5. Start the backend server:
```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://127.0.0.1:8000`

### Frontend Setup (Phase 2)

```bash
cd frontend
npm install
npm run dev
```

The UI will be available at `http://localhost:5173`

### Verify Installation

Open `http://127.0.0.1:8000/` in your browser. You should see:
```json
{"status": "online", "message": "AI Voice Platform API is running"}
```

## API Endpoints

- `GET /` – Health check
- `POST /tts` – Text-to-speech generation
- `POST /stt` – Speech-to-text transcription
- `POST /voice-chat` – Combined voice interaction
- `GET /audio/{filename}` – Retrieve generated audio files

Full API documentation: See `docs/TRD.md`

## Documentation

- **[Product Requirements Document (PRD)](docs/PRD.md)** – Product vision, features, design system, success metrics
- **[Technical Requirements Document (TRD)](docs/TRD.md)** – Architecture, API specifications, deployment strategy

## Roadmap

### Phase 1 (Complete)
- Core TTS functionality using Piper
- Core STT functionality using Whisper
- Voice chat pipeline (STT → Ollama → TTS)
- REST API with FastAPI
- Local file-based storage

### Phase 2 (In Progress)
- Professional React-based UI
- Audio waveform visualization
- Session-based history panel
- Parameter controls (speed, pitch, stability)
- Responsive design

### Phase 3 (Planned)
- User authentication
- Database persistence (PostgreSQL)
- Edit mode with audio trimming
- Usage credits system
- Oracle Cloud deployment

### Phase 4 (Future)
- Voice cloning
- Batch processing
- Multiple language support
- Developer API
- Real-time collaboration

## Project Philosophy

### Local-First
All AI processing runs on your local machine. No data is sent to external APIs or cloud services during normal operation.

### Privacy-Focused
- No user tracking
- No telemetry
- Audio files stored locally
- Open-source models
- Self-hostable

### Not a SaaS Product
This project is not a hosted SaaS product. VoxAI is designed to be self-hosted and run entirely on your own machine.

### Open-Source
Built with open-source tools and models. Contributions welcome.

## Performance

- **TTS Generation:** ~2-3 seconds for 500 characters
- **STT Transcription:** ~5-10 seconds for 60 seconds of audio
- **Voice Chat Round-trip:** ~15-20 seconds
- **Audio Format:** WAV, 22.05kHz, 16-bit mono

## Hardware Requirements

### Minimum
- 4GB RAM
- Dual-core CPU
- 2GB free disk space

### Recommended
- 8GB RAM
- Quad-core CPU
- 5GB free disk space
- GPU (optional, for faster Whisper transcription)

## Known Limitations

- Single-user, single-session (no concurrency in Phase 1-2)
- Session-based history (lost on browser reload in Phase 2)
- English language only (current models)
- No mobile app (web-based only)

## Contributing

Contributions are welcome. Please read the documentation before submitting pull requests:
1. Review `docs/PRD.md` for product direction
2. Review `docs/TRD.md` for technical architecture
3. Follow existing code style
4. Test locally before submitting

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Author

Aryan Panwar  
GitHub: [@Aryanpanwar10005](https://github.com/Aryanpanwar10005)

## Acknowledgments

- [Piper TTS](https://github.com/rhasspy/piper) – High-quality text-to-speech
- [Whisper](https://github.com/openai/whisper) – Robust speech recognition
- [Ollama](https://ollama.ai/) – Local LLM inference
- [FastAPI](https://fastapi.tiangolo.com/) – Modern Python web framework