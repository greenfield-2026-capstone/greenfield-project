// 사실·전승과 창작 대사를 구분한 율곡 이이 5챕터입니다.
export const yulgokStory = {
  "id": "yulgok",
  "title": "율곡 이이 — 묻고, 흔들리고, 다시 배우다",
  "location": "강릉 오죽헌·파주·금강산·한양",
  "description": "탄생의 전승에서 글을 고치는 어린 날, 모친상과 방황, 합격의 기쁨, 개혁의 부담까지 따라가는 다섯 장면.",
  "sources": [
    {
      "title": "한국민족문화대백과사전 — 이이",
      "url": "https://encykorea.aks.ac.kr/Article/E0045546"
    },
    {
      "title": "국사편찬위원회 우리역사넷 — 이이, 백성들을 위한 정치를 꿈꾸다",
      "url": "https://contents.history.go.kr/mobile/eh/view.do?code=eh_age_30&levelId=eh_n0430_0010"
    }
  ],
  "turns": {
    1: {
      "title": "[몽룡실] 용의 꿈보다 작은 손",
      "background": "ojukheon",
      "showOpeningTransition": true,
      "transition": {
        "title": "1536년 — 강릉 오죽헌 몽룡실",
        "text": "용의 꿈 이야기가 남은 방. 부모의 눈길은 갓 태어난 아이의 작은 손에 머문다."
      },
      "characters": [
        "sinsaimdang",
        "yi_wonsu"
      ],
      "script": [
        {
          "speaker": "narration",
          "emotion": null,
          "text": "(오죽헌의 방. 사임당이 갓 태어난 아이를 바라본다. 이원수가 곁에 앉는다.)"
        },
        {
          "speaker": "yi_wonsu",
          "emotion": "gentle",
          "text": "조금은 쉬었소?"
        },
        {
          "speaker": "sinsaimdang",
          "emotion": "smile",
          "text": "눈을 감았다가도 자꾸 이쪽을 보게 됩니다."
        },
        {
          "speaker": "yi_wonsu",
          "emotion": "smile",
          "text": "아이가 궁금한가 보구려."
        },
        {
          "speaker": "sinsaimdang",
          "emotion": "thoughtful",
          "text": "검은 용이 바다에서 이 집으로 들어오는 꿈을 꾸었습니다."
        },
        {
          "speaker": "yi_wonsu",
          "emotion": "gentle",
          "text": "신기한 꿈이구려."
        },
        {
          "speaker": "sinsaimdang",
          "emotion": "smile",
          "text": "용을 보았으니 현룡이라 불러보면 어떨까요?"
        },
        {
          "speaker": "yi_wonsu",
          "emotion": "smile",
          "text": "좋소. 우선 잘 먹고 건강하게 자라주면 좋겠구려."
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "(작은 손이 움직이자 사임당의 시선도 따라간다.)"
        },
        {
          "speaker": "sinsaimdang",
          "emotion": "moved",
          "text": "그러게요. 지금은 이 작은 손만 보입니다."
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "[1536년 이이는 강릉에서 태어났다. 흑룡의 태몽과 아명 현룡(見龍)은 전승이며, 출산을 둘러싼 대화는 창작이다.]"
        },
        {
          "speaker": "sinsaimdang",
          "emotion": "curious",
          "text": "당신이라면 이 아이에게 어떤 바람을 먼저 전해주시겠습니까?"
        }
      ],
      "historicalFacts": [
        "이이는 1536년 강릉에서 태어났으며 부모는 이원수와 신사임당이다.",
        "흑룡의 태몽과 아명 현룡(見龍)이 전하며 산실은 몽룡실로 알려져 있다."
      ],
      "storyGoal": "큰 인물의 탄생이라는 전승 옆에 아이의 건강을 바라는 부모의 마음을 놓는다.",
      "tone": "조용한 기쁨과 피로",
      "specialRules": [
        "구체적인 대사·표정·손동작·심리와 플레이어의 등장은 창작이며 실제 발언으로 인용하지 않는다.",
        "historicalFacts의 사실과 전승을 구분하고 미래 사건을 인물이 미리 아는 것처럼 말하지 않는다.",
        "플레이어는 목격자이며 역사적 결과를 바꾸지 않는다. 호감도는 신뢰를 뜻한다.",
        "선택지는 마지막 비내레이션 대사에 답한다. NPC 반응은 그 마지막 화자가 맡는다.",
        "보조 인물은 고정 대본을 따르며 별도 성격이나 구체적인 실존 정체를 임의로 만들지 않는다.",
        "태몽은 실제로 확인된 초자연적 사건이나 성공의 증거로 표현하지 않는다.",
        "갓난아이는 말하지 않는다. 이 장면의 선택지 반응은 sinsaimdang이 맡는다."
      ]
    },
    2: {
      "title": "[어린 이이] 한 줄이 마음에 들지 않아서",
      "background": "hwaseokjeong",
      "transition": {
        "title": "1543년 무렵 · 세는나이 여덟 살 — 파주 화석정 일대",
        "text": "화석정에서 본 바람을 글로 옮기는 아이. 한 줄을 고치느라 종이를 내려놓지 못한다."
      },
      "characters": [
        "young_yulgok",
        "sinsaimdang"
      ],
      "script": [
        {
          "speaker": "narration",
          "emotion": null,
          "text": "(화석정에서 본 풍경을 떠올리며 어린 이이가 종이를 들여다본다.)"
        },
        {
          "speaker": "sinsaimdang",
          "emotion": "curious",
          "text": "아까부터 같은 곳을 보고 있구나."
        },
        {
          "speaker": "young_yulgok",
          "emotion": "frustrated",
          "text": "바람을 보았는데 글로 쓰니 가만히 있는 것 같습니다."
        },
        {
          "speaker": "sinsaimdang",
          "emotion": "thoughtful",
          "text": "네 눈에는 어떻게 움직였니?"
        },
        {
          "speaker": "young_yulgok",
          "emotion": "focused",
          "text": "잎이 먼저 흔들리고, 조금 뒤에 물결이 움직였습니다."
        },
        {
          "speaker": "sinsaimdang",
          "emotion": "smile",
          "text": "지금 한 말에는 네가 본 것이 있구나."
        },
        {
          "speaker": "young_yulgok",
          "emotion": "shy",
          "text": "그래도 아직 마음에 들지 않습니다."
        },
        {
          "speaker": "sinsaimdang",
          "emotion": "neutral",
          "text": "조금 쉬었다가 다시 읽어보아도 되지."
        },
        {
          "speaker": "young_yulgok",
          "emotion": "smile",
          "text": "그럼 어머니도 나중에 한 번 더 들어주시겠습니까?"
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "[이이는 여덟 살에 화석정에서 시를 지었다고 전하며, 1548년에는 진사 초시에 합격했다. 시를 고치는 과정과 대화는 창작이다.]"
        },
        {
          "speaker": "young_yulgok",
          "emotion": "curious",
          "text": "당신도 마음에 들지 않는 글을 여러 번 고쳐본 적이 있습니까?"
        }
      ],
      "historicalFacts": [
        "여덟 살 이이의 화석정 시 일화가 전한다.",
        "1548년 세는나이 열세 살에 진사 초시에 합격했다."
      ],
      "storyGoal": "칭찬받는 재능 곁에 원하는 말을 찾지 못하는 아이의 답답함과 즐거움을 보여준다.",
      "tone": "호기심과 작은 성취",
      "specialRules": [
        "구체적인 대사·표정·손동작·심리와 플레이어의 등장은 창작이며 실제 발언으로 인용하지 않는다.",
        "historicalFacts의 사실과 전승을 구분하고 미래 사건을 인물이 미리 아는 것처럼 말하지 않는다.",
        "플레이어는 목격자이며 역사적 결과를 바꾸지 않는다. 호감도는 신뢰를 뜻한다.",
        "선택지는 마지막 비내레이션 대사에 답한다. NPC 반응은 그 마지막 화자가 맡는다.",
        "보조 인물은 고정 대본을 따르며 별도 성격이나 구체적인 실존 정체를 임의로 만들지 않는다.",
        "실제 화석정 시의 원문을 새로 지어 인용하지 않는다.",
        "이 장면은 시를 쓴 뒤의 창작 대화이며 사임당의 동행이 기록되었다고 주장하지 않는다."
      ]
    },
    3: {
      "title": "[상실과 방황] 책을 덮으면 더 그립습니다",
      "background": "mountain",
      "transition": {
        "title": "1551~1555년 — 파주 묘소에서 금강산으로",
        "text": "어머니를 떠나보낸 뒤, 익숙한 책에서도 답을 찾기 어렵다. 청년은 금강산으로 향한다."
      },
      "characters": [
        "yulgok",
        "yulgok_friend"
      ],
      "script": [
        {
          "speaker": "narration",
          "emotion": null,
          "text": "(파주. 어머니를 잃은 이이가 펼쳐둔 책을 덮는다.)"
        },
        {
          "speaker": "yulgok_friend",
          "emotion": "worried",
          "text": "오늘도 오래 앉아 있었네."
        },
        {
          "speaker": "yulgok",
          "emotion": "sad",
          "text": "이 대목을 여쭈면 어머니가 뭐라 하셨을까 생각했네."
        },
        {
          "speaker": "yulgok_friend",
          "emotion": "neutral",
          "text": "책을 읽는 동안은 조금 나은가?"
        },
        {
          "speaker": "yulgok",
          "emotion": "sad",
          "text": "읽다가도 그립고, 덮으면 더 그립네."
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "(시묘의 시간을 보낸 뒤, 장면이 금강산으로 바뀐다.)"
        },
        {
          "speaker": "yulgok_friend",
          "emotion": "worried",
          "text": "산에 들어가면 마음이 편해질 것 같은가?"
        },
        {
          "speaker": "yulgok",
          "emotion": "thoughtful",
          "text": "모르겠네. 다만 다른 가르침에서도 삶과 죽음에 관해 묻고 싶네."
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "(1555년 무렵. 산을 떠날 준비를 하는 이이.)"
        },
        {
          "speaker": "yulgok_friend",
          "emotion": "curious",
          "text": "이제 답을 얻었나?"
        },
        {
          "speaker": "yulgok",
          "emotion": "thoughtful",
          "text": "한마디로 답할 수는 없네. 돌아가서 유학을 다시 깊이 공부하려 하네."
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "[1551년 모친상을 겪고 시묘한 이이는 1554년 금강산에 들어가 불교를 공부했으며 이듬해 하산해 유학에 전념했다.]"
        },
        {
          "speaker": "yulgok",
          "emotion": "worried",
          "text": "답을 찾는 길을 바꾸는 것이 자네에게도 어려운 일이겠는가?"
        }
      ],
      "historicalFacts": [
        "1551년 어머니를 잃은 뒤 파주에서 장례하고 3년간 시묘했다고 전한다.",
        "1554년 금강산에서 불교를 공부했고 1555년 하산해 다시 유학에 전념했다."
      ],
      "storyGoal": "학문의 방향을 바꾸는 청년에게 슬픔과 망설임이 남아 있음을 보여준다.",
      "tone": "그리움과 조심스러운 결심",
      "specialRules": [
        "구체적인 대사·표정·손동작·심리와 플레이어의 등장은 창작이며 실제 발언으로 인용하지 않는다.",
        "historicalFacts의 사실과 전승을 구분하고 미래 사건을 인물이 미리 아는 것처럼 말하지 않는다.",
        "플레이어는 목격자이며 역사적 결과를 바꾸지 않는다. 호감도는 신뢰를 뜻한다.",
        "선택지는 마지막 비내레이션 대사에 답한다. NPC 반응은 그 마지막 화자가 맡는다.",
        "보조 인물은 고정 대본을 따르며 별도 성격이나 구체적인 실존 정체를 임의로 만들지 않는다.",
        "불교를 단순한 일탈이나 열등한 학문으로 폄하하지 않는다.",
        "지인은 이름 없는 창작 역할이며 세 시점에 실제 동행한 실존 인물로 단정하지 않는다."
      ]
    },
    4: {
      "title": "[구도장원공] 오늘은 조금 기뻐해도 되겠지",
      "background": "study",
      "transition": {
        "title": "1564년 — 한양 · 과거 합격 소식이 전해진 자리",
        "text": "또 한 번 합격 소식이 전해진다. 기다림 끝의 기쁨 곁으로 새로운 책임이 다가온다."
      },
      "characters": [
        "yulgok",
        "yulgok_friend"
      ],
      "script": [
        {
          "speaker": "narration",
          "emotion": null,
          "text": "(합격 소식을 들고 지인이 찾아온다. 이이가 손에 쥔 책을 내려놓는다.)"
        },
        {
          "speaker": "yulgok_friend",
          "emotion": "smile",
          "text": "이번에도 장원이네!"
        },
        {
          "speaker": "yulgok",
          "emotion": "smile",
          "text": "정말인가? 기다리는 동안 자꾸 문밖만 보았네."
        },
        {
          "speaker": "yulgok_friend",
          "emotion": "smile",
          "text": "자네도 결과가 궁금하기는 했군."
        },
        {
          "speaker": "yulgok",
          "emotion": "smile",
          "text": "애써 쓴 글인데 어찌 궁금하지 않겠나."
        },
        {
          "speaker": "yulgok_friend",
          "emotion": "curious",
          "text": "아홉 번이나 장원했다니, 이제 걱정이 없겠어."
        },
        {
          "speaker": "yulgok",
          "emotion": "thoughtful",
          "text": "시험에서는 글을 내면 되지만, 관청에서는 그 글대로 일을 해야 하지 않겠나."
        },
        {
          "speaker": "yulgok_friend",
          "emotion": "smile",
          "text": "기쁜 날에도 벌써 다음 걱정인가?"
        },
        {
          "speaker": "yulgok",
          "emotion": "smile",
          "text": "자네 말을 듣고 보니 그렇군. 오늘은 조금 기뻐해도 되겠지."
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "[이이는 1558년 별시에서 천도책으로 장원했고, 1564년 문과에 급제했다. 여러 과거의 장원 경력으로 구도장원공이라 불린다. 합격 소식 앞의 대화는 창작이다.]"
        },
        {
          "speaker": "yulgok",
          "emotion": "thoughtful",
          "text": "자네는 애쓴 일의 결과를 얻으면 먼저 기뻐하는가, 다음 일을 생각하는가?"
        }
      ],
      "historicalFacts": [
        "1558년 별시에서 천도책으로 장원했다.",
        "1564년 문과에 급제했으며 아홉 차례 장원한 경력으로 구도장원공이라 불린다."
      ],
      "storyGoal": "성취에 기쁜 사람과 새 책임이 걱정되는 사람의 마음을 함께 보여준다.",
      "tone": "안도와 웃음",
      "specialRules": [
        "구체적인 대사·표정·손동작·심리와 플레이어의 등장은 창작이며 실제 발언으로 인용하지 않는다.",
        "historicalFacts의 사실과 전승을 구분하고 미래 사건을 인물이 미리 아는 것처럼 말하지 않는다.",
        "플레이어는 목격자이며 역사적 결과를 바꾸지 않는다. 호감도는 신뢰를 뜻한다.",
        "선택지는 마지막 비내레이션 대사에 답한다. NPC 반응은 그 마지막 화자가 맡는다.",
        "보조 인물은 고정 대본을 따르며 별도 성격이나 구체적인 실존 정체를 임의로 만들지 않는다.",
        "아홉 번의 문과 최종시험에 합격한 것으로 설명하지 않는다. 초시 등 여러 단계의 시험 경력을 포함한 칭호다.",
        "천도책의 구체적인 문구를 창작해 원문으로 제시하지 않는다."
      ]
    },
    5: {
      "title": "[개혁가 율곡] 군사도 누군가의 가족입니다",
      "background": "court",
      "transition": {
        "title": "1583년 — 한양 조정",
        "text": "나라의 방비를 논하는 조정. 준비를 서두르는 마음에도 백성이 짊어질 무게가 걸린다."
      },
      "characters": [
        "yulgok",
        "seonjo",
        "kimmun"
      ],
      "script": [
        {
          "speaker": "narration",
          "emotion": null,
          "text": "(조정. 이이가 준비한 건의를 올린다.)"
        },
        {
          "speaker": "seonjo",
          "emotion": "serious",
          "text": "경은 무엇을 먼저 고쳐야 한다고 보는가?"
        },
        {
          "speaker": "yulgok",
          "emotion": "determined",
          "text": "사람을 기르고 재정을 마련하며 변방의 방비를 갖추어야 하옵니다."
        },
        {
          "speaker": "kimmun",
          "emotion": "neutral",
          "text": "군사를 기르려면 백성의 부담도 커질 것이옵니다."
        },
        {
          "speaker": "yulgok",
          "emotion": "worried",
          "text": "그 점을 가볍게 여길 수 없사옵니다. 군사도 누군가의 가족이옵니다."
        },
        {
          "speaker": "seonjo",
          "emotion": "serious",
          "text": "그렇다면 준비와 부담을 어찌 함께 살피겠는가?"
        },
        {
          "speaker": "yulgok",
          "emotion": "determined",
          "text": "먹을 것과 훈련, 맡길 사람을 함께 살펴야 하옵니다. 이름만 군사인 채로는 나라를 지키기 어렵사옵니다."
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "(물러난 뒤 이이가 잠시 걸음을 멈춘다.)"
        },
        {
          "speaker": "kimmun",
          "emotion": "neutral",
          "text": "마음이 무거우십니까?"
        },
        {
          "speaker": "yulgok",
          "emotion": "thoughtful",
          "text": "말로 청하는 것과 실제로 이루는 것 사이가 멀어서 그러오."
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "[1583년 병조판서 이이는 시무육조를 올리는 등 국방과 국정의 개혁을 건의했다. 인물들의 문답은 여러 논의를 압축한 창작이다.]"
        },
        {
          "speaker": "yulgok",
          "emotion": "worried",
          "text": "자네라면 급한 대비와 지금 살아가는 사람들의 부담을 어떻게 함께 살피겠는가?"
        }
      ],
      "historicalFacts": [
        "1583년 병조판서로서 시무육조를 올리는 등 국방 강화를 건의했다.",
        "이이는 국정 개혁을 주장하며 민생의 폐단에도 관심을 기울였다."
      ],
      "storyGoal": "준비의 필요성과 그 부담 사이에서 고민하는 관료의 책임감을 드러낸다.",
      "tone": "절박하지만 신중함",
      "specialRules": [
        "구체적인 대사·표정·손동작·심리와 플레이어의 등장은 창작이며 실제 발언으로 인용하지 않는다.",
        "historicalFacts의 사실과 전승을 구분하고 미래 사건을 인물이 미리 아는 것처럼 말하지 않는다.",
        "플레이어는 목격자이며 역사적 결과를 바꾸지 않는다. 호감도는 신뢰를 뜻한다.",
        "선택지는 마지막 비내레이션 대사에 답한다. NPC 반응은 그 마지막 화자가 맡는다.",
        "보조 인물은 고정 대본을 따르며 별도 성격이나 구체적인 실존 정체를 임의로 만들지 않는다.",
        "이 대사는 시무육조 원문이나 특정 경연의 실제 문답이 아니다.",
        "임진왜란의 시기·규모를 예언하거나 특정 인물 한 사람이 전쟁 대비를 전부 막았다고 묘사하지 않는다.",
        "십만양병설의 구체적 문답과 후대 전승은 이 장면의 확정 대사로 재현하지 않는다."
      ]
    }
  },
  "ending": "오죽헌의 아이는 자라서 나라의 일을 물었다. 그 사이에는 어머니를 그리는 마음과 답을 찾지 못한 시간, 성취의 기쁨도 있었다."
} as const;
