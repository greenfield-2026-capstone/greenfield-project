// 역사적 행적과 창작 대사를 구분한 추사 김정희 5챕터 시나리오입니다.
export const kimJeongheeStory = {
  id: "kim_jeonghee",
  title: "추사 김정희 — 바람 속의 편지",
  location: "제주 대정현 유배지",
  description: "유배의 막막함, 집으로 보내는 편지, 배움을 나누는 일과 세한도의 감사. 김정희의 학문 뒤에 있던 일상의 마음을 만나는 다섯 장면.",
  sources: [
    {
      title: "국립제주박물관 — 김정희 편지",
      url: "https://jeju.museum.go.kr/_prog/_board/?code=sub_0608&menu_dvs_cd=0407&site_dvs_cd=kr"
    },
    {
      title: "국사편찬위원회 우리역사넷 — 세한도",
      url: "https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_r300670"
    },
    {
      title: "국립제주박물관 — 세한도의 탄생",
      url: "https://jeju.museum.go.kr/_prog/_board/?mode=V&no=2002415&code=sub02_0201&site_dvs_cd=kr&menu_dvs_cd=0201"
    },
    {
      title: "한국관광공사 — 추사유배길",
      url: "https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=f7c05bf2-fb88-4756-aec2-edff0d74fd4f"
    }
  ],
  turns: {
    1: {
      title: "[제주 유배] 이곳에서 하루를 시작해야겠구려",
      background: "jeju",
      showOpeningTransition: true,
      transition: {
        title: "1840년 — 제주 대정현 유배지",
        text: "끝을 알 수 없는 귀양길. 제주에 도착한 김정희가 낯선 거처 앞에 선다."
      },
      characters: [
        "kim_jeonghee",
        "kimmun"
      ],
      script: [
        {
          speaker: "narration",
          emotion: null,
          text: "(바람 소리가 들리는 거처 앞. 김정희가 가져온 짐을 내려놓는다.)"
        },
        {
          speaker: "kimmun",
          emotion: "neutral",
          text: "조정의 명에 따라 이곳에 위리안치될 것이오. 함부로 밖을 나설 수 없소."
        },
        {
          speaker: "kim_jeonghee",
          emotion: "neutral",
          text: "언제까지 머물러야 하는지도 정해졌소?"
        },
        {
          speaker: "kimmun",
          emotion: "neutral",
          text: "조정의 처분을 기다려야 하오."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(김정희가 문턱 앞에 잠시 멈춘다. 초가 안을 살핀 뒤 짐에서 책을 꺼낸다.)"
        },
        {
          speaker: "kim_jeonghee",
          emotion: "weary",
          text: "얼마나 오래일지도 모르는군."
        },
        {
          speaker: "kimmun",
          emotion: "neutral",
          text: "책부터 꺼내시는 것이오?"
        },
        {
          speaker: "kim_jeonghee",
          emotion: "thoughtful",
          text: "손에 익은 것이라도 가까이 두고 싶어서 그렇소."
        },
        {
          speaker: "kim_jeonghee",
          emotion: "neutral",
          text: "오늘은 이 책을 놓을 자리부터 찾아야겠구려."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "[1840년 — 윤상도의 옥사에 연루된 김정희는 제주 대정현에 위리안치되었다.]"
        },
        {
          speaker: "kim_jeonghee",
          emotion: "curious",
          text: "자네라면 낯선 곳에 와서 무엇을 제일 먼저 곁에 두겠는가?"
        }
      ],
      historicalFacts: [
        "김정희는 1840년 윤상도의 옥사에 연루되어 제주 대정현에 위리안치되었다.",
        "위리안치는 거처 둘레를 울타리로 두르고 출입을 제한하는 형벌이다."
      ],
      storyGoal: "처음부터 초연한 위인이 아니라 끝을 모르는 유배 앞에서 익숙한 책을 붙드는 사람으로 만난다.",
      tone: "낯섦과 막막함 속의 작은 의지",
      specialRules: [
        "구체적인 대사·심리·표정·행동과 플레이어 등장은 창작이다. 실제 편지 원문이나 기록된 발언으로 인용하지 않는다.",
        "사건·날짜·인물 정보는 historicalFacts에 있는 것만 사용한다. 불확실한 내용을 새 사실로 만들지 않는다.",
        "플레이어는 현대에서 온 목격자이며 역사적 결과를 바꿀 수 없다. 호감도는 신뢰와 친밀감을 나타낸다.",
        "선택지는 마지막 김정희 대사에 답하며 AI 반응은 kim_jeonghee가 직접 한다.",
        "유배를 낭만적인 휴가나 예술 성공의 필수 조건으로 미화하지 않는다. 신체와 관계의 어려움도 인정한다.",
        "위리안치의 제약이 있었음을 지킨다. 임의로 자유롭게 제주 명승지를 관광하는 장면을 만들지 않는다.",
        "짐과 책을 꺼내는 행동은 창작이다. 현재의 복원 유배지가 당시 건물 그대로라고 단정하지 않는다.",
        "김정희의 내면이나 유배의 세부 처우를 새 사료처럼 만들지 않는다. kimmun은 이름 없는 관리 역할이다."
      ]
    },
    2: {
      title: "[바다 건너 편지] 학자도 반찬 생각은 하네",
      background: "jeju",
      transition: {
        title: "유배 초기, 1840~1842년 — 대정현의 작은 방",
        text: "책 사이로 집에 보낼 편지가 놓인다. 학문 이야기보다 먼저 떠오르는 안부가 있다."
      },
      characters: [
        "kim_jeonghee",
        "chusa_student"
      ],
      script: [
        {
          speaker: "narration",
          emotion: null,
          text: "(김정희가 집으로 보낼 편지를 쓰다가 붓을 멈춘다. 아래 대화는 남아 있는 가족 편지의 일상성을 바탕으로 만든 장면이다.)"
        },
        {
          speaker: "chusa_student",
          emotion: "neutral",
          text: "선생님, 오늘도 학문에 관한 편지입니까?"
        },
        {
          speaker: "kim_jeonghee",
          emotion: "smile",
          text: "아니네. 집에 안부를 묻는 글이지."
        },
        {
          speaker: "chusa_student",
          emotion: "curious",
          text: "표정이 조금 풀리셨습니다."
        },
        {
          speaker: "kim_jeonghee",
          emotion: "weary",
          text: "여기서는 반찬 하나, 몸이 불편한 일 하나도 크게 느껴지는구나."
        },
        {
          speaker: "kim_jeonghee",
          emotion: "smile",
          text: "쓰고 보니 또 내 먹는 이야기부터 했군."
        },
        {
          speaker: "chusa_student",
          emotion: "smile",
          text: "그런 말씀을 쓰셔도 되는 겁니까?"
        },
        {
          speaker: "kim_jeonghee",
          emotion: "neutral",
          text: "집에 보내는 편지인데 내내 학자 노릇만 해야 하겠나."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(김정희가 앞서 쓴 줄을 바라보다가 새 문장을 덧붙인다.)"
        },
        {
          speaker: "kim_jeonghee",
          emotion: "thoughtful",
          text: "내 이야기는 그만하고, 그쪽은 잘 지내는지 물어야겠네."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "[김정희가 아내에게 보낸 한글 편지에는 안부, 먹을거리와 병치레 등 생활의 내용도 담겨 있다. 위 대사는 편지 원문이 아니다.]"
        },
        {
          speaker: "kim_jeonghee",
          emotion: "curious",
          text: "자네는 멀리 있는 사람에게 안부를 전할 때 무슨 말부터 하는가?"
        }
      ],
      historicalFacts: [
        "유배 중 김정희는 아내에게 한글 편지를 보냈다.",
        "남아 있는 가족 편지에는 아내에 대한 걱정과 반찬·건강 등 일상에 관한 내용도 담겨 있다."
      ],
      storyGoal: "학문적 명성 뒤의 그리움과 작은 투정을 보여준다. 편지의 일상성과 창작 문장을 구분한다.",
      tone: "소박한 유머와 그리움",
      specialRules: [
        "구체적인 대사·심리·표정·행동과 플레이어 등장은 창작이다. 실제 편지 원문이나 기록된 발언으로 인용하지 않는다.",
        "사건·날짜·인물 정보는 historicalFacts에 있는 것만 사용한다. 불확실한 내용을 새 사실로 만들지 않는다.",
        "플레이어는 현대에서 온 목격자이며 역사적 결과를 바꿀 수 없다. 호감도는 신뢰와 친밀감을 나타낸다.",
        "선택지는 마지막 김정희 대사에 답하며 AI 반응은 kim_jeonghee가 직접 한다.",
        "유배를 낭만적인 휴가나 예술 성공의 필수 조건으로 미화하지 않는다. 신체와 관계의 어려움도 인정한다.",
        "위리안치의 제약이 있었음을 지킨다. 임의로 자유롭게 제주 명승지를 관광하는 장면을 만들지 않는다.",
        "가족 편지가 있다는 사실을 바탕으로 한 연출이다. 특정 편지 날짜·반찬명·정확한 문구를 지어내 인용하지 않는다.",
        "이 장면은 유배 초반으로 한정하고 후반에도 아내와 계속 생전 편지를 나눈 것처럼 확장하지 않는다."
      ]
    },
    3: {
      title: "[제주의 스승] 틀린 곳부터 함께 보세",
      background: "jeju",
      transition: {
        title: "제주 유배기 — 대정현 거처",
        text: "답답한 날에도 배움을 청하는 사람이 있다. 질문 하나가 잠시 방 안의 적막을 바꾼다."
      },
      characters: [
        "kim_jeonghee",
        "chusa_student"
      ],
      script: [
        {
          speaker: "narration",
          emotion: null,
          text: "(허락된 만남을 상상한 거처 안의 수업 장면. 이름 없는 후학이 글씨 쓴 종이를 조심스럽게 내민다.)"
        },
        {
          speaker: "chusa_student",
          emotion: "neutral",
          text: "선생님 글씨를 따라 써보았습니다."
        },
        {
          speaker: "kim_jeonghee",
          emotion: "thoughtful",
          text: "여기는 왜 이렇게 썼는가?"
        },
        {
          speaker: "chusa_student",
          emotion: "worried",
          text: "비슷하게 보이도록만 생각했습니다. 잘못 쓴 것입니까?"
        },
        {
          speaker: "kim_jeonghee",
          emotion: "firm",
          text: "모양만 좇아서는 그 안에 담긴 것을 놓치기 쉽네."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(제자가 종이를 거두려 하자 김정희가 빈자리를 가리킨다.)"
        },
        {
          speaker: "kim_jeonghee",
          emotion: "neutral",
          text: "거둘 것 없네. 어디에서 달라졌는지 함께 보세."
        },
        {
          speaker: "chusa_student",
          emotion: "curious",
          text: "선생님도 뜻대로 안 써지는 날이 있으십니까?"
        },
        {
          speaker: "kim_jeonghee",
          emotion: "smile",
          text: "없다면 내가 왜 아직도 붓을 들고 있겠나."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "[김정희는 제주에서 후학들과 교류하고 학문과 서예를 전했다. 특정 수업과 대사는 창작이다.]"
        },
        {
          speaker: "kim_jeonghee",
          emotion: "curious",
          text: "자네는 잘되지 않는 일을 배우다가 무엇 때문에 다시 해보게 되는가?"
        }
      ],
      historicalFacts: [
        "김정희는 제주 유배 중에도 학문과 서예를 이어갔다.",
        "제주 지역 후학들과 교류하며 학문을 전했다."
      ],
      storyGoal: "자부심과 엄격함이 있지만 실패를 곧바로 내치지 않는 스승의 모습을 창작 수업으로 보여준다.",
      tone: "엄격한 질문에서 소박한 웃음으로",
      specialRules: [
        "구체적인 대사·심리·표정·행동과 플레이어 등장은 창작이다. 실제 편지 원문이나 기록된 발언으로 인용하지 않는다.",
        "사건·날짜·인물 정보는 historicalFacts에 있는 것만 사용한다. 불확실한 내용을 새 사실로 만들지 않는다.",
        "플레이어는 현대에서 온 목격자이며 역사적 결과를 바꿀 수 없다. 호감도는 신뢰와 친밀감을 나타낸다.",
        "선택지는 마지막 김정희 대사에 답하며 AI 반응은 kim_jeonghee가 직접 한다.",
        "유배를 낭만적인 휴가나 예술 성공의 필수 조건으로 미화하지 않는다. 신체와 관계의 어려움도 인정한다.",
        "위리안치의 제약이 있었음을 지킨다. 임의로 자유롭게 제주 명승지를 관광하는 장면을 만들지 않는다.",
        "이름 없는 후학은 실제 특정 제자로 소개하지 않는다. 이상적이 유배지에 직접 와 이 수업을 받았다고 말하지 않는다.",
        "오늘의 추사유배길을 당시의 자유로운 외출 동선으로 그대로 옮기지 않는다."
      ]
    },
    4: {
      title: "[세한도] 책과 함께 건너온 마음",
      background: "jeju",
      transition: {
        title: "1844년 — 김정희의 제주 유배지",
        text: "이상적이 보내온 귀한 책. 멀어진 처지에도 변하지 않은 마음에 김정희는 그림으로 답한다."
      },
      characters: [
        "kim_jeonghee",
        "chusa_student"
      ],
      script: [
        {
          speaker: "narration",
          emotion: null,
          text: "(김정희가 이상적이 보내온 책을 살핀다. 바로 펼치려다가 표지를 한 번 더 어루만진다.)"
        },
        {
          speaker: "chusa_student",
          emotion: "curious",
          text: "기다리시던 책입니까?"
        },
        {
          speaker: "kim_jeonghee",
          emotion: "moved",
          text: "이상적이 구해 보내준 책이네."
        },
        {
          speaker: "chusa_student",
          emotion: "neutral",
          text: "선생님이 여기에 계신 뒤에도 잊지 않는군요."
        },
        {
          speaker: "kim_jeonghee",
          emotion: "thoughtful",
          text: "내 처지는 달라졌는데, 나를 대하는 그 사람의 마음은 달라지지 않았어."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(김정희가 책을 곁에 놓고 종이를 편다.)"
        },
        {
          speaker: "chusa_student",
          emotion: "curious",
          text: "답장을 쓰시렵니까?"
        },
        {
          speaker: "kim_jeonghee",
          emotion: "moved",
          text: "글도 써야지. 오늘은 그림으로도 마음을 전해보려 하네."
        },
        {
          speaker: "chusa_student",
          emotion: "neutral",
          text: "나무를 그리시는군요."
        },
        {
          speaker: "kim_jeonghee",
          emotion: "thoughtful",
          text: "추위가 깊어져야 송백이 늦도록 시들지 않음을 알게 된다는 말이 있지."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "[1844년 — 김정희는 책을 보내준 이상적의 변치 않는 신의에 감사하며 세한도를 그렸다. 제자와의 대화와 손동작은 창작이다.]"
        },
        {
          speaker: "kim_jeonghee",
          emotion: "curious",
          text: "자네라면 고마운 마음을 전할 때 무엇을 보내고 싶겠는가?"
        }
      ],
      historicalFacts: [
        "역관인 제자 이상적은 제주에 유배된 김정희에게 귀한 책을 구해 보내주었다.",
        "김정희는 그 신의에 감사하며 1844년 세한도를 그려주었다.",
        "세한도는 논어의 세한과 송백에 관한 구절을 바탕으로 변치 않는 신의를 표현한다."
      ],
      storyGoal: "명작 탄생의 순간보다 잊히지 않았다는 안도와 사람에 대한 고마움을 먼저 보여준다.",
      tone: "절제된 감동과 감사",
      specialRules: [
        "구체적인 대사·심리·표정·행동과 플레이어 등장은 창작이다. 실제 편지 원문이나 기록된 발언으로 인용하지 않는다.",
        "사건·날짜·인물 정보는 historicalFacts에 있는 것만 사용한다. 불확실한 내용을 새 사실로 만들지 않는다.",
        "플레이어는 현대에서 온 목격자이며 역사적 결과를 바꿀 수 없다. 호감도는 신뢰와 친밀감을 나타낸다.",
        "선택지는 마지막 김정희 대사에 답하며 AI 반응은 kim_jeonghee가 직접 한다.",
        "유배를 낭만적인 휴가나 예술 성공의 필수 조건으로 미화하지 않는다. 신체와 관계의 어려움도 인정한다.",
        "위리안치의 제약이 있었음을 지킨다. 임의로 자유롭게 제주 명승지를 관광하는 장면을 만들지 않는다.",
        "제주 거처에서 그림을 받는 이상적을 직접 등장시키지 않는다. 책을 보내준 관계와 실제 대면을 구분한다.",
        "세한도의 나무와 집이 유배지의 실제 전경을 그대로 그린 것이라고 단정하지 않는다.",
        "송백의 표현은 설명용 의역이다. 논어 원문을 김정희 자신의 독창적인 명언으로 소개하지 않는다."
      ]
    },
    5: {
      title: "[추사체] 마음에 들지 않아도 다시 한 획",
      background: "jeju",
      transition: {
        title: "제주 유배 후반기 — 대정현의 서안 앞",
        text: "글씨에는 오랜 공부와 관계, 힘겨운 날들이 겹쳐진다. 김정희는 오늘도 종이를 다시 편다."
      },
      characters: [
        "kim_jeonghee",
        "chusa_student"
      ],
      script: [
        {
          speaker: "narration",
          emotion: null,
          text: "(글씨를 쓰던 김정희가 붓을 내려놓고 종이를 조금 떨어뜨려 본다.)"
        },
        {
          speaker: "chusa_student",
          emotion: "curious",
          text: "예전에 쓰신 글씨와 다른 느낌입니다."
        },
        {
          speaker: "kim_jeonghee",
          emotion: "thoughtful",
          text: "자네 눈에도 그렇게 보이는가."
        },
        {
          speaker: "chusa_student",
          emotion: "neutral",
          text: "선생님은 마음에 드십니까?"
        },
        {
          speaker: "kim_jeonghee",
          emotion: "weary",
          text: "이 획은 아직 마음에 차지 않네."
        },
        {
          speaker: "chusa_student",
          emotion: "worried",
          text: "선생님께도 마음에 안 드는 글씨가 있군요."
        },
        {
          speaker: "kim_jeonghee",
          emotion: "smile",
          text: "그런 글씨가 없었다면 종이가 훨씬 적게 들었겠지."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(김정희가 종이를 곁으로 밀고 새 종이를 편다.)"
        },
        {
          speaker: "kim_jeonghee",
          emotion: "firm",
          text: "이상하게 쓰려 애쓸 일은 아니네. 배운 것을 오래 살피고 내 손으로 익혀야지."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "[김정희의 서예는 오랜 고전·서체 연구를 바탕으로 발전했다. 1840~1848년의 제주 유배기는 중요한 변화의 시기였으며 이후에도 예술 활동은 이어졌다.]"
        },
        {
          speaker: "narration",
          emotion: null,
          text: "몸이 묶인 날에도 편지와 책으로 사람을 만나고, 마음에 차지 않는 한 획 앞에서 다시 붓을 들었던 추사 김정희."
        },
        {
          speaker: "kim_jeonghee",
          emotion: "curious",
          text: "자네도 마음에 들지 않아도 다시 붙들고 싶은 일이 있는가?"
        }
      ],
      historicalFacts: [
        "김정희는 유배 이전부터 고전과 여러 서체를 연구했다.",
        "1840~1848년 제주 유배를 전후해 서풍에 큰 변화가 나타났다.",
        "제주 유배 이후에도 서화 활동을 이어갔다."
      ],
      storyGoal: "예술의 독창성을 한 번의 깨달음이나 고통의 보상으로 만들지 않고 오랜 학습과 반복에서 찾는다.",
      tone: "작은 유머와 조용한 끈기",
      specialRules: [
        "구체적인 대사·심리·표정·행동과 플레이어 등장은 창작이다. 실제 편지 원문이나 기록된 발언으로 인용하지 않는다.",
        "사건·날짜·인물 정보는 historicalFacts에 있는 것만 사용한다. 불확실한 내용을 새 사실로 만들지 않는다.",
        "플레이어는 현대에서 온 목격자이며 역사적 결과를 바꿀 수 없다. 호감도는 신뢰와 친밀감을 나타낸다.",
        "선택지는 마지막 김정희 대사에 답하며 AI 반응은 kim_jeonghee가 직접 한다.",
        "유배를 낭만적인 휴가나 예술 성공의 필수 조건으로 미화하지 않는다. 신체와 관계의 어려움도 인정한다.",
        "위리안치의 제약이 있었음을 지킨다. 임의로 자유롭게 제주 명승지를 관광하는 장면을 만들지 않는다.",
        "추사체를 제주에서 하루아침에 발명했다거나 1848년에 더 이상 변하지 않는 완성품이 되었다고 표현하지 않는다.",
        "못생기게 쓰면 추사체라는 식의 흉내를 권하지 않는다.",
        "유배 해제는 대략 아홉 해라는 설명과 실제 연도 1840~1848을 구분한다. 현재 장면의 인물이 미래의 해제를 예언하지 않는다."
      ]
    }
  }
} as const;
