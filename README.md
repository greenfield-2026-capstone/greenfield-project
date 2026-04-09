# 🌏 Histour
> AI 역사 인물 인터랙션과 다국어 스토리 콘텐츠 기반 역사 관광 활성화 웹 플랫폼

**이화여자대학교**  권은재 · 김재희 · 최준희

---

## 📖 Overview
Histour는 AI 기술을 활용하여 역사 스토리 콘텐츠, 인물 인터랙션,  
그리고 관광지 정보를 통합한 웹 기반 플랫폼이다.

사용자는 역사 이야기를 탐색하고, AI 역사 인물과 대화하며,  
해당 스토리와 연결된 실제 장소를 지도 기반으로 확인할 수 있다.

---

## 🏗️ System Architecture
- **Frontend**: 사용자 인터페이스 및 지도 기반 UI
- **Backend**: API 서버 및 데이터 처리
- **AI Module**: 스토리 생성, 번역, 이미지/영상 생성

---

## 🚀 Key Features

### 📖 Story-based Content
- 역사 인물 및 사건 기반 스토리 선택
- 랜덤 스토리 추천 기능

### 🗺️ Tourism Integration
- 스토리와 연결된 실제 문화유산 정보 제공
- 학습 + 관광 경험 통합

### 🎬 AI Content Generation
- 역사 스토리 요약 자동 생성
- 이미지 + 음성 기반 영상 생성
- 다국어 번역 지원

### 💬 AI Character Interaction
- 역사 인물과 채팅 기능 제공
- 사건 및 배경 이해 지원

---

## 🛠️ Tech Stack
```bash
Frontend: React / Next.js
Backend: FastAPI / Node.js
AI: OpenAI API / LLM / Computer Vision
Map: Google Maps API / Kakao Map
```
---

## 📂 Repository Structure
```bash
.
├── FE/        # 웹 UI
├── BE/         # API 서버
├── AI/              # AI 모듈
├── assets/          # 정적 파일
└── README.md
```

---

## ⚙️ Setup & Execution
본 프로젝트는 위와 같은 구조로 구성되어 있으며, 실행을 위해서는 frontend와 backend를 각각 설정한 뒤 동시에 실행해야 한다.
레포지토리를 클론한 후 backend 디렉토리에서 pip install -r requirements.txt로 의존성을 설치하고, .env 파일에 API 키를 설정한 뒤 uvicorn main:app --reload로 서버를 실행한다.
이후 frontend 디렉토리에서 npm install로 패키지를 설치하고 npm run dev로 개발 서버를 실행하면 된다.
정상적으로 실행될 경우 frontend는 http://localhost:3000, backend는 http://localhost:8000에서 확인할 수 있다.
