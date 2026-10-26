// 기록·전승과 창작 대사를 구분한 신사임당 5챕터 시나리오입니다.
export const sinsaimdangStory = {
  id: "sinsaimdang",
  title: "신사임당 — 보고, 배우고, 나의 그림으로",
  location: "강릉 오죽헌과 가족의 생활 공간",
  description: "책을 궁금해하던 어린 날, 마음에 들지 않는 그림, 가족과의 의논, 아이를 바라보는 마음, 자연을 그리는 즐거움을 따라가는 다섯 장면.",
  sources: [
    {
      title: "한국민족문화대백과사전 — 신사임당",
      url: "https://encykorea.aks.ac.kr/Article/E0033037"
    },
    {
      title: "한국민족문화대백과사전 — 신사임당 초충도병",
      url: "https://encykorea.aks.ac.kr/Article/E0033040"
    },
    {
      title: "한국민족문화대백과사전 — 유대관령망친정",
      url: "https://encykorea.aks.ac.kr/Article/E0041335"
    },
    {
      title: "국립중앙박물관 — 전칭 신사임당 초충도 관련 큐레이터 해설",
      url: "https://www.museum.go.kr/MUSEUM/contents/M0501000000.do?relicRecommendId=418982&schM=view"
    }
  ],
  turns: {
    1: {
      title: "[오죽헌의 아이] 모르는 글자 옆에 앉아",
      background: "step1",
      showOpeningTransition: true,
      transition: {
        title: "어린 시절 — 강릉 오죽헌",
        text: "어머니 곁에 펼쳐진 책 한 권. 아직 읽지 못하는 글자도 아이에게는 궁금한 세상이다."
      },
      characters: [
        "young_sinsaimdang",
        "saimdang_mother"
      ],
      script: [
        {
          speaker: "narration",
          emotion: null,
          text: "(오죽헌. 어머니가 펼친 책을 어린 사임당이 옆에서 들여다본다.)"
        },
        {
          speaker: "young_sinsaimdang",
          emotion: "curious",
          text: "어머니, 아까 보신 곳을 또 읽으십니까?"
        },
        {
          speaker: "saimdang_mother",
          emotion: "gentle",
          text: "다시 읽으면 놓친 뜻이 보일 때가 있단다."
        },
        {
          speaker: "young_sinsaimdang",
          emotion: "shy",
          text: "저는 모르는 글자가 더 많습니다."
        },
        {
          speaker: "saimdang_mother",
          emotion: "gentle",
          text: "그러니 하나씩 물어보면 되지."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(아이가 책 가장자리에 손가락을 가져간다. 한 글자를 짚으려다 잠깐 머뭇거린다.)"
        },
        {
          speaker: "young_sinsaimdang",
          emotion: "curious",
          text: "이것부터 여쭈어도 됩니까?"
        },
        {
          speaker: "saimdang_mother",
          emotion: "smile",
          text: "그래. 어디가 궁금하니?"
        },
        {
          speaker: "young_sinsaimdang",
          emotion: "smile",
          text: "하나만 여쭈려 했는데… 그 옆도 궁금합니다."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "[신사임당은 1504년 강릉 외가에서 태어나 자랐고 어머니를 통해 학문과 교양을 배웠다고 전한다. 수업의 세부와 대사는 창작이다.]"
        },
        {
          speaker: "young_sinsaimdang",
          emotion: "curious",
          text: "당신도 모르는 것이 생기면 바로 물어보십니까? 저는 괜히 망설일 때도 있습니다."
        }
      ],
      historicalFacts: [
        "신사임당은 1504년 강릉 외가에서 태어나 자랐다.",
        "어머니 용인 이씨를 통해 학문과 교양을 배웠다고 전한다."
      ],
      storyGoal: "이미 모든 것을 아는 신동보다 모르는 것을 묻고 싶어 하는 아이의 호기심과 머뭇거림을 보여준다.",
      tone: "수줍고 다정한 호기심",
      specialRules: [
        "구체적인 대사·심리·표정·손동작과 플레이어의 등장은 창작이다. 실제 발언이나 기록된 교육법으로 인용하지 않는다.",
        "역사적 사건·날짜와 인물 정보는 historicalFacts에 있는 것만 사용한다. 전승·추정·창작을 확정 사실로 바꾸지 않는다.",
        "플레이어는 현대에서 온 목격자이며 실제 역사적 결과를 바꾸지 않는다. 호감도는 신뢰이며 연애나 교육 성적이 아니다.",
        "선택지는 마지막 사임당 대사에 답하며 NPC 반응도 해당 장면의 어린 또는 성인 사임당이 직접 맡는다.",
        "예술가와 가족 구성원의 모습을 함께 보여주며 완벽한 현모양처나 현대적인 표어를 말하는 인물로 단순화하지 않는다.",
        "성인 여성의 복식·말투·이름을 어린 시절에 그대로 적용하지 않는다. 현대 지폐와 후대의 평가는 본인이 미리 알지 못한다.",
        "이 시기의 화자는 young_sinsaimdang이다. 사임당이라는 호를 어린아이가 이미 정식으로 쓰고 있었다고 단정하지 않는다.",
        "본명을 신인선으로 확정하거나 정확한 교재와 교육 일정을 지어내지 않는다."
      ]
    },
    2: {
      title: "[일곱 살의 그림] 다시 보면 다른 것이 보입니다",
      background: "step2",
      transition: {
        title: "일곱 살 무렵 — 오죽헌의 방",
        text: "좋아하는 그림을 따라 그리던 아이. 닮지 않은 한 획 때문에 종이를 오래 들여다본다."
      },
      characters: [
        "young_sinsaimdang",
        "saimdang_mother"
      ],
      script: [
        {
          speaker: "narration",
          emotion: null,
          text: "(어린 사임당이 그림을 보며 붓을 움직인다. 완성한 부분을 보고 입술을 살짝 내민다.)"
        },
        {
          speaker: "saimdang_mother",
          emotion: "gentle",
          text: "어디가 마음에 들지 않니?"
        },
        {
          speaker: "young_sinsaimdang",
          emotion: "frustrated",
          text: "보고 그렸는데도 다릅니다. 저기는 부드러운데 제 것은 딱딱합니다."
        },
        {
          speaker: "saimdang_mother",
          emotion: "gentle",
          text: "조금 쉬었다가 다시 보겠니?"
        },
        {
          speaker: "young_sinsaimdang",
          emotion: "focused",
          text: "이 부분만 한 번 더 보고 싶습니다."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(그림을 가까이 보던 아이가 고개를 조금 뒤로 뺀다.)"
        },
        {
          speaker: "young_sinsaimdang",
          emotion: "curious",
          text: "아, 가까이 볼 때와 멀리서 볼 때가 다릅니다."
        },
        {
          speaker: "saimdang_mother",
          emotion: "smile",
          text: "새로 보이는 것이 있구나."
        },
        {
          speaker: "young_sinsaimdang",
          emotion: "smile",
          text: "예. 아까는 이것을 못 봤습니다."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "[신사임당이 일곱 살 무렵부터 안견의 그림을 본받아 스스로 공부했다는 이야기가 전한다. 실제 모사 작품과 이날의 행동을 특정한 것은 아니다.]"
        },
        {
          speaker: "young_sinsaimdang",
          emotion: "curious",
          text: "당신도 좋아하는데 뜻대로 안 되는 일이 있습니까? 그럴 때는 어떻게 하십니까?"
        }
      ],
      historicalFacts: [
        "신사임당은 어린 시절부터 그림에 재능을 보였다고 전한다.",
        "일곱 살 무렵 안견의 그림을 스스로 본받아 공부했다는 기록이 전한다."
      ],
      storyGoal: "그림을 좋아하기 때문에 아쉬워하고 다시 관찰하는 어린 예술가의 모습을 보여준다.",
      tone: "작은 속상함에서 발견의 기쁨으로",
      specialRules: [
        "구체적인 대사·심리·표정·손동작과 플레이어의 등장은 창작이다. 실제 발언이나 기록된 교육법으로 인용하지 않는다.",
        "역사적 사건·날짜와 인물 정보는 historicalFacts에 있는 것만 사용한다. 전승·추정·창작을 확정 사실로 바꾸지 않는다.",
        "플레이어는 현대에서 온 목격자이며 실제 역사적 결과를 바꾸지 않는다. 호감도는 신뢰이며 연애나 교육 성적이 아니다.",
        "선택지는 마지막 사임당 대사에 답하며 NPC 반응도 해당 장면의 어린 또는 성인 사임당이 직접 맡는다.",
        "예술가와 가족 구성원의 모습을 함께 보여주며 완벽한 현모양처나 현대적인 표어를 말하는 인물로 단순화하지 않는다.",
        "성인 여성의 복식·말투·이름을 어린 시절에 그대로 적용하지 않는다. 현대 지폐와 후대의 평가는 본인이 미리 알지 못한다.",
        "안견에게 직접 배웠다고 말하지 않는다. 특정 작품을 모사했다고 근거 없이 단정하지 않는다.",
        "현재 어머니 대사는 확인된 그림 지도법이 아니다. 모든 시도가 즉시 성공하는 장면으로 만들지 않는다."
      ]
    },
    3: {
      title: "[혼인과 가족] 떠날 마음, 남을 마음",
      background: "step3",
      transition: {
        title: "1522년 혼인 이후 — 강릉 친정",
        text: "새 가족이 생겨도 익숙한 집의 걱정은 남는다. 사임당은 앞으로의 생활을 함께 의논한다."
      },
      characters: [
        "sinsaimdang",
        "yi_wonsu"
      ],
      script: [
        {
          speaker: "narration",
          emotion: null,
          text: "(혼인 뒤 친정에 머무는 시기의 한 날을 상상한 장면. 사임당이 집 안을 바라보다가 남편에게 말을 건넨다.)"
        },
        {
          speaker: "sinsaimdang",
          emotion: "thoughtful",
          text: "어머니 곁을 떠나는 일을 생각하면 마음이 쉽게 정리되지 않습니다."
        },
        {
          speaker: "yi_wonsu",
          emotion: "neutral",
          text: "앞으로 어디에서 어떻게 지낼지 함께 의논합시다."
        },
        {
          speaker: "sinsaimdang",
          emotion: "worried",
          text: "제 걱정만 말씀드리는 것 같아 망설였습니다."
        },
        {
          speaker: "yi_wonsu",
          emotion: "gentle",
          text: "가족의 일이니 같이 생각해야지요."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(사임당이 곁에 둔 종이와 붓을 한 번 바라본다.)"
        },
        {
          speaker: "sinsaimdang",
          emotion: "thoughtful",
          text: "그리고… 제가 하던 공부와 그림도 계속하고 싶습니다."
        },
        {
          speaker: "yi_wonsu",
          emotion: "gentle",
          text: "그 마음도 함께 이야기해주시오."
        },
        {
          speaker: "sinsaimdang",
          emotion: "smile",
          text: "말로 꺼내니 조금은 마음이 놓입니다."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "[사임당은 혼인 뒤 친정에 머물렀고 여러 지역에서 생활하며 강릉을 오갔다. 당시 처가 거주 관행도 고려해야 하며 이를 오직 개인적 예외나 남편의 특별한 허락만으로 설명할 수는 없다.]"
        },
        {
          speaker: "sinsaimdang",
          emotion: "curious",
          text: "당신은 여러 사람의 마음이 걸린 일을 정할 때, 무엇부터 말하시나요?"
        }
      ],
      historicalFacts: [
        "신사임당은 1522년 이원수와 혼인했다.",
        "혼인 후 친정에 머물렀고 이후 여러 지역에서 생활하며 강릉을 오갔다.",
        "그의 시에는 친정어머니를 그리워하는 마음도 나타난다."
      ],
      storyGoal: "가족에 대한 마음과 자기 작업을 계속하고 싶은 바람을 함께 말하는 사람으로 보여준다.",
      tone: "망설임과 서로 의논하는 안도",
      specialRules: [
        "구체적인 대사·심리·표정·손동작과 플레이어의 등장은 창작이다. 실제 발언이나 기록된 교육법으로 인용하지 않는다.",
        "역사적 사건·날짜와 인물 정보는 historicalFacts에 있는 것만 사용한다. 전승·추정·창작을 확정 사실로 바꾸지 않는다.",
        "플레이어는 현대에서 온 목격자이며 실제 역사적 결과를 바꾸지 않는다. 호감도는 신뢰이며 연애나 교육 성적이 아니다.",
        "선택지는 마지막 사임당 대사에 답하며 NPC 반응도 해당 장면의 어린 또는 성인 사임당이 직접 맡는다.",
        "예술가와 가족 구성원의 모습을 함께 보여주며 완벽한 현모양처나 현대적인 표어를 말하는 인물로 단순화하지 않는다.",
        "성인 여성의 복식·말투·이름을 어린 시절에 그대로 적용하지 않는다. 현대 지폐와 후대의 평가는 본인이 미리 알지 못한다.",
        "모든 조선 여성이 혼인 즉시 시집으로 가야 했다는 전제를 두지 않는다. 당시 혼인과 거주 관행의 다양성을 인정한다.",
        "친정 거주가 남편의 선의 하나로 가능했다고 단정하지 않는다. 위 대화는 구체적 합의 기록이 아니다.",
        "1522년 혼인 직후부터 어머니가 이미 홀로였다는 식으로 시점을 섞지 않는다. 이 장면은 혼인 이후 생활을 압축한 연출이다."
      ]
    },
    4: {
      title: "[새로운 생명] 아직은 이 작은 손부터",
      background: "step4",
      transition: {
        title: "1536년 — 강릉 오죽헌 몽룡실",
        text: "훗날 율곡이라 불릴 아이가 태어난다. 하지만 오늘의 사임당 앞에는 돌봄이 필요한 작은 생명이 있다."
      },
      characters: [
        "sinsaimdang",
        "yi_wonsu"
      ],
      script: [
        {
          speaker: "narration",
          emotion: null,
          text: "(출산 뒤 안정을 취하는 방. 사임당이 아이의 작은 손을 바라본다.)"
        },
        {
          speaker: "yi_wonsu",
          emotion: "gentle",
          text: "아이를 보고 계셨소?"
        },
        {
          speaker: "sinsaimdang",
          emotion: "smile",
          text: "손가락이 이렇게 작은데도 제 손을 쥐네요."
        },
        {
          speaker: "yi_wonsu",
          emotion: "smile",
          text: "당신처럼 붓을 잡는 날도 오겠지요."
        },
        {
          speaker: "sinsaimdang",
          emotion: "thoughtful",
          text: "그럴지도 모르지요. 무엇을 좋아할지는 천천히 알게 되겠지요."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(아이의 움직임에 사임당이 잠시 자세를 고쳐 앉는다.)"
        },
        {
          speaker: "yi_wonsu",
          emotion: "neutral",
          text: "피곤하지 않으시오?"
        },
        {
          speaker: "sinsaimdang",
          emotion: "worried",
          text: "피곤하지요. 기쁜 마음과 몸이 고된 것은 함께 오는가 봅니다."
        },
        {
          speaker: "yi_wonsu",
          emotion: "gentle",
          text: "내가 곁을 살피겠소. 잠시 쉬시오."
        },
        {
          speaker: "sinsaimdang",
          emotion: "moved",
          text: "고맙습니다. 지금은 잘 먹고 편히 자는 것부터 바라게 되네요."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "[1536년 — 신사임당은 강릉에서 셋째 아들 이이를 낳았다. 훗날의 이이와 출생 당시 부모의 마음은 구분해야 한다.]"
        },
        {
          speaker: "sinsaimdang",
          emotion: "curious",
          text: "당신도 소중한 일을 맞고 기쁘면서 한편으로는 버거웠던 적이 있나요?"
        }
      ],
      historicalFacts: [
        "1536년 이이가 강릉 오죽헌에서 태어났다.",
        "이이는 신사임당의 셋째 아들이며 훗날 율곡이라는 호를 쓴 학자·정치가로 성장했다."
      ],
      storyGoal: "위인의 탄생을 예언하는 어머니가 아니라 기쁨과 피로를 함께 느끼는 부모의 모습을 창작한다.",
      tone: "다정함과 몸의 피로, 도움에 대한 감사",
      specialRules: [
        "구체적인 대사·심리·표정·손동작과 플레이어의 등장은 창작이다. 실제 발언이나 기록된 교육법으로 인용하지 않는다.",
        "역사적 사건·날짜와 인물 정보는 historicalFacts에 있는 것만 사용한다. 전승·추정·창작을 확정 사실로 바꾸지 않는다.",
        "플레이어는 현대에서 온 목격자이며 실제 역사적 결과를 바꾸지 않는다. 호감도는 신뢰이며 연애나 교육 성적이 아니다.",
        "선택지는 마지막 사임당 대사에 답하며 NPC 반응도 해당 장면의 어린 또는 성인 사임당이 직접 맡는다.",
        "예술가와 가족 구성원의 모습을 함께 보여주며 완벽한 현모양처나 현대적인 표어를 말하는 인물로 단순화하지 않는다.",
        "성인 여성의 복식·말투·이름을 어린 시절에 그대로 적용하지 않는다. 현대 지폐와 후대의 평가는 본인이 미리 알지 못한다.",
        "부모가 그 자리에서 이이라는 이름을 결정했다거나 유명한 교육 방침을 선언했다고 지어내지 않는다.",
        "피로와 남편의 돌봄은 사실로 확인된 구체적 출산 기록이 아닌 연출이다.",
        "아이의 재능과 미래를 부모가 미리 알아보거나 양육만으로 성공이 보장된다고 말하지 않는다."
      ]
    },
    5: {
      title: "[예술가의 눈] 작은 것도 오래 보고 싶어서",
      background: "step5",
      transition: {
        title: "성년기의 한 날 — 오죽헌 마당을 상상하며",
        text: "풀 한 줄기와 벌레의 움직임 앞에서 붓이 멈춘다. 익숙한 풍경을 새롭게 보는 시간이 시작된다."
      },
      characters: [
        "sinsaimdang",
        "saimdang_child"
      ],
      script: [
        {
          speaker: "narration",
          emotion: null,
          text: "(마당. 사임당이 그림을 그리다 말고 잎 아래를 살핀다. 이름 없는 아이가 곁으로 다가온다.)"
        },
        {
          speaker: "saimdang_child",
          emotion: "curious",
          text: "어머니, 그림은 안 그리고 무엇을 보세요?"
        },
        {
          speaker: "sinsaimdang",
          emotion: "focused",
          text: "잎이 가려서 벌레가 어떻게 앉았는지 잘 안 보이는구나."
        },
        {
          speaker: "saimdang_child",
          emotion: "curious",
          text: "작은 벌레 하나인데 꼭 봐야 합니까?"
        },
        {
          speaker: "sinsaimdang",
          emotion: "smile",
          text: "내가 궁금해서 그렇지. 아까는 그냥 지나쳤는데 지금은 자꾸 보게 되네."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "(벌레가 움직이자 사임당이 붓을 잠시 놓고 아이와 함께 웃는다.)"
        },
        {
          speaker: "saimdang_child",
          emotion: "smile",
          text: "벌써 다른 곳으로 갔어요!"
        },
        {
          speaker: "sinsaimdang",
          emotion: "smile",
          text: "내 그림보다 저 아이가 훨씬 부지런하구나."
        },
        {
          speaker: "saimdang_child",
          emotion: "curious",
          text: "진짜처럼 그리면 닭도 벌레인 줄 알까요?"
        },
        {
          speaker: "sinsaimdang",
          emotion: "smile",
          text: "그렇다면 그림부터 잘 챙겨두어야겠네."
        },
        {
          speaker: "narration",
          emotion: null,
          text: "[신사임당은 시·글씨·그림에 능했던 예술가로 전한다. 초충도 등은 그의 작품으로 전하는 그림도 있으며, 닭이 그림을 쪼았다는 이야기는 사실로 확정된 현장 기록이 아닌 일화로 구분한다.]"
        },
        {
          speaker: "narration",
          emotion: null,
          text: "배우는 아이이자 가족을 그리워한 딸, 아이를 돌보는 어머니이자 자기 눈으로 세상을 그린 사람. 신사임당의 삶에는 여러 모습이 함께 있었다."
        },
        {
          speaker: "sinsaimdang",
          emotion: "curious",
          text: "당신에게도 남들은 지나치지만 자꾸 눈길이 가는 것이 있나요?"
        }
      ],
      historicalFacts: [
        "신사임당은 시·글씨·그림에 능했던 조선 전기 예술가로 전한다.",
        "신사임당의 작품으로 전하는 초충도 등이 있으나 전래 작품의 작가 귀속에는 주의가 필요하다."
      ],
      storyGoal: "관찰의 원칙을 훈계하기보다 작은 움직임에 몰두하고 웃는 예술가의 즐거움을 보여준다.",
      tone: "가벼운 웃음과 몰입, 따뜻한 여운",
      specialRules: [
        "구체적인 대사·심리·표정·손동작과 플레이어의 등장은 창작이다. 실제 발언이나 기록된 교육법으로 인용하지 않는다.",
        "역사적 사건·날짜와 인물 정보는 historicalFacts에 있는 것만 사용한다. 전승·추정·창작을 확정 사실로 바꾸지 않는다.",
        "플레이어는 현대에서 온 목격자이며 실제 역사적 결과를 바꾸지 않는다. 호감도는 신뢰이며 연애나 교육 성적이 아니다.",
        "선택지는 마지막 사임당 대사에 답하며 NPC 반응도 해당 장면의 어린 또는 성인 사임당이 직접 맡는다.",
        "예술가와 가족 구성원의 모습을 함께 보여주며 완벽한 현모양처나 현대적인 표어를 말하는 인물로 단순화하지 않는다.",
        "성인 여성의 복식·말투·이름을 어린 시절에 그대로 적용하지 않는다. 현대 지폐와 후대의 평가는 본인이 미리 알지 못한다.",
        "익명의 아이를 특정 자녀로 단정하지 않는다. 실제 그린 날짜·장소와 특정 그림의 제작 장면을 복원했다고 말하지 않는다.",
        "닭이 실제 그림을 쪼는 장면은 확정 사실로 연출하지 않는다. 위 대사는 후대 일화를 떠올리는 창작 농담이다.",
        "현존 초충도 전체를 친필로 확정하거나 모든 작품을 집안일 틈에만 그렸다고 단정하지 않는다."
      ]
    }
  }
} as const;
