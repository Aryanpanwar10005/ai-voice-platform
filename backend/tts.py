import subprocess
import os

PIPER_EXECUTABLE = "piper"

VOICE_MODEL = r"C:\Users\aryan\Documents\ai-voice-platform\models\tts\en_US-lessac-medium.onnx"
VOICE_CONFIG = r"C:\Users\aryan\Documents\ai-voice-platform\models\tts\en_US-lessac-medium.onnx.json"


def synthesize_speech(text: str, output_path: str) -> None:
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    command = [
        PIPER_EXECUTABLE,
        "--model", VOICE_MODEL,
        "--config", VOICE_CONFIG,
        "--output_file", output_path,
    ]

    process = subprocess.Popen(
        command,
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )

    stdout, stderr = process.communicate(text)

    if process.returncode != 0:
        raise RuntimeError(f"Piper failed:\n{stderr}")

    if not os.path.exists(output_path) or os.path.getsize(output_path) < 1000:
        raise RuntimeError("Piper produced empty audio")
