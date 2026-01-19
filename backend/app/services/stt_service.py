import os
import logging
import time
import shutil
from pathlib import Path
from tempfile import NamedTemporaryFile
from typing import Dict, Any

# Note: In a real environment, we would import 'whisper' here.
# Since we are setting up the structure first, we'll keep the import optional
# or mock it if 'openai-whisper' isn't installed yet, to ensure the app starts.
try:
    import whisper
    WHISPER_AVAILABLE = True
except ImportError:
    WHISPER_AVAILABLE = False

logger = logging.getLogger(__name__)

# Maximum file size: 50MB - prevents DoS attacks from large uploads
MAX_FILE_SIZE = 50 * 1024 * 1024

class STTService:
    def __init__(self):
        self.model_size = "base"
        self.model = None
        self.temp_dir = Path("temp_stt_uploads")
        self.temp_dir.mkdir(exist_ok=True)
        logger.info(f"STT Service initialized. Whisper available: {WHISPER_AVAILABLE}")

    def load_model(self):
        """Lazy load the model only when needed to save startup time/memory."""
        if not WHISPER_AVAILABLE:
            raise ImportError("openai-whisper is not installed. Please install it.")
        
        if self.model is None:
            logger.info(f"Loading Whisper '{self.model_size}' model...")
            try:
                self.model = whisper.load_model(self.model_size)
                logger.info("Whisper model loaded successfully.")
            except Exception as e:
                logger.error(f"Failed to load Whisper model: {e}")
                raise RuntimeError(f"Could not load STT model: {e}")

    async def transcribe(self, file_content: bytes, filename: str) -> Dict[str, Any]:
        """
        Transcribes audio content.
        """
        # Validate file size to prevent DoS attacks
        if len(file_content) > MAX_FILE_SIZE:
            raise ValueError(f"File too large. Maximum size: {MAX_FILE_SIZE // (1024*1024)}MB")
        
        if not WHISPER_AVAILABLE:
            # Fallback/Mock for testing without Whisper installed
            logger.warning("Whisper not available, using mock transcription.")
            return {
                "text": "This is a mock transcription because Whisper is not installed.",
                "language": "en",
                "confidence": 0.99,
                "segments": []
            }

        self.load_model()
        
        # Save bytes to a temporary file
        temp_path = self.temp_dir / f"{int(time.time())}_{filename}"
        
        try:
            with open(temp_path, "wb") as f:
                f.write(file_content)
            
            # Run transcription
            logger.info(f"Transcribing {temp_path}...")
            # fp16=False is safer for CPU inference to avoid warnings
            result = self.model.transcribe(str(temp_path), fp16=False)
            
            return {
                "text": result.get("text", "").strip(),
                "language": result.get("language", "unknown"),
                "confidence": 1.0, # Whisper doesn't give a single global confidence easily
                "segments": result.get("segments", [])
            }
            
        except Exception as e:
            logger.error(f"Transcription failed: {e}")
            raise e
        finally:
            # Cleanup temp file
            if temp_path.exists():
                try:
                    os.remove(temp_path)
                except Exception as cleanup_error:
                    logger.warning(f"Failed to delete temp file {temp_path}: {cleanup_error}")

stt_service = STTService()
