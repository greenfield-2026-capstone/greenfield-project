import fs from "fs";
import path from "path";

type Index = Record<string, string[]>;

const MIN_SCORE = 2;
let cache: Index | null = null;

function loadIndex(): Index {
  if (cache) return cache;
  const file = path.join(process.cwd(), "data", "rag", "index.json");
  try {
    cache = JSON.parse(fs.readFileSync(file, "utf-8")) as Index;
  } catch {
    console.warn("[RAG] 색인 파일을 읽지 못했습니다:", file);
    cache = {};
  }
  return cache;
}

// 조사가 붙어도 걸리도록 단어별 2글자 단위로 쪼갠다
function bigrams(text: string): string[] {
  const out = new Set<string>();
  for (const word of text.split(/\s+/)) {
    const w = word.replace(/[^가-힣A-Za-z0-9]/g, "");
    for (let i = 0; i < w.length - 1; i++) out.add(w.slice(i, i + 2));
  }
  return Array.from(out);
}

export function search(character: string, query: string, topK = 3): string[] {
  if (process.env.RAG_ENABLED === "false") return []; // 평가용 on/off 스위치
  const chunks = loadIndex()[character];
  if (!chunks?.length) return [];
  const grams = bigrams(query);
  return chunks
    .map((chunk) => ({
      chunk,
      score: grams.filter((g) => chunk.includes(g)).length,
    }))
    .filter((s) => s.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((s) => s.chunk);
}
