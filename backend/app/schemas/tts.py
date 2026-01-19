from pydantic import BaseModel, Field
from typing import Optional

class TTSRequest(BaseModel):
    text: str = Field(
        ...,
        min_length=1,
        max_length=5000,
        description="Text to synthesize (1-5000 characters)"
    )
    voice_id: str = Field(..., description="Voice model identifier")
    language: str = Field(default="en_US", description="Language code")
    speed: float = Field(
        default=1.0,
        ge=0.5,
        le=2.0,
        description="Speed multiplier (0.5-2.0)"
    )

class TTSResponse(BaseModel):
    audio_url: str
    duration: float
    message: str

