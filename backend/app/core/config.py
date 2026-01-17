from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "Mithivoices Platform"
    PROJECT_VERSION: str = "0.2.0"
    API_V1_STR: str = "/api/v1"
    
    CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]
    
    # Models
    MODEL_DIR: str = "../voice_assets"
    
    # LLM
    GEMINI_API_KEY: str = ""
    
    class Config:
        env_file = ".env"

settings = Settings()
