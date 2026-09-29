# Vercel 게임 AI 연결

게임 요청 경로는 브라우저 → Next.js `/api/dialogue` → LiteLLM이다.
게임 선택지와 반응 생성에는 별도의 Python 서버가 필요하지 않다.

Vercel에서 FE 프로젝트의 Settings → Environment Variables에 다음 서버 전용 값을 등록한다.

| 변수 | 값 |
| --- | --- |
| `LITELLM_URL` | 외부에서 접근 가능한 LiteLLM 주소. 예: `https://your-proxy.example/v1` |
| `LITELLM_API_KEY` | 해당 프록시의 실제 API 키 |
| `LITELLM_MODEL` | 해당 프록시에 등록된 모델 이름 |

프런트 주소인 `histour.vercel.app`이나 localhost를 LiteLLM 주소로 지정하지 않는다.
`LITELLM_URL`은 `/v1`까지 있거나 서버 루트인 형식을 지원한다.
`/chat/completions`는 코드에서 붙인다. 키에 `NEXT_PUBLIC_` 접두사를 붙이지 않는다.
환경변수를 Production 및 필요한 Preview 환경에 적용하고 재배포한다.
로컬 테스트에서는 같은 값을 커밋하지 않는 `FE/.env.local`에 추가한다.

검증:
- `node scripts/test-dialogue.cjs`: 가짜 AI 서버 응답으로 실제 API 핸들러의 선택지/반응과 오류 경로 검증.
- `npx tsc --noEmit --incremental false`: 타입 검사.
- 배포 후 세종 첫 장면에서 선택지 4개 → 선택 후 반응 → 다음 장면을 확인한다.

설정이 없으면 503, AI 연결/응답 실패는 502, 45초 응답 시간 초과는 504를 반환한다.
API 키나 AI 원문 응답은 오류 메시지에 노출하지 않는다.

## 콘텐츠 번역

`POST /api/translate`는 등록된 장소/게임 ID와 지원 언어만 받는다.
기존 `LITELLM_URL`, `LITELLM_API_KEY`, `LITELLM_MODEL`을 그대로 사용한다.
Claude를 사용하려면 `LITELLM_MODEL`을 프록시에 등록된 Claude 모델 이름으로 설정한다.
이름, 설명, 고정 대사 등 표시용 텍스트만 번역하며 ID·이미지 주소·점수는 변경하지 않는다.
원문과 대상 언어를 캐시 키에 포함해 Next.js Data Cache에 성공한 번역을 30일간 보관한다.
실패는 캐시하지 않고 원문과 상태 안내를 표시한다. 브라우저의 동시 번역 요청은 2개로 제한한다.
콘텐츠 텍스트 변경 시 새 번역이 생성된다. 번역 지침을 변경할 때는 캐시 버전도 변경한다.
게임에서 생성하는 AI 선택지와 반응에는 선택 언어를 직접 지정한다.

검증: `node scripts/test-translation.cjs` (외부 AI를 모의 처리한 테스트).
실제 번역 품질·속도는 환경변수 설정 후 배포 환경에서 확인해야 한다.
