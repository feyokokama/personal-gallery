# python generate_photo_list.py

# source venv/bin/activate
# cd gallery/js
# python generate_photo_list.py
# deactivate

# python3 generate_photo_list.py
# deactivate

import os
import json
import subprocess
from PIL import Image

project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
photos_folder = os.path.join(project_root, 'photos')
output_file = os.path.join(project_root, 'photo_filenames_list.json')

def get_image_dimensions(file_path):
    try:
        with Image.open(file_path) as img:
            return img.width, img.height
    except Exception as e:
        print(f"⚠️ Could not get dimensions for {os.path.basename(file_path)}: {e}")
        return 'unknown', 'unknown'

def get_exif_metadata(file_path):
    try:
        result = subprocess.run(['exiftool', '-j', file_path], capture_output=True, text=True)
        if result.returncode != 0:
            print(f"⚠️ Failed to get EXIF data for {os.path.basename(file_path)}")
            return {}

        data = json.loads(result.stdout)[0]

        return {
            "title": data.get("Title", "???"),
            "description": data.get("Description", "???"),
            "location": data.get("Location", "???"),
            "date": data.get("DateTimeOriginal", "???")
        }

    except Exception as e:
        print(f"⚠️ Error reading EXIF for {os.path.basename(file_path)}: {e}")
        return {}

def build_image_data():
    if not os.path.exists(photos_folder):
        print('❌ The "photos" folder does not exist. Please create it and add images.')
        return

    image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.webp'}
    all_files = os.listdir(photos_folder)
    image_files = [f for f in all_files if os.path.splitext(f)[1].lower() in image_extensions]

    if not image_files:
        print('⚠️ No image files found in the "photos" folder.')

    images_data = {}

    for file in image_files:
        file_path = os.path.join(photos_folder, file)

        try:
            filesize_kb = os.path.getsize(file_path) / 1024
        except Exception as e:
            print(f"⚠️ Could not get file size for {file}: {e}")
            filesize_kb = 0

        width, height = get_image_dimensions(file_path)
        exif = get_exif_metadata(file_path)

        title = exif.get("title", "???")

        images_data[file] = {
            "name": title,
            "date": exif.get("date", "???"),
            "description": exif.get("description", "???"),
            "location": exif.get("location", "???"),
            "dimensions": {
                "width": width,
                "height": height
            },
            "filesize": f"{filesize_kb:.2f} KB",
            "src": f"photos/{file}",
            "filename": file,
            "alt": f'Photo titled "{title}"'
        }

    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(images_data, f, indent=2, ensure_ascii=False)
        print(f"✅ {os.path.basename(output_file)} created successfully with {len(image_files)} images.")
    except Exception as e:
        print(f"❌ Failed to write output file: {e}")

if __name__ == "__main__":
    build_image_data()
