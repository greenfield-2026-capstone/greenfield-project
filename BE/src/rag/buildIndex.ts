import fs from "fs";
import path from "path";
import { fetchCharacterText } from "./crawler";

const CHUNK_SIZE = 500;

function toChunks(text: string): string[] {
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += CHUNK_SIZE) {
    chunks.push(text.slice(i, i + CHUNK_SIZE));
  }
  return chunks;
}

async function buildIndex() {
  const dataDir = path.join(process.cwd(), "data");
  const sources: Record<string, string | string[]> = JSON.parse(
    fs.readFileSync(path.join(dataDir, "characterSources.json"), "utf-8"),
  );
  const index: Record<string, string[]> = {};

  for (const [name, value] of Object.entries(sources)) {
    const urls = (Array.isArray(value) ? value : [value]).filter(Boolean);
    if (!urls.length) {
      console.log(`${name}: URL 없음, 건너뜀`);
      continue;
    }
    const chunks: string[] = [];
    for (const url of urls) {
      try {
        const text = await fetchCharacterText(url);
        const clean = text.replace(/\s+/g, " ").trim();
        if (!clean) {
          console.warn(`${name}: 본문이 비어 있음 (${url})`);
          continue;
        }
        chunks.push(...toChunks(clean));
        console.log(`${name} 완료 (${clean.length}자) ${url}`);
      } catch (e) {
        console.error(
          `${name} 실패 (${url}):`,
          e instanceof Error ? e.message : e,
        );
      }
    }
    if (chunks.length) index[name] = chunks;
  }

  fs.mkdirSync(path.join(dataDir, "rag"), { recursive: true });
  fs.writeFileSync(
    path.join(dataDir, "rag", "index.json"),
    JSON.stringify(index),
    "utf-8",
  );
  console.log("저장 완료: data/rag/index.json");
}

buildIndex();
