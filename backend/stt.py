import whisper


# Load model ONCE (important for performance)
_model = whisper.load_model("base")


def transcribe_audio(audio_path: str) -> str:
    """
    Transcribe a WAV audio file to text using Whisper.
    """
    result = _model.transcribe(audio_path)
    return result.get("text", "").strip()
