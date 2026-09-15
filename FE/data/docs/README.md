# FE Data Guide

## Folder Structure

- `raw/`
  - 문화빅데이터 플랫폼에서 내려받은 원천 JSON을 그대로 보관하는 폴더
- `docs/`
  - 어떤 데이터를 어디에 쓰는지 정리하는 문서

## What Each Dataset Does

- `KF_AREA_PRSN_DATA_LIST_202112.json`
  - 관광지와 관련 인물을 연결하는 메인 데이터
  - 장소 설명, 관련 인물, 장면 제목, 키워드에 사용

- `KF_AREA_CLTUR_MDRN_CLTUR_HRITG_DATA_LIST_202312.json`
  - 근대문화역사유산 관련 장소 설명을 보강하는 데이터
  - 덕수궁, 정동 일대처럼 근대 전환기 맥락이 필요한 장소에 사용

- `KF_AREA_CLTUR_FRTRS_OLD_ROAD_DATA_LIST_202312.json`
  - 옛길, 유배길, 이동 경로 같은 흐름형 서사에 사용
  - 수원화성, 추사 유배길 같은 장소의 현장 포인트 보강

- `KF_AREA_CLTUR_MULTI_MEDIA_DATA_LIST_202312.json`
  - 원천 콘텐츠의 대표 이미지와 멀티미디어 후보 확인에 사용
  - 서비스 화면에는 필요한 이미지 URL만 선별적으로 반영

- `KF_DMSTC_AREA_NM_ORIGIN_DATA_LIST_202312.json`
  - 지역명 유래와 향토지 설명을 확인하는 보조 데이터
  - 장소 설명 보강 후보로 관리하며, 화면에는 검증된 항목만 반영

## Screen Mapping

- 홈 카드
  - 장소명, 대표 이미지, 조선 시대 맥락, 외국인 반응, 관련 인물 수

- 관광지 상세
  - 대표 장면, 현장 포인트, 외국인 반응, 활용 데이터, 관련 인물

- 인물 선택 / 대화
  - 장소와 연결된 대표 장면을 기준으로 인물 소개와 대화 톤 구성

## Current Curation Rule

- 지역 인물 또는 역사문화유산 데이터에서 장소와 인물의 연결 근거가 확인되는 항목 우선
- 기존 화면 구조에 필요한 필드만 `curated/places.json`으로 정제
- 공항 필터와 연결이 쉬운 서울/수원/부산/제주 장소 중심
- 외국인에게 설명하기 쉬운 서사가 있는 장소 우선
