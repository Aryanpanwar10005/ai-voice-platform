import os
import requests

# URLs for the Lessac Medium voice
MODEL_URL = "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/lessac/medium/en_US-lessac-medium.onnx?download=true"
CONFIG_URL = "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/lessac/medium/en_US-lessac-medium.onnx.json?download=true"

# Define models directory relative to this script
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEST_DIR = os.path.join(BASE_DIR, "models", "tts")

def download_file(url, dest):
    if os.path.exists(dest):
        print(f"File already exists: {dest}")
        return

    print(f"Downloading {url}...")
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        with open(dest, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f"Saved to {dest}")
    except Exception as e:
        print(f"Failed to download {url}: {e}")

if __name__ == "__main__":
    print(f"Downloading models to {DEST_DIR}...")
    os.makedirs(DEST_DIR, exist_ok=True)
    
    download_file(MODEL_URL, os.path.join(DEST_DIR, "en_US-lessac-medium.onnx"))
    download_file(CONFIG_URL, os.path.join(DEST_DIR, "en_US-lessac-medium.onnx.json"))
    
    print("Done! You can now run the backend.")
