from fastapi import APIRouter
from app.api.v1.endpoints import tts, stt, voice_chat

api_router = APIRouter()

api_router.include_router(tts.router, prefix="/tts", tags=["Text-to-Speech"])
api_router.include_router(stt.router, prefix="/stt", tags=["Speech-to-Text"])
api_router.include_router(voice_chat.router, prefix="/voice-chat", tags=["Voice Chat"])
