# 🌏 Histour
> 역사 스토리 콘텐츠와 역사 인물 챗봇을 활용한 관광 활성화 웹 플랫폼

**이화여자대학교**  
권은재 · 김재희 · 최준희

---

## 📖 Overview

Histour는 외국인 관광객을 대상으로  
Claude 기반 실시간 역사 인물 챗봇과 AI 영상 콘텐츠를 활용하여  
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
- Claude 기반 역사 인물 챗봇 제공
- 선택지 기반 대화 인터랙션
- 사건 및 시대적 배경 설명 지원

---

## 🛠️ Tech Stack

| 구분 | 기술 |
|---|---|
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Backend | Node.js, Express.js, TypeScript |
| AI | OpenAI API, Runway Gen-4.5 |
| Data | 문화빅데이터 플랫폼 기반 관광지 데이터, Curated JSON |
| Database | PostgreSQL 연동 구조 |
| Deployment | Vercel |

---

## 📂 Repository Structure

```bash
.
├── FE/                         # Frontend (Next.js Web UI)
│   ├── app/                    # App Router pages and global styles
│   ├── components/             # UI components
│   ├── data/archive/raw-source # 문화빅데이터 원본 CSV 보관
│   ├── data/curated            # 서비스용 정제 JSON 데이터
│   └── public/                 # 이미지, 영상, 배경 assets
├── BE/                         # Backend API server
├── AI/                         # AI 관련 문서 및 모듈
└── doc/                        # Project documents
```

---

## 🔗 Deployment & Demo

- 서비스 URL: https://histour.vercel.app
- 데모 영상: https://m.youtube.com/watch?v=CWdD6fGb-Yc
- 배포 플랫폼: Vercel

Histour는 웹 기반 서비스로 배포되어, 사용자가 별도 설치 없이 브라우저에서 관광지 탐색과 AI 역사 인물 대화 기능을 체험할 수 있다.

---

## 🗂️ Data Source & Processing

Histour는 문화빅데이터 플랫폼에서 제공하는 문화·관광 데이터를 기반으로 관광지 정보를 구성했다.

- 원본 데이터는 CSV 형태로 `FE/data/archive/raw-source/`에 보관
- 실제 서비스에서는 필요한 정보를 선별해 `FE/data/curated/places.json`으로 재구성
- 장소별 위치, 시대, 설명, 대표 이야기, 추천 포인트, 관련 역사 인물 정보를 매핑
- 인천공항, 김포공항, 김해공항, 제주공항 기준으로 관광지를 탐색할 수 있도록 공항 접근성 정보를 태깅

이를 통해 단순 관광지 목록이 아니라, 관광지와 역사 인물, 스토리 체험, 공항 접근성을 연결한 서비스용 데이터 구조를 설계했다.

---

## 🧭 Search & Filter

- 키워드 기반 관광지 검색
- 장소명, 설명, 시대, 태그, 역사 인물 이름을 검색 대상에 포함
- 궁궐, 성곽, 유적지, 박물관, 자연/정원 카테고리 필터 적용
- 공항 기준 필터와 카테고리 필터를 함께 적용
- URL query 기반 필터 상태 관리로 새로고침 및 링크 공유 시 동일한 탐색 결과 유지

---

## 🤖 AI Usage Transparency

Histour는 AI를 서비스 구현과 콘텐츠 생성의 보조 도구로 활용했다.

| 항목 | 역할 |
|---|---|
| 서비스 기획 및 배포 | 팀원 직접 수행 |
| UI 파일 구조 및 기본 틀 생성 | 팀원 직접 설계 |
| UI 고도화 및 세부 스타일 개선 | AI 보조 활용 |
| Claude 프롬프트 작성 | 팀원 직접 작성 |
| 역사 대화 기본 흐름 구성 | 팀원 직접 설계 |
| 조선 건국, 고려 말, 위화도 회군 등 역사 맥락 구성 | 팀원 직접 구성 |
| 사용자와의 실제 대화 응답 생성 | OpenAI API 활용 |
| 마지막 선택지 및 결말 분기 구조 설계 | 팀원 직접 구성 |
| 결말 분기에 따른 2가지 영상 시나리오 구성 | 팀원 직접 구성 |
| 결말 영상 제작 | Runway Gen-4.5 활용 |
| 최종 검토 및 수정 | 팀원 직접 수행 |

역사 인물 대화는 실제 역사 인물의 발언이 아니라, 역사적 맥락을 기반으로 생성형 AI가 재구성한 스토리텔링 응답이다.

---

## ⚙️ Setup & Execution

### Backend

```bash
cd BE
npm install
npm run dev
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
DATABASE_URL=your_database_url
```

### Deployment

- Frontend: Vercel
- Service URL: https://histour.vercel.app
