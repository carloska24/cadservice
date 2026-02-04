import os
from PIL import Image

# Configuration
SOURCE_DIR = r"c:\Users\joaob\OneDrive\Área de Trabalho\Workspace Projetos\CADService\frontend\public\assets\images"
TARGET_WIDTH = 1920
QUALITY = 80

# Files to optimize (only the heavy ones identified)
FILES_TO_OPTIMIZE = [
    "home_hero_smt.jpg",
    "home_hero_supply_chain.png",
    "home_hero_smart_city.png",
    "home_hero_medical.jpg",
    "about_hero_factory.png"
]

def optimize_images():
    print(f"Starting optimization in: {SOURCE_DIR}")
    
    for filename in FILES_TO_OPTIMIZE:
        source_path = os.path.join(SOURCE_DIR, filename)
        
        if not os.path.exists(source_path):
            print(f"⚠️  File not found: {filename}")
            continue
            
        try:
            with Image.open(source_path) as img:
                # Convert to RGB (to handle PNGs with transparency if needed, though Hero usually opaque)
                if img.mode in ("RGBA", "P"): 
                    img = img.convert("RGB")
                
                # Resize if larger than target width
                if img.width > TARGET_WIDTH:
                    ratio = TARGET_WIDTH / float(img.width)
                    new_height = int((float(img.height) * float(ratio)))
                    img = img.resize((TARGET_WIDTH, new_height), Image.Resampling.LANCZOS)
                    print(f"⬇️  Resized {filename} to {TARGET_WIDTH}x{new_height}")
                
                # Save as WebP
                target_filename = os.path.splitext(filename)[0] + ".webp"
                target_path = os.path.join(SOURCE_DIR, target_filename)
                
                img.save(target_path, "WEBP", quality=QUALITY)
                
                # Report savings
                original_size = os.path.getsize(source_path) / 1024 / 1024
                new_size = os.path.getsize(target_path) / 1024 / 1024
                print(f"✅ Optimized {filename}: {original_size:.2f}MB -> {new_size:.2f}MB ({target_filename})")
                
        except Exception as e:
            print(f"❌ Error processing {filename}: {e}")

if __name__ == "__main__":
    optimize_images()
