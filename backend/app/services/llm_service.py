import google.generativeai as genai
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

class GeminiService:
    def __init__(self):
        if not settings.GEMINI_API_KEY:
            logger.warning("GEMINI_API_KEY not set. Voice chat will not function correctly.")
        else:
            try:
                genai.configure(api_key=settings.GEMINI_API_KEY)
                self.model = genai.GenerativeModel('gemini-pro')
            except Exception as e:
                logger.error(f"Failed to configure Gemini: {e}")
                self.model = None

    async def generate_response(self, text: str) -> str:
        if not settings.GEMINI_API_KEY or not hasattr(self, 'model') or not self.model:
            logger.error("Gemini model not initialized")
            return "I am unable to process your request because my brain is not configured."
        
        try:
            # google-generativeai client is synchronous
            response = self.model.generate_content(text)
            return response.text
        except Exception as e:
            logger.error(f"Gemini generation error: {e}")
            return "I'm sorry, I'm having trouble processing your request right now."

llm_service = GeminiService()
