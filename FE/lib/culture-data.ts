import fs from "node:fs";
import path from "node:path";
import { AirportCode, Character, ExperienceItem, Place } from "@/types/place";

type CsvRow = Record<string, string>;

const RAW_DIR = path.join(process.cwd(), "data", "raw");
const PERSON_CSV = path.join(RAW_DIR, "AREA_PRSN_2021.csv");
const HERITAGE_CSV = path.join(RAW_DIR, "AREA_CLTUR_2023.csv");
const OLD_ROAD_CSV = path.join(RAW_DIR, "OLD_ROAD_2023.csv");
const FESTIVAL_CSV = path.join(RAW_DIR, "CLTUR_FSTVL_2023.csv");
const SIGHTS_CSV = path.join(RAW_DIR, "RECOMEND_SIGHTS_2023.csv");
const KMOVIE_CSV = path.join(RAW_DIR, "KMOVIE_DATA_2026.csv");
const FOREIGNER_CSV = path.join(RAW_DIR, "FOREIGNER_UTILIZATION_202208.csv");

const placeImages = {
  gyeongbokgung: "/places/gyeongbokgung.svg",
  changdeokgung: "/places/changdeokgung.svg",
  suwonHwaseong: "/places/suwon-hwaseong.svg",
  deoksugung: "/places/deoksugung.svg",
  geumjeongsanseong: "/places/geumjeongsanseong.svg",
  beomeosa: "/places/beomeosa.svg",
  gimandeok: "/places/gimandeok-route.svg",
  chusaYubaegil: "/places/chusa-yubaegil.svg"
};

function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
}

function readCsv(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  const rows = parseCsv(raw);
  const [headers, ...records] = rows;

  return records
    .filter((record) => record.some((value) => value?.trim()))
    .map((record) =>
      headers.reduce<CsvRow>((acc, header, index) => {
        acc[header] = record[index] ?? "";
        return acc;
      }, {})
    );
}

function cleanText(value: string) {
  return value.replace(/&nbsp;/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function splitKeywords(value: string) {
  return cleanText(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 5);
}

function sentenceExcerpt(value: string, count = 2) {
  const cleaned = cleanText(value);
  const parts = cleaned.match(/[^.!?]+[.!?]?/g) ?? [cleaned];
  return parts
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, count)
    .join(" ");
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("ko-KR").format(Math.round(value));
}

const personRows = readCsv(PERSON_CSV);
const heritageRows = readCsv(HERITAGE_CSV);
const oldRoadRows = readCsv(OLD_ROAD_CSV);
const festivalRows = readCsv(FESTIVAL_CSV);
const sightsRows = readCsv(SIGHTS_CSV);
const movieRows = readCsv(KMOVIE_CSV);
const foreignerRows = readCsv(FOREIGNER_CSV);

function findByTitle(rows: CsvRow[], title: string) {
  return rows.find((row) => row.DATA_TITLE_NM === title || row.FCLTY_NM === title || row.TRRSRT_NM === title);
}

function findMoviePlace(name: string) {
  return movieRows.find((row) => row.TRRSRT_NM === name);
}

function findDistrictStats(district: string) {
  const hits = foreignerRows.filter((row) => row.SIGNGU_NM === district);
  if (!hits.length) return null;

  const foreignerCounts = hits
    .map((row) => Number(row.FRNR_TURSM_CSTMR_CO))
    .filter((value) => !Number.isNaN(value));
  const rate = hits
    .map((row) => Number(row.ALL_TURSM_CSTMR_VERSUS_FRNR_TURSM_CSTMR_RATE))
    .filter((value) => !Number.isNaN(value));
  const cultureSpend = hits
    .map((row) => Number(row.FRNR_CLTUR_SVC_EXPNDTR_PRICE))
    .filter((value) => !Number.isNaN(value));

  const avgForeigners = foreignerCounts.length
    ? foreignerCounts.reduce((sum, value) => sum + value, 0) / foreignerCounts.length
    : 0;
  const avgRate = rate.length ? rate.reduce((sum, value) => sum + value, 0) / rate.length : 0;
  const avgSpend = cultureSpend.length
    ? cultureSpend.reduce((sum, value) => sum + value, 0) / cultureSpend.length
    : 0;

  return {
    avgForeigners,
    avgRate,
    avgSpend
  };
}

function makeForeignerNote(district: string) {
  const stats = findDistrictStats(district);
  if (!stats) return { note: "가볍게 둘러보기 좋아요", stat: "부담 없이 보기 좋은 장소예요." };

  const level =
    stats.avgRate >= 2
      ? "처음 방문해도 만족도가 높은 편"
      : stats.avgRate >= 1
        ? "여행 동선에 넣기 좋은 편"
        : "조용하게 둘러보기 좋은 편";

  return {
    note: level,
    stat: `이 일대는 외국인 방문이 꾸준하고 문화 소비도 활발한 편이에요.`
  };
}

function makeBuzz(name: string, fallback: string) {
  const row = findMoviePlace(name);
  if (!row) {
    return {
      title: "눈에 잘 들어오는 장소",
      stat: `${fallback}으로 엮기 좋은 장면이 분명한 곳이에요.`
    };
  }

  const score = Number(row.AVRG_SCORE_VALUE);
  const reviews = Number(row.REVIEW_CO);
  const tone = score >= 4.3 ? "사진과 후기 반응이 특히 좋아요." : "후기가 꾸준히 쌓이는 장소예요.";
  const reviewTone = reviews >= 1000 ? "처음 가도 실패 확률이 낮은 편이에요." : "천천히 둘러보기 좋은 분위기가 있어요.";

  return {
    title: "사진과 후기 반응 좋음",
    stat: `${tone} ${reviewTone}`
  };
}

function makeExperience(config: {
  title: string;
  category: string;
  description: string;
  address: string;
  distance?: string;
  source?: string;
}) {
  return {
    title: config.title,
    category: config.category,
    description: config.description,
    address: config.address,
    distance: config.distance,
    source: config.source
  } satisfies ExperienceItem;
}

function makeCharacter(config: {
  id: string;
  name: string;
  role: string;
  openingLine: string;
  rowTitle?: string;
  summaryOverride?: string;
  keywordsOverride?: string[];
}) {
  const row = config.rowTitle ? findByTitle(personRows, config.rowTitle) ?? findByTitle(heritageRows, config.rowTitle) : undefined;
  return {
    id: config.id,
    name: config.name,
    role: config.role,
    summary: config.summaryOverride ?? sentenceExcerpt(row?.SUMRY_CN ?? "", 2),
    imageUrl: "/character-fallback.svg",
    openingLine: config.openingLine,
    sourceTitle: row?.DATA_TITLE_NM ?? config.role,
    focusKeywords: config.keywordsOverride ?? splitKeywords(row?.CORE_KWRD_CN ?? "")
  } satisfies Character;
}

let cachedPlaces: Place[] | null = null;

function buildPlaces() {
  if (cachedPlaces) return cachedPlaces;

  const gyeonghoeru = findByTitle(personRows, "인간과 하늘이 교감하는 작은 우주, 경복궁 경회루");
  const cheongyeonru = findByTitle(personRows, "궁중 여인들의 연회지, 경복궁 청연루");
  const okhoru = findByTitle(personRows, "명성황후의 넋이 어린, 경복궁 옥호루");
  const sajikdan = findByTitle(personRows, "조선을 떠바친 한 기둥 사직단");
  const haetae = findByTitle(personRows, "화재를 막고 정의를 수호하는 신수(神獸), 해태상");

  const gwaegungjeong = findByTitle(personRows, "활을 쏘며 심신을 단련했던, 창덕궁 괘궁정");
  const cheonguijeong = findByTitle(personRows, "농민들의 삶을 헤아리기 위해 만든 초가 정자, 창덕궁 청의정");
  const seunghwaru = findByTitle(personRows, "세자가 놀고 공부하던, 창덕궁 승화루");
  const buyongjeong = findByTitle(personRows, "연꽃 향기 머금은 신선의 세상, 창덕궁 부용정");

  const hwaseongUigwe = findByTitle(personRows, "수원 화성의 모든 것, 화성성역의궤");
  const hwaseongPeople = findByTitle(personRows, "화성 건설에 참여한 사람들의 수는?");
  const suwonRoad = findByTitle(personRows, "한양에서 수원 화성으로 향하던 수원로(水原路)");
  const yongjusa = findByTitle(personRows, "정조의 꿈과 애달픈 효심이 아로새겨진 용주사와 융건릉");
  const baedari = findByTitle(oldRoadRows, "하천을 건너기 위해 배를 연결해 만들었던 배다리");
  const suwonFestival = findByTitle(festivalRows, "정조대왕 능행차를 시연하는 '수원화성문화제'");

  const coffeePerson = findByTitle(personRows, "고종황제를 매혹시킨 커피");
  const coffeeHeritage = findByTitle(heritageRows, "고종황제를 매혹시킨 커피");

  const geumjeongsanseong = findByTitle(personRows, "우리나라 최대 규모의 성곽 금정산성");
  const beomeosa = findByTitle(personRows, "동래부사 이안눌의 시를 새긴 부산 범어사 청룡암시 목판과 청룡암 시석");
  const suyeongYaryu = findByTitle(personRows, "부산 수영동 정월대보름 탈놀이, 수영야류");
  const eobangFestival = findByTitle(festivalRows, "광안리어방축제");
  const geumjeongFestival = findByTitle(sightsRows, "2024 금정산성축제");

  const gimandeok = findByTitle(personRows, "제주도의 거상 김만덕");
  const honghwagak = findByTitle(personRows, "제주목 관아의 사무공간 홍화각 건립 내력을 담은 홍화각기");
  const chusaYubaegil = findByTitle(personRows, "제주도로 귀양간 김정희의 추사 유배길");
  const myeonamYubaegil = findByTitle(personRows, "제주도로 귀양간 최익현의 면암 유배길");
  const myeongwoldae = findByTitle(personRows, "조선말기 시인과 묵객들이 풍류를 즐겼던 명월대");
  const jejuMokgwanaSight = findByTitle(sightsRows, "제주목관아 야간개장");
  const gimandeokSight = findByTitle(sightsRows, "김만덕주간 나눔큰잔치");

  cachedPlaces = [
    {
      id: "gyeongbokgung",
      name: "경복궁",
      location: cleanText(gyeonghoeru?.ADDR ?? "서울특별시 종로구 세종로"),
      district: "서울특별시 종로구",
      airportCodes: ["ICN", "GMP"],
      airportLabel: "인천 · 김포공항",
      rankLabel: "인기 1위",
      era: "조선 전기 ~ 대한제국",
      summary: sentenceExcerpt(`${gyeonghoeru?.SUMRY_CN ?? ""} ${okhoru?.SUMRY_CN ?? ""}`, 2),
      storyIntro:
        "처음 가도 가장 반응이 좋은 궁궐이에요. 왕이 연회를 열던 공간부터 을미사변의 흔적까지, 한 장소 안에서 분위기가 계속 바뀌는 게 포인트입니다.",
      imageUrl: placeImages.gyeongbokgung,
      tags: ["조선", "궁궐", "왕실", "서울"],
      sourceTitle: gyeonghoeru?.DATA_TITLE_NM ?? "경복궁 이야기",
      sourceUrl: undefined,
      highlights: [
        gyeonghoeru?.DATA_TITLE_NM ?? "경복궁 경회루",
        cheongyeonru?.DATA_TITLE_NM ?? "경복궁 청연루",
        okhoru?.DATA_TITLE_NM ?? "경복궁 옥호루"
      ],
      ...(() => {
        const foreigner = makeForeignerNote("서울특별시 종로구");
        const buzz = makeBuzz("경복궁", "종로권 콘텐츠 반응");
        return {
          foreignerNote: foreigner.note,
          buzzTitle: buzz.title,
          buzzStat: `${buzz.stat} · ${foreigner.stat}`,
          recommendationItems: ["광화문", "청연루", "옥호루"],
          dataSources: ["지역이야기와 역사인물", "KMOVIE", "외국인 이용 데이터"]
        };
      })(),
      experiences: [
        makeExperience({
          title: "경회루 장면 따라 보기",
          category: "스토리 포인트",
          description:
            "경회루, 청연루, 옥호루 순서로 보면 경복궁이 단순 왕궁이 아니라 장면이 바뀌는 무대처럼 느껴집니다.",
          address: cleanText(gyeonghoeru?.ADDR ?? "서울특별시 종로구 세종로"),
          source: "AREA_PRSN_2021"
        }),
        makeExperience({
          title: "광화문에서 궁궐 진입하기",
          category: "현장 동선",
          description:
            "SNS 반응이 높은 광화문에서 시작해 궁 안으로 들어가면 외국인도 방향 잡기가 쉽고 사진 포인트도 분명합니다.",
          address: "서울특별시 종로구 세종대로 172",
          source: "KMOVIE_DATA_2026"
        })
      ],
      characters: [
        makeCharacter({
          id: "taejo",
          name: "태조 이성계",
          role: "도읍과 왕조의 시작",
          rowTitle: "조선을 떠바친 한 기둥 사직단",
          openingLine: "경복궁을 그냥 예쁜 궁궐로 보면 절반만 본 셈이야. 왜 여기서 조선이 시작됐는지부터 보자."
        }),
        makeCharacter({
          id: "taejong",
          name: "태종",
          role: "경회루와 궁궐 질서",
          rowTitle: "인간과 하늘이 교감하는 작은 우주, 경복궁 경회루",
          openingLine: "사진은 다들 경회루부터 찍더군. 그런데 이 건물은 보기보다 훨씬 계산적으로 만들어졌다."
        }),
        makeCharacter({
          id: "heungseon",
          name: "흥선대원군",
          role: "중건과 권위의 상징",
          rowTitle: "화재를 막고 정의를 수호하는 신수(神獸), 해태상",
          openingLine: "광화문 앞 해태상만 제대로 봐도, 이 궁궐이 어떤 얼굴로 다시 세워졌는지 감이 올 거다."
        })
      ],
      endingVideo: {
        good: {
          title: "경복궁의 하루가 다시 열리다",
          description: "궁궐의 시작과 질서를 따라가며 가장 안정적인 결말에 도착한 영상입니다.",
          thumbnailUrl: placeImages.gyeongbokgung
        },
        bad: {
          title: "엇갈린 선택 끝의 경복궁",
          description: "중요한 장면을 놓친 채 다른 시선으로 마무리되는 결말입니다.",
          thumbnailUrl: placeImages.deoksugung
        }
      }
    },
    {
      id: "changdeokgung",
      name: "창덕궁",
      location: cleanText(gwaegungjeong?.ADDR ?? "서울특별시 종로구 율곡로 99"),
      district: "서울특별시 종로구",
      airportCodes: ["ICN", "GMP"],
      airportLabel: "인천 · 김포공항",
      rankLabel: "인기 2위",
      era: "조선 중기 ~ 조선 후기",
      summary: sentenceExcerpt(`${gwaegungjeong?.SUMRY_CN ?? ""} ${buyongjeong?.SUMRY_CN ?? ""}`, 2),
      storyIntro:
        "창덕궁은 화려하게 몰아치기보다 천천히 좋아지는 궁궐이에요. 후원, 정자, 세자 공간이 이어지면서 왕실의 사적인 공기가 더 잘 느껴집니다.",
      imageUrl: placeImages.changdeokgung,
      tags: ["조선", "후원", "정자", "서울"],
      sourceTitle: buyongjeong?.DATA_TITLE_NM ?? "창덕궁 이야기",
      sourceUrl: undefined,
      highlights: [
        gwaegungjeong?.DATA_TITLE_NM ?? "창덕궁 괘궁정",
        cheonguijeong?.DATA_TITLE_NM ?? "창덕궁 청의정",
        seunghwaru?.DATA_TITLE_NM ?? "창덕궁 승화루",
        buyongjeong?.DATA_TITLE_NM ?? "창덕궁 부용정"
      ],
      ...(() => {
        const foreigner = makeForeignerNote("서울특별시 종로구");
        const buzz = makeBuzz("창덕궁", "종로권 콘텐츠 반응");
        return {
          foreignerNote: foreigner.note,
          buzzTitle: buzz.title,
          buzzStat: `${buzz.stat} · ${foreigner.stat}`,
          recommendationItems: ["부용정", "승화루", "후원 산책"],
          dataSources: ["지역이야기와 역사인물", "KMOVIE", "외국인 이용 데이터"]
        };
      })(),
      experiences: [
        makeExperience({
          title: "후원 포인트 산책",
          category: "현장 동선",
          description:
            "괘궁정, 청의정, 승화루, 부용정 순서로 보면 창덕궁의 분위기가 점점 진해져요. 조용한 궁궐의 매력을 가장 잘 느낄 수 있는 흐름입니다.",
          address: cleanText(gwaegungjeong?.ADDR ?? "서울특별시 종로구 율곡로 99"),
          source: "AREA_PRSN_2021"
        })
      ],
      characters: [
        makeCharacter({
          id: "heonjong",
          name: "헌종",
          role: "궁궐 안의 일상과 취향",
          rowTitle: "활을 쏘며 심신을 단련했던, 창덕궁 괘궁정",
          openingLine: "창덕궁의 재미는 조용한 데 있어. 큰 행사보다도 사람들이 실제로 머물던 흔적이 많이 남아 있지."
        }),
        makeCharacter({
          id: "jeongjo",
          name: "정조",
          role: "세자 교육과 후원의 질서",
          rowTitle: "세자가 놀고 공부하던, 창덕궁 승화루",
          openingLine: "공부만 하는 궁궐 같아 보여도 의외로 생동감 있는 공간이야. 승화루부터 보면 분위기가 바로 잡힌다."
        }),
        makeCharacter({
          id: "hyegyeong",
          name: "혜경궁 홍씨",
          role: "후원에 남은 기억",
          rowTitle: "연꽃 향기 머금은 신선의 세상, 창덕궁 부용정",
          openingLine: "부용지 쪽으로 가면 다들 잠깐 말수가 줄어들어요. 그만큼 풍경이 강하거든요."
        })
      ],
      endingVideo: {
        good: {
          title: "후원의 풍경 속으로",
          description: "궁궐 안쪽의 분위기와 인물의 기억을 차분하게 따라간 결말입니다.",
          thumbnailUrl: placeImages.changdeokgung
        },
        bad: {
          title: "닿지 못한 부용지의 이야기",
          description: "중요한 장면을 지나치며 다른 여운을 남기는 결말입니다.",
          thumbnailUrl: placeImages.gyeongbokgung
        }
      }
    },
    {
      id: "suwon-hwaseong",
      name: "수원화성",
      location: cleanText(hwaseongUigwe?.ADDR ?? "경기도 수원시 장안구 연무동 190"),
      district: "경기도 수원시 팔달구",
      airportCodes: ["ICN", "GMP"],
      airportLabel: "인천 · 김포공항",
      rankLabel: "인기 3위",
      era: "조선 후기",
      summary: sentenceExcerpt(`${hwaseongUigwe?.SUMRY_CN ?? ""} ${hwaseongPeople?.SUMRY_CN ?? ""}`, 2),
      storyIntro:
        "성곽만 보고 끝내기엔 아까운 곳이에요. 누가, 왜, 어떻게 이 거대한 도시를 만들었는지를 알면 훨씬 더 재밌어집니다.",
      imageUrl: placeImages.suwonHwaseong,
      tags: ["조선", "정조", "성곽", "수원"],
      sourceTitle: hwaseongUigwe?.DATA_TITLE_NM ?? "수원화성 이야기",
      sourceUrl: undefined,
      highlights: [
        hwaseongUigwe?.DATA_TITLE_NM ?? "화성성역의궤",
        hwaseongPeople?.DATA_TITLE_NM ?? "화성 건설에 참여한 사람들",
        suwonRoad?.DATA_TITLE_NM ?? "수원로",
        yongjusa?.DATA_TITLE_NM ?? "용주사와 융건릉"
      ],
      ...(() => {
        const foreigner = makeForeignerNote("경기도 수원시 팔달구");
        return {
          foreignerNote: foreigner.note,
          buzzTitle: "수원권 콘텐츠 반응",
          buzzStat: `행리단길·화성 주변 반응 참고 · ${foreigner.stat}`,
          recommendationItems: ["수원화성문화제", "정조대왕 능행차", "배다리 이야기"],
          dataSources: ["지역이야기와 역사인물", "옛길", "축제", "외국인 이용 데이터"]
        };
      })(),
      experiences: [
        makeExperience({
          title: "배다리 이야기 따라가기",
          category: "옛길",
          description:
            "정조의 능행과 연결된 배다리 이야기를 알면 수원화성이 갑자기 더 입체적으로 느껴집니다. 왕이 이동하던 장면을 상상하기 좋은 포인트예요.",
          address: cleanText(baedari?.ADDR ?? "서울특별시 용산구 일대"),
          source: "OLD_ROAD_2023"
        }),
        makeExperience({
          title: "정조대왕 능행차 시선으로 보기",
          category: "축제",
          description:
            "수원화성문화제의 핵심인 능행차를 떠올리며 성곽을 보면, 단순 성벽이 아니라 행차의 무대처럼 보이기 시작합니다.",
          address: cleanText(suwonFestival?.ADDR ?? "경기도 수원시 팔달구 남창동 6-2"),
          source: "CLTUR_FSTVL_2023"
        })
      ],
      characters: [
        makeCharacter({
          id: "jeongjo",
          name: "정조",
          role: "도시를 설계한 군주",
          rowTitle: "정조의 꿈과 애달픈 효심이 아로새겨진 용주사와 융건릉",
          openingLine: "수원화성은 그냥 성이 아니야. 내가 어떤 도시를 만들고 싶었는지 그대로 들어 있는 설계도에 가깝지."
        }),
        makeCharacter({
          id: "chaejegong",
          name: "채제공",
          role: "화성 축성의 실무",
          rowTitle: "수원 화성의 모든 것, 화성성역의궤",
          openingLine: "기록을 보면 이 성이 갑자기 더 살아 움직여. 누가 얼마나 붙었는지까지 다 남아 있으니까."
        }),
        makeCharacter({
          id: "hyegyeong",
          name: "혜경궁 홍씨",
          role: "원행길과 효의 기억",
          rowTitle: "한양에서 수원 화성으로 향하던 수원로(水原路)",
          openingLine: "한양에서 수원으로 내려가는 길을 같이 떠올리면, 이곳이 왜 이렇게 특별한지 훨씬 선명해져요."
        })
      ],
      endingVideo: {
        good: {
          title: "정조의 구상이 완성된 도시",
          description: "화성과 원행의 의미를 따라가며 가장 선명한 결말에 도착한 영상입니다.",
          thumbnailUrl: placeImages.suwonHwaseong
        },
        bad: {
          title: "흐트러진 설계의 끝",
          description: "길과 사람의 의미를 놓치며 다른 여정으로 이어지는 결말입니다.",
          thumbnailUrl: placeImages.changdeokgung
        }
      }
    },
    {
      id: "deoksugung",
      name: "덕수궁",
      location: cleanText(coffeeHeritage?.ADDR ?? coffeePerson?.ADDR ?? "서울특별시 중구 정동 세종대로 99"),
      district: "서울특별시 중구",
      airportCodes: ["ICN", "GMP"],
      airportLabel: "인천 · 김포공항",
      rankLabel: "인기 4위",
      era: cleanText(coffeeHeritage?.ERA_NM ?? "조선 말기"),
      summary: sentenceExcerpt(coffeeHeritage?.SUMRY_CN ?? coffeePerson?.SUMRY_CN ?? "", 2),
      storyIntro:
        "덕수궁은 고요한 궁궐인데도 의외로 분위기가 가장 다층적이에요. 정동 거리 감성과 서양 문물이 섞이면서 조선 말기의 공기가 확 바뀝니다.",
      imageUrl: placeImages.deoksugung,
      tags: ["조선 말기", "정동", "궁궐", "서울"],
      sourceTitle: coffeeHeritage?.DATA_TITLE_NM ?? "덕수궁 이야기",
      sourceUrl: undefined,
      highlights: ["고종황제를 매혹시킨 커피", "정동의 서양식 접견 문화", "궁궐 안으로 들어온 근대의 풍경"],
      ...(() => {
        const foreigner = makeForeignerNote("서울특별시 중구");
        const buzz = makeBuzz("덕수궁", "중구권 콘텐츠 반응");
        return {
          foreignerNote: foreigner.note,
          buzzTitle: buzz.title,
          buzzStat: `${buzz.stat} · ${foreigner.stat}`,
          recommendationItems: ["덕수궁 돌담길", "정동길", "고종의 커피 서사"],
          dataSources: ["근대문화역사유산", "KMOVIE", "외국인 이용 데이터"]
        };
      })(),
      experiences: [
        makeExperience({
          title: "정동 산책",
          category: "도심 코스",
          description:
            "덕수궁만 보지 말고 돌담길과 정동까지 이어 걸으면, 조선 말기와 근대의 경계가 왜 여기서 더 잘 느껴지는지 바로 알게 됩니다.",
          address: "서울특별시 중구 정동길 일대",
          source: "KMOVIE_DATA_2026"
        })
      ],
      characters: [
        makeCharacter({
          id: "gojong",
          name: "고종",
          role: "정동의 전환기",
          rowTitle: "고종황제를 매혹시킨 커피",
          openingLine: "덕수궁은 예상보다 훨씬 현대적으로 느껴질 거야. 여기선 새로 들어온 세계를 같이 봐야 하거든."
        }),
        makeCharacter({
          id: "myeongseong",
          name: "명성황후",
          role: "궁중 외교와 긴장",
          summaryOverride:
            "궁궐 안에서 벌어진 외교와 권력의 긴장을 통해 덕수궁과 정동 일대의 분위기를 더 입체적으로 이해할 수 있다.",
          keywordsOverride: ["정동", "궁중", "외교", "왕실"],
          openingLine: "정동 일대를 같이 보면 궁궐 안의 긴장도 더 또렷해져요. 이곳은 조용한데도 계속 흔들리던 시기였거든요."
        }),
        makeCharacter({
          id: "sunjong",
          name: "순종",
          role: "왕조의 마지막 공기",
          summaryOverride:
            "궁 안에 남은 고요한 분위기와 시대의 끝자락을 함께 바라보게 하는 인물이다.",
          keywordsOverride: ["대한제국", "정동", "궁궐", "마지막 장면"],
          openingLine: "해가 질 무렵의 덕수궁을 떠올려 보세요. 이 공간은 마지막 장면을 유난히 길게 붙잡는 곳이에요."
        })
      ],
      endingVideo: {
        good: {
          title: "정동에 남은 마지막 빛",
          description: "덕수궁과 정동의 변화를 이해하며 마무리되는 엔딩 영상입니다.",
          thumbnailUrl: placeImages.deoksugung
        },
        bad: {
          title: "닫혀버린 궁의 문",
          description: "마지막 분기에서 다른 길을 택했을 때 도착하는 결말입니다.",
          thumbnailUrl: placeImages.gyeongbokgung
        }
      }
    },
    {
      id: "geumjeongsanseong",
      name: "금정산성",
      location: cleanText(geumjeongsanseong?.ADDR ?? "부산광역시 금정구 금성동 43"),
      district: "부산광역시 금정구",
      airportCodes: ["PUS"],
      airportLabel: "김해공항",
      rankLabel: "부산 추천 1",
      era: "조선 후기",
      summary: sentenceExcerpt(`${geumjeongsanseong?.SUMRY_CN ?? ""} ${beomeosa?.SUMRY_CN ?? ""}`, 2),
      storyIntro:
        "부산에서는 바다만 보지 말고 산성도 봐야 해요. 전쟁 이후 왜 이렇게 거대한 방어선을 만들었는지 알고 걷기 시작하면 훨씬 재밌습니다.",
      imageUrl: placeImages.geumjeongsanseong,
      tags: ["조선", "부산", "산성", "방어선"],
      sourceTitle: geumjeongsanseong?.DATA_TITLE_NM ?? "금정산성 이야기",
      sourceUrl: undefined,
      highlights: [
        geumjeongsanseong?.DATA_TITLE_NM ?? "금정산성",
        beomeosa?.DATA_TITLE_NM ?? "범어사 청룡암 시석",
        geumjeongFestival?.FCLTY_NM ?? "금정산성축제"
      ],
      ...(() => {
        const foreigner = makeForeignerNote("부산광역시 금정구");
        const buzz = makeBuzz("범어사", "금정구 콘텐츠 반응");
        return {
          foreignerNote: foreigner.note,
          buzzTitle: buzz.title,
          buzzStat: `${buzz.stat} · ${foreigner.stat}`,
          recommendationItems: ["범어사", "금정산성축제", "청룡암 시석"],
          dataSources: ["지역이야기와 역사인물", "관광명소 추천", "KMOVIE", "외국인 이용 데이터"]
        };
      })(),
      experiences: [
        makeExperience({
          title: "금정산성축제 연결 보기",
          category: "추천 명소",
          description:
            "산성의 역사만 보고 끝내지 않고, 지역 축제까지 같이 보면 부산 사람들이 이 공간을 어떻게 지금까지 쓰고 있는지 감이 와요.",
          address: "부산광역시 금정구 일대",
          source: "RECOMEND_SIGHTS_2023"
        }),
        makeExperience({
          title: "범어사와 함께 걷기",
          category: "현장 동선",
          description:
            "SNS 반응이 높은 범어사까지 이어서 보면 산성과 사찰, 부산의 조선 풍경을 한 번에 묶어 이해하기 좋아요.",
          address: cleanText(beomeosa?.ADDR ?? "부산광역시 금정구 범어사로 250"),
          source: "KMOVIE_DATA_2026"
        })
      ],
      characters: [
        makeCharacter({
          id: "hanbaeha",
          name: "한배하",
          role: "금정산성의 기억",
          rowTitle: "우리나라 최대 규모의 성곽 금정산성",
          openingLine: "부산에도 이런 스케일의 조선 성곽이 있었다는 게 의외지? 직접 보면 더 놀랄 거야."
        }),
        makeCharacter({
          id: "hyejeong",
          name: "혜정 스님",
          role: "범어사와 청룡암의 시선",
          rowTitle: "동래부사 이안눌의 시를 새긴 부산 범어사 청룡암시 목판과 청룡암 시석",
          openingLine: "성곽만 보지 말고 절 쪽 이야기까지 들으면 부산의 조선 풍경이 훨씬 깊어진다."
        }),
        makeCharacter({
          id: "hyeonjong",
          name: "현종",
          role: "해안 문화의 배경",
          rowTitle: "전통어촌민속을 주제로 열리는 '광안리어방축제'",
          openingLine: "부산은 성곽의 도시이면서 바다의 도시이기도 해. 그 둘을 같이 봐야 진짜 재미가 생기지."
        })
      ],
      endingVideo: {
        good: {
          title: "바다를 지키던 산성의 결말",
          description: "부산의 방어선과 지역 문화를 함께 이해한 뒤 도착하는 엔딩 영상입니다.",
          thumbnailUrl: placeImages.geumjeongsanseong
        },
        bad: {
          title: "길을 놓친 금정산성",
          description: "성곽의 의미를 다 보지 못한 채 다른 시선으로 마무리되는 결말입니다.",
          thumbnailUrl: placeImages.beomeosa
        }
      }
    },
    {
      id: "suyeong-yaryu",
      name: "수영야류",
      location: cleanText(suyeongYaryu?.ADDR ?? "부산광역시 수영구 수영공원 전수회관"),
      district: "부산광역시 수영구",
      airportCodes: ["PUS"],
      airportLabel: "김해공항",
      rankLabel: "부산 추천 2",
      era: "조선 후기",
      summary: sentenceExcerpt(`${suyeongYaryu?.SUMRY_CN ?? ""} ${eobangFestival?.SUMRY_CN ?? ""}`, 2),
      storyIntro:
        "부산에서는 궁궐 대신 마을 놀이와 바다 문화를 보는 재미도 커요. 수영야류는 현장 분위기까지 상상하기 좋은 콘텐츠입니다.",
      imageUrl: placeImages.beomeosa,
      tags: ["조선", "부산", "민속", "어방"],
      sourceTitle: suyeongYaryu?.DATA_TITLE_NM ?? "수영야류 이야기",
      sourceUrl: undefined,
      highlights: [
        suyeongYaryu?.DATA_TITLE_NM ?? "수영야류",
        eobangFestival?.DATA_TITLE_NM ?? "광안리어방축제",
        "정월대보름 길놀이"
      ],
      ...(() => {
        const foreigner = makeForeignerNote("부산광역시 수영구");
        return {
          foreignerNote: foreigner.note,
          buzzTitle: "광안리권 콘텐츠 반응",
          buzzStat: `광안대교·바다 콘텐츠 반응 참고 · ${foreigner.stat}`,
          recommendationItems: ["광안리어방축제", "수영공원 전수회관"],
          dataSources: ["지역이야기와 역사인물", "축제", "외국인 이용 데이터"]
        };
      })(),
      experiences: [
        makeExperience({
          title: "어방축제 프로그램 보기",
          category: "축제",
          description:
            "어민 협동체 문화가 어떻게 축제로 이어졌는지 볼 수 있어요. 역사 설명이 너무 무겁지 않게 풀려서 외국인에게도 전달하기 좋습니다.",
          address: cleanText(eobangFestival?.ADDR ?? "부산광역시 수영구 광안동 192-20"),
          source: "CLTUR_FSTVL_2023"
        })
      ],
      characters: [
        makeCharacter({
          id: "choiyeong",
          name: "최영",
          role: "마을신으로 남은 장군",
          rowTitle: "부산 수영동 정월대보름 탈놀이, 수영야류",
          openingLine: "부산에서는 장군도 놀잇판 속에 남아 있었어. 이 이야기는 꽤 흥겹게 흘러간다."
        }),
        makeCharacter({
          id: "hyeonjong",
          name: "현종",
          role: "수영 지방의 바다 문화",
          rowTitle: "전통어촌민속을 주제로 열리는 '광안리어방축제'",
          openingLine: "축제라고 가볍게 보면 아쉬워. 조선 바다 문화가 꽤 선명하게 남아 있거든."
        })
      ],
      endingVideo: {
        good: {
          title: "들놀음이 이어진 밤",
          description: "부산의 민속과 어방 문화를 함께 이해한 뒤 마무리되는 엔딩입니다.",
          thumbnailUrl: placeImages.beomeosa
        },
        bad: {
          title: "흩어진 놀이판",
          description: "중요한 장면을 놓치며 다른 여운으로 끝나는 엔딩입니다.",
          thumbnailUrl: placeImages.geumjeongsanseong
        }
      }
    },
    {
      id: "gimandeok-route",
      name: "김만덕 길",
      location: cleanText(gimandeok?.ADDR ?? "제주특별자치도 제주시 건입동 387-1"),
      district: "제주특별자치도 제주시",
      airportCodes: ["CJU"],
      airportLabel: "제주공항",
      rankLabel: "제주 추천 1",
      era: "조선 후기",
      summary: sentenceExcerpt(`${gimandeok?.SUMRY_CN ?? ""} ${honghwagak?.SUMRY_CN ?? ""}`, 2),
      storyIntro:
        "제주에서는 왕보다 김만덕이 더 강하게 남습니다. 여성 상인, 기근 구휼, 제주 관아 이야기까지 한 번에 묶이는 게 장점이에요.",
      imageUrl: placeImages.gimandeok,
      tags: ["조선", "제주", "김만덕", "제주목관아"],
      sourceTitle: gimandeok?.DATA_TITLE_NM ?? "김만덕 이야기",
      sourceUrl: undefined,
      highlights: [
        gimandeok?.DATA_TITLE_NM ?? "김만덕",
        honghwagak?.DATA_TITLE_NM ?? "홍화각기",
        jejuMokgwanaSight?.FCLTY_NM ?? "제주목관아"
      ],
      ...(() => {
        const foreigner = makeForeignerNote("제주특별자치도 제주시");
        return {
          foreignerNote: foreigner.note,
          buzzTitle: "제주시권 여행 반응",
          buzzStat: `제주 도심권 외국인 반응 우수 · ${foreigner.stat}`,
          recommendationItems: ["제주목관아 야간개장", "김만덕주간 나눔큰잔치"],
          dataSources: ["지역이야기와 역사인물", "관광명소 추천", "외국인 이용 데이터"]
        };
      })(),
      experiences: [
        makeExperience({
          title: "제주목관아 야간개장",
          category: "추천 명소",
          description:
            "김만덕 이야기와 관아 서사를 낮에 보고, 밤에는 제주목관아를 다시 보는 식으로 동선을 짜면 훨씬 기억에 남아요.",
          address: cleanText(jejuMokgwanaSight?.FCLTY_ROAD_NM_ADDR ?? "제주특별자치도 제주시 관덕로 25"),
          source: "RECOMEND_SIGHTS_2023"
        }),
        makeExperience({
          title: "김만덕 나눔 서사 따라가기",
          category: "도시 산책",
          description:
            "기근 때 제주 사람들을 살린 인물이라는 점이 분명해서, 외국인에게도 쉽게 설명되고 공감 포인트가 바로 생깁니다.",
          address: cleanText(gimandeok?.ADDR ?? "제주특별자치도 제주시 건입동 387-1"),
          source: "AREA_PRSN_2021"
        })
      ],
      characters: [
        makeCharacter({
          id: "gimandeok",
          name: "김만덕",
          role: "제주의 거상",
          rowTitle: "제주도의 거상 김만덕",
          openingLine: "제주를 바다 풍경으로만 기억하면 아쉬워요. 여기엔 사람을 살린 상인의 이야기도 있거든요."
        }),
        makeCharacter({
          id: "choehaesan",
          name: "최해산",
          role: "제주목관아의 실무",
          rowTitle: "제주목 관아의 사무공간 홍화각 건립 내력을 담은 홍화각기",
          openingLine: "관아 이야기를 알면 제주의 옛 중심이 어디였는지 선명하게 잡힙니다."
        }),
        makeCharacter({
          id: "chaejegong",
          name: "채제공",
          role: "김만덕을 기록한 시선",
          rowTitle: "제주도의 거상 김만덕",
          openingLine: "한 사람의 선행이 어떻게 기록되고 기억되는지도 꽤 흥미로운 부분이지."
        })
      ],
      endingVideo: {
        good: {
          title: "제주를 살린 이름",
          description: "김만덕과 제주 관아의 서사를 함께 이해했을 때 열리는 결말입니다.",
          thumbnailUrl: placeImages.gimandeok
        },
        bad: {
          title: "흩어진 제주의 기록",
          description: "핵심 인물의 흐름을 놓치며 다른 여운으로 끝나는 결말입니다.",
          thumbnailUrl: placeImages.chusaYubaegil
        }
      }
    },
    {
      id: "chusa-yubaegil",
      name: "추사 유배길",
      location: cleanText(chusaYubaegil?.ADDR ?? "제주특별자치도 서귀포시 대정읍 안성리 1661-1"),
      district: "제주특별자치도 서귀포시",
      airportCodes: ["CJU"],
      airportLabel: "제주공항",
      rankLabel: "제주 추천 2",
      era: "조선 말기",
      summary: sentenceExcerpt(`${chusaYubaegil?.SUMRY_CN ?? ""} ${myeonamYubaegil?.SUMRY_CN ?? ""}`, 2),
      storyIntro:
        "제주의 유배 서사는 생각보다 강해요. 길 자체가 이야기라서, 걸었던 경로를 떠올리기만 해도 장면이 잘 살아납니다.",
      imageUrl: placeImages.chusaYubaegil,
      tags: ["조선", "제주", "유배", "추사"],
      sourceTitle: chusaYubaegil?.DATA_TITLE_NM ?? "추사 유배길",
      sourceUrl: undefined,
      highlights: [
        chusaYubaegil?.DATA_TITLE_NM ?? "추사 유배길",
        myeonamYubaegil?.DATA_TITLE_NM ?? "면암 유배길",
        myeongwoldae?.DATA_TITLE_NM ?? "명월대"
      ],
      ...(() => {
        const foreigner = makeForeignerNote("제주특별자치도 서귀포시");
        return {
          foreignerNote: foreigner.note,
          buzzTitle: "서귀포권 여행 반응",
          buzzStat: `제주 남부권 외국인 문화소비 높음 · ${foreigner.stat}`,
          recommendationItems: ["추사 유배길", "명월대", "제주 설화 코스"],
          dataSources: ["지역이야기와 역사인물", "옛길", "외국인 이용 데이터"]
        };
      })(),
      experiences: [
        makeExperience({
          title: "추사 유배길 따라 걷기",
          category: "옛길",
          description:
            "옛길 데이터에 나온 유배 동선을 그대로 읽어보며 걸으면, 단순한 산책이 아니라 이동 자체가 이야기처럼 느껴집니다.",
          address: cleanText(chusaYubaegil?.ADDR ?? "제주특별자치도 서귀포시 대정읍 안성리 1661-1"),
          source: "OLD_ROAD_2023"
        }),
        makeExperience({
          title: "명월대 풍류 코스",
          category: "확장 코스",
          description:
            "유배 이야기만 보면 제주는 너무 무거워질 수 있어요. 명월대까지 이어서 보면 조선 말기 제주가 더 다채롭게 느껴집니다.",
          address: cleanText(myeongwoldae?.ADDR ?? "제주특별자치도 제주시 한림읍 명월리 2223"),
          source: "AREA_PRSN_2021"
        })
      ],
      characters: [
        makeCharacter({
          id: "chusa",
          name: "추사 김정희",
          role: "유배길의 중심 인물",
          rowTitle: "제주도로 귀양간 김정희의 추사 유배길",
          openingLine: "제주의 풍경은 유배자를 더 외롭게도 만들고, 더 깊어지게도 만들었지."
        }),
        makeCharacter({
          id: "choiikhyeon",
          name: "최익현",
          role: "면암 유배길",
          rowTitle: "제주도로 귀양간 최익현의 면암 유배길",
          openingLine: "제주에 닿는 길 자체가 이미 이야기야. 도착하기 전부터 감정이 쌓이기 시작하거든."
        }),
        makeCharacter({
          id: "hongjongsi",
          name: "홍종시",
          role: "명월대의 풍류",
          rowTitle: "조선말기 시인과 묵객들이 풍류를 즐겼던 명월대",
          openingLine: "유배 이야기만 보고 제주를 다 안다고 생각하면 아쉬워. 이 섬엔 풍류도 꽤 깊게 남아 있어."
        })
      ],
      endingVideo: {
        good: {
          title: "제주의 길 위에서 남은 문장",
          description: "유배와 풍류의 흐름을 함께 따라가며 도착하는 엔딩 영상입니다.",
          thumbnailUrl: placeImages.chusaYubaegil
        },
        bad: {
          title: "끝나지 못한 유배길",
          description: "길의 의미를 놓치며 다른 정서로 끝나는 결말입니다.",
          thumbnailUrl: placeImages.gimandeok
        }
      }
    }
  ];

  return cachedPlaces;
}

export function getFilteredPlaces(airport: AirportCode | "all") {
  const places = buildPlaces();
  return airport === "all" ? places : places.filter((place) => place.airportCodes.includes(airport));
}

export function getAllPlaces() {
  return buildPlaces();
}

export function getPlace(placeId: string) {
  return buildPlaces().find((place) => place.id === placeId);
}

export function getCharacter(placeId: string, characterId: string) {
  return getPlace(placeId)?.characters.find((character) => character.id === characterId);
}
