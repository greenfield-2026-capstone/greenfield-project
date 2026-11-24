import { search } from "../src/rag/vectorStore";

const cases: [string, string][] = [
  ["태조 이성계", "한양으로 도읍을 옮긴 이유가 뭐야?"],
  ["세종대왕", "훈민정음은 언제 만들었어?"],
  ["정조", "규장각은 무슨 일을 했어?"],
  ["고종", "대한제국은 언제 선포했어?"],
  ["흥선대원군", "경복궁은 왜 다시 지었어?"],
  ["김만덕", "김만덕은 흉년에 어떻게 했어?"],
  ["추사 김정희", "세한도는 누구에게 그려줬어?"],
  ["신사임당", "초충도는 어떤 그림이야?"],
  ["율곡 이이", "시무육조는 뭐야?"],
  ["류성룡", "징비록은 왜 썼어?"],
];

for (const [name, q] of cases) {
  const hits = search(name, q);
  console.log(`\n== ${name} | ${q} | hits=${hits.length}`);
  hits.forEach((h, i) => console.log(`  [${i + 1}] ${h.slice(0, 80)}`));
}

const keyword: Record<string, string> = {
  "태조 이성계": "천도",
  세종대왕: "1443",
  정조: "규장각",
  고종: "1897",
  흥선대원군: "중건",
  김만덕: "1795",
  "추사 김정희": "세한도",
  신사임당: "초충도",
  "율곡 이이": "시무육조",
  류성룡: "징비록",
};

console.log("\n=== 핵심어 포함 여부 ===");
for (const [name, q] of cases) {
  const hits = search(name, q);
  const k = keyword[name];
  const has = hits.some((h) => h.includes(k));
  console.log(`${name} (${k}): ${has ? "O" : "X"}`);
}
