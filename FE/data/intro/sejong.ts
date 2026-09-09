export interface Dialogue {
  speaker: string;
  text: string;

  // 캐릭터 이미지
  character?: string;

  // 캐릭터 위치
  position?: "left" | "center" | "right";
}

export interface Choice {
  text: string;
  next: "chat";
}

export interface IntroData {
  kingName: string;
  background: string;
  dialogues: Dialogue[];
  choices?: Choice[];
}

export const sejongIntro: IntroData = {
  kingName: "세종대왕",

  background: "/images/sejong/세종대왕인트로배경.png",

  dialogues: [
    {
      speaker: "신하 김문",
      text: "전하! 제발 부탁드립니다. 날마다 고기만 드시고 책만 읽으시니 체중은 늘고 허리 통증이 심해지시는 것입니다!",
      character: "/images/sejong/신하_누끼.png",
      position: "left",
    },

    {
      speaker: "신하 김문",
      text: "당장 이 숟가락 모양 몽둥이, 격방을 들고 운동을 하십시오!",
      character: "/images/sejong/신하_누끼.png",
      position: "left",
    },

    {
      speaker: "세종대왕",
      text: "아이고, 허리야...",
      character: "/images/sejong/허리세종_누끼.png",
      position: "center",
    },

    {
      speaker: "세종대왕",
      text: "내가 밤새 백성들을 위해 글자 연구하느라 바쁜데, 신하라는 자가 감히 왕에게 운동을 강요하는구나!",
      character: "/images/sejong/세종대왕_누끼.png",
      position: "center",
    },

    {
      speaker: "신하 김문",
      text: "전하의 건강을 걱정하여 드리는 말씀입니다. 부디 한 번만 제 말을 들어주십시오!",
      character: "/images/sejong/걱정신하_누끼.png",
      position: "left",
    },

    {
      speaker: "세종대왕",
      text: "허허... 정말 고집 하나는 대단한 신하로구나.",
      character: "/images/sejong/허허세종_누끼.png",
      position: "center",
    },

    {
      speaker: "세종대왕",
      text: "어라?",
      character: "/images/sejong/놀란세종_누끼.png",
      position: "center",
    },

    {
      speaker: "세종대왕",
      text: "거기 이상한 옷을 입은 자네! 마침 잘 왔네.",
      character: "/images/sejong/세종대왕_누끼.png",
      position: "center",
    },

    {
      speaker: "세종대왕",
      text: "여긴 내가 만든 인재들의 배움터, 집현전이라네.",
      character: "/images/sejong/세종대왕_누끼.png",
      position: "center",
    },

    {
      speaker: "세종대왕",
      text: "내가 이 고집불통 신하 때문에 죽겠으니... 자네가 내 편 좀 들어주겠나?",
      character: "/images/sejong/세종대왕_누끼.png",
      position: "center",
    },
  ],

  choices: [
    {
      text: "전하의 말씀이 옳습니다.",
      next: "chat",
    },
    {
      text: "신하의 말도 일리가 있습니다.",
      next: "chat",
    },
  ],
};