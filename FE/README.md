# FE Run Guide

## Start frontend

```bash
cd FE
npm install
npm run dev
```

기본 주소:

- `http://localhost:3000`

## With backend together

백엔드를 먼저 켠 다음 프론트를 실행하면 FE가 API를 우선 사용합니다.

백엔드:

```bash
cd BE
uvicorn app:app --reload
```

프론트:

```bash
cd FE
npm install
npm run dev
```

현재 FE는:

- 백엔드가 켜져 있으면 `FastAPI + SQL` 데이터 사용
- 백엔드가 없으면 로컬 fallback 데이터 사용
