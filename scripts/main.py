#! /usr/bin/env python3

import os

from PIL import Image

# Папки
SOURCE_DIR = 'source'
RESULT_DIR = 'result'

# Пресеты размеров
SIZES = {
    'sm': 640,
    'md': 768,
    'lg': 1024,
    'xl': 1280,
    '2xl': 1536
}

# Поддерживаемые форматы
SUPPORTED_FORMATS = ('.jpg', '.jpeg', '.png', '.webp')

# Создание выходной папки при необходимости
os.makedirs(RESULT_DIR, exist_ok=True)

for filename in os.listdir(SOURCE_DIR):
    if not filename.lower().endswith(SUPPORTED_FORMATS):
        continue

    src_path = os.path.join(SOURCE_DIR, filename)
    try:
        with Image.open(src_path) as img:
            for prefix, width in SIZES.items():
                # Сохраняем пропорции
                ratio = width / img.width
                height = int(img.height * ratio)
                resized_img = img.resize((width, height), Image.LANCZOS)

                # Формируем имя и путь
                name, ext = os.path.splitext(filename)
                new_filename = f"{prefix}_{name}.webp"  # сохраняем как .webp
                dest_path = os.path.join(RESULT_DIR, new_filename)

                # Сохраняем в WebP с сжатием (качество можно регулировать)
                resized_img.save(dest_path, "WEBP", quality=85, method=6)

                print(f"Saved {dest_path}")
    except Exception as e:
        print(f"Error processing {filename}: {e}")
