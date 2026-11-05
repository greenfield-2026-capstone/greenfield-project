import type { LocaleCode } from "./locale";

export const VOICE_VERSION = "voice-v3";

export const localeVoicePolicies = {
  "ko": {
    "rules": "한국어: ~하는가는 하게체이며 왕 전용 표현이 아니다. 인물별 존대말·하오체·하게체를 우선한다. 왕도 설명·질문·위로를 모두 ~하라로 끝내지 않는다. ~하라 등 강한 명령은 실제 지시와 관계가 뒷받침할 때만 쓴다. 의지를 밝힐 때는 ~하겠노라/~하겠다를 관계와 감정에 맞게 사용한다. 학자는 차분한 설명과 하게체, 상인·예술가는 기존 인물 설정의 단정한 존대말을 유지한다. 예: 질문은 “그대는 어찌 생각하는가?”, 지시는 “그 까닭을 말하라.”, 부드러운 제안은 “함께 살펴보겠는가?”처럼 발화 목적을 구분한다. 예시의 내용을 대사마다 반복하지 않는다."
  },
  "en": {
    "rules": "English: use dignified, measured language for royalty and cultivated speech for scholars. Distinguish inquiry, command, suggestion and resolve by communicative intent, not punctuation. Could you / would you may be polite requests, not questions about ability; preserve their request force. Use an imperative only when the source or situation actually directs. Default to I/you; do not force thou/thee, royal we or European titles. For a monarch, favor composed, decisive wording without making every line an order; let a scholar explain precisely and a merchant speak concretely. Illustrative contrast: inquiry “What leads you to that conclusion?”, direct instruction “Explain your reasons.”, gentle request “Would you tell me more?” Match the source force rather than substituting these examples verbatim."
  },
  "zh-Hans": {
    "rules": "简体中文：使用自然庄重的表达，以措辞和句式保留人物气度，不把所有提问改成命令。朕具有皇帝自称的特定含义，不因人物是国王就自动使用；仅在原文明确采用相应自称或当前场景明确为皇帝时考虑使用。身份或时期不明时用中性自称或自然省略，不能为了用朕而虚构身份。保留韩国身份与称号，不套用中国朝代设定。国王可庄重而简洁，学者重在说理，商人重在实际，不统一写成宫廷命令。按语境区分询问“你为何这样想？”，指示“说说你的理由。”和建议“不妨一同看看。”，不要把例句机械重复。"
  },
  "zh-Hant": {
    "rules": "繁體中文：使用自然莊重的表達，以措辭和句式保留人物氣度，不把所有提問改成命令。朕具有皇帝自稱的特定含義，不因人物是國王就自動使用；僅在原文明確採用相應自稱或當前場景明確為皇帝時考慮使用。身分或時期不明時用中性自稱或自然省略，不能為了用朕而虛構身分。保留韓國身分與稱號，不套用中國朝代設定。國王可莊重而簡潔，學者重在說理，商人重在實際，不統一寫成宮廷命令。按語境區分詢問「你為何這樣想？」，指示「說說你的理由。」和建議「不妨一同看看。」，不要把例句機械重複。"
  },
  "ja": {
    "rules": "日本語：尊敬語は立てる人物の動作、謙譲語は自分側の動作によって相手を立てる表現、丁寧語は聞き手への丁寧さとして区別する。王が話者だからといって自分の動作を尊敬語にしない。臣下が王に話す場合と王が訪問者に話す場合を分ける。威厳は落ち着いた語彙と文で示し、朕・ぞよ等を一律に付けない。単なる未知の訪問者を家臣扱いせず、韓国の王を日本の天皇や武将に置き換えない。王は落ち着いた断定や問いかけ、学者は筋道のある説明、商人は具体的で礼儀正しい表現を基本とする。質問「どう考えるか」、指示「理由を述べよ」、穏やかな依頼「もう少し聞かせてもらえるか」は強さが異なるため、関係と原文に合う場合だけ使う。すべてを「述べよ」の調子にしない。"
  },
  "th": {
    "rules": "Thai: first identify who speaks, who is addressed, and who is referred to. Distinguish speech TO a royal listener from speech BY a monarch, and distinguish respectful reference to a royal third person from both. Never give a king the supplicant self-reference ข้าพระพุทธเจ้า merely because royalty is present. Do not copy ceremonial letter openings into casual dialogue. Use restrained natural Thai matching rank, relationship and speech act; preserve Korean identity. When royal status or relationship is unknown, avoid inventing elaborate royal pronouns and use natural omission or neutral respectful phrasing. Select polite particles according to the actual speaker and speech act; do not append the same particle to every utterance solely to signal rank. Keep a monarch composed, a scholar explanatory and a merchant practical; retain gentle affection in family dialogue."
  },
  "vi": {
    "rules": "Vietnamese: choose self-reference and address as a consistent pair using known relationship, relative age, social position and emotional context. Do not switch address terms randomly or guess the visitor's age, gender or family relationship. With insufficient context prefer neutral respectful phrasing or natural omission. Do not automatically assign trẫm to every king: special court self-reference requires explicit source/context support. Keep a selected address pair through the conversation unless a real relationship or emotional change calls for a switch. For a direct instruction, a polite request and a suggestion choose different degrees of force; do not add an imperative marker to every sentence. Preserve inquiry, requests, commands and affection without court-drama parody."
  },
  "ru": {
    "rules": "Russian: use respectful вы for an unknown adult visitor and ты only when source relationship, age or intimacy supports it; keep verb agreement consistent. Use ordinary lowercase вы in dialogue unless sentence-initial or an explicit formal-correspondence style requires Вы. Do not infer a child/servant relationship from the speaker's rank. Convey authority through concise measured phrasing; preserve question and request force, without Russian imperial titles or invented archaic self-reference. For example, distinguish the inquiry «Почему вы так думаете?», instruction «Объясните причину.» and request «Не могли бы вы объяснить?». A royal speaker may be concise and firm without abusing the listener; a scholar should remain explanatory."
  },
  "fr": {
    "rules": "Français : employer vous avec un visiteur adulte inconnu ; réserver tu à une familiarité ou une relation explicitement établie. Garder la même personne grammaticale et les accords tant que la relation ne change pas. Ne pas remplacer vous par il/elle pour paraître respectueux. Rendre la dignité par une formulation mesurée, sans transformer une demande en ordre ni attribuer des titres de la monarchie française. Distinguer par exemple la question « Pourquoi pensez-vous cela ? », la consigne « Expliquez vos raisons. » et la demande « Pourriez-vous préciser ? ». Un monarque peut être ferme et posé, un érudit explicatif ; ne pas imposer une tonalité de commandement à tous."
  },
  "de": {
    "rules": "Deutsch: Einen unbekannten erwachsenen Besucher mit Sie ansprechen; du nur bei ausdrücklich passender Vertrautheit oder Beziehung. Höflichkeitsanrede Sie, Ihnen, Ihr korrekt großschreiben und grammatisch konsistent verwenden; vertrautes du grundsätzlich klein. Der Rang des Sprechers allein rechtfertigt kein herablassendes du. Würde durch präzise ruhige Formulierungen ausdrücken; keine erfundenen deutschen Herrschertitel oder erzwungenen Archaismen. Beispielsweise Frage „Warum denken Sie das?“, Anweisung „Erklären Sie Ihre Gründe.“ und Bitte „Könnten Sie das erläutern?“ unterscheiden. Ein Herrscher kann bestimmt, ein Gelehrter erklärend und ein Händler sachlich sprechen; nicht jede Äußerung zum Befehl machen."
  },
  "es": {
    "rules": "Español: si no se especifica una región, usar usted con un visitante adulto desconocido; tú o vos solo si la relación o el texto fuente lo justifica. Usted exige verbo de tercera persona y posesivos su/suyo; no mezclar con conjugaciones de tú ni vuestro. Ustedes tiene usos formales e informales según la región y no prueba por sí solo una jerarquía. Mantener preguntas, peticiones y órdenes distintas, con dignidad natural y sin títulos españoles inventados. Diferenciar, por ejemplo, la pregunta «¿Por qué piensa eso?», la instrucción «Explique sus razones.» y la petición «¿Podría explicarlo?». El monarca puede hablar con firmeza serena, el erudito con claridad explicativa y el comerciante de asuntos concretos; no convertir todas las frases en órdenes."
  }
} satisfies Record<LocaleCode, { rules: string }>;
