// 역사적 사건과 창작 대사·내면을 구분한 5챕터 게임 시나리오입니다.
export const heungseonStory = {
  id: "heungseon",
  title: "흥선대원군 — 굳은 뜻, 흔들리는 마음",
  location: "한양·운현궁·석파정",
  description: "불우한 왕족, 어린 왕의 아버지, 강한 개혁가와 난초를 그리는 사람. 이하응의 선택과 한계를 다섯 장면에서 만난다.",
  sources: [
    {
      title: "한국민족문화대백과사전 — 이하응",
      url: "https://encykorea.aks.ac.kr/Article/E0046384"
    },
    {
      title: "국사편찬위원회 우리역사넷 — 경복궁 중건",
      url: "https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_i300500"
    },
    {
      title: "국사편찬위원회 신편한국사 — 대원군의 내정개혁과 대외정책",
      url: "https://contents.history.go.kr/data/pdf/nh/nh_037_0040.pdf"
    },
    {
      title: "서울특별시 — 난을 그리는 흥선대원군",
      url: "https://news.seoul.go.kr/culture/archives/60533"
    }
  ],
  turns: {
    1: {
      title: "[불우한 왕족] 웃어넘긴다고 아프지 않은 것은",
      background: "palace",
      showOpeningTransition: true,
      transition: {
        title: "철종 재위기 — 한양의 한 집",
        text: "궁도령이라 불리던 왕족 이하응. 웃음 뒤에 숨긴 마음을 쉽게 드러내지 않는다."
      },
      characters: [
        "heungseon",
        "kimmun"
      ],
      script: [
        {
          speaker: "narration",
          emotion: null,
          text: "(한양. 이하응이 옷자락의 먼지를 턴다. 지인 역할의 신하가 조심스레 말을 꺼낸다.)"
        },
        {
          speaker: "kimmun",
          emotion: "neutral",
          text: "흥선군, 사람들이 또 궁도령이라 비웃습니다."
        },
        {
          speaker: "heungseon",
          emotion: "serious",
          text: "내 귀에도 들리네. 굳이 옮겨주지 않아도 말일세."
        },
        {
          speaker: "kimmun",
          emotion: "surprised",
          text: "그런 말을 듣고도 웃으실 수 있습니까?"
        },
        {
          speaker: "heungseon",
          emotion: "warm",
          text: "찡그린다고 저들의 말이 멎겠는가."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(희미하던 웃음이 가신다. 이하응이 털던 옷자락을 내려놓는다.)"
        },
        {
          speaker: "heungseon",
          emotion: "hurt",
          text: "웃어넘긴다고 해서 아무렇지도 않은 것은 아니네."
        },
        {
          speaker: "kimmun",
          emotion: "neutral",
          text: "언제까지 참으시렵니까?"
        },
        {
          speaker: "heungseon",
          emotion: "serious",
          text: "지금은 버틸 때라 생각하네. 집에 돌아가면 나를 바라보는 사람들도 있으니."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "[이하응은 세도정치 아래 불우한 처지에 있었으며 궁도령이라는 별칭으로 불렸다. 기회를 기다리는 속마음과 이 대화는 창작이다.]"
        },
        {
          speaker: "heungseon",
          emotion: "serious",
          text: "자네라면 어떻겠는가. 당장 맞서는 것과 때를 기다리는 것 중 무엇이 더 어렵겠는가?"
        }
      ],
      historicalFacts: [
        "이하응은 1820년에 태어나 1898년에 사망했다.",
        "철종 재위기 세도정치 아래 불우한 왕족으로 지냈고 궁도령이라 불리기도 했다.",
        "조대비 측과 관계를 맺고 왕위 계승에 관여했다."
      ],
      storyGoal: "모욕을 견디는 자존심과 가족을 의식하는 마음을 함께 보여준다. 이후의 모든 일이 이미 계획된 것처럼 만들지 않는다.",
      tone: "절제된 유머와 드러나지 않는 상처",
      specialRules: [
        "대사·감정·손짓과 플레이어의 등장은 역사적 상황을 바탕으로 한 창작 연출이다. 실제 인물의 발언이나 기록된 심리로 단정하지 않는다.",
        "역사적 사건과 날짜는 historicalFacts에 있는 것만 사용한다. 불확실한 동기와 전승은 확정하지 않는다.",
        "플레이어는 현대에서 온 목격자다. 선택과 호감도는 신뢰를 나타내며 실제 역사나 정책 결과를 바꾸지 않는다.",
        "마지막 흥선대원군 대사에 대한 선택지를 만들고 NPC 반응은 heungseon이 직접 맡는다.",
        "흥선대원군을 무조건적인 구국 영웅이나 단순한 악역으로 만들지 않는다. 인간적 장면이 정책의 피해를 정당화하지 않는다.",
        "kimmun은 장면별 지인·신하·측근을 맡는 공용 연출 캐릭터이며 동일한 실존 인물이 시대를 넘나드는 것으로 말하지 않는다.",
        "이 시기의 호칭은 흥선군이다. 구걸과 파락호 생활의 모든 행동이 정교한 위장 작전이었다고 단정하지 않는다.",
        "먼지를 털고 가족을 떠올리는 행동은 인간적인 상황을 위한 창작이다."
      ]
    },
    2: {
      title: "[운현궁의 봄] 아버지도 마음을 다잡는 중이다",
      background: "room",
      transition: {
        title: "1863년 — 운현궁 일대",
        text: "둘째 아들 명복에게 왕위 계승의 소식이 전해진다. 왕의 아버지가 될 이하응도 마음을 다잡는다."
      },
      characters: [
        "heungseon",
        "young_gojong"
      ],
      script: [
        {
          speaker: "narration",
          emotion: null,
          text: "(왕위 계승 소식을 들은 뒤의 집 안. 명복이 아버지의 옷소매를 만지작거린다. 장소와 대화는 압축한 연출이다.)"
        },
        {
          speaker: "young_gojong",
          emotion: "surprised",
          text: "아버님, 제가 정말 임금이 되는 것입니까?"
        },
        {
          speaker: "heungseon",
          emotion: "serious",
          text: "그래. 이제 많은 것을 배우게 될 게다."
        },
        {
          speaker: "young_gojong",
          emotion: "fear",
          text: "사람들이 저만 바라볼 텐데… 제가 잘못하면 어쩌지요?"
        },
        {
          speaker: "heungseon",
          emotion: "warm",
          text: "모르는 것을 묻고, 잘못한 것은 고쳐야지. 처음부터 다 알 수는 없다."
        },
        {
          speaker: "young_gojong",
          emotion: "rely",
          text: "아버님은 두렵지 않으십니까?"
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(이하응이 바로 답하지 못하다가 아들의 손 가까이 자신의 손을 놓는다.)"
        },
        {
          speaker: "heungseon",
          emotion: "serious",
          text: "나도 마음을 다잡는 중이다."
        },
        {
          speaker: "heungseon",
          emotion: "warm",
          text: "네 곁에 있으마. 오늘은 우선 숨부터 천천히 쉬어라."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "[1863년 — 명복이 고종으로 즉위하고 이하응은 흥선대원군에 봉해졌다. 조대비가 수렴청정했고 대원군은 국정에 큰 영향력을 행사했다.]"
        },
        {
          speaker: "heungseon",
          emotion: "serious",
          text: "자네는 곁에서 보니 어떠한가. 도와주려는 마음과 대신 결정하려는 마음은 어떻게 구분해야 하겠는가?"
        }
      ],
      historicalFacts: [
        "1863년 철종이 후사 없이 사망하자 조대비의 결정으로 이하응의 둘째 아들 명복이 고종으로 즉위했다.",
        "고종은 당시 세는나이 열두 살이었다. 이하응은 흥선대원군에 봉해졌다.",
        "초기에는 조대비가 수렴청정했고 대원군이 국정에 실질적인 영향력을 행사했다."
      ],
      storyGoal: "어린 왕을 안심시키는 아버지와 권력의 중심에 서게 된 사람의 긴장을 함께 그린다.",
      tone: "긴장과 다정한 부자 관계",
      specialRules: [
        "대사·감정·손짓과 플레이어의 등장은 역사적 상황을 바탕으로 한 창작 연출이다. 실제 인물의 발언이나 기록된 심리로 단정하지 않는다.",
        "역사적 사건과 날짜는 historicalFacts에 있는 것만 사용한다. 불확실한 동기와 전승은 확정하지 않는다.",
        "플레이어는 현대에서 온 목격자다. 선택과 호감도는 신뢰를 나타내며 실제 역사나 정책 결과를 바꾸지 않는다.",
        "마지막 흥선대원군 대사에 대한 선택지를 만들고 NPC 반응은 heungseon이 직접 맡는다.",
        "흥선대원군을 무조건적인 구국 영웅이나 단순한 악역으로 만들지 않는다. 인간적 장면이 정책의 피해를 정당화하지 않는다.",
        "kimmun은 장면별 지인·신하·측근을 맡는 공용 연출 캐릭터이며 동일한 실존 인물이 시대를 넘나드는 것으로 말하지 않는다.",
        "운현궁에서 소식을 들은 세부 과정과 아버지의 두려움은 창작이다. 실제 즉위식 장소로 운현궁을 제시하지 않는다.",
        "대원군이 국왕이나 공식적인 수렴청정 주체였다고 말하지 않는다."
      ]
    },
    3: {
      title: "[개혁의 무게] 세우는 뜻과 짊어지는 사람",
      background: "room",
      transition: {
        title: "고종 초년 — 운현궁 노안당",
        text: "바꾸려는 뜻이 국정을 움직인다. 그러나 큰 사업의 비용은 다른 사람들의 삶에도 닿는다."
      },
      characters: [
        "heungseon",
        "kimmun"
      ],
      script: [
        {
          speaker: "narration",
          emotion: null,
          text: "(운현궁 노안당. 정책을 논의하는 신하가 보고서를 펼친다. 여러 해의 개혁을 한 장면으로 압축한다.)"
        },
        {
          speaker: "kimmun",
          emotion: "neutral",
          text: "서원 정리에 반발하는 목소리가 큽니다."
        },
        {
          speaker: "heungseon",
          emotion: "stern",
          text: "오래되었다는 이유만으로 폐단까지 지킬 수는 없소."
        },
        {
          speaker: "kimmun",
          emotion: "neutral",
          text: "경복궁 공사에 드는 돈과 부역도 백성에게 무겁습니다."
        },
        {
          speaker: "heungseon",
          emotion: "serious",
          text: "왕실의 기틀을 바로 세우려는 것이오."
        },
        {
          speaker: "kimmun",
          emotion: "neutral",
          text: "그 뜻을 세우는 동안 당장의 살림이 무너진다는 호소도 살펴야 하옵니다."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(대원군이 보고서 위에 손을 얹는다. 쉽게 넘기던 장이 잠시 멎는다.)"
        },
        {
          speaker: "heungseon",
          emotion: "serious",
          text: "……그 호소도 여기 놓고 가시오."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "[서원 정리와 왕권 강화가 추진되었다. 한편 경복궁 중건과 원납전·부역 등은 민생에 부담을 주었다. 이 침묵이 실제 반성의 기록이라는 뜻은 아니다.]"
        },
        {
          speaker: "heungseon",
          emotion: "serious",
          text: "자네라면 큰일을 서두를 때 무엇으로 멈출 때를 판단하겠는가?"
        }
      ],
      historicalFacts: [
        "대원군 집권기 서원 정리, 비변사 폐지 등 왕권 강화 정책이 추진되었다.",
        "경복궁 중건을 추진하는 과정에서 원납전 징수와 부역 등으로 민생의 부담이 커졌다."
      ],
      storyGoal: "개혁의 추진력과 비용을 함께 드러낸다. 보고를 듣는 작은 멈춤은 창작이며 정책 결과를 미화하지 않는다.",
      tone: "단호한 논의와 불편한 침묵",
      specialRules: [
        "대사·감정·손짓과 플레이어의 등장은 역사적 상황을 바탕으로 한 창작 연출이다. 실제 인물의 발언이나 기록된 심리로 단정하지 않는다.",
        "역사적 사건과 날짜는 historicalFacts에 있는 것만 사용한다. 불확실한 동기와 전승은 확정하지 않는다.",
        "플레이어는 현대에서 온 목격자다. 선택과 호감도는 신뢰를 나타내며 실제 역사나 정책 결과를 바꾸지 않는다.",
        "마지막 흥선대원군 대사에 대한 선택지를 만들고 NPC 반응은 heungseon이 직접 맡는다.",
        "흥선대원군을 무조건적인 구국 영웅이나 단순한 악역으로 만들지 않는다. 인간적 장면이 정책의 피해를 정당화하지 않는다.",
        "kimmun은 장면별 지인·신하·측근을 맡는 공용 연출 캐릭터이며 동일한 실존 인물이 시대를 넘나드는 것으로 말하지 않는다.",
        "장면은 여러 해의 정책을 압축한다. 대원군이 모든 서원을 없앴다고 말하지 않는다.",
        "보고서를 듣고 정책을 취소하거나 피해를 해결했다는 결말을 만들지 않는다.",
        "경복궁 중건의 목적과 당백전의 모든 발행 목적을 단일 원인으로 동일시하지 않는다."
      ]
    },
    4: {
      title: "[바다 너머의 위협] 지킨다는 말의 무게",
      background: "room",
      transition: {
        title: "1866~1871년 — 서양 세력과 충돌하던 조선",
        text: "강화의 전황이 전해진다. 위협을 막겠다는 강한 말 뒤에도 피할 수 없는 피해가 남는다."
      },
      characters: [
        "heungseon",
        "kimmun"
      ],
      script: [
        {
          speaker: "narration",
          emotion: null,
          text: "(전황과 피해 보고가 놓인 방. 병인양요와 신미양요 시기의 긴장을 압축해 보여준다.)"
        },
        {
          speaker: "kimmun",
          emotion: "surprised",
          text: "대감, 바다에서 온 군함과 충돌한 소식입니다."
        },
        {
          speaker: "heungseon",
          emotion: "stern",
          text: "무력을 앞세운 요구를 그대로 받아들일 수는 없소."
        },
        {
          speaker: "kimmun",
          emotion: "neutral",
          text: "싸움이 길어지면 군사와 백성의 피해도 커집니다."
        },
        {
          speaker: "heungseon",
          emotion: "serious",
          text: "알고 있소. 그래서 가볍게 내릴 결정이 아니라는 것이오."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(신하가 잠시 물러난다. 대원군은 보고서에서 눈을 떼지 않는다.)"
        },
        {
          speaker: "heungseon",
          emotion: "serious",
          text: "막아야 한다는 말은 짧지만… 그 말을 받드는 이들에게는 목숨이 걸려 있지."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "[대원군 집권기에는 병인박해와 병인양요, 신미양요가 일어났다. 천주교 탄압으로 많은 피해가 발생했고 통상수교 거부 정책도 지속되었다.]"
        },
        {
          speaker: "heungseon",
          emotion: "serious",
          text: "자네는 어떻게 생각하오. 위협을 막으려는 뜻만으로 그 선택의 결과까지 설명할 수 있겠소?"
        }
      ],
      historicalFacts: [
        "1866년 천주교에 대한 병인박해가 이루어졌고 많은 희생자가 발생했다.",
        "1866년 프랑스와의 병인양요, 1871년 미국과의 신미양요가 일어났다.",
        "대원군은 통상수교 거부 정책을 유지했다."
      ],
      storyGoal: "대외 위협을 경계하는 판단과 사람이 치르는 대가를 함께 본다. 개인의 걱정을 창작하면서 정책의 피해를 지우지 않는다.",
      tone: "무거운 경계와 긴장",
      specialRules: [
        "대사·감정·손짓과 플레이어의 등장은 역사적 상황을 바탕으로 한 창작 연출이다. 실제 인물의 발언이나 기록된 심리로 단정하지 않는다.",
        "역사적 사건과 날짜는 historicalFacts에 있는 것만 사용한다. 불확실한 동기와 전승은 확정하지 않는다.",
        "플레이어는 현대에서 온 목격자다. 선택과 호감도는 신뢰를 나타내며 실제 역사나 정책 결과를 바꾸지 않는다.",
        "마지막 흥선대원군 대사에 대한 선택지를 만들고 NPC 반응은 heungseon이 직접 맡는다.",
        "흥선대원군을 무조건적인 구국 영웅이나 단순한 악역으로 만들지 않는다. 인간적 장면이 정책의 피해를 정당화하지 않는다.",
        "kimmun은 장면별 지인·신하·측근을 맡는 공용 연출 캐릭터이며 동일한 실존 인물이 시대를 넘나드는 것으로 말하지 않는다.",
        "다른 해의 사건을 같은 날 일어난 것으로 섞지 않는다. 특정 전투의 실제 보고 내용을 새로 만들지 않는다.",
        "천주교 박해를 정당방위와 동일시하거나 종교적 소수자를 비하하지 않는다.",
        "피해를 걱정하는 대사는 창작이다. 실제로 후회하거나 정책을 바꿨다고 단정하지 않는다.",
        "장난 선택지는 희생이나 종교를 조롱하지 않는 조심스러운 반응으로 제한한다."
      ]
    },
    5: {
      title: "[석파의 붓] 이 한 획도 내 뜻 같지 않구나",
      background: "garden",
      transition: {
        title: "생애 후반 — 석파정의 한 방",
        text: "정국이 여러 번 뒤집힌 뒤에도 이하응은 붓을 들었다. 오늘은 난초 한 잎이 종이 위로 뻗는다."
      },
      characters: [
        "heungseon",
        "kimmun"
      ],
      script: [
        {
          speaker: "narration",
          emotion: null,
          text: "(석파정에 머무는 날을 상상한 장면. 이하응이 먹을 묻힌 붓을 종이 위에 댄다.)"
        },
        {
          speaker: "kimmun",
          emotion: "neutral",
          text: "오늘도 난초를 그리십니까?"
        },
        {
          speaker: "heungseon",
          emotion: "warm",
          text: "그래. 몇 획이면 될 듯 보이지?"
        },
        {
          speaker: "kimmun",
          emotion: "smile",
          text: "대감께서 그리시면 어렵지 않으실 듯합니다."
        },
        {
          speaker: "heungseon",
          emotion: "warm",
          text: "그렇게 보인다면 자네가 한 잎 그려보게."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(붓을 옮기던 이하응이 선 끝을 보고 작게 웃는다.)"
        },
        {
          speaker: "heungseon",
          emotion: "serious",
          text: "이 한 획도 내 뜻대로 되지 않는군. 힘을 너무 주었어."
        },
        {
          speaker: "kimmun",
          emotion: "neutral",
          text: "생각이 많으신 날입니까?"
        },
        {
          speaker: "heungseon",
          emotion: "hurt",
          text: "아들이 내 뜻과 다른 길을 간다고 했을 때도… 내 손을 먼저 거두기는 어려웠지."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "[1873년 고종의 친정 이후에도 대원군은 정국에 여러 차례 관여했다. 서화, 특히 난초 그림으로도 이름을 남겼고 석파라는 호를 썼다.]"
        },
        {
          speaker: "heungseon",
          emotion: "serious",
          text: "이 그림으로 지난 일이 달라지는 것은 아니네. 오늘은 선 하나를 다시 살펴보려 하네."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "불우한 왕족에서 권력의 중심으로, 그리고 난초를 그리는 석파로. 그의 삶에는 강한 뜻과 그 뜻이 남긴 그늘이 함께 있었다."
        },
        {
          speaker: "heungseon",
          emotion: "warm",
          text: "자네에게도 마음이 복잡할 때 손으로 해보는 일이 있는가?"
        }
      ],
      historicalFacts: [
        "1873년 고종의 친정 이후 대원군이 정국의 주도권을 잃었다.",
        "이후에도 임오군란 등 격변 속에서 정치에 관여했다.",
        "이하응은 석파라는 호를 썼고 난초 그림과 서화로 이름을 남겼다.",
        "석파정은 흥선대원군과 인연이 있는 별서다."
      ],
      storyGoal: "실제 난초 그림 활동을 토대로 유머와 아버지로서의 아쉬움을 연출한다. 정치를 완전히 포기한 은둔자로 끝내지 않는다.",
      tone: "잔잔한 유머와 풀리지 않은 아쉬움",
      specialRules: [
        "대사·감정·손짓과 플레이어의 등장은 역사적 상황을 바탕으로 한 창작 연출이다. 실제 인물의 발언이나 기록된 심리로 단정하지 않는다.",
        "역사적 사건과 날짜는 historicalFacts에 있는 것만 사용한다. 불확실한 동기와 전승은 확정하지 않는다.",
        "플레이어는 현대에서 온 목격자다. 선택과 호감도는 신뢰를 나타내며 실제 역사나 정책 결과를 바꾸지 않는다.",
        "마지막 흥선대원군 대사에 대한 선택지를 만들고 NPC 반응은 heungseon이 직접 맡는다.",
        "흥선대원군을 무조건적인 구국 영웅이나 단순한 악역으로 만들지 않는다. 인간적 장면이 정책의 피해를 정당화하지 않는다.",
        "kimmun은 장면별 지인·신하·측근을 맡는 공용 연출 캐릭터이며 동일한 실존 인물이 시대를 넘나드는 것으로 말하지 않는다.",
        "그림을 그린 정확한 날과 이 대화의 장소·정치적 성찰은 창작이다. 실제 고백이나 반성문으로 인용하지 않는다.",
        "난초는 말년에 갑자기 시작한 취미가 아니다. 붓은 늘 뜻대로 된다고 말하지 않는다.",
        "1873년 뒤 정치에 관여하지 않았다거나 모든 잘못을 뉘우쳤다고 단정하지 않는다.",
        "호의 정확한 작명 계기나 석파정 취득 일화를 근거 없이 덧붙이지 않는다."
      ]
    }
  }
} as const;
