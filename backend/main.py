from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
from pydantic import BaseModel
from pathlib import Path
import uuid

# Internal modules
from backend.tts import text_to_speech
from backend.stt import speech_to_text
from backend.llm.gemini_llm import GeminiLLM   # <-- Gemini Brain

app = FastAPI(title="AI Voice Platform – Gemini Powered")

# -----------------------
# Global setup
# -----------------------

BASE_DIR = Path(__file__).resolve().parent.parent
OUTPUT_DIR = BASE_DIR / "outputs"
OUTPUT_DIR.mkdir(exist_ok=True)

# Initialize LLM (Gemini Brain)
llm = GeminiLLM()

# -----------------------
# TTS – Text to Speech
# -----------------------

class TTSRequest(BaseModel):
    text: str

@app.post("/tts")
def tts_endpoint(request: TTSRequest):
    audio_path = text_to_speech(request.text)
    return FileResponse(audio_path, media_type="audio/wav")


# -----------------------
# STT – Speech to Text
# -----------------------

@app.post("/stt")
def stt_endpoint(file: UploadFile = File(...)):
    input_audio = OUTPUT_DIR / file.filename
    with open(input_audio, "wb") as buffer:
        buffer.write(file.file.read())

    text = speech_to_text(input_audio)
    return {"text": text}


# -----------------------
# COMBINED – Voice Chat
# -----------------------

@app.post("/voice-chat")
def voice_chat(file: UploadFile = File(...)):
    # Save input audio
    input_audio = OUTPUT_DIR / f"{uuid.uuid4()}_{file.filename}"
    with open(input_audio, "wb") as buffer:
        buffer.write(file.file.read())

    # Step 1: Speech → Text
    user_text = speech_to_text(input_audio)

    # Step 2: LLM Reasoning (Gemini Brain)
    ai_text = llm.generate(user_text)

    # Step 3: Text → Speech
    output_audio = text_to_speech(ai_text)

    return FileResponse(output_audio, media_type="audio/wav")
