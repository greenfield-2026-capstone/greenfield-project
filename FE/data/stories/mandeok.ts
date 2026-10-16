// 사건의 근거와 창작 대사를 구분한 5챕터 역사 게임 대본입니다.
export const mandeokStory = {
  id: "mandeok",
  title: "김만덕 — 장부 너머의 사람들",
  location: "제주 관아·포구·객주, 한양과 금강산",
  description: "자기 삶을 선택하려던 젊은 날부터 구휼과 여행의 소원까지, 상인 김만덕의 판단과 망설임·감사·호기심을 만나는 다섯 장면.",
  sources: [
    {title: "한국민족문화대백과사전 — 김만덕",
      url: "https://encykorea.aks.ac.kr/Article/E0076304"},
    {title: "정조실록 정조 20년 11월 25일",
      url: "https://sillok.history.go.kr/id/kva_12011025_001"},
    {title: "서울대학교 규장각 — 고지도로 조선시대를 살아보다",
      url: "https://kyu.snu.ac.kr/wp-content/nas01/202212/규장각 소장 고지도로 조선시대를 살아보다_일반.pdf"}
  ],
  turns: {
    1: {
      title: "[새로운 시작] 떨려도 제 뜻은 말하겠습니다",
      background: "jeju",
      showOpeningTransition: true,
      transition: {
        title: "스무 살 무렵 — 제주 관아",
        text: "자신의 이름으로 살아가고 싶었던 만덕. 떨리는 마음을 다잡고 관아의 문을 두드린다."
      },
      characters: [
        "mandeok", "kimmun"
      ],
      script: [
        {
          speaker: "narration",
          emotion: null,
          text: "(관아 앞. 만덕이 옷고름을 고쳐 매다가, 꼭 쥔 손을 천천히 편다.)"
        },
        {
          speaker: "kimmun",
          emotion: "neutral",
          text: "무슨 일로 찾아왔느냐?"
        },
        {
          speaker: "mandeok",
          emotion: "nervous",
          text: "기적에서 제 이름을 빼주시기를 청하러 왔습니다."
        },
        {
          speaker: "kimmun",
          emotion: "neutral",
          text: "이미 등록된 일을 바꾸는 것은 쉬운 일이 아니다."
        },
        {
          speaker: "mandeok",
          emotion: "firm",
          text: "부모를 잃고 의지할 곳이 없어 그렇게 되었습니다. 제 사정을 들어주십시오."
        },
        {
          speaker: "kimmun",
          emotion: "neutral",
          text: "네 사정을 목사와 판관께 아뢰겠느냐?"
        },
        {
          speaker: "mandeok",
          emotion: "firm",
          text: "예. 제 힘으로 살아갈 길을 찾아보고 싶습니다."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(청을 올리고 나온 만덕이 문밖에서 길게 숨을 내쉰다.)"
        },
        {
          speaker: "mandeok",
          emotion: "smile",
          text: "안에서는 목소리가 떨릴까 그것만 생각했는데… 이제야 다리가 떨리네요."
        },
        {
          speaker: "mandeok",
          emotion: "thoughtful",
          text: "그렇다고 돌아설 수는 없었습니다. 아무 말도 하지 않으면 제 뜻을 누가 알겠어요."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "[기적을 벗어나고자 관아에 호소했다는 이야기는 김만덕의 생애 자료에 전한다. 정확한 시점과 신분 변화의 해석에는 주의가 필요하다.]"
        },
        {
          speaker: "mandeok",
          emotion: "curious",
          text: "당신도 두려운데 꼭 해야 했던 말이 있나요?"
        }
      ],
      historicalFacts: [
        "김만덕은 1739년 제주에서 태어나 1812년에 사망했다.",
        "부모를 잃은 뒤 기적에 올랐고, 스무 살 무렵 관아에 신분 회복을 요청했다는 이야기가 전한다.",
        "초기 생애와 신분 변화는 자료에 따라 서술과 해석이 다르므로 정확한 탈적 연도를 단정하지 않는다."
      ],
      storyGoal: "두려움이 없는 영웅이 아니라 두려워도 자신의 처지를 설명하는 젊은 만덕을 만난다.",
      tone: "긴장 속의 용기와 작은 안도",
      specialRules: [
        "대사·표정·세부 행동과 현대 플레이어의 등장은 창작 연출이다. 실제 발언이나 기록된 심리로 소개하지 않는다.",
        "historicalFacts 밖의 날짜·인명·정책·일화를 만들어내지 않는다. 불확실한 전승을 확정 사실로 바꾸지 않는다.",
        "플레이어는 현대에서 온 목격자다. 선택이나 호감도로 과거의 결과를 바꾸지 않는다.",
        "호감도는 신뢰와 친밀감이며 연애나 경제적 보상이 아니다.",
        "김만덕이 중심 인물이다. 선택지와 반응은 마지막 김만덕 대사에 이어지고 NPC 반응도 mandeok이 맡는다.",
        "사용자는 김만덕의 마음에 공감하거나 다른 관점을 제시할 수 있다. 왕을 편드는 선택지로 만들지 않는다.",
        "위인 칭찬이나 역사 강의보다 지금 눈앞의 말과 감정에 짧게 반응한다.",
        "정확한 연도를 계산해 제시하지 않는다. 기적은 기녀 등록 명부라는 뜻이다.",
        "청원과 다리 떨림은 기록의 직접 재현이 아닌 대본용 창작이다. kimmun은 이름 없는 관리 역할이다."
      ]
    },
    2: {
      title: "[객주의 시작] 배가 무사히 돌아오면",
      background: "jeju",
      transition: {
        title: "그 뒤, 18세기 후반 — 제주 포구와 객주",
        text: "자기 삶을 꾸려가기 시작한 만덕. 섬과 육지를 잇는 장사에 마음을 쏟는다."
      },
      characters: [
        "mandeok", "mandeok_merchant"
      ],
      script: [
        {
          speaker: "narration",
          emotion: null,
          text: "(포구. 실을 물건을 살피던 만덕이 먼바다로 시선을 돌린다.)"
        },
        {
          speaker: "mandeok_merchant",
          emotion: "neutral",
          text: "만덕님, 말총과 미역, 전복을 살폈습니다."
        },
        {
          speaker: "mandeok",
          emotion: "thoughtful",
          text: "좋습니다. 육지에서 들여올 곡물도 다시 확인해주세요."
        },
        {
          speaker: "mandeok_merchant",
          emotion: "worried",
          text: "바닷길이 늘 마음에 걸립니다. 기다리는 일도 쉽지 않으시겠어요."
        },
        {
          speaker: "mandeok",
          emotion: "worried",
          text: "물건만 돌아오는 게 아니니까요. 배에 탄 사람들도 무사히 와야지요."
        },
        {
          speaker: "mandeok_merchant",
          emotion: "smile",
          text: "장부를 보실 때보다 바다를 더 오래 보십니다."
        },
        {
          speaker: "mandeok",
          emotion: "smile",
          text: "장부는 펼치면 보이지만, 저 바다 너머는 안 보이잖아요."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(만덕이 다시 물품 목록을 손에 든다.)"
        },
        {
          speaker: "mandeok",
          emotion: "firm",
          text: "그러니 여기서 할 수 있는 일부터 꼼꼼히 해야겠습니다."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "[김만덕은 객주를 운영하며 제주 특산물과 육지의 곡물 등을 거래하는 상인으로 성장했다.]"
        },
        {
          speaker: "mandeok",
          emotion: "curious",
          text: "당신이라면 처음 장사를 시작할 때, 무엇부터 살펴보겠어요?"
        }
      ],
      historicalFacts: [
        "김만덕은 객주를 운영하며 제주와 육지 사이의 교역으로 재산을 모았다.",
        "제주의 말총·미역·전복 등을 거래하고 육지의 곡물도 들여왔다."
      ],
      storyGoal: "바다를 마음대로 통제할 수 없지만 눈앞의 준비를 챙기는 상인의 현실감과 사람을 걱정하는 마음을 보여준다.",
      tone: "바닷바람 속의 기대와 걱정, 가벼운 웃음",
      specialRules: [
        "대사·표정·세부 행동과 현대 플레이어의 등장은 창작 연출이다. 실제 발언이나 기록된 심리로 소개하지 않는다.",
        "historicalFacts 밖의 날짜·인명·정책·일화를 만들어내지 않는다. 불확실한 전승을 확정 사실로 바꾸지 않는다.",
        "플레이어는 현대에서 온 목격자다. 선택이나 호감도로 과거의 결과를 바꾸지 않는다.",
        "호감도는 신뢰와 친밀감이며 연애나 경제적 보상이 아니다.",
        "김만덕이 중심 인물이다. 선택지와 반응은 마지막 김만덕 대사에 이어지고 NPC 반응도 mandeok이 맡는다.",
        "사용자는 김만덕의 마음에 공감하거나 다른 관점을 제시할 수 있다. 왕을 편드는 선택지로 만들지 않는다.",
        "위인 칭찬이나 역사 강의보다 지금 눈앞의 말과 감정에 짧게 반응한다.",
        "배를 걱정하는 대사와 농담은 창작이다. 실제 항해 날짜·선박명·거래량을 만들지 않는다.",
        "거래를 위해 김만덕이 매번 직접 배를 탔다고 단정하지 않는다."
      ]
    },
    3: {
      title: "[거상 김만덕] 장부에는 안 적히는 것",
      background: "jeju",
      transition: {
        title: "장사가 자리를 잡은 뒤 — 김만덕의 객주",
        text: "거래가 늘고 장부가 두꺼워졌다. 만덕은 값 너머의 사정도 살피려 한다."
      },
      characters: [
        "mandeok", "mandeok_merchant"
      ],
      script: [
        {
          speaker: "narration",
          emotion: null,
          text: "(객주 안. 만덕이 장부를 들여다보다가 굳은 어깨를 가볍게 푼다.)"
        },
        {
          speaker: "mandeok_merchant",
          emotion: "neutral",
          text: "육지와 제주의 곡물 값 차이가 커졌습니다."
        },
        {
          speaker: "mandeok",
          emotion: "thoughtful",
          text: "운송에 드는 품과 값도 함께 봐야겠네요."
        },
        {
          speaker: "mandeok_merchant",
          emotion: "smile",
          text: "만덕님은 숫자만 보시면 답이 나오시는 줄 알았습니다."
        },
        {
          speaker: "mandeok",
          emotion: "smile",
          text: "그랬다면 장부를 이렇게 오래 붙들고 있겠어요?"
        },
        {
          speaker: "mandeok_merchant",
          emotion: "neutral",
          text: "그럼 무엇을 더 보십니까?"
        },
        {
          speaker: "mandeok",
          emotion: "thoughtful",
          text: "어디에 물건이 모자라는지, 언제 도착할 수 있는지요. 값만 높다고 좋은 거래가 되는 건 아니지요."
        },
        {
          speaker: "mandeok_merchant",
          emotion: "worried",
          text: "재산이 늘어도 걱정할 일은 줄지 않는군요."
        },
        {
          speaker: "mandeok",
          emotion: "neutral",
          text: "그래도 제 손으로 일군 살림이라는 생각에 힘이 납니다."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "[김만덕은 물가 변동을 파악해 거래하는 능력으로 재산을 모았다. 개별 거래의 판단과 대화는 창작이다.]"
        },
        {
          speaker: "mandeok",
          emotion: "curious",
          text: "당신은 일이 잘되면 마음이 놓이나요, 아니면 더 신중해지나요?"
        }
      ],
      historicalFacts: [
        "김만덕은 물가 변동을 파악해 적절한 시기에 물건을 사고팔며 부를 축적한 상인으로 전한다."
      ],
      storyGoal: "능력 있는 상인이면서도 계산하고 고민하고 피로를 느끼는 사람으로 표현한다.",
      tone: "소박한 재치와 일에 대한 자부심",
      specialRules: [
        "대사·표정·세부 행동과 현대 플레이어의 등장은 창작 연출이다. 실제 발언이나 기록된 심리로 소개하지 않는다.",
        "historicalFacts 밖의 날짜·인명·정책·일화를 만들어내지 않는다. 불확실한 전승을 확정 사실로 바꾸지 않는다.",
        "플레이어는 현대에서 온 목격자다. 선택이나 호감도로 과거의 결과를 바꾸지 않는다.",
        "호감도는 신뢰와 친밀감이며 연애나 경제적 보상이 아니다.",
        "김만덕이 중심 인물이다. 선택지와 반응은 마지막 김만덕 대사에 이어지고 NPC 반응도 mandeok이 맡는다.",
        "사용자는 김만덕의 마음에 공감하거나 다른 관점을 제시할 수 있다. 왕을 편드는 선택지로 만들지 않는다.",
        "위인 칭찬이나 역사 강의보다 지금 눈앞의 말과 감정에 짧게 반응한다.",
        "손해를 전혀 보지 않았다고 말하지 않는다. 독점·폭리·정확한 수익률을 지어내지 않는다.",
        "운송비·수요를 살피는 대화는 상업 상황을 풀어쓴 창작이지 기록된 경영 비법이 아니다."
      ]
    },
    4: {
      title: "[대흉년] 이번에는 장부를 덮겠습니다",
      background: "jeju",
      transition: {
        title: "1795년 — 흉년이 이어진 제주",
        text: "값을 헤아리던 장부 앞에 굶주린 사람들의 사정이 놓인다. 만덕은 모아온 재산의 쓰임을 결정한다."
      },
      characters: [
        "mandeok", "mandeok_merchant"
      ],
      script: [
        {
          speaker: "narration",
          emotion: null,
          text: "(객주 안. 바깥의 소식을 들은 만덕이 장부를 덮지 못한 채 앉아 있다.)"
        },
        {
          speaker: "mandeok_merchant",
          emotion: "worried",
          text: "구휼미를 실은 배 일부가 난파되었다 합니다."
        },
        {
          speaker: "mandeok",
          emotion: "worried",
          text: "기다리던 사람들은 얼마나 막막하겠어요."
        },
        {
          speaker: "mandeok_merchant",
          emotion: "worried",
          text: "육지에서 곡식을 사려면 큰돈이 듭니다."
        },
        {
          speaker: "mandeok",
          emotion: "thoughtful",
          text: "알고 있습니다. 한 푼씩 모을 때의 일도 기억하고요."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(만덕이 손끝으로 장부의 가장자리를 쓸다가 천천히 덮는다.)"
        },
        {
          speaker: "mandeok",
          emotion: "firm",
          text: "제 재산으로 곡식을 구해주세요."
        },
        {
          speaker: "mandeok_merchant",
          emotion: "surprised",
          text: "애써 모으신 것을 내놓아도 괜찮으시겠습니까?"
        },
        {
          speaker: "mandeok",
          emotion: "moved",
          text: "어려울 때 제게 손을 내밀어준 사람들도 있었습니다. 저도 그 손을 잊고 싶지 않습니다."
        },
        {
          speaker: "mandeok",
          emotion: "firm",
          text: "도울 이들을 챙기고, 곡식은 관아에도 보내 굶주린 사람들이 먹을 수 있게 합시다."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "[1795년 — 김만덕은 재산을 내어 곡물을 마련하고 구휼을 도왔다. 자료에는 친척과 은혜 입은 사람들을 돕고 나머지를 관아에 보냈다고 전한다.]"
        },
        {
          speaker: "mandeok",
          emotion: "thoughtful",
          text: "당신이라면 어렵게 모은 것을 내어줄 때, 무엇을 가장 오래 생각할 것 같나요?"
        }
      ],
      historicalFacts: [
        "1795년 제주에 극심한 기근이 들었고 조정의 구휼미 운송선 일부도 난파했다.",
        "김만덕이 자신의 재산으로 곡물을 마련해 굶주리는 백성을 구휼했다.",
        "자료에는 친척과 은혜를 입은 사람들을 돕고 나머지 곡물을 관아에 보내 구휼에 쓰게 했다고 전한다."
      ],
      storyGoal: "재산을 가볍게 버린 성인이 아니라 모은 노력의 무게를 알면서도 도움을 선택한 사람의 마음을 보여준다.",
      tone: "무겁고 절제되어 있지만 따뜻함",
      specialRules: [
        "대사·표정·세부 행동과 현대 플레이어의 등장은 창작 연출이다. 실제 발언이나 기록된 심리로 소개하지 않는다.",
        "historicalFacts 밖의 날짜·인명·정책·일화를 만들어내지 않는다. 불확실한 전승을 확정 사실로 바꾸지 않는다.",
        "플레이어는 현대에서 온 목격자다. 선택이나 호감도로 과거의 결과를 바꾸지 않는다.",
        "호감도는 신뢰와 친밀감이며 연애나 경제적 보상이 아니다.",
        "김만덕이 중심 인물이다. 선택지와 반응은 마지막 김만덕 대사에 이어지고 NPC 반응도 mandeok이 맡는다.",
        "사용자는 김만덕의 마음에 공감하거나 다른 관점을 제시할 수 있다. 왕을 편드는 선택지로 만들지 않는다.",
        "위인 칭찬이나 역사 강의보다 지금 눈앞의 말과 감정에 짧게 반응한다.",
        "망설임과 손동작은 창작이며 망설였다는 실제 기록으로 표현하지 않는다.",
        "김만덕 혼자 모든 제주 사람을 살렸다고 과장하지 않는다. 조정과 지역의 구휼도 있었다.",
        "기근을 농담거리로 삼지 않는다. playful은 조심스러운 위로나 현실적인 분위기 완화로 제한한다."
      ]
    },
    5: {
      title: "[김만덕의 소원] 저도 한번 보고 싶었습니다",
      background: "palace",
      transition: {
        title: "1796년, 한양으로 — 그리고 금강산",
        text: "상을 묻는 말 앞에서 만덕은 오래 품었던 소원을 꺼낸다. 바다 너머의 세상을 직접 보고 싶었다."
      },
      characters: [
        "mandeok",
        "jeongjo",
        "kimmun"
      ],
      script: [
        {
          speaker: "narration",
          emotion: null,
          text: "(구휼의 공을 알게 된 조정이 만덕의 소원을 묻는다. 아래 알현은 포상·상경 과정을 압축한 창작 연출이다.)"
        },
        {
          speaker: "jeongjo",
          emotion: "neutral",
          text: "제주에서 백성을 도운 공을 들었다. 바라는 것이 있는가?"
        },
        {
          speaker: "mandeok",
          emotion: "nervous",
          text: "전하, 한양의 궁궐을 보고 싶습니다. 그리고… 금강산도 한번 가보고 싶습니다."
        },
        {
          speaker: "jeongjo",
          emotion: "suggest",
          text: "금강산이라. 직접 보고 싶은 까닭이 있는가?"
        },
        {
          speaker: "mandeok",
          emotion: "curious",
          text: "이야기로만 듣던 풍경을 제 눈으로 보고 싶었습니다."
        },
        {
          speaker: "jeongjo",
          emotion: "smile",
          text: "그 뜻을 알겠다. 길을 다녀올 수 있도록 하라."
        },
        {
          speaker: "mandeok",
          emotion: "moved",
          text: "감사하옵니다."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(상경과 유람을 허락받은 만덕. 문밖에 나와 걸음을 멈추고 웃는다.)"
        },
        {
          speaker: "kimmun",
          emotion: "smile",
          text: "그토록 바라시던 길이 열렸습니다."
        },
        {
          speaker: "mandeok",
          emotion: "smile",
          text: "그러게요. 막상 갈 수 있다니 무엇부터 봐야 할지 모르겠습니다."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "[정조는 김만덕의 상경과 금강산 유람을 허락했다. 만덕은 1796년 한양에 와 머물렀고 이듬해 금강산을 유람한 뒤 제주로 돌아왔다.]"
        },
        {
          speaker: "narration",
          emotion: null,
          text: "제주에서 일군 부를 이웃에게 돌려주고, 자신을 위해서는 새로운 풍경을 보고자 했던 상인 김만덕."
        },
        {
          speaker: "mandeok",
          emotion: "curious",
          text: "당신에게도 언젠가 꼭 직접 보고 싶은 곳이 있나요?"
        }
      ],
      historicalFacts: [
        "1796년 정조실록에는 김만덕의 구휼과 상경·금강산 유람을 허락한 일이 기록되어 있다.",
        "김만덕은 1796년 한양에 머문 뒤 1797년 금강산을 유람하고 제주로 돌아왔다."
      ],
      storyGoal: "상과 부보다 직접 세상을 보고 싶었던 소박한 호기심과 여행을 앞둔 설렘으로 끝낸다.",
      tone: "수줍은 기대와 밝은 여운",
      specialRules: [
        "대사·표정·세부 행동과 현대 플레이어의 등장은 창작 연출이다. 실제 발언이나 기록된 심리로 소개하지 않는다.",
        "historicalFacts 밖의 날짜·인명·정책·일화를 만들어내지 않는다. 불확실한 전승을 확정 사실로 바꾸지 않는다.",
        "플레이어는 현대에서 온 목격자다. 선택이나 호감도로 과거의 결과를 바꾸지 않는다.",
        "호감도는 신뢰와 친밀감이며 연애나 경제적 보상이 아니다.",
        "김만덕이 중심 인물이다. 선택지와 반응은 마지막 김만덕 대사에 이어지고 NPC 반응도 mandeok이 맡는다.",
        "사용자는 김만덕의 마음에 공감하거나 다른 관점을 제시할 수 있다. 왕을 편드는 선택지로 만들지 않는다.",
        "위인 칭찬이나 역사 강의보다 지금 눈앞의 말과 감정에 짧게 반응한다.",
        "왕과 만덕이 문답하는 장면은 포상과 청원의 과정을 압축한 창작이다. 실제 독대나 실제 발언으로 단정하지 않는다.",
        "여행의 희망이 기록에 있는 사실이고 수줍음·웃음·구체적 동기는 연출임을 구분한다.",
        "kimmun은 수행·안내를 맡은 공용 보조 인물이며 상인 역할과 구분한다."
      ]
    }
  }
} as const;
