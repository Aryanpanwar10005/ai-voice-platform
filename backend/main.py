from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
from pydantic import BaseModel
from pathlib import Path
import uuid

from backend.tts import text_to_speech
from backend.stt import speech_to_text

app = FastAPI(title="AI Voice Platform - Phase One")

# Ensure outputs directory exists
OUTPUT_DIR = Path("outputs")
OUTPUT_DIR.mkdir(exist_ok=True)

# -------- TTS --------

class TTSRequest(BaseModel):
    text: str

@app.post("/tts")
def tts_endpoint(request: TTSRequest):
    audio_path = text_to_speech(request.text)
    return FileResponse(audio_path, media_type="audio/wav")


# -------- STT --------

@app.post("/stt")
def stt_endpoint(file: UploadFile = File(...)):
    audio_path = OUTPUT_DIR / file.filename

    with open(audio_path, "wb") as buffer:
        buffer.write(file.file.read())

    text = speech_to_text(audio_path)
    return {"text": text}


# -------- COMBINED MODE --------

@app.post("/voice-chat")
def voice_chat(file: UploadFile = File(...)):
    # Save input audio
    input_audio = OUTPUT_DIR / f"{uuid.uuid4()}_{file.filename}"
    with open(input_audio, "wb") as buffer:
        buffer.write(file.file.read())

    # Step 1: Speech → Text
    text = speech_to_text(input_audio)

    # Step 2: Logic (Phase One = echo)
    response_text = f"You said: {text}"

    # Step 3: Text → Speech
    output_audio = text_to_speech(response_text)

    return FileResponse(output_audio, media_type="audio/wav")
