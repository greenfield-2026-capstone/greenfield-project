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
