from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from typing import Optional
import logging

from app.services.stt_service import stt_service
from app.services.tts_service import tts_service
from app.services.llm_service import llm_service
from app.schemas.stt import STTResponse

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("", response_model=dict)
async def voice_chat(
    file: UploadFile = File(...),
):
    """
    Full pipeline: Audio Input -> STT -> LLM -> TTS -> Audio Output
    """
    try:
        # 1. Speech to Text
        # We can reuse the transcribe logic. STT Service expects a file-like object or path?
        # Let's check stt_service.transcribe_audio. It takes 'file: UploadFile'.
        transcript_result = await stt_service.transcribe_audio(file)
        user_text = transcript_result["text"]
        
        if not user_text:
            return {
                "user_text": "",
                "ai_text": "I didn't hear anything.",
                "audio_url": None
            }

        # 2. LLM Generation
        ai_text = await llm_service.generate_response(user_text)

        # 3. Text to Speech
        # We need to pick a default voice. Let's look for a default or just pick the first one.
        # Or maybe make it configurable later. For now, default to 'en_US-lessac-medium' or first available.
        voices = tts_service.get_available_voices()
        voice_id = "en_US-lessac-medium.onnx" # fallback default
        if voices:
            # Try to find a good default or just take the first one
            voice_id = voices[0]["id"]
            
        # Generate audio
        tts_result = await tts_service.generate_audio(
            text=ai_text,
            voice_id=voice_id,
            speed=1.0
        )
        
        return {
            "user_text": user_text,
            "ai_text": ai_text,
            "audio_url": tts_result["url"],
            "duration": tts_result["duration"]
        }

    except Exception as e:
        logger.error(f"Voice chat error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Voice chat processing failed: {str(e)}")
