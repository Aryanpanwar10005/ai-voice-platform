"""
Basic health check tests for backend API.
Ensures core modules and services can be imported successfully.
"""
import pytest


def test_api_imports():
    """Verify core modules can be imported"""
    from app.core.config import settings
    assert settings is not None


def test_services_import():
    """Verify services can be imported"""
    from app.services.tts_service import tts_service
    from app.services.stt_service import stt_service
    assert tts_service is not None
    assert stt_service is not None


def test_llm_factory_import():
    """Verify LLM factory can be imported"""
    from app.services.llm.factory import LLMFactory
    assert LLMFactory is not None
