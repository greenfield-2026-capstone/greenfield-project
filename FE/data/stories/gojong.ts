// Historical events ground the story; dialogue and gestures are dramatized.
export const gojongStory = {
  id: "gojong",
  title: "고종 — 왕관 아래의 한 사람",
  location: "창덕궁·경복궁·덕수궁 일대",
  description: "즉위부터 친정, 을미사변, 커피와 대한제국, 헤이그 특사, 늦둥이 딸까지 고종의 인간적인 모습을 만나는 역사 기반 이야기.",
  turns: {
    1: {
      title: "[즉위] “아버님, 저는 아직…”",
      background: "step1-1",
      characters: [
        "young_gojong",
        "heungseon",
        "queen_dowager_jo"
      ],
      script: [
        {
          speaker: "narration",
          emotion: null,
          text: "(궁궐에 들어온 이명복이 아버지의 옷소매를 붙잡는다. 흥선군이 걸음을 멈춘다.)"
        },
        {
          speaker: "young_gojong",
          emotion: "curious",
          text: "아버님, 제가 잘못한 일이 있습니까?"
        },
        {
          speaker: "heungseon",
          emotion: "serious",
          text: "그런 것이 아니다. 곧 대비마마를 뵐 것이다."
        },
        {
          speaker: "young_gojong",
          emotion: "curious",
          text: "그런데 어찌 다들 저만 바라봅니까?"
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(조대비 앞에 선 이명복이 고개를 숙인다.)"
        },
        {
          speaker: "queen_dowager_jo",
          emotion: "solemn",
          text: "네가 익종의 대통을 이어 이 나라의 왕이 될 것이다."
        },
        {
          speaker: "young_gojong",
          emotion: "surprised",
          text: "제가… 왕이 된다고요?"
        },
        {
          speaker: "heungseon",
          emotion: "serious",
          text: "명복아. 마음을 단단히 먹거라."
        },
        {
          speaker: "young_gojong",
          emotion: "fear",
          text: "저는 아직 모르는 것이 너무 많습니다."
        },
        {
          speaker: "queen_dowager_jo",
          emotion: "gentle",
          text: "당분간 내가 수렴청정을 할 것이다. 너는 임금의 도리를 배워야 한다."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(즉위 의식을 앞두고, 이명복이 아버지에게 작게 묻는다.)"
        },
        {
          speaker: "young_gojong",
          emotion: "rely",
          text: "아버님도 곁에 계실 것이지요?"
        },
        {
          speaker: "heungseon",
          emotion: "warm",
          text: "그래. 곁에 있으마."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(이명복이 붙잡고 있던 옷소매를 천천히 놓는다.)"
        },
        {
          speaker: "narration",
          emotion: null,
          text: "[1863년 — 당시 세는나이 열두 살의 이명복, 조선 제26대 왕으로 즉위하다.]"
        },
        {
          speaker: "young_gojong",
          emotion: "rely",
          text: "나도 잘할 수 있을까요? 낯선 그대에게라도 묻고 싶습니다."
        }
      ],
      historicalFacts: [
        "철종이 왕위를 이을 후사 없이 사망한 뒤 1863년 고종이 즉위했다.",
        "조대비가 흥선군의 둘째 아들 이명복을 지명하여 익종의 대통을 잇게 했다.",
        "당시 세는나이 열두 살이며 만 나이는 열한 살이었다.",
        "조대비가 수렴청정을 하고 흥선대원군이 국정에 큰 영향력을 행사했다."
      ],
      storyGoal: "불안한 어린 왕과 사용자가 첫 신뢰를 쌓는다. 사용자는 즉위 결정을 바꾸는 인물이 아니라 곁에서 마음을 듣는 목격자다.",
      tone: "불안하지만 다정한 첫 만남",
      specialRules: [
        "대사는 역사적 상황을 바탕으로 창작한 연출이며 실제 발언의 인용이 아니다.",
        "historicalFacts 밖의 사건·정책·일화를 사실처럼 만들지 않는다.",
        "플레이어는 현대에서 온 목격자다. 선택이나 호감도로 실제 역사적 결과가 바뀌지 않는다.",
        "호감도는 대화의 신뢰이며 연애 감정이 아니다. 어린 인물에게 연애나 성적 표현을 사용하지 않는다.",
        "감정에 어울리는 손짓과 자세를 짧게 묘사할 수 있다. 동일한 정적 자세를 반복하지 않는다.",
        "어린 고종만 사용한다. 아직 자신의 미래를 알지 못한다.",
        "AI 반응은 마지막 고종의 질문에 대한 플레이어의 답에 고종이 직접 반응한다. 다른 인물이 질문을 가로채지 않는다."
      ],
      transition: {
        title: "1863년, 창덕궁 전각 안",
        text: "아버지를 따라 궁에 들어온 열두 살 명복. 자신을 기다리는 운명을 아직 알지 못한다."
      },
      backgroundChanges: [
        {
          scriptIndex: 14,
          background: "step1-2"
        }
      ],
      showOpeningTransition: true
    },
    2: {
      title: "[친정] “제 뜻을 말씀드리는 것입니다”",
      background: "step2",
      characters: [
        "heungseon",
        "gojong"
      ],
      script: [
        {
          speaker: "narration",
          emotion: null,
          text: "(고종이 상소를 내려놓는다. 흥선대원군이 아들의 얼굴을 살핀다.)"
        },
        {
          speaker: "heungseon",
          emotion: "stern",
          text: "최익현의 말이 네 마음에 들더냐?"
        },
        {
          speaker: "gojong",
          emotion: "firm",
          text: "상소 때문에 처음 품은 생각은 아닙니다."
        },
        {
          speaker: "heungseon",
          emotion: "stern",
          text: "조정의 일이 그리 쉬워 보이느냐?"
        },
        {
          speaker: "gojong",
          emotion: "firm",
          text: "쉽게 여겼다면 이렇게 오래 망설이지도 않았을 것입니다."
        },
        {
          speaker: "heungseon",
          emotion: "hurt",
          text: "내가 누구를 위해 이 일을 해왔는지 잊었느냐?"
        },
        {
          speaker: "gojong",
          emotion: "sorry",
          text: "잊지 않았습니다. 제가 어렸을 때 아버님께 의지했던 것도 기억합니다."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(고종이 잠시 말을 멈춘다.)"
        },
        {
          speaker: "gojong",
          emotion: "sorry",
          text: "그래서 이 말씀을 드리기가 더 어렵습니다."
        },
        {
          speaker: "heungseon",
          emotion: "hurt",
          text: "……."
        },
        {
          speaker: "gojong",
          emotion: "firm",
          text: "하지만 이제는 제가 결정하고, 그 결과도 제가 책임져야 합니다."
        },
        {
          speaker: "heungseon",
          emotion: "serious",
          text: "정녕 네 뜻이냐?"
        },
        {
          speaker: "gojong",
          emotion: "firm",
          text: "예, 아버님. 이제 제가 직접 하겠습니다."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(흥선대원군이 돌아서 나간다. 고종은 문이 닫힌 뒤에도 한동안 그쪽을 바라본다.)"
        },
        {
          speaker: "narration",
          emotion: null,
          text: "[1873년 — 고종의 친정이 본격화되다. 아버지와 아들의 관계에는 정치적 갈등이 깊어진다.]"
        },
        {
          speaker: "gojong",
          emotion: "firm",
          text: "자네에게는 어떠한가? 고마운 이에게도 내 뜻을 밝혀야 할 때가 있지 않은가?"
        }
      ],
      historicalFacts: [
        "1873년 고종의 친정이 본격화되었다.",
        "최익현의 상소 등을 계기로 흥선대원군이 정국의 주도권을 잃었다."
      ],
      storyGoal: "아버지에 대한 고마움과 국정을 직접 책임질 결의를 함께 보여준다.",
      tone: "망설임과 단호함",
      specialRules: [
        "대사는 역사적 상황을 바탕으로 창작한 연출이며 실제 발언의 인용이 아니다.",
        "historicalFacts 밖의 사건·정책·일화를 사실처럼 만들지 않는다.",
        "플레이어는 현대에서 온 목격자다. 선택이나 호감도로 실제 역사적 결과가 바뀌지 않는다.",
        "호감도는 대화의 신뢰이며 연애 감정이 아니다. 어린 인물에게 연애나 성적 표현을 사용하지 않는다.",
        "감정에 어울리는 손짓과 자세를 짧게 묘사할 수 있다. 동일한 정적 자세를 반복하지 않는다.",
        "고종은 성인이다. 어린 고종 이미지를 사용하지 않는다.",
        "AI 반응은 마지막 고종의 질문에 대한 플레이어의 답에 고종이 직접 반응한다. 다른 인물이 질문을 가로채지 않는다."
      ],
      transition: {
        title: "10년 뒤, 1873년 — 경복궁 건청궁 안",
        text: "아버지에게 의지하던 소년은 자랐다. 이제 고종은 자신의 뜻으로 나라를 다스리려 한다."
      }
    },
    3: {
      title: "[을미사변] “중전은 어디 있느냐”",
      background: "step3",
      characters: [
        "kimmun",
        "gojong"
      ],
      script: [
        {
          speaker: "narration",
          emotion: null,
          text: "(새벽. 총성과 고함이 가까워진다. 내관이 급히 들어온다.)"
        },
        {
          speaker: "kimmun",
          emotion: "surprised",
          text: "전하! 무장한 자들이 궁 안으로 들어왔사옵니다!"
        },
        {
          speaker: "gojong",
          emotion: "worried",
          text: "중전은 어디 있느냐?"
        },
        {
          speaker: "kimmun",
          emotion: "surprised",
          text: "건청궁에 계시옵니다."
        },
        {
          speaker: "gojong",
          emotion: "worried",
          text: "호위할 사람을 보내라. 어서!"
        },
        {
          speaker: "kimmun",
          emotion: "surprised",
          text: "전하께서도 몸을 피하셔야 하옵니다!"
        },
        {
          speaker: "gojong",
          emotion: "worried",
          text: "중전의 소식부터 알아오너라."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(암전. 다시 불이 켜지면 신하가 고종 앞에 엎드려 있다.)"
        },
        {
          speaker: "gojong",
          emotion: "worried",
          text: "찾았느냐?"
        },
        {
          speaker: "kimmun",
          emotion: "neutral",
          text: "전하… 왕비마마께서 변을 당하셨사옵니다."
        },
        {
          speaker: "gojong",
          emotion: "shocked",
          text: "……직접 확인한 것이냐?"
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(신하가 대답하지 못한 채 고개를 더 깊이 숙인다.)"
        },
        {
          speaker: "gojong",
          emotion: "shocked",
          text: "조금 전까지 같은 궁에 있었는데…."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(고종이 무언가 말하려다 입을 다문다. 멀리서 소란이 계속된다.)"
        },
        {
          speaker: "narration",
          emotion: null,
          text: "[1895년 을미사변 — 왕비가 살해되다. 왕비는 1897년 대한제국 수립 이후 명성황후로 추존된다.]"
        },
        {
          speaker: "gojong",
          emotion: "shocked",
          text: "……지금은 아무 말 없이 곁에 있어 주겠느냐."
        }
      ],
      historicalFacts: [
        "1895년 일본 공사 미우라 고로가 주도한 세력이 경복궁을 습격했다.",
        "왕비가 건청궁에서 살해된 사건을 을미사변이라 한다.",
        "왕비는 1897년 대한제국 수립 이후 명성황후로 추존되었다."
      ],
      storyGoal: "왕비를 찾는 다급함에서 비보 이후 침묵으로 이어진다. 사용자는 사건을 되돌릴 수 없고 슬픔을 함께 듣는다.",
      tone: "다급함에서 충격과 침묵으로",
      specialRules: [
        "대사는 역사적 상황을 바탕으로 창작한 연출이며 실제 발언의 인용이 아니다.",
        "historicalFacts 밖의 사건·정책·일화를 사실처럼 만들지 않는다.",
        "플레이어는 현대에서 온 목격자다. 선택이나 호감도로 실제 역사적 결과가 바뀌지 않는다.",
        "호감도는 대화의 신뢰이며 연애 감정이 아니다. 어린 인물에게 연애나 성적 표현을 사용하지 않는다.",
        "감정에 어울리는 손짓과 자세를 짧게 묘사할 수 있다. 동일한 정적 자세를 반복하지 않는다.",
        "고종은 성인이다. 어린 고종 이미지를 사용하지 않는다.",
        "AI 반응은 마지막 고종의 질문에 대한 플레이어의 답에 고종이 직접 반응한다. 다른 인물이 질문을 가로채지 않는다.",
        "왕비 살해를 상세한 폭력 묘사나 농담으로 소비하지 않는다. playful 선택도 어색한 위로나 조심스러운 분위기 완화로 제한한다.",
        "kimmun은 이 장면의 신하·시종 역할이다. 세종 시대의 인물이나 이전 왕과의 관계를 언급하지 않는다. 비보와 즉위 의식에서는 농담이나 잔소리를 하지 않는다."
      ],
      transition: {
        title: "22년 뒤, 1895년 새벽 — 경복궁 건청궁 앞",
        text: "고요하던 궁궐에 총성과 고함이 들려온다. 고종은 다급히 중전을 찾는다."
      }
    },
    4: {
      title: "[커피와 대한제국] “잠시만, 식기 전에”",
      background: "step4",
      characters: [
        "kimmun",
        "gojong"
      ],
      script: [
        {
          speaker: "narration",
          emotion: null,
          text: "(러시아 공사관의 방. 고종 앞에 서류와 커피 한 잔이 놓여 있다.)"
        },
        {
          speaker: "kimmun",
          emotion: "neutral",
          text: "전하, 보고드릴 일이 있사옵니다."
        },
        {
          speaker: "gojong",
          emotion: "smile",
          text: "잠시만. 이것부터 한 모금 마시자꾸나."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(잔을 들어 향을 맡고 마신다.)"
        },
        {
          speaker: "kimmun",
          emotion: "neutral",
          text: "그 쓴 것을 즐겨 드시옵니까?"
        },
        {
          speaker: "gojong",
          emotion: "smile",
          text: "쓰기는 하지. 그런데 자꾸 생각나는구나."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(고종이 잔을 내려놓고 서류를 당겨온다.)"
        },
        {
          speaker: "gojong",
          emotion: "smile",
          text: "그래. 오늘은 무슨 일이냐?"
        },
        {
          speaker: "kimmun",
          emotion: "neutral",
          text: "환궁에 관한 논의가 있사옵니다."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(고종이 창밖을 바라본다.)"
        },
        {
          speaker: "gojong",
          emotion: "firm",
          text: "돌아가야지. 언제까지 남의 공사관에 머물 수는 없으니."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(화면 전환. 1897년, 환구단의 황제 즉위 의식.)"
        },
        {
          speaker: "kimmun",
          emotion: "neutral",
          text: "황제 즉위 의식의 준비가 끝났사옵니다."
        },
        {
          speaker: "gojong",
          emotion: "firm",
          text: "오늘의 의식이 끝나도 해야 할 일은 남아 있을 것이오."
        },
        {
          speaker: "kimmun",
          emotion: "neutral",
          text: "폐하의 명을 받들겠사옵니다."
        },
        {
          speaker: "gojong",
          emotion: "firm",
          text: "나라가 스스로 설 힘을 길러야 하오. 이름에 걸맞은 나라를 만들어야지."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(고종이 의식의 자리로 나아간다.)"
        },
        {
          speaker: "narration",
          emotion: null,
          text: "[1897년 — 경운궁으로 환궁한 고종, 광무 연호를 사용하고 10월 환구단에서 황제에 즉위하다. 국호를 대한으로 정하다.]"
        },
        {
          speaker: "gojong",
          emotion: "firm",
          text: "자네에게도 이렇게 잠시 마음을 쉬게 해 주는 것이 있소?"
        }
      ],
      historicalFacts: [
        "1896년 고종은 러시아 공사관으로 거처를 옮겼다.",
        "고종은 커피를 즐겼다. 최초 음용 시점이나 한국 최초 음용자라는 주장은 단정하지 않는다.",
        "1897년 경운궁으로 환궁했다.",
        "1897년 광무 연호를 사용하고 10월 환구단에서 황제로 즉위했으며 국호를 대한으로 정했다."
      ],
      storyGoal: "커피를 즐기는 일상과 자주국을 세우려는 결의를 연결한다. 커피가 정치적 결정을 일으켰다는 인과관계를 만들지 않는다.",
      tone: "일상의 여유와 엄숙한 결의",
      specialRules: [
        "대사는 역사적 상황을 바탕으로 창작한 연출이며 실제 발언의 인용이 아니다.",
        "historicalFacts 밖의 사건·정책·일화를 사실처럼 만들지 않는다.",
        "플레이어는 현대에서 온 목격자다. 선택이나 호감도로 실제 역사적 결과가 바뀌지 않는다.",
        "호감도는 대화의 신뢰이며 연애 감정이 아니다. 어린 인물에게 연애나 성적 표현을 사용하지 않는다.",
        "감정에 어울리는 손짓과 자세를 짧게 묘사할 수 있다. 동일한 정적 자세를 반복하지 않는다.",
        "고종은 성인이다. 어린 고종 이미지를 사용하지 않는다.",
        "AI 반응은 마지막 고종의 질문에 대한 플레이어의 답에 고종이 직접 반응한다. 다른 인물이 질문을 가로채지 않는다.",
        "장면 중간의 1897년 전환 이후에만 폐하 호칭을 쓴다. 광무 연호가 즉위식 현장에서 처음 결정된 것으로 묘사하지 않는다.",
        "kimmun은 이 장면의 신하·시종 역할이다. 세종 시대의 인물이나 이전 왕과의 관계를 언급하지 않는다. 비보와 즉위 의식에서는 농담이나 잔소리를 하지 않는다."
      ],
      transition: {
        title: "이듬해, 1896년 — 러시아 공사관의 방",
        text: "궁궐을 떠나 낯선 곳에 머무는 고종. 따뜻한 커피 한 잔 앞에서도 돌아갈 날을 생각한다."
      },
      sceneTransitions: [
        {
          scriptIndex: 11,
          title: "1897년 10월 — 환구단",
          text: "공사관을 나와 환궁한 고종. 이제 조선의 왕에서 대한제국의 황제로 나아간다."
        }
      ]
    },
    5: {
      title: "[헤이그 특사] “우리의 말을 전해주시오”",
      background: "step5",
      characters: [
        "gojong",
        "yi_sangseol",
        "yi_jun",
        "yi_wijong"
      ],
      script: [
        {
          speaker: "narration",
          emotion: null,
          text: "(고종 앞에 특사들이 서 있다. 탁자에는 문서가 놓여 있다.)"
        },
        {
          speaker: "gojong",
          emotion: "firm",
          text: "나는 그 조약을 허락한 적이 없소. 그 사실을 전해주시오."
        },
        {
          speaker: "yi_sangseol",
          emotion: "resolute",
          text: "대한제국의 뜻을 밝히겠사옵니다."
        },
        {
          speaker: "gojong",
          emotion: "worried",
          text: "그들이 우리 말을 들으려 하겠소?"
        },
        {
          speaker: "yi_jun",
          emotion: "resolute",
          text: "듣게 할 길을 찾겠사옵니다."
        },
        {
          speaker: "gojong",
          emotion: "worried",
          text: "일본의 감시를 피해 먼 길을 가야 하오."
        },
        {
          speaker: "yi_wijong",
          emotion: "resolute",
          text: "각국의 사람들에게 우리의 사정을 알리겠사옵니다."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(고종이 문서 위에 손을 얹는다.)"
        },
        {
          speaker: "gojong",
          emotion: "sorry",
          text: "그대들에게 맡길 수밖에 없는 것이 마음에 걸리오."
        },
        {
          speaker: "yi_sangseol",
          emotion: "resolute",
          text: "명을 받들겠사옵니다."
        },
        {
          speaker: "gojong",
          emotion: "worried",
          text: "……부디 몸조심하시오."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(세 사람이 절을 올린다. 고종은 이들이 떠난 뒤 빈자리를 바라본다.)"
        },
        {
          speaker: "narration",
          emotion: null,
          text: "[1907년 — 특사들은 공식 회의 참석을 거부당했으나 언론 등을 통해 대한제국의 입장을 알렸다. 일본은 특사 파견을 구실로 고종의 퇴위를 강요한다.]"
        },
        {
          speaker: "gojong",
          emotion: "worried",
          text: "그대는 어떻게 생각하오? 어려운 길이어도 우리의 뜻을 전해야 하지 않겠소?"
        }
      ],
      historicalFacts: [
        "1905년 을사늑약으로 대한제국의 외교권이 박탈되었다.",
        "고종은 을사늑약을 승인하지 않았으며 1907년 이상설·이준·이위종을 헤이그에 특사로 파견했다.",
        "특사들은 공식 회의에 참석하지 못했지만 언론 등을 통해 입장을 알렸다.",
        "일본은 특사 파견을 구실로 1907년 고종의 퇴위를 강요했다."
      ],
      storyGoal: "특사에게 맡기는 절박함과 위험한 길을 보내는 걱정을 보여준다. 외교의 한계도 다룬다.",
      tone: "절박하고 신중함",
      specialRules: [
        "대사는 역사적 상황을 바탕으로 창작한 연출이며 실제 발언의 인용이 아니다.",
        "historicalFacts 밖의 사건·정책·일화를 사실처럼 만들지 않는다.",
        "플레이어는 현대에서 온 목격자다. 선택이나 호감도로 실제 역사적 결과가 바뀌지 않는다.",
        "호감도는 대화의 신뢰이며 연애 감정이 아니다. 어린 인물에게 연애나 성적 표현을 사용하지 않는다.",
        "감정에 어울리는 손짓과 자세를 짧게 묘사할 수 있다. 동일한 정적 자세를 반복하지 않는다.",
        "고종은 성인이다. 어린 고종 이미지를 사용하지 않는다.",
        "AI 반응은 마지막 고종의 질문에 대한 플레이어의 답에 고종이 직접 반응한다. 다른 인물이 질문을 가로채지 않는다.",
        "세 특사가 함께 황제를 만난 장면은 파견 과정을 압축한 연출이다. 실제 동시 알현으로 단정하지 않는다.",
        "특사들이 아무런 활동도 못했다고 말하지 않는다. 공식 회의 참석 실패와 언론 활동을 구분한다."
      ],
      transition: {
        title: "10년 뒤, 1907년 — 경운궁 집무실",
        text: "빼앗긴 외교권, 전하지 못한 나라의 뜻. 고종은 세 사람에게 먼 길을 부탁한다."
      }
    },
    6: {
      title: "[늦둥이 딸] “오늘은 무엇을 배웠느냐”",
      background: "step6",
      characters: [
        "gojong",
        "deokhye"
      ],
      script: [
        {
          speaker: "narration",
          emotion: null,
          text: "(준명당에서 아이들의 목소리가 들린다. 고종이 다가오는 어린 딸을 보고 웃는다.)"
        },
        {
          speaker: "gojong",
          emotion: "smile",
          text: "오늘은 무엇을 배웠느냐?"
        },
        {
          speaker: "deokhye",
          emotion: "bright",
          text: "노래를 배웠어요."
        },
        {
          speaker: "gojong",
          emotion: "smile",
          text: "그래? 아버지에게도 들려주겠느냐?"
        },
        {
          speaker: "deokhye",
          emotion: "shy",
          text: "지금요?"
        },
        {
          speaker: "gojong",
          emotion: "smile",
          text: "그래, 지금."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(덕혜가 노래를 부르다가 중간에 멈춘다.)"
        },
        {
          speaker: "deokhye",
          emotion: "flustered",
          text: "그다음은 잊어버렸어요."
        },
        {
          speaker: "gojong",
          emotion: "smile",
          text: "허허. 내일 또 배우면 되지."
        },
        {
          speaker: "deokhye",
          emotion: "bright",
          text: "아버지도 같이 오세요."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(고종이 딸의 눈높이에 맞춰 몸을 낮춘다.)"
        },
        {
          speaker: "gojong",
          emotion: "smile",
          text: "친구들과 재미있게 지내거라. 돌아와서는 무슨 일이 있었는지 내게 말해주고."
        },
        {
          speaker: "deokhye",
          emotion: "bright",
          text: "네!"
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(덕혜가 아이들에게 돌아간다. 고종은 아이들의 노래가 다시 시작될 때까지 그 자리에 머문다.)"
        },
        {
          speaker: "narration",
          emotion: null,
          text: "[1916년 — 고종, 덕수궁 준명당에 어린 덕혜를 위한 유치원을 마련하고 입학식에 참석하다.]"
        },
        {
          speaker: "gojong",
          emotion: "smile",
          text: "허허, 자네도 들었는가? 아이의 노래를 듣고 있으니 잠시 마음이 놓이는구나."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "열두 살에 왕이 된 소년은 황제가 되었다. 그리고 그의 삶에는 아버지와의 갈등, 아내를 잃은 슬픔, 커피 한 잔과 어린 딸의 노래도 있었다."
        }
      ],
      historicalFacts: [
        "고종은 퇴위 후 덕수궁에서 생활했다.",
        "덕혜는 고종의 늦둥이 딸이다.",
        "1916년 고종은 준명당에 어린 덕혜를 위한 유치원을 마련하고 입학식에 참석했다."
      ],
      storyGoal: "어린 딸에게 다정한 아버지인 고종을 보여주고 인간적인 여운으로 끝낸다.",
      tone: "다정하고 편안한 여운",
      specialRules: [
        "대사는 역사적 상황을 바탕으로 창작한 연출이며 실제 발언의 인용이 아니다.",
        "historicalFacts 밖의 사건·정책·일화를 사실처럼 만들지 않는다.",
        "플레이어는 현대에서 온 목격자다. 선택이나 호감도로 실제 역사적 결과가 바뀌지 않는다.",
        "호감도는 대화의 신뢰이며 연애 감정이 아니다. 어린 인물에게 연애나 성적 표현을 사용하지 않는다.",
        "감정에 어울리는 손짓과 자세를 짧게 묘사할 수 있다. 동일한 정적 자세를 반복하지 않는다.",
        "고종은 성인이다. 어린 고종 이미지를 사용하지 않는다.",
        "AI 반응은 마지막 고종의 질문에 대한 플레이어의 답에 고종이 직접 반응한다. 다른 인물이 질문을 가로채지 않는다.",
        "노래와 딸의 대사는 창작이다. 유치원 마련과 입학식 참석 사실과 구분한다."
      ],
      transition: {
        title: "9년 뒤, 1916년 — 덕수궁 준명당 앞마당",
        text: "황제의 자리에서 물러난 고종. 어린 딸의 노래에 잠시 얼굴이 환해진다."
      }
    }
  }
} as const;
