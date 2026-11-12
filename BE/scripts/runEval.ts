import fs from "fs";
import path from "path";

const BASE = process.env.EVAL_BASE ?? "http://127.0.0.1:8080";
const label = process.argv[2] ?? "test";
const questions: string[] = JSON.parse(
  fs.readFileSync(
    path.join(process.cwd(), "data", "eval", "questions.json"),
    "utf-8",
  ),
);

const character = {
  name: "세종대왕",
  summary:
    "경복궁을 중심으로 국정을 운영하며 조선의 문화와 과학, 제도를 발전시킨 인물입니다.",
};
const place = {
  name: "경복궁",
  summary:
    "왕실의 중심 공간과 큰 사건의 흔적이 한곳에 겹쳐 있어 처음 방문하는 사람도 흥미를 느끼기 쉬운 장소다.",
};

async function main() {
  const rows: any[] = [];
  for (const [i, q] of questions.entries()) {
    const started = Date.now();
    try {
      const res = await fetch(`${BASE}/api/chat/character`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: q,
          history: [],
          character,
          place,
          language: "ko",
        }),
      });
      const data: any = await res.json();
      rows.push({
        id: i + 1,
        condition: label,
        question: q,
        reply: data.reply ?? "",
        draft: data.draft ?? "",
        ms: Date.now() - started,
        status: res.status,
      });
    } catch (e) {
      console.error(
        `질문 ${i + 1} 실패:`,
        e instanceof Error
          ? `${e.message} / ${(e as any).cause?.code ?? ""}`
          : e,
      );
      rows.push({
        id: i + 1,
        condition: label,
        question: q,
        reply: "",
        draft: "",
        ms: Date.now() - started,
        status: "ERR",
      });
    }
    console.log(`${label} ${i + 1}/${questions.length}`);
  }
  const outDir = path.join(process.cwd(), "data", "eval");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    path.join(outDir, `result_${label}.json`),
    JSON.stringify(rows, null, 2),
    "utf-8",
  );
  console.log(`저장: data/eval/result_${label}.json`);
}
main();
