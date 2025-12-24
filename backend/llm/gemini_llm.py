from backend.llm.base import LLM
import google.generativeai as genai

class GeminiLLM(LLM):
    def __init__(self, model: str = "gemini-pro"):
        self.model = genai.GenerativeModel(model)

    def generate(self, text: str) -> str:
        try:
            response = self.model.generate_content(text)
            return response.text
        except Exception as e:
            return f"Error response from Gemini: {str(e)}"
