# 🌏 Histour
> 역사 스토리 콘텐츠와 역사 인물 챗봇을 활용한 관광 활성화 웹 플랫폼

**이화여자대학교**  
권은재 · 김재희 · 최준희

---

## 📖 Overview

Histour는 외국인 관광객을 대상으로  
ChatGPT 기반 실시간 역사 인물 챗봇과 AI 영상 콘텐츠를 활용하여  
한국 역사 관광지를 선택지형 스토리 게임처럼 경험하게 하는 웹 플랫폼이다.

사용자는 관광지를 선택한 뒤 역사 인물과 대화를 진행하며,  
선택지에 따라 스토리가 분기되고 최종 결말이 달라진다.  
마지막에는 AI 기반 영상 콘텐츠를 제공하여 몰입감을 높이고  
실제 관광지 방문 흥미를 유도하는 것을 목표로 한다.

---

## 🏗️ System Architecture

- **Frontend**: 사용자 인터페이스 및 선택지 기반 인터랙션
- **Backend**: API 서버 및 상태 관리
- **AI Module**: 역사 인물 챗봇, 번역, 스토리 생성 및 영상 콘텐츠 제공

---

## 🚀 Key Features

### 🗺️ Tourism Integration
- 실제 한국 역사 관광지 기반 콘텐츠 제공
- 관광지와 연계된 역사 체험 제공
- 스토리 기반 관광 경험 유도

### 📖 Story-based Content
- 역사 인물 및 사건 기반 선택형 스토리 제공
- 사용자 선택에 따른 스토리 분기
- 관광지 추천 기능

### 🎬 AI Content Generation
- AI 기반 스토리 및 결말 콘텐츠 생성
- 이미지 및 영상 기반 결과 콘텐츠 제공
- 다국어 번역 지원

### 💬 AI Character Interaction
- ChatGPT 기반 역사 인물 챗봇 제공
- 선택지 기반 대화 인터랙션
- 사건 및 시대적 배경 설명 지원

---

## 🛠️ Tech Stack

```bash
Frontend: Next.js / TypeScript / Tailwind CSS
Backend: FastAPI
AI: ChatGPT API / Translation API / Sora
Database: PostgreSQL
Storage: Google Maps API / AWS S3 / YouTube
Deployment: Vercel
```

---

## 📂 Repository Structure

```bash
.
├── FE/            # Frontend (Web UI)
├── BE/            # Backend API Server
├── AI/            # AI Modules
├── assets/        # Static Assets
└── doc/           # Project Documents
```

---

## ⚙️ Setup & Execution

### Backend

```bash
cd BE
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd FE
npm install
npm run dev
```

### Environment Variables

```env
OPENAI_API_KEY=your_api_key
```

### Deployment

- Frontend: Vercel
- Backend: FastAPI
- Database: PostgreSQL
- Storage: AWS S3 / YouTube
