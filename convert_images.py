from PIL import Image
import os
from pathlib import Path

def convert_to_webp(image_path, quality=85):
    """Convert an image to WebP format"""
    try:
        # Open image
        img = Image.open(image_path)
        
        # Convert RGBA to RGB if necessary
        if img.mode in ('RGBA', 'LA', 'P'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
            img = background
        
        # Create WebP filename
        webp_path = image_path.with_suffix('.webp')
        
        # Save as WebP
        img.save(webp_path, 'WEBP', quality=quality, method=6)
        
        # Get file sizes
        original_size = os.path.getsize(image_path) / (1024 * 1024)  # MB
        webp_size = os.path.getsize(webp_path) / (1024 * 1024)  # MB
        
        print(f"[OK] Converted: {image_path.name}")
        print(f"  Original: {original_size:.2f} MB -> WebP: {webp_size:.2f} MB (Saved: {((original_size - webp_size) / original_size * 100):.1f}%)")
        
        # Delete original file
        os.remove(image_path)
        print(f"  Deleted original: {image_path.name}")
        
        return True
    except Exception as e:
        print(f"[ERROR] Error converting {image_path.name}: {str(e)}")
        return False

def main():
    # Base directory
    base_dir = Path('d:/Code/portoKu1/images')
    
    # Supported extensions
    extensions = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG']
    
    # Find all images
    images = []
    for ext in extensions:
        images.extend(base_dir.rglob(f'*{ext}'))
    
    print(f"Found {len(images)} images to convert\n")
    
    # Convert each image
    success_count = 0
    for img_path in images:
        if convert_to_webp(img_path):
            success_count += 1
        print()
    
    print(f"\n{'='*50}")
    print(f"Conversion complete!")
    print(f"Successfully converted: {success_count}/{len(images)} images")
    print(f"{'='*50}")

if __name__ == '__main__':
    main()
