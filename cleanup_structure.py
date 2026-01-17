
import os
import shutil
import time
from pathlib import Path

# Configuration
TIMESTAMP = time.strftime('%Y%m%d_%H%M%S')
ARCHIVE_ROOT = "archive"
ARCHIVE_DIR = os.path.join(ARCHIVE_ROOT, f"cleanup_{TIMESTAMP}")

# Allowed files/dirs in root (Keep these)
ALLOWED = {
    ".gitignore",
    ".github",
    "CHANGELOG.md",
    "CONTRIBUTING.md",
    "LICENSE",
    "Makefile",
    "README.md",
    "requirements.txt",
    "start_all.bat",
    "start_backend.bat",
    "download_models.py",
    "backend",
    "frontend",
    "docs",
    "voice_assets",
    "stitch_mithivoices_landing_page",
    "cleanup_structure.py", # Keep self until done
    "archive", # Keep the archive folder itself
    ".git" # Keep git
}

# Explicitly exclude from archive (delete completely if safe, or just ignore cache)
CACHE_DIRS = ["__pycache__", ".pytest_cache", ".coverage", "htmlcov", ".mypy_cache", ".ruff_cache"]
CACHE_EXTENSIONS = [".pyc", ".pyo"]

def print_header(title):
    print(f"\n{title}")
    print("=" * 70)

def scan_root():
    print("📊 Step 1: Scanning for extra files...")
    all_items = os.listdir(".")
    to_archive = []
    to_keep = []
    
    for item in all_items:
        if item in ALLOWED:
            to_keep.append(item)
            continue
        
        # Helper: check ignore/cache
        if item in CACHE_DIRS or any(item.endswith(ext) for ext in CACHE_EXTENSIONS):
            continue

        to_archive.append(item)
    
    print(f"  Found {len(all_items)} items in root.")
    print(f"  ✅ Official files: {len(to_keep)}")
    print(f"  📦 Files to archive: {len(to_archive)}")
    
    return to_archive

def archive_files(files_to_archive):
    print(f"\n📦 Step 2: Archiving unnecessary files to {ARCHIVE_DIR}...")
    
    if not os.path.exists(ARCHIVE_DIR):
        os.makedirs(ARCHIVE_DIR)
    
    archived_count = 0
    for item in files_to_archive:
        try:
            # Check if it's the current script, don't move it yet (though it's in ALLOWED, so safe)
            if item == "cleanup_structure.py": continue
            
            src = item
            dst = os.path.join(ARCHIVE_DIR, item)
            
            shutil.move(src, dst)
            print(f"  ✅ Archived: {item}")
            archived_count += 1
        except Exception as e:
            print(f"  ⚠️ Failed to archive {item}: {e}")
            
    print(f"\n✅ Archived {archived_count} items.")

def clean_cache():
    print("\n🧹 Step 3: Cleaning Python cache files logic...")
    # Walk through entire project
    cleaned_count = 0
    for root, dirs, files in os.walk("."):
        # Skip archive
        if "archive" in root.split(os.sep):
            continue
            
        # Clean dirs
        for d in dirs:
            if d in CACHE_DIRS:
                path = os.path.join(root, d)
                try:
                    shutil.rmtree(path)
                    print(f"  ✅ Removed cache dir: {path}")
                    cleaned_count += 1
                except Exception as e:
                    print(f"  ⚠️ Failed to remove {path}: {e}")
                    
        # Clean files
        for f in files:
            if any(f.endswith(ext) for ext in CACHE_EXTENSIONS):
                path = os.path.join(root, f)
                try:
                    os.remove(path)
                    # print(f"  ✅ Removed cache file: {path}") # Verbose
                    cleaned_count += 1
                except:
                    pass
    print(f"  ✅ Cleaned {cleaned_count} cache items.")

def generate_report(archived_items):
    print("\n📊 Step 4: Generating structure report...")
    
    report_path = "CLEANUP_REPORT.md"
    
    with open(report_path, "w", encoding="utf-8") as f:
        f.write(f"# Clean Structure Report\n")
        f.write(f"Generated: {time.strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        
        f.write(f"## Cleanup Summary\n")
        f.write(f"- **Files Archived**: {len(archived_items)}\n")
        f.write(f"- **Archive Location**: `{ARCHIVE_DIR}`\n\n")
        
        f.write(f"## Archived Items\n")
        for item in archived_items:
            f.write(f"- {item}\n")
            
        f.write(f"\n## Recommendations\n")
        f.write(f"✅ Structure is clean and ready for commit!\n\n")
        
        f.write(f"## Next Steps\n")
        f.write(f"1. Review archived items\n")
        f.write(f"2. Run: `git status`\n")
        f.write(f"3. Commit: `git add . && git commit -m \"chore: clean up project structure\"`\n")
        f.write(f"4. Push: `git push origin main`\n")

    print(f"  ✅ Report saved to: {report_path}")

def main():
    print_header("🧹 Enhanced Pre-Commit Cleanup")
    
    files_to_archive = scan_root()
    
    if files_to_archive:
        print("\n📦 Files to be archived:")
        for f in files_to_archive:
            print(f"  📄 {f}")
            
        archive_files(files_to_archive)
    else:
        print("\n✨ Root directory is already clean!")
        
    clean_cache()
    generate_report(files_to_archive)
    
    print_header("✅ Enhanced Cleanup Complete!")
    print(f"📂 Archived items: {ARCHIVE_DIR}")
    print(f"📊 Full report: CLEANUP_REPORT.md")

if __name__ == "__main__":
    main()
