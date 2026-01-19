from typing import Dict, Type
from app.services.llm.base import BaseLLM
from app.services.llm.ollama import OllamaLLM
from app.services.llm.gemini import GeminiLLM
from app.core.config import settings

# Whitelist of allowed LLM providers - prevents injection attacks
ALLOWED_PROVIDERS = frozenset(["ollama", "gemini"])

class LLMFactory:
    _providers: Dict[str, Type[BaseLLM]] = {
        "ollama": OllamaLLM,
        "gemini": GeminiLLM
    }
    
    @classmethod
    def get_llm(cls, provider: str = None) -> BaseLLM:
        if not provider:
            provider = settings.DEFAULT_LLM_PROVIDER
        
        # Sanitize and validate provider
        provider = provider.lower().strip()
        if provider not in ALLOWED_PROVIDERS:
            raise ValueError(f"Invalid LLM provider: '{provider}'. Allowed: {list(ALLOWED_PROVIDERS)}")
        
        provider_class = cls._providers.get(provider)
        if not provider_class:
            raise ValueError(f"Unknown LLM provider: {provider}")
            
        return provider_class()
    
    @classmethod
    def register_provider(cls, name: str, provider_class: Type[BaseLLM]):
        cls._providers[name] = provider_class

