export type IntroPosition = "left" | "center" | "right";

export interface IntroDialogue {
  speaker: string;
  text: string;
  character?: string;
  position?: IntroPosition;
}

export interface IntroChoice {
  text: string;
}

export interface IntroData {
  kingName: string;
  background: string;
  dialogues: IntroDialogue[];
  choices: IntroChoice[];
}

export const sejongIntro: IntroData = {
  kingName: "세종대왕",
  background: "/images/sejong/backgrounds/council.png",
  dialogues: [
    {
      speaker: "세종대왕",
      text: "어서 오시오. 이곳은 조선의 국정을 논하고 백성을 위한 길을 찾던 자리요.",
      character: "/images/sejong/characters/neutral.png",
      position: "center",
    },
    {
      speaker: "세종대왕",
      text: "역사는 왕의 이름만으로 남지 않소. 그 시대 사람들이 어떤 문제를 마주했고, 어떤 선택을 했는지 함께 보아야 하오.",
      character: "/images/sejong/characters/suggest.png",
      position: "center",
    },
    {
      speaker: "세종대왕",
      text: "그대라면 백성을 위해 가장 먼저 무엇을 살피겠소?",
      character: "/images/sejong/characters/smile.png",
      position: "center",
    },
  ],
  choices: [
    { text: "백성의 생활을 먼저 살피겠습니다." },
    { text: "나라의 제도와 질서를 먼저 살피겠습니다." },
  ],
};
