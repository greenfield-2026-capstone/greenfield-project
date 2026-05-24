# BE Run Guide

## Start backend

```bash
cd BE
uvicorn app:app --reload
```

기본 주소:

- `http://127.0.0.1:8000`

주요 API:

- `GET /api/places`
- `GET /api/places?airport=ICN`
- `GET /api/places/{placeId}`
- `GET /api/places/{placeId}/characters`
- `GET /api/places/{placeId}/experiences`

## Notes

- 현재는 SQLite 기반 SQL 저장소를 사용합니다.
- 추후 PostgreSQL로 옮길 때도 API 구조는 그대로 유지할 수 있습니다.
