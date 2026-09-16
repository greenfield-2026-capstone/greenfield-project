import os
import json
import re

import httpx
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel


load_dotenv()

router = APIRouter()


class DialogueRequest(BaseModel):
    prompt: str


def parse_ai_json(content: str):
    """
    AI 응답을 JSON으로 변환한다.

    정상 JSON:
    {"dialogue": [...], "options": [...]}

    또는 Claude가 ```json 코드블록```으로 감싸서 보내는 경우도 처리한다.
    """

    if not content or not content.strip():
        raise ValueError("AI가 빈 응답을 반환했습니다.")

    text = content.strip()

    # ```json ... ``` 형태 제거
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text, flags=re.IGNORECASE)
        text = re.sub(r"\s*```$", "", text)

    # 우선 그대로 JSON 파싱
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    # 앞뒤에 설명이 붙은 경우 JSON 객체 부분만 추출
    start = text.find("{")
    end = text.rfind("}")

    if start != -1 and end != -1 and end > start:
        json_text = text[start:end + 1]
        return json.loads(json_text)

    raise ValueError(
        f"AI 응답에서 JSON을 찾을 수 없습니다. 응답: {text[:500]}"
    )


@router.post("/api/dialogue")
async def dialogue(req: DialogueRequest):

    base_url = os.getenv("LITELLM_URL")
    api_key = os.getenv("LITELLM_API_KEY")
    model = os.getenv("LITELLM_MODEL")

    # 환경변수 확인
    if not base_url or not api_key or not model:
        raise HTTPException(
            status_code=500,
            detail="LiteLLM 환경변수가 없습니다."
        )

    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                f"{base_url.rstrip('/')}/chat/completions",
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": model,

                    # 실제 게임 플레이어가 채팅하는 것이 아님.
                    # Anthropic API가 non-system message를 요구하기 때문에
                    # 서버에서 기술적으로 user 메시지 하나를 추가한다.
                    "messages": [
                        {
                            "role": "system",
                            "content": req.prompt,
                        },
                        {
                            "role": "user",
                            "content": (
                                "위 시스템의 게임 규칙과 현재 장면 정보를 "
                                "따라 요청된 결과를 생성하라. "
                                "반드시 JSON 형식으로만 응답하라."
                            ),
                        },
                    ],

                    "temperature": 0.8,
                },
            )

        # LiteLLM 자체에서 오류가 난 경우
        if response.status_code != 200:
            print("\n========== LiteLLM ERROR ==========")
            print("STATUS:", response.status_code)
            print("RESPONSE:", response.text)
            print("===================================\n")

            raise HTTPException(
                status_code=500,
                detail=f"LiteLLM 호출 실패 ({response.status_code})"
            )

        # LiteLLM 응답 자체를 JSON으로 변환
        try:
            data = response.json()
        except Exception:
            print("\n========== INVALID LITELLM RESPONSE ==========")
            print(response.text)
            print("==============================================\n")

            raise HTTPException(
                status_code=500,
                detail="LiteLLM 응답 형식이 올바르지 않습니다."
            )

        # 디버깅용
        print("\n========== LiteLLM RESPONSE ==========")
        print(json.dumps(data, ensure_ascii=False, indent=2))
        print("======================================\n")

        # OpenAI 호환 응답 구조 확인
        choices = data.get("choices")

        if not choices:
            raise ValueError(
                f"LiteLLM 응답에 choices가 없습니다: {data}"
            )

        message = choices[0].get("message", {})
        content = message.get("content")

        print("\n========== AI CONTENT ==========")
        print(repr(content))
        print("================================\n")

        # AI가 생성한 문자열 → 실제 JSON
        result = parse_ai_json(content)

        return result

    except HTTPException:
        raise

    except Exception as error:
        print("\n========== Dialogue ERROR ==========")
        print(type(error).__name__)
        print(str(error))
        print("====================================\n")

        raise HTTPException(
            status_code=500,
            detail=f"대화 생성 중 오류가 발생했습니다: {str(error)}"
        )