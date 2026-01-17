# download_models.py
"""
Download voice models to voice_assets/ directory
"""
import os
import requests
from pathlib import Path

# Voice models configuration
VOICE_MODELS_BASE = "https://huggingface.co/rhasspy/piper-voices/resolve/main"

# Map simplified names to Hugging Face paths
# Format: "local_dir/name": "hugging_face_path"
# using relative paths from https://huggingface.co/rhasspy/piper-voices/resolve/main/
VOICES = {
    # INDIC VOICES
    "indic/hi/hi_IN-pratham-medium": "hi/hi_IN/pratham/medium/hi_IN-pratham-medium.onnx",
    "indic/hi/hi_IN-priyamvada-medium": "hi/hi_IN/priyamvada/medium/hi_IN-priyamvada-medium.onnx",
    "indic/ml/ml_IN-arjun-medium": "ml/ml_IN/arjun/medium/ml_IN-arjun-medium.onnx",
    "indic/ml/ml_IN-meera-medium": "ml/ml_IN/meera/medium/ml_IN-meera-medium.onnx",
    "indic/ne/ne_NP-ardent-medium": "ne/ne_NP/ardent/medium/ne_NP-ardent-medium.onnx",
    
    # PIPER VOICES (English & Others)
    "piper/en_US/en_US-lessac-medium": "en/en_US/lessac/medium/en_US-lessac-medium.onnx",
    "piper/en_US/en_US-amy-medium": "en/en_US/amy/medium/en_US-amy-medium.onnx",
    "piper/en_US/en_US-ryan-medium": "en/en_US/ryan/medium/en_US-ryan-medium.onnx",
    "piper/en_GB/en_GB-alan-medium": "en/en_GB/alan/medium/en_GB-alan-medium.onnx",
    "piper/de_DE/de_DE-thorsten-medium": "de/de_DE/thorsten/medium/de_DE-thorsten-medium.onnx",
    "piper/es_ES/es_ES-davefx-medium": "es/es_ES/davefx/medium/es_ES-davefx-medium.onnx",
    "piper/es_MX/es_MX-ald-medium": "es/es_MX/ald/medium/es_MX-ald-medium.onnx"
}

def download_file(url, dest_path):
    """Download a file if it doesn't exist"""
    if dest_path.exists():
        print(f"  ✅ Exists: {dest_path.name}")
        return

    print(f"  ⬇️  Downloading {dest_path.name}...")
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        with open(dest_path, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
                
        print(f"  ✅ Saved to {dest_path}")
    except Exception as e:
        print(f"  ❌ Failed to download {url}: {e}")
        # Identify associated JSON config
        if str(dest_path).endswith(".onnx"):
            # Try to clean up partial download
            if dest_path.exists():
                dest_path.unlink()

def download_voice_models():
    """Download all voice models to voice_assets/"""
    base_path = Path("voice_assets")
    base_path.mkdir(exist_ok=True)
    
    print(f"Downloading voice models to {base_path.absolute()}...")
    
    for local_name, hf_path in VOICES.items():
        # Clean up local name to get directory and filename
        local_rel_path = f"{local_name}.onnx"
        dest_onnx = base_path / local_rel_path
        dest_json = base_path / f"{local_name}.onnx.json"
        
        # Create parent directories
        dest_onnx.parent.mkdir(parents=True, exist_ok=True)
        
        # Build URLs
        # Note: hf_path is like "hi/hi_IN/pratham/medium/hi_IN-pratham-medium.onnx"
        base_url = f"{VOICE_MODELS_BASE}/{hf_path}"
        json_url = f"{base_url}.json"
        
        # Download ONNX
        download_file(base_url, dest_onnx)
        
        # Download JSON config
        download_file(json_url, dest_json)
    
    print("\n✅ All voice models check/download complete!")

if __name__ == "__main__":
    download_voice_models()
