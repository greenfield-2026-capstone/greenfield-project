from typing import Any, Dict, List, Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# CORS 허용
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PLACES = [
    {
        "name": "서대문형무소역사관",
        "desc": "독립운동가들이 투옥되었던 역사적인 장소야.",
        "tags": ["서대문형무소", "서대문 형무소"],
        "location": "서울 서대문구 통일로 251 서대문형무소역사관",
        "image": "http://localhost:5500/images/seodaemun.jfif",
        "map_url": "https://map.naver.com/p/directions/-/14132702.531543273,4519460.4146731105,%EC%84%9C%EB%8C%80%EB%AC%B8%ED%98%95%EB%AC%B4%EC%86%8C%EC%97%AD%EC%82%AC%EA%B4%80,12384776,PLACE_POI/-/car",
    },
    {
        "name": "아우내장터",
        "desc": "유관순 열사가 만세운동을 펼쳤던 역사적인 장소야.",
        "tags": ["아우내장터", "아우내 장터"],
        "location": "충청남도 천안시 동남구 병천면 아우내장터",
        "image": "http://localhost:5500/images/아우내장터.jfif",
        "map_url": "https://map.naver.com/p/search/%EC%95%84%EC%9A%B0%EB%82%B4%EC%9E%A5%ED%84%B0",
    },
    {
        "name": "탑골공원",
        "desc": "3.1운동과 관련된 대표적인 장소야.",
        "tags": ["탑골공원"],
        "location": "서울 종로구 종로 99",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Tapgol_Park_Palgakjeong.jpg/640px-Tapgol_Park_Palgakjeong.jpg",
        "map_url": "https://map.naver.com/p/search/%ED%83%91%EA%B3%A8%EA%B3%B5%EC%9B%90",
    },
    {
        "name": "경복궁",
        "desc": "조선 왕실의 대표 궁궐이야.",
        "tags": ["경복궁"],
        "location": "서울 종로구 사직로 161",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gyeongbokgung-Gwanghwamun.jpg/640px-Gyeongbokgung-Gwanghwamun.jpg",
        "map_url": "https://map.naver.com/p/search/%EA%B2%BD%EB%B3%B5%EA%B6%81",
    },
]

YU_INITIAL_MESSAGE = (
    "안녕, 나는 유관순이야. "
    "나는 1902년에 태어나서 1920년까지 대한민국의 독립을 위해 만세운동에 참여하며 끝까지 싸웠어. "
    "나한테 궁금한 거 물어볼래?"
)


class MessageItem(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: Optional[str] = ""
    history: List[MessageItem] = []


def match_places(extracted: Dict[str, Any]) -> List[Dict[str, Any]]:
    keywords: List[str] = extracted.get("place_keywords", [])

    if not keywords:
        return []

    scored = []
    for place in PLACES:
        score = 0
        for kw in keywords:
            if kw in place["tags"]:
                score += 2
            if kw in place["name"]:
                score += 3

        if score > 0:
            scored.append({
                "name": place["name"],
                "desc": place["desc"],
                "location": place["location"],
                "image": place["image"],
                "map_url": place["map_url"],
                "score": score,
            })

    scored.sort(key=lambda x: x["score"], reverse=True)
    return scored[:3]


def detect_character(history: List[MessageItem], message: str) -> str:
    full_text = " ".join([item.content for item in history]) + " " + message

    if (
        "유관순" in full_text
        or "서대문형무소" in full_text
        or "서대문 형무소" in full_text
        or "아우내장터" in full_text
        or "아우내 장터" in full_text
        or "독립운동" in full_text
        or "3.1" in full_text
    ):
        return "유관순"

    if "세종" in full_text or "세종대왕" in full_text or "훈민정음" in full_text:
        return "세종대왕"

    return "유관순"


def build_character_reply(character: str, message: str, history: List[MessageItem]) -> str:
    text = message.strip()

    if character == "유관순":
        if not text:
            return YU_INITIAL_MESSAGE

        if "어디서" in text and ("붙잡" in text or "잡혔" in text):
            return "나는 아우내 장터에서 만세운동을 하다가 일본 경찰에게 붙잡혔어."

        if "어떻게" in text and ("됐" in text or "되었" in text):
            return (
                "나는 아우내 장터에서 만세운동을 하다가 일본 경찰에게 붙잡혔어. "
                "그 뒤에는 감옥에 끌려가 모진 고통을 겪었지만, 끝까지 독립 의지를 굽히지 않았단다."
            )

        if "어쩌다" in text or "마지막" in text or "어린" in text:
            return (
                "나는 아우내 장터에서 만세운동을 하다가 일본 경찰에게 붙잡혔어. "
                "그 뒤 감옥에 끌려가 큰 고통을 겪었지만, 끝까지 나라를 위한 마음을 놓지 않았어."
            )

        if "감옥" in text:
            return (
                "내가 끌려간 곳은 서대문형무소였어. "
                "그곳에서도 나는 독립에 대한 뜻을 굽히지 않았단다."
            )

        if "서대문형무소" in text or "서대문 형무소" in text:
            return (
                "서대문형무소는 독립운동가들이 큰 고통을 겪었던 곳이야. "
                "나 역시 그곳에서 힘든 시간을 보내야 했어."
            )

        if "사진" in text and ("서대문형무소" in text or "서대문 형무소" in text):
            return "서대문형무소의 모습도 함께 보여줄게."

        if "사진" in text and ("아우내장터" in text or "아우내 장터" in text):
            return "아우내 장터의 모습도 함께 보여줄게."

        if "아우내장터" in text or "아우내 장터" in text:
            return (
                "아우내 장터는 내가 만세운동을 펼쳤던 곳이야. "
                "그곳에서 많은 사람들과 함께 독립 만세를 외쳤단다."
            )

        if "왜" in text and ("독립" in text or "싸" in text):
            return (
                "나라를 빼앗긴 현실이 너무 아팠기 때문이야. "
                "가만히 있는 것보다 옳다고 믿는 일을 하는 게 더 중요했어."
            )

        if "무서" in text or "두렵" in text:
            return (
                "두려움이 없었던 건 아니야. "
                "하지만 모두가 함께 독립을 외치던 마음이 나를 버티게 해줬어."
            )

        if "3.1" in text or "삼일" in text:
            return (
                "3.1운동은 많은 사람들이 함께 독립 만세를 외친 뜻깊은 일이야. "
                "나도 그 마음으로 용기를 내어 행동했어."
            )

        return (
            "나는 대한민국의 독립을 위해 끝까지 싸웠어. "
            "내 이야기 중에서 무엇이 가장 궁금하니?"
        )

    if character == "세종대왕":
        if not text:
            return "나는 세종이다. 궁금한 것을 물어보아라."

        if "훈민정음" in text or "한글" in text:
            return (
                "백성이 글을 몰라 답답해하는 모습을 보고 훈민정음을 만들게 되었노라. "
                "누구나 쉽게 배우도록 하고 싶었느니라."
            )

        if "경복궁" in text:
            return "경복궁은 조선 왕실의 중요한 궁궐이니라."

        return "나는 세종이다. 백성을 위한 일을 늘 먼저 생각했다."

    return "궁금한 것을 물어봐."


def extract_info(message: str, reply_text: str, history: List[MessageItem]) -> Dict[str, Any]:
    text = message + " " + reply_text

    result = {
        "character": "",
        "event": "",
        "era": "",
        "place_keywords": []
    }

    if "유관순" in text or "아우내" in text or "서대문형무소" in text or "서대문 형무소" in text:
        result["character"] = "유관순"
        result["era"] = "근현대"

    if "독립운동" in text or "3.1" in text or "삼일" in text:
        result["event"] = "3.1운동"
        result["era"] = "근현대"

    # 핵심: 사용자 질문이 아니라 답변(reply_text)에 장소명이 실제로 들어갔을 때만 장소 추천
    if "서대문형무소" in reply_text or "서대문 형무소" in reply_text:
        result["place_keywords"].append("서대문형무소")
        if not result["era"]:
            result["era"] = "근현대"

    if "아우내장터" in reply_text or "아우내 장터" in reply_text:
        result["place_keywords"].append("아우내장터")
        if not result["era"]:
            result["era"] = "근현대"

    if "세종" in text or "세종대왕" in text:
        result["character"] = "세종대왕"
        result["era"] = "조선"

    if "경복궁" in reply_text:
        result["place_keywords"].append("경복궁")
        if not result["era"]:
            result["era"] = "조선"

    result["place_keywords"] = list(set(result["place_keywords"]))
    return result


@app.get("/")
def root():
    return {"message": "Histour demo server is running."}


@app.get("/chat/start")
def chat_start():
    return {
        "reply": YU_INITIAL_MESSAGE,
        "data": {
            "character": "유관순",
            "event": "",
            "era": "근현대",
            "place_keywords": []
        },
        "places": [],
        "history": [
            {
                "role": "assistant",
                "content": YU_INITIAL_MESSAGE
            }
        ]
    }


@app.post("/chat")
def chat(req: ChatRequest):
    character = detect_character(req.history, req.message or "")
    reply_text = build_character_reply(character, req.message or "", req.history)
    extracted = extract_info(req.message or "", reply_text, req.history)
    places = match_places(extracted)

    new_history = [item.model_dump() for item in req.history]

    if req.message and req.message.strip():
        new_history.append({
            "role": "user",
            "content": req.message.strip()
        })

    new_history.append({
        "role": "assistant",
        "content": reply_text
    })

    return {
        "reply": reply_text,
        "data": extracted,
        "places": places,
        "history": new_history,
    }