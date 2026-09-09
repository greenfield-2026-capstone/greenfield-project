from rembg import remove
from PIL import Image
import os

# remove_bg.py가 있는 public 폴더
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# public/images/sejong
folder = os.path.join(BASE_DIR, "images", "sejong")

files = [
    "걱정신하.png",
    "세종대왕.png",
    "신하.png",
    "허허세종.png",
    "놀란세종.png"
]

for filename in files:
    input_path = os.path.join(folder, filename)

    if not os.path.exists(input_path):
        print(f"❌ 파일 없음: {input_path}")
        continue

    name, ext = os.path.splitext(filename)
    output_path = os.path.join(folder, f"{name}_누끼.png")

    image = Image.open(input_path)
    result = remove(image)
    result.save(output_path)

    print(f"✅ 완료: {output_path}")