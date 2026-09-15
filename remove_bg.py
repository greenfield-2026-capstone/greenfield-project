from rembg import remove
from PIL import Image
import os

# 누끼를 적용할 폴더
folders = [
    "FE/public/images/kimmun",
    "FE/public/images/sejong/characters"
]

for folder in folders:
    print(f"\n📁 폴더 처리 중: {folder}")

    files = [
        filename for filename in os.listdir(folder)
        if filename.lower().endswith(".png")
    ]

    for filename in files:
        input_path = os.path.join(folder, filename)

        try:
            image = Image.open(input_path).convert("RGBA")

            # 이미 투명한 픽셀이 존재하는지 확인
            alpha = image.getchannel("A")
            min_alpha, max_alpha = alpha.getextrema()

            if min_alpha < 255:
                print(f"⏭ 이미 누끼 있음 - 건너뜀: {filename}")
                continue

            print(f"🔄 처리 중: {filename}")

            # 배경 제거
            result = remove(image)

            # 원본 파일에 그대로 덮어쓰기
            result.save(input_path, "PNG")

            print(f"✅ 완료: {filename}")

        except Exception as e:
            # 한 이미지가 실패해도 다음 이미지 계속 처리
            print(f"❌ 실패: {filename}")
            print(f"   오류: {e}")
            continue

print("\n🎉 전체 작업 완료!")