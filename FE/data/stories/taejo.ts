// 사실과 창작 대사를 구분한 태조 이성계 5챕터입니다.
export const taejoStory = {
  "id": "taejo",
  "title": "태조 이성계 — 활을 든 손, 왕좌의 무게",
  "location": "남원 운봉·위화도·개경·한양",
  "description": "활에 자신 있던 장수의 농담부터 회군의 선택, 새 왕의 부담, 한양 조성, 가족을 잃은 아버지의 침묵까지 따라가는 다섯 장면.",
  "sources": [
    {
      "title": "한국민족문화대백과사전 — 태조",
      "url": "https://encykorea.aks.ac.kr/Article/E0059033"
    },
    {
      "title": "국사편찬위원회 — 이성계의 황산대첩",
      "url": "https://contents.history.go.kr/front/hm/view.do?levelId=hm_054_0030"
    },
    {
      "title": "국사편찬위원회 — 최영의 요동 정벌과 이성계의 위화도 회군",
      "url": "https://contents.history.go.kr/front/hm/view.do?levelId=hm_055_0020"
    },
    {
      "title": "한국민족문화대백과사전 — 태종",
      "url": "https://encykorea.aks.ac.kr/Article/E0059039"
    },
    {
      "title": "국사편찬위원회 — 한양 천도와 궁궐 조성",
      "url": "https://contents.history.go.kr/front/ta/webBook.do?levelId=ta_p61r_0080_0010_0020&md=2"
    },
    {
      "title": "한국학중앙연구원 — 무인정사",
      "url": "https://waks.aks.ac.kr/rsh/dir/rview.aspx?dataID=AKS-2013-CKD-1240001_DIC%4000012783&rshID=AKS-2013-CKD-1240001"
    }
  ],
  "turns": {
    1: {
      "title": "[장수 이성계] 활만 잘 쏘면 되는 줄 알았느냐",
      "background": "camp",
      "showOpeningTransition": true,
      "transition": {
        "title": "1380년 — 남원 운봉 · 황산대첩 무렵의 군영",
        "text": "활을 든 장수에게 쏠리는 시선. 그러나 군영에는 활 한 자루로 해결할 수 없는 일도 쌓여 있다."
      },
      "characters": [
        "taejo",
        "kimmun"
      ],
      "script": [
        {
          "speaker": "narration",
          "emotion": null,
          "text": "(황산대첩 무렵. 이성계가 활을 살피고 있다. 부하가 다가온다.)"
        },
        {
          "speaker": "kimmun",
          "emotion": "smile",
          "text": "장군의 활솜씨를 이야기하는 이들이 많습니다."
        },
        {
          "speaker": "taejo",
          "emotion": "smile",
          "text": "그렇다고 활이 저절로 당겨지는 것은 아니지."
        },
        {
          "speaker": "kimmun",
          "emotion": "neutral",
          "text": "장군께서는 어려운 일도 쉽게 하시는 듯 보입니다."
        },
        {
          "speaker": "taejo",
          "emotion": "smile",
          "text": "그럼 군량과 말 먹이도 네 눈에는 쉬워 보이느냐?"
        },
        {
          "speaker": "kimmun",
          "emotion": "surprised",
          "text": "그것은… 쉽지 않습니다."
        },
        {
          "speaker": "taejo",
          "emotion": "thoughtful",
          "text": "나도 그렇다. 활만 잘 쏜다고 군사가 움직이는 것은 아니니."
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "(이성계가 활을 내려놓고 군영 쪽을 바라본다.)"
        },
        {
          "speaker": "taejo",
          "emotion": "worried",
          "text": "다친 이들과 지친 말부터 살펴라. 돌아갈 길도 남아 있다."
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "[1380년 이성계 등은 황산에서 왜구를 크게 물리쳤다. 활솜씨와 군공으로 알려진 장수의 대화·군영 행동은 창작이다.]"
        },
        {
          "speaker": "taejo",
          "emotion": "thoughtful",
          "text": "그대는 남들이 잘한다고 하는 일에도 어려움이 남아 있던가?"
        }
      ],
      "historicalFacts": [
        "1380년 이성계 등이 황산에서 왜구를 크게 물리쳤다.",
        "이성계는 활솜씨와 여러 군사적 공적으로 이름을 알렸다."
      ],
      "storyGoal": "잘하는 일에 대한 자부심과 군사를 돌보는 업무의 부담을 소박한 농담으로 보여준다.",
      "tone": "여유 있는 농담과 장수의 책임",
      "specialRules": [
        "대사·감정·손짓·구체적 업무 행동과 플레이어의 등장은 역사적 상황을 바탕으로 한 창작이다. 실제 발언이나 기록된 심리로 인용하지 않는다.",
        "사건과 연도는 historicalFacts에 따라 설명한다. 설화·정당화 서사·추정과 확인되는 사건을 구분한다.",
        "선택지는 마지막 이성계 대사에 답하며 NPC 반응도 taejo가 맡는다.",
        "플레이어의 선택과 호감도는 신뢰를 나타내며 실제 역사적 결과를 바꾸지 않는다.",
        "kimmun은 장면마다 부하·신하·시종을 맡는 공용 연출 역할이며 동일한 실존 인물로 단정하지 않는다.",
        "유머는 일상적 대화에만 사용하며 전쟁 피해와 가족의 죽음을 웃음거리로 삼지 않는다.",
        "생전에는 자신의 묘호 태조나 후대의 평가를 미리 알지 못한다.",
        "특정 적장의 피로 바위가 물들었다는 설화나 초인적인 명중 횟수를 확정하지 않는다.",
        "부하를 챙기는 세부와 농담은 기록된 일화가 아니다."
      ]
    },
    2: {
      "title": "[위화도 회군] 앞으로도, 돌아가도",
      "background": "wihwado",
      "transition": {
        "title": "1388년 — 압록강 위화도",
        "text": "비와 불어난 강물 앞에서 멈춘 군대. 방향을 돌리는 일 또한 새로운 싸움으로 이어질 수 있다."
      },
      "characters": [
        "taejo",
        "kimmun"
      ],
      "script": [
        {
          "speaker": "narration",
          "emotion": null,
          "text": "(비가 내린 군영. 젖은 길과 강물을 살피던 이성계에게 보고가 올라온다.)"
        },
        {
          "speaker": "kimmun",
          "emotion": "neutral",
          "text": "군사들이 지쳐 있습니다. 강을 건너기도 어렵습니다."
        },
        {
          "speaker": "taejo",
          "emotion": "worried",
          "text": "요동으로 나아가는 일이 마땅치 않다고 아뢰었건만…."
        },
        {
          "speaker": "kimmun",
          "emotion": "neutral",
          "text": "명을 기다려야 하지 않겠습니까?"
        },
        {
          "speaker": "taejo",
          "emotion": "thoughtful",
          "text": "기다리는 동안에도 군사의 사정은 달라진다."
        },
        {
          "speaker": "kimmun",
          "emotion": "surprised",
          "text": "돌아가실 생각이십니까?"
        },
        {
          "speaker": "taejo",
          "emotion": "determined",
          "text": "군사를 돌릴 길을 의논해야겠다."
        },
        {
          "speaker": "kimmun",
          "emotion": "neutral",
          "text": "그 뒤에는 조정과 맞서게 될 것입니다."
        },
        {
          "speaker": "taejo",
          "emotion": "worried",
          "text": "안다. 돌아간다고 칼을 쓸 일이 사라지는 것은 아니지."
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "[1388년 이성계와 조민수 등은 위화도에서 군사를 돌려 개경으로 향했다. 회군은 최영 세력의 축출과 정국의 변동으로 이어졌다. 문답은 창작이다.]"
        },
        {
          "speaker": "taejo",
          "emotion": "thoughtful",
          "text": "어느 쪽이든 대가를 치러야 한다면, 그대는 무엇을 먼저 살피겠는가?"
        }
      ],
      "historicalFacts": [
        "1388년 요동 정벌에 반대하던 이성계가 조민수 등과 위화도에서 회군했다.",
        "회군 뒤 최영 세력이 축출되고 고려의 권력 구도가 바뀌었다."
      ],
      "storyGoal": "군사적 판단과 권력 변동을 함께 다루며 선택 앞의 부담을 드러낸다.",
      "tone": "긴장과 결단",
      "specialRules": [
        "대사·감정·손짓·구체적 업무 행동과 플레이어의 등장은 역사적 상황을 바탕으로 한 창작이다. 실제 발언이나 기록된 심리로 인용하지 않는다.",
        "사건과 연도는 historicalFacts에 따라 설명한다. 설화·정당화 서사·추정과 확인되는 사건을 구분한다.",
        "선택지는 마지막 이성계 대사에 답하며 NPC 반응도 taejo가 맡는다.",
        "플레이어의 선택과 호감도는 신뢰를 나타내며 실제 역사적 결과를 바꾸지 않는다.",
        "kimmun은 장면마다 부하·신하·시종을 맡는 공용 연출 역할이며 동일한 실존 인물로 단정하지 않는다.",
        "유머는 일상적 대화에만 사용하며 전쟁 피해와 가족의 죽음을 웃음거리로 삼지 않는다.",
        "생전에는 자신의 묘호 태조나 후대의 평가를 미리 알지 못한다.",
        "네 가지 불가론을 들었다면 후대 명칭과 원문의 취지를 구분하고 창작 대사를 실제 상소 원문으로 소개하지 않는다.",
        "회군을 오직 백성을 위한 무혈 결정이나 조선 건국이 이미 예정된 사건으로 단순화하지 않는다."
      ]
    },
    3: {
      "title": "[새 왕조의 시작] 왕이 되면 끝나는 줄 알았느냐",
      "background": "gaegyeong",
      "transition": {
        "title": "1392년 — 개경 · 즉위 이후",
        "text": "왕위에 오른 뒤에도 보고는 끝나지 않는다. 새로운 시작 앞에서 결정의 무게가 달라진다."
      },
      "characters": [
        "taejo",
        "kimmun"
      ],
      "script": [
        {
          "speaker": "narration",
          "emotion": null,
          "text": "(새 왕이 된 이성계 앞에 문서가 놓인다. 신하가 답을 기다린다.)"
        },
        {
          "speaker": "kimmun",
          "emotion": "neutral",
          "text": "전하, 살피실 일이 더 있사옵니다."
        },
        {
          "speaker": "taejo",
          "emotion": "thoughtful",
          "text": "더 있다 하였느냐?"
        },
        {
          "speaker": "kimmun",
          "emotion": "neutral",
          "text": "아직 아뢰지 못한 것도 있사옵니다."
        },
        {
          "speaker": "taejo",
          "emotion": "smile",
          "text": "군영에서 보고를 받던 때와 크게 다르지 않구나."
        },
        {
          "speaker": "kimmun",
          "emotion": "smile",
          "text": "이제 전하께서 다스리시는 나라의 일이옵니다."
        },
        {
          "speaker": "taejo",
          "emotion": "thoughtful",
          "text": "그러니 하나를 정하기도 더 무겁다."
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "(이성계가 웃음을 거두고 문서를 다시 펼친다.)"
        },
        {
          "speaker": "taejo",
          "emotion": "worried",
          "text": "새 왕이 섰다 해서 사람들의 살림이 저절로 나아지지는 않을 터."
        },
        {
          "speaker": "kimmun",
          "emotion": "neutral",
          "text": "무엇부터 아뢰겠사옵니까?"
        },
        {
          "speaker": "taejo",
          "emotion": "determined",
          "text": "결정을 기다리며 곤란을 겪는 일이 무엇인지 먼저 말하라."
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "[1392년 공양왕이 폐위되고 이성계가 즉위했다. 조선이라는 국호는 1393년 채택되었다. 새 왕 앞의 문서와 문답은 창작이다.]"
        },
        {
          "speaker": "taejo",
          "emotion": "thoughtful",
          "text": "그대도 바라던 자리에 오른 뒤 오히려 마음이 무거워진 적이 있는가?"
        }
      ],
      "historicalFacts": [
        "1392년 공양왕이 폐위된 뒤 이성계가 새 왕조의 왕으로 즉위했다.",
        "조선 국호는 1393년 채택되었다."
      ],
      "storyGoal": "성취의 기쁨 곁에 정치적 정당성과 일상의 행정을 감당해야 하는 부담을 놓는다.",
      "tone": "작은 웃음과 새 책임",
      "specialRules": [
        "대사·감정·손짓·구체적 업무 행동과 플레이어의 등장은 역사적 상황을 바탕으로 한 창작이다. 실제 발언이나 기록된 심리로 인용하지 않는다.",
        "사건과 연도는 historicalFacts에 따라 설명한다. 설화·정당화 서사·추정과 확인되는 사건을 구분한다.",
        "선택지는 마지막 이성계 대사에 답하며 NPC 반응도 taejo가 맡는다.",
        "플레이어의 선택과 호감도는 신뢰를 나타내며 실제 역사적 결과를 바꾸지 않는다.",
        "kimmun은 장면마다 부하·신하·시종을 맡는 공용 연출 역할이며 동일한 실존 인물로 단정하지 않는다.",
        "유머는 일상적 대화에만 사용하며 전쟁 피해와 가족의 죽음을 웃음거리로 삼지 않는다.",
        "생전에는 자신의 묘호 태조나 후대의 평가를 미리 알지 못한다.",
        "즉위 장소를 경복궁으로 쓰지 않는다. 경복궁은 아직 세워지지 않았다.",
        "모든 백성이 건국에 찬성했다거나 고려가 자연스럽게 평화롭게 끝났다고 말하지 않는다.",
        "1392년 즉위 때 국호 조선을 이미 공식 확정한 문답을 만들지 않는다."
      ]
    },
    4: {
      "title": "[한양과 경복궁] 지도 밖에도 사람들이 산다",
      "background": "hanyang",
      "transition": {
        "title": "1394~1395년 — 한양 · 새 도읍과 경복궁 조성",
        "text": "새 도읍에 길과 건물이 들어선다. 지도 위의 선은 사람들의 손으로 자리를 잡아간다."
      },
      "characters": [
        "taejo",
        "kimmun"
      ],
      "script": [
        {
          "speaker": "narration",
          "emotion": null,
          "text": "(한양. 새 도읍의 일을 보고받던 이성계가 도면 위에 손을 멈춘다.)"
        },
        {
          "speaker": "kimmun",
          "emotion": "neutral",
          "text": "궁궐과 여러 시설을 갖추는 일이 진행 중이옵니다."
        },
        {
          "speaker": "taejo",
          "emotion": "thoughtful",
          "text": "도면으로 보면 길이 반듯하구나."
        },
        {
          "speaker": "kimmun",
          "emotion": "smile",
          "text": "새 도읍의 모습을 갖추어가고 있사옵니다."
        },
        {
          "speaker": "taejo",
          "emotion": "worried",
          "text": "여기서는 가깝게 보이는데 실제로 오가면 다를 것이다."
        },
        {
          "speaker": "kimmun",
          "emotion": "neutral",
          "text": "공역에 드는 인력과 물자를 살피겠사옵니다."
        },
        {
          "speaker": "taejo",
          "emotion": "thoughtful",
          "text": "그리하라. 건물만 세우는 일이 아니니."
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "(1395년 경복궁이 세워진 뒤. 이성계가 궁궐 쪽으로 시선을 돌린다.)"
        },
        {
          "speaker": "kimmun",
          "emotion": "neutral",
          "text": "궁궐의 모습을 보시니 어떠하시옵니까?"
        },
        {
          "speaker": "taejo",
          "emotion": "thoughtful",
          "text": "새 집을 얻었으나 할 일은 더 늘었구나."
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "[1394년 한양으로 천도했고 1395년 경복궁과 종묘 등이 조성되었다. 도면과 공역을 둘러싼 대화는 창작이다.]"
        },
        {
          "speaker": "taejo",
          "emotion": "worried",
          "text": "크게 새로 시작할 때, 그 일을 감당할 사람들의 형편은 어떻게 살펴야 하겠는가?"
        }
      ],
      "historicalFacts": [
        "1394년 도읍을 한양으로 옮겼다.",
        "1395년 경복궁과 종묘 등이 조성되었다."
      ],
      "storyGoal": "새 도읍을 세운 성취와 실제 조성에 드는 부담을 함께 보여준다.",
      "tone": "기대와 현실적인 걱정",
      "specialRules": [
        "대사·감정·손짓·구체적 업무 행동과 플레이어의 등장은 역사적 상황을 바탕으로 한 창작이다. 실제 발언이나 기록된 심리로 인용하지 않는다.",
        "사건과 연도는 historicalFacts에 따라 설명한다. 설화·정당화 서사·추정과 확인되는 사건을 구분한다.",
        "선택지는 마지막 이성계 대사에 답하며 NPC 반응도 taejo가 맡는다.",
        "플레이어의 선택과 호감도는 신뢰를 나타내며 실제 역사적 결과를 바꾸지 않는다.",
        "kimmun은 장면마다 부하·신하·시종을 맡는 공용 연출 역할이며 동일한 실존 인물로 단정하지 않는다.",
        "유머는 일상적 대화에만 사용하며 전쟁 피해와 가족의 죽음을 웃음거리로 삼지 않는다.",
        "생전에는 자신의 묘호 태조나 후대의 평가를 미리 알지 못한다.",
        "공역 부담을 염려하는 문답은 창작이며 실제 피해가 없었다거나 태조가 공역을 전면 중지했다고 꾸미지 않는다.",
        "현재 경복궁 사진은 분위기용 자료이며 1395년 건축의 정확한 복원이 아니다."
      ]
    },
    5: {
      "title": "[왕좌와 가족] 오늘은 말을 줄이고 싶구나",
      "background": "palace_room",
      "transition": {
        "title": "1398년 · 제1차 왕자의 난 이후 — 한양 · 궁중의 한 방",
        "text": "왕실의 칼끝이 가족을 향한 뒤. 나라를 세운 사람 앞에도 대답 없는 침묵이 남는다."
      },
      "characters": [
        "taejo",
        "kimmun"
      ],
      "script": [
        {
          "speaker": "narration",
          "emotion": null,
          "text": "(왕자의 난 이후. 이성계 앞에 보고를 마친 시종이 물러서지 못하고 서 있다.)"
        },
        {
          "speaker": "kimmun",
          "emotion": "neutral",
          "text": "잠시 쉬시겠사옵니까?"
        },
        {
          "speaker": "taejo",
          "emotion": "sad",
          "text": "쉬면 좀 달라지겠느냐."
        },
        {
          "speaker": "kimmun",
          "emotion": "neutral",
          "text": "……."
        },
        {
          "speaker": "taejo",
          "emotion": "sad",
          "text": "이름을 부르면 대답하던 아이들인데…."
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "(이성계가 시선을 내린다. 시종은 말을 고르다 멈춘다.)"
        },
        {
          "speaker": "kimmun",
          "emotion": "neutral",
          "text": "더 아뢰어야 할 일은 뒤로 미루겠사옵니다."
        },
        {
          "speaker": "taejo",
          "emotion": "angry",
          "text": "누구의 뜻이었는지, 누가 옳았는지…. 그런 말들이 오늘도 이어지겠지."
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "(긴 침묵이 흐른다.)"
        },
        {
          "speaker": "taejo",
          "emotion": "sad",
          "text": "오늘은 말을 줄이고 싶구나."
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "[1398년 제1차 왕자의 난으로 정도전과 이방석·이방번 등이 죽었다. 태조는 그해 이방과에게 양위했다. 방 안의 대화와 심리 표현은 창작이다.]"
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "[ENDING — 고려의 장수는 조선의 왕이 되었다. 그러나 왕좌가 그의 선택과 가족의 갈등까지 지켜주지는 못했다.]"
        },
        {
          "speaker": "taejo",
          "emotion": "sad",
          "text": "그대도 말로 다 할 수 없는 날에는, 그저 곁에 있어줄 수 있겠는가?"
        }
      ],
      "historicalFacts": [
        "1398년 이방원 세력의 제1차 왕자의 난으로 정도전과 이방석·이방번 등이 죽었다.",
        "태조는 같은 해 이방과에게 양위했고 이방과는 정종이 되었다."
      ],
      "storyGoal": "왕조 창업자이면서 자식을 잃은 아버지의 모습을 보여주되 그의 정치적 선택과 갈등을 지우지 않는다.",
      "tone": "상실과 가라앉지 않은 분노",
      "specialRules": [
        "대사·감정·손짓·구체적 업무 행동과 플레이어의 등장은 역사적 상황을 바탕으로 한 창작이다. 실제 발언이나 기록된 심리로 인용하지 않는다.",
        "사건과 연도는 historicalFacts에 따라 설명한다. 설화·정당화 서사·추정과 확인되는 사건을 구분한다.",
        "선택지는 마지막 이성계 대사에 답하며 NPC 반응도 taejo가 맡는다.",
        "플레이어의 선택과 호감도는 신뢰를 나타내며 실제 역사적 결과를 바꾸지 않는다.",
        "kimmun은 장면마다 부하·신하·시종을 맡는 공용 연출 역할이며 동일한 실존 인물로 단정하지 않는다.",
        "유머는 일상적 대화에만 사용하며 전쟁 피해와 가족의 죽음을 웃음거리로 삼지 않는다.",
        "생전에는 자신의 묘호 태조나 후대의 평가를 미리 알지 못한다.",
        "이방원은 이 시점 아직 왕 태종이 아니다. 태조가 곧바로 이방원에게 양위했다고 쓰지 않는다.",
        "함흥차사·함흥 활 공격·극적인 부자 화해 전승을 확인된 사실로 재현하지 않는다.",
        "이 대사를 실제 참회나 모든 정치적 잘못에 대한 자백으로 해석하지 않는다."
      ]
    }
  }
} as const;
