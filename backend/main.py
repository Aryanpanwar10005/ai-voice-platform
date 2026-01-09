import os
import uuid
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from backend.stt import transcribe_audio
from backend.tts import synthesize_speech
from backend.llm.ollama_llm import OllamaLLM


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(BASE_DIR, "..", "outputs")
os.makedirs(OUTPUT_DIR, exist_ok=True)

app = FastAPI(title="AI Voice Platform (Local Backend)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

llm = OllamaLLM(model="llama3")


@app.post("/voice-chat")
async def voice_chat(audio: UploadFile = File(...)):
    request_id = uuid.uuid4().hex

    input_wav = os.path.join(OUTPUT_DIR, f"{request_id}_input.wav")
    output_wav = os.path.join(OUTPUT_DIR, f"{request_id}_output.wav")

    # Save input audio
    with open(input_wav, "wb") as f:
        f.write(await audio.read())

    # STT
    transcription = transcribe_audio(input_wav).strip()

    # LLM
    ai_response = llm.generate(transcription)

    # TTS (blocking, finishes before response)
    synthesize_speech(ai_response, output_wav)

    return JSONResponse(
        content={
            "transcription": transcription,
            "ai_response": ai_response,
            "audio_file_path": os.path.abspath(output_wav),
        }
    )
