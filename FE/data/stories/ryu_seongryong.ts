// 사실과 창작 대사를 구분한 류성룡 5챕터 이야기입니다.
export const ryuSeongryongStory = {
  "id": "ryu_seongryong",
  "title": "서애 류성룡 — 책장과 장부, 그리고 남겨진 기록",
  "location": "하회마을·한양 조정·피란길·전시 군무 현장",
  "description": "책에 빠진 청년의 웃음에서 천거의 책임, 피란의 불안, 군량의 고민, 자신의 기억을 쓰는 망설임까지 따라가는 다섯 장면.",
  "sources": [
    {
      "title": "한국민족문화대백과사전 — 유성룡",
      "url": "https://encykorea.aks.ac.kr/Article/E0041546"
    },
    {
      "title": "한국민족문화대백과사전 — 훈련도감",
      "url": "https://encykorea.aks.ac.kr/Article/E0065793"
    },
    {
      "title": "국사편찬위원회 — 징비록",
      "url": "https://contents.history.go.kr/play/view.do?levelId=ts_b31"
    },
    {
      "title": "국립중앙박물관 — 류성룡 관련 전시 보도자료",
      "url": "https://www.museum.go.kr/MUSEUM/contents/M0701040000.do?arcId=2871&catCustomType=post&catId=93&cp=&schM=view&sv="
    }
  ],
  "turns": {
    1: {
      "title": "[하회의 학자] 책은 도망가지 않는다",
      "background": "hahoe",
      "showOpeningTransition": true,
      "transition": {
        "title": "청년기 · 1566년 급제 이전 — 안동 하회마을",
        "text": "한 대목만 더 읽으려던 청년. 형의 말에 웃으면서도 손은 다음 책장으로 향한다."
      },
      "characters": [
        "ryu_seongryong",
        "ryu_unryong"
      ],
      "script": [
        {
          "speaker": "narration",
          "emotion": null,
          "text": "(하회마을의 방. 류성룡이 책장을 되넘긴다. 형 류운룡이 곁으로 온다.)"
        },
        {
          "speaker": "ryu_unryong",
          "emotion": "smile",
          "text": "성룡아, 그 책은 도망가지 않는다. 잠깐 눈을 떼어도 되겠구나."
        },
        {
          "speaker": "ryu_seongryong",
          "emotion": "smile",
          "text": "책은 그대로인데 제가 읽은 뜻이 자꾸 달아납니다."
        },
        {
          "speaker": "ryu_unryong",
          "emotion": "curious",
          "text": "아까 읽은 곳이 아니냐?"
        },
        {
          "speaker": "ryu_seongryong",
          "emotion": "thoughtful",
          "text": "예. 알았다고 생각했는데 다시 읽으니 다르게 보입니다."
        },
        {
          "speaker": "ryu_unryong",
          "emotion": "smile",
          "text": "그렇게 배워서 무엇을 하려느냐?"
        },
        {
          "speaker": "ryu_seongryong",
          "emotion": "thoughtful",
          "text": "사람들이 사는 일에 써보고 싶습니다. 글로는 분명한데 실제로도 그럴지는 모르겠습니다."
        },
        {
          "speaker": "ryu_unryong",
          "emotion": "neutral",
          "text": "그 차이를 배우는 일도 쉽지 않겠지."
        },
        {
          "speaker": "ryu_seongryong",
          "emotion": "smile",
          "text": "그러니 오늘은 이 대목까지만… 아니, 다음 대목도 조금 보겠습니다."
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "[류성룡은 이황의 문하에서 공부했고 1566년 문과에 급제했다. 하회에서 형과 나누는 이 문답은 창작이다.]"
        },
        {
          "speaker": "ryu_seongryong",
          "emotion": "curious",
          "text": "당신도 좋아하는 일을 하다 그만둘 때를 놓쳐본 적이 있습니까?"
        }
      ],
      "historicalFacts": [
        "류성룡은 풍산류씨 가문 출신으로 이황에게 배웠다.",
        "1566년 별시 문과에 급제해 관직에 진출했다."
      ],
      "storyGoal": "학문에 몰두하는 청년의 즐거움과 실제로 쓸 수 있을지 모르는 불확실함을 함께 보여준다.",
      "tone": "형제 사이의 가벼운 웃음",
      "specialRules": [
        "구체적인 대사·표정·몸짓·심리와 플레이어의 등장은 창작 연출이다. 실제 발언·편지·저술의 원문으로 인용하지 않는다.",
        "역사적 사건은 historicalFacts에 따라 설명하고 추정이나 회고를 확정 사실로 바꾸지 않는다.",
        "마지막 류성룡 대사에 응답하는 선택지를 만들고 NPC 반응은 ryu_seongryong이 맡는다.",
        "플레이어의 선택과 호감도는 신뢰를 나타내며 실제 역사적 결과를 바꾸지 않는다.",
        "kimmun은 신하 등 장면별 공용 역할이다. 모든 시대에 걸쳐 동일한 실존 인물이 동행했다고 말하지 않는다.",
        "웃음은 소박한 대화에서만 사용한다. 기근·피란·전사자·백성의 피해를 농담으로 소비하지 않는다.",
        "류운룡과의 구체적인 대화와 이 날의 독서 상황은 기록된 일화가 아니다.",
        "하회를 출생지로 단정하지 않는다. 청년기 배경은 상징적으로 재구성한 장소다."
      ]
    },
    2: {
      "title": "[인재를 알아보다] 사람을 권한다는 무게",
      "background": "court",
      "transition": {
        "title": "1591년 — 한양 조정",
        "text": "사람의 이름을 올리는 자리. 천거하는 사람에게도 그 뒤의 책임이 남는다."
      },
      "characters": [
        "ryu_seongryong",
        "kimmun"
      ],
      "script": [
        {
          "speaker": "narration",
          "emotion": null,
          "text": "(조정에서 인사에 관한 논의를 마친 뒤, 신하가 류성룡에게 묻는다.)"
        },
        {
          "speaker": "kimmun",
          "emotion": "neutral",
          "text": "대감, 이순신을 전라좌수사로 천거하시겠다는 말씀이십니까?"
        },
        {
          "speaker": "ryu_seongryong",
          "emotion": "determined",
          "text": "그렇소. 지금 맡길 일을 감당할 사람을 찾아야 하오."
        },
        {
          "speaker": "kimmun",
          "emotion": "nagging",
          "text": "승진이 너무 빠르다는 말도 나올 것입니다."
        },
        {
          "speaker": "ryu_seongryong",
          "emotion": "thoughtful",
          "text": "그 말도 살펴야지요. 다만 품계만으로 능력을 다 헤아릴 수는 없소."
        },
        {
          "speaker": "kimmun",
          "emotion": "neutral",
          "text": "잘 아는 사이라 더욱 믿으시는 것입니까?"
        },
        {
          "speaker": "ryu_seongryong",
          "emotion": "worried",
          "text": "아는 사람이니 더 가볍게 권할 수 없소. 그 사람이 맡을 일과 내 천거의 책임을 함께 생각해야 하오."
        },
        {
          "speaker": "kimmun",
          "emotion": "neutral",
          "text": "천거하는 분도 마음이 무겁겠습니다."
        },
        {
          "speaker": "ryu_seongryong",
          "emotion": "thoughtful",
          "text": "이름 하나 적는 일인데, 그 뒤에 달린 것이 참 많소."
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "[1591년 류성룡은 이순신을 전라좌수사에 천거한 인물로 알려져 있다. 권율의 요직 천거 등 인재 등용에도 관여했다. 문답은 창작이다.]"
        },
        {
          "speaker": "ryu_seongryong",
          "emotion": "curious",
          "text": "당신이라면 중요한 일을 맡길 사람의 무엇을 먼저 살피겠소?"
        }
      ],
      "historicalFacts": [
        "1591년 이순신의 전라좌수사 천거에 류성룡이 관여했다.",
        "권율의 요직 천거와 방어체제 정비에도 힘썼다."
      ],
      "storyGoal": "인재를 알아본 확신과 추천자가 감당해야 할 걱정을 함께 보여준다.",
      "tone": "신중한 판단과 책임",
      "specialRules": [
        "구체적인 대사·표정·몸짓·심리와 플레이어의 등장은 창작 연출이다. 실제 발언·편지·저술의 원문으로 인용하지 않는다.",
        "역사적 사건은 historicalFacts에 따라 설명하고 추정이나 회고를 확정 사실로 바꾸지 않는다.",
        "마지막 류성룡 대사에 응답하는 선택지를 만들고 NPC 반응은 ryu_seongryong이 맡는다.",
        "플레이어의 선택과 호감도는 신뢰를 나타내며 실제 역사적 결과를 바꾸지 않는다.",
        "kimmun은 신하 등 장면별 공용 역할이다. 모든 시대에 걸쳐 동일한 실존 인물이 동행했다고 말하지 않는다.",
        "웃음은 소박한 대화에서만 사용한다. 기근·피란·전사자·백성의 피해를 농담으로 소비하지 않는다.",
        "천거와 임명은 구분한다. 류성룡 혼자 최종 임명했다고 말하지 않는다.",
        "당시 실제로 있었던 특정 인사 논쟁의 발언으로 이 창작 문답을 제시하지 않는다.",
        "미래 해전의 승리를 이미 아는 듯 말하지 않는다."
      ]
    },
    3: {
      "title": "[임진왜란] 돌아보지 못한 길",
      "background": "evacuation",
      "transition": {
        "title": "1592년 봄 — 한양에서 북쪽으로 향하는 피란길",
        "text": "급보를 받던 한양에서 북쪽으로. 떠나는 발걸음 곁에는 남겨진 사람들의 삶이 있다."
      },
      "characters": [
        "ryu_seongryong",
        "seonjo",
        "kimmun"
      ],
      "script": [
        {
          "speaker": "narration",
          "emotion": null,
          "text": "(급보가 이어진다. 피란을 준비하는 사람들의 발걸음이 분주하다.)"
        },
        {
          "speaker": "kimmun",
          "emotion": "surprised",
          "text": "대감, 적의 진격이 빠르다 하옵니다. 보고가 또 들어왔습니다."
        },
        {
          "speaker": "ryu_seongryong",
          "emotion": "urgent",
          "text": "어느 곳에서 온 것인가? 먼저 도착한 시각부터 확인하라."
        },
        {
          "speaker": "seonjo",
          "emotion": "serious",
          "text": "이대로 도성을 떠나야 하겠는가?"
        },
        {
          "speaker": "ryu_seongryong",
          "emotion": "worried",
          "text": "전하, 조정이 명을 내리고 군사를 수습할 길을 이어가야 하옵니다."
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "(장면이 피란길로 바뀐다. 류성룡이 뒤쪽을 돌아본다.)"
        },
        {
          "speaker": "kimmun",
          "emotion": "neutral",
          "text": "대감, 걸음을 서두르셔야 합니다."
        },
        {
          "speaker": "ryu_seongryong",
          "emotion": "sad",
          "text": "남은 사람들은 어디로 가야 할지…. 우리는 명을 전할 길이라도 놓쳐서는 안 되오."
        },
        {
          "speaker": "kimmun",
          "emotion": "neutral",
          "text": "무엇부터 하시겠습니까?"
        },
        {
          "speaker": "ryu_seongryong",
          "emotion": "determined",
          "text": "흩어진 보고를 모으시오. 군사가 어디에 있고 군량이 얼마나 남았는지부터 알아야 하오."
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "[1592년 류성룡은 도체찰사 등으로 군무를 맡고 선조를 호종했다. 전쟁 초 탄핵으로 면직되었다가 다시 군무를 맡았다. 피란을 둘러싼 대화는 여러 상황을 압축한 창작이다.]"
        },
        {
          "speaker": "ryu_seongryong",
          "emotion": "worried",
          "text": "두려울 때일수록 무엇부터 확인해야 하는지, 당신이라면 어떻게 정하겠소?"
        }
      ],
      "historicalFacts": [
        "1592년 임진왜란이 일어나자 군무를 맡고 선조의 피란을 수행했다.",
        "전쟁 초 면직을 겪었으며 이후 다시 군사 업무를 맡았다."
      ],
      "storyGoal": "위기 속 두려움과 남겨진 사람들에 대한 무거운 마음을 구체적인 업무로 연결한다.",
      "tone": "다급함과 무력감",
      "specialRules": [
        "구체적인 대사·표정·몸짓·심리와 플레이어의 등장은 창작 연출이다. 실제 발언·편지·저술의 원문으로 인용하지 않는다.",
        "역사적 사건은 historicalFacts에 따라 설명하고 추정이나 회고를 확정 사실로 바꾸지 않는다.",
        "마지막 류성룡 대사에 응답하는 선택지를 만들고 NPC 반응은 ryu_seongryong이 맡는다.",
        "플레이어의 선택과 호감도는 신뢰를 나타내며 실제 역사적 결과를 바꾸지 않는다.",
        "kimmun은 신하 등 장면별 공용 역할이다. 모든 시대에 걸쳐 동일한 실존 인물이 동행했다고 말하지 않는다.",
        "웃음은 소박한 대화에서만 사용한다. 기근·피란·전사자·백성의 피해를 농담으로 소비하지 않는다.",
        "정확한 하루의 실제 대화나 류성룡의 독단적인 피란 결정으로 표현하지 않는다.",
        "국왕의 안전만으로 모든 백성을 구할 수 있었다고 단순화하거나 반드시 이긴다고 장담하지 않는다."
      ]
    },
    4: {
      "title": "[전쟁 속 개혁] 군량 장부도 전쟁입니다",
      "background": "military_office",
      "transition": {
        "title": "1593~1594년 — 한양 · 군무를 논하는 자리",
        "text": "다시 훈련을 시작하는 군사들. 무기와 함께 끼니를 마련할 방법도 찾아야 한다."
      },
      "characters": [
        "ryu_seongryong",
        "kimmun"
      ],
      "script": [
        {
          "speaker": "narration",
          "emotion": null,
          "text": "(훈련과 군량에 관한 문서가 쌓여 있다. 류성룡이 두 장을 나란히 놓는다.)"
        },
        {
          "speaker": "kimmun",
          "emotion": "neutral",
          "text": "훈련할 군사를 더 모으자는 논의가 있습니다."
        },
        {
          "speaker": "ryu_seongryong",
          "emotion": "thoughtful",
          "text": "먹일 곡식은 얼마나 마련되어 있소?"
        },
        {
          "speaker": "kimmun",
          "emotion": "neutral",
          "text": "아직 충분하지 않습니다. 무기 마련도 서둘러야 합니다."
        },
        {
          "speaker": "ryu_seongryong",
          "emotion": "worried",
          "text": "사람만 모아놓고 굶길 수는 없소. 훈련과 먹을 것을 함께 살펴야 하오."
        },
        {
          "speaker": "kimmun",
          "emotion": "neutral",
          "text": "칼과 총 이야기보다 장부를 더 오래 보십니다."
        },
        {
          "speaker": "ryu_seongryong",
          "emotion": "thoughtful",
          "text": "그것을 들 사람의 끼니가 여기 적혀 있으니까요."
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "(류성룡이 잘못 적힌 수량을 고치고 다시 확인한다.)"
        },
        {
          "speaker": "kimmun",
          "emotion": "neutral",
          "text": "전쟁 중에 제도를 고치는 일이 쉽지 않습니다."
        },
        {
          "speaker": "ryu_seongryong",
          "emotion": "determined",
          "text": "알고 있소. 그래도 훈련할 길과 버틸 살림을 만들어야 하오."
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "[훈련도감은 1593년 설치되었다. 류성룡은 군사훈련·무기·군량 마련과 백성 구휼을 추진했다. 장부를 살피는 이 장면은 창작이다.]"
        },
        {
          "speaker": "ryu_seongryong",
          "emotion": "worried",
          "text": "서둘러야 할 일들이 서로 맞물려 있을 때, 당신은 어디서부터 풀겠소?"
        }
      ],
      "historicalFacts": [
        "훈련도감은 1593년 설치되었다.",
        "류성룡은 전시 군사훈련과 무기·군량 확충, 굶주린 백성의 구휼에 힘썼다."
      ],
      "storyGoal": "개혁을 선언하는 장면보다 군사를 먹이고 훈련시킬 현실적인 어려움을 보여준다.",
      "tone": "피로 속 끈기",
      "specialRules": [
        "구체적인 대사·표정·몸짓·심리와 플레이어의 등장은 창작 연출이다. 실제 발언·편지·저술의 원문으로 인용하지 않는다.",
        "역사적 사건은 historicalFacts에 따라 설명하고 추정이나 회고를 확정 사실로 바꾸지 않는다.",
        "마지막 류성룡 대사에 응답하는 선택지를 만들고 NPC 반응은 ryu_seongryong이 맡는다.",
        "플레이어의 선택과 호감도는 신뢰를 나타내며 실제 역사적 결과를 바꾸지 않는다.",
        "kimmun은 신하 등 장면별 공용 역할이다. 모든 시대에 걸쳐 동일한 실존 인물이 동행했다고 말하지 않는다.",
        "웃음은 소박한 대화에서만 사용한다. 기근·피란·전사자·백성의 피해를 농담으로 소비하지 않는다.",
        "훈련도감 설치를 1594년으로 쓰지 않는다. 이후 운영 정비와 설치 시점을 구분한다.",
        "류성룡 한 사람이 모든 군사 개혁을 만들었다고 과장하지 않는다.",
        "장부의 구체적인 수치나 이 문답이 담긴 실물 기록이 있다고 꾸며내지 않는다."
      ]
    },
    5: {
      "title": "[징비록] 내 이름이 나오는 대목도",
      "background": "hahoe",
      "transition": {
        "title": "전란 이후 · 말년 — 안동 하회 일대",
        "text": "고향으로 돌아온 뒤 펼친 종이. 잊고 싶은 일도 쓰려면 다시 떠올려야 한다."
      },
      "characters": [
        "ryu_seongryong",
        "seongryong_student"
      ],
      "script": [
        {
          "speaker": "narration",
          "emotion": null,
          "text": "(안동. 류성룡이 전란의 기록을 정리하다 붓을 멈춘다.)"
        },
        {
          "speaker": "seongryong_student",
          "emotion": "curious",
          "text": "그 대목은 아까도 고치지 않으셨습니까?"
        },
        {
          "speaker": "ryu_seongryong",
          "emotion": "thoughtful",
          "text": "남의 일을 쓸 때보다 내 일을 쓸 때 손이 더디구나."
        },
        {
          "speaker": "seongryong_student",
          "emotion": "worried",
          "text": "생각하기 괴로운 일이십니까?"
        },
        {
          "speaker": "ryu_seongryong",
          "emotion": "sad",
          "text": "괴롭기도 하고, 나도 모르게 변명부터 쓰게 될까 두렵기도 하네."
        },
        {
          "speaker": "seongryong_student",
          "emotion": "neutral",
          "text": "잠시 덮어두셔도 되지 않겠습니까?"
        },
        {
          "speaker": "ryu_seongryong",
          "emotion": "thoughtful",
          "text": "잠깐 쉬는 것은 좋지. 하지만 불편한 대목이라고 빼놓을 수는 없네."
        },
        {
          "speaker": "seongryong_student",
          "emotion": "curious",
          "text": "후세를 위해서입니까?"
        },
        {
          "speaker": "ryu_seongryong",
          "emotion": "determined",
          "text": "무엇을 놓쳤는지 살필 자료는 남겨야지. 내 이름이 나오는 대목도 말일세."
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "(류성룡이 붓을 내려놓고 굳은 손을 편다. 잠시 뒤 다시 종이를 당겨온다.)"
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "[류성룡은 1598년 파직 뒤 고향으로 돌아와 전란 경험을 징비록으로 남겼다. 회고에는 반성과 자신의 입장에 대한 설명이 함께 담겨 있다. 이 고백과 집필 동작은 창작이다.]"
        },
        {
          "speaker": "narration",
          "emotion": null,
          "text": "[ENDING — 전쟁을 수습하던 손은 기록을 남겼다. 그 기록에는 판단과 실수, 지키고 싶었던 사람들의 삶이 함께 놓여 있다.]"
        },
        {
          "speaker": "ryu_seongryong",
          "emotion": "thoughtful",
          "text": "당신이라면 스스로에게 불리한 기억도 남길 수 있겠는가?"
        }
      ],
      "historicalFacts": [
        "1598년 파직 뒤 고향으로 돌아왔고 1600년 복관되었으나 다시 벼슬하지 않았다.",
        "전란 경험을 바탕으로 징비록을 남겼다. 반성뿐 아니라 자신의 입장을 설명하는 성격도 살펴야 한다."
      ],
      "storyGoal": "자신의 실패가 담긴 기록 앞에서 망설이는 사람을 보여준다.",
      "tone": "씁쓸함과 조용한 결심",
      "specialRules": [
        "구체적인 대사·표정·몸짓·심리와 플레이어의 등장은 창작 연출이다. 실제 발언·편지·저술의 원문으로 인용하지 않는다.",
        "역사적 사건은 historicalFacts에 따라 설명하고 추정이나 회고를 확정 사실로 바꾸지 않는다.",
        "마지막 류성룡 대사에 응답하는 선택지를 만들고 NPC 반응은 ryu_seongryong이 맡는다.",
        "플레이어의 선택과 호감도는 신뢰를 나타내며 실제 역사적 결과를 바꾸지 않는다.",
        "kimmun은 신하 등 장면별 공용 역할이다. 모든 시대에 걸쳐 동일한 실존 인물이 동행했다고 말하지 않는다.",
        "웃음은 소박한 대화에서만 사용한다. 기근·피란·전사자·백성의 피해를 농담으로 소비하지 않는다.",
        "제자는 이름 없는 창작 보조 역할이다. 특정 실존 제자의 문답으로 소개하지 않는다.",
        "현재 충효당 전체를 류성룡 생전의 집필 공간으로 단정하지 않는다.",
        "징비록을 완벽히 객관적인 기록이나 모든 잘못을 인정한 고백으로 단정하지 않는다.",
        "정확한 집필 시작일·완성일·이 대화의 날짜를 임의로 정하지 않는다."
      ]
    }
  }
} as const;
