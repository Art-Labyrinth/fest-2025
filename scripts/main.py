#! /usr/bin/env python3

import os

from PIL import Image

# Folders
SOURCE_DIR = 'source'
RESULT_DIR = 'result'

# Size presets
SIZES = {
    'sm': 640,
    'md': 768,
    'lg': 1024,
    'xl': 1280,
    '2xl': 1536
}

# Supported formats
SUPPORTED_FORMATS = ('.jpg', '.jpeg', '.png', '.webp')

# Mask for the file name. Use {index} for substitution.
FILENAME_MASK = None  # For example: 'img_{index}.webp'
# FILENAME_MASK = "gallery_{index:04d}"

# Create an output folder if necessary
os.makedirs(RESULT_DIR, exist_ok=True)

for idx, filename in enumerate(os.listdir(SOURCE_DIR)):
    if not filename.lower().endswith(SUPPORTED_FORMATS):
        continue

    src_path = os.path.join(SOURCE_DIR, filename)
    try:
        with Image.open(src_path) as img:
            for prefix, width in SIZES.items():
                # Maintain proportions
                ratio = width / img.width
                height = int(img.height * ratio)
                resized_img = img.resize((width, height), Image.Resampling.LANCZOS)

                # Form the name and path
                if FILENAME_MASK:
                    name = str(FILENAME_MASK).format(index=idx + 1)
                else:
                    name, ext = os.path.splitext(filename)
                new_filename = f"{prefix}_{name}.webp"  # save as .webp
                dest_path = os.path.join(RESULT_DIR, new_filename)

                # Save in WebP with compression (quality can be adjusted)
                resized_img.save(dest_path, "WEBP", quality=85, method=6)

                print(f"Saved {dest_path}")
    except Exception as e:
        print(f"Error processing {filename}: {e}")

    # break # for debugging, remove to process all files
