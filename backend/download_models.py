"""
Mithivoices - Voice Models Downloader
Downloads Piper voice models from Hugging Face
"""

import os
import sys
import requests
from pathlib import Path
from typing import Dict, List

try:
    from tqdm import tqdm
    HAS_TQDM = True
except ImportError:
    HAS_TQDM = False
    print("Note: Install 'tqdm' for progress bars: pip install tqdm")

# Voice models configuration
VOICES: List[Dict[str, str]] = [
    {
        "name": "en_US-lessac-medium",
        "url": "https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/lessac/medium/en_US-lessac-medium.onnx",
        "config_url": "https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/lessac/medium/en_US-lessac-medium.onnx.json"
    },
    {
        "name": "en_US-amy-medium",
        "url": "https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/amy/medium/en_US-amy-medium.onnx",
        "config_url": "https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/amy/medium/en_US-amy-medium.onnx.json"
    },
    {
        "name": "en_US-ryan-medium",
        "url": "https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/ryan/medium/en_US-ryan-medium.onnx",
        "config_url": "https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/ryan/medium/en_US-ryan-medium.onnx.json"
    },
    # Add all 19 voices here (you can add more based on your actual voice list)
]

def download_file(url: str, destination: Path) -> bool:
    """Download file with optional progress bar"""
    try:
        response = requests.get(url, stream=True, timeout=30)
        response.raise_for_status()

        total_size = int(response.headers.get('content-length', 0))

        with open(destination, 'wb') as f:
            if HAS_TQDM and total_size > 0:
                with tqdm(
                    desc=destination.name,
                    total=total_size,
                    unit='iB',
                    unit_scale=True,
                    unit_divisor=1024,
                ) as pbar:
                    for chunk in response.iter_content(chunk_size=8192):
                        size = f.write(chunk)
                        pbar.update(size)
            else:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
                print(f"  ✓ Downloaded: {destination.name}")

        return True
    except Exception as e:
        print(f"  ✗ Error downloading {destination.name}: {e}")
        return False

def main():
    """Download all voice models"""
    print("=" * 60)
    print("Mithivoices - Downloading Voice Models")
    print("=" * 60)
    print()

    # Create directories
    voices_dir = Path("voices")
    voices_dir.mkdir(exist_ok=True)

    print(f"📦 Downloading {len(VOICES)} voice models (~570 MB total)")
    print(f"📁 Destination: {voices_dir.absolute()}")
    print()
    print("⏳ This may take several minutes depending on your connection...")
    print()

    success_count = 0
    fail_count = 0

    for i, voice in enumerate(VOICES, 1):
        print(f"[{i}/{len(VOICES)}] {voice['name']}")

        # Download model
        model_path = voices_dir / f"{voice['name']}.onnx"
        if model_path.exists():
            print(f"  ✓ Model already exists, skipping...")
        else:
            print(f"  ↓ Downloading model...")
            if download_file(voice['url'], model_path):
                success_count += 1
            else:
                fail_count += 1
                continue

        # Download config
        config_path = voices_dir / f"{voice['name']}.onnx.json"
        if config_path.exists():
            print(f"  ✓ Config already exists, skipping...")
        else:
            print(f"  ↓ Downloading config...")
            if download_file(voice['config_url'], config_path):
                success_count += 1
            else:
                fail_count += 1

        print()

    print("=" * 60)
    if fail_count == 0:
        print("✅ All voice models downloaded successfully!")
    else:
        print(f"⚠️  Download completed with {fail_count} errors")
        print(f"✓ {success_count} files downloaded successfully")
    print("=" * 60)
    print()
    print("🚀 You can now start the backend with: python main.py")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Download cancelled by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n\n❌ Unexpected error: {e}")
        print("\nPlease check your internet connection and try again.")
        sys.exit(1)