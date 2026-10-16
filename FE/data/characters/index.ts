import { taejo } from "./taejo";
import { ryuSeongryong } from "./ryu_seongryong";

import { yulgok, youngYulgok } from "./yulgok";

import { jeongjo, youngJeongjo } from "./jeongjo";

import { sejong, youngSejong } from "./sejong";

import { taejong } from "./taejong";

import { gojongCharacters } from "./gojong";

import { mandeok, mandeokMerchant } from "./mandeok";

// 보조 인물: 대본의 화자·역할과 표정 이미지만 등록합니다.
export const kimmun = {
  id: "kimmun",
  name: "신하",
  englishName: "Court Attendant",
  role: "여러 왕의 이야기에서 신하·시종·내관·대신 역할을 맡는 공용 연출 캐릭터",
  emotions: [
    "neutral",
    "smile",
    "surprised",
    "nagging"
  ]
} as const;

// 보조 인물: 대본의 화자·역할과 표정 이미지만 등록합니다.
export const jeongyakyong = {
  id: "jeongyakyong",
  name: "정약용",
  englishName: "Jeong Yak-yong",
  role: "정조 시대의 관료이자 학자",
  emotions: [
    "normal",
    "curious",
    "difficult",
    "fed_up",
    "flustered"
  ]
} as const;

import { kimJeonghee } from "./kim_jeonghee";

// 이름 없는 후학: 별도 성격 없이 대본을 따르는 보조 역할입니다.
export const chusaStudent = {
  id: "chusa_student",
  name: "후학",
  englishName: "Student",
  role: "김정희에게 질문하는 이름 없는 후학을 맡는 창작 보조 역할",
  emotions: ["neutral", "curious", "smile", "worried"],
} as const;

import { sinsaimdang, youngSinsaimdang } from "./sinsaimdang";

// 성격 파일 없이 대본과 표정만 따르는 가족 보조 역할입니다.
export const saimdangMother = {
  id: "saimdang_mother", name: "어머니", englishName: "Mother",
  role: "사임당의 어머니 용인 이씨를 맡는 역사 기반 창작 대화 역할",
  emotions: ["gentle", "smile"],
} as const;
export const yiWonsu = {
  id: "yi_wonsu", name: "이원수", englishName: "Yi Won-su",
  role: "사임당의 남편. 구체적인 대화와 돌봄 행동은 창작 연출",
  emotions: ["neutral", "gentle", "smile"],
} as const;
export const saimdangChild = {
  id: "saimdang_child", name: "아이", englishName: "Child",
  role: "사임당의 그림을 궁금해하는 이름 없는 자녀 역할. 특정 자녀로 단정하지 않는다.",
  emotions: ["curious", "smile"],
} as const;

// 대본만 따르는 보조 역할입니다.
export const yulgokFriend = { id: "yulgok_friend", name: "지인", englishName: "Companion", role: "실존 정체를 지정하지 않은 창작 지인·선비 역할", emotions: ["neutral", "curious", "smile", "worried"] } as const;
export const seonjo = { id: "seonjo", name: "선조", englishName: "King Seonjo", role: "이이·류성룡 등 선조대 이야기에서 국왕을 맡는 공용 역할. 구체적인 문답은 창작", emotions: ["serious"] } as const;

// 류성룡 이야기의 보조 인물: 별도 성격 없이 대본과 표정만 사용합니다.
export const ryuUnryong = { id: "ryu_unryong", name: "류운룡", englishName: "Ryu Un-ryong", role: "류성룡의 형. 구체적인 형제 대화는 창작", emotions: ["neutral", "curious", "smile"] } as const;
export const seongryongStudent = { id: "seongryong_student", name: "제자", englishName: "Student", role: "집필을 궁금해하는 이름 없는 창작 제자 역할", emotions: ["neutral", "curious", "worried"] } as const;

export const characters = {
  taejo,
  ryu_seongryong: ryuSeongryong,
  ryu_unryong: ryuUnryong,
  seongryong_student: seongryongStudent,
  yulgok,
  young_yulgok: youngYulgok,
  yulgok_friend: yulgokFriend,
  seonjo,
  sinsaimdang,
  young_sinsaimdang: youngSinsaimdang,
  saimdang_mother: saimdangMother,
  yi_wonsu: yiWonsu,
  saimdang_child: saimdangChild,
  kim_jeonghee: kimJeonghee,
  chusa_student: chusaStudent,
  mandeok,
  mandeok_merchant: mandeokMerchant,
  ...gojongCharacters,
  jeongjo,
  young_jeongjo: youngJeongjo,
  jeongyakyong,
  sejong,
  young_sejong: youngSejong,
  taejong,
  kimmun,
} as const;

export type CharacterId = keyof typeof characters;
