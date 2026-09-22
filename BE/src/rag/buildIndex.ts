import fs from "fs";
import { fetchCharacterText } from "./crawler";
import { addDocument } from "./vectorStore";

async function buildIndex() {
  const sources = JSON.parse(
    fs.readFileSync("./data/characterSources.json", "utf-8")
  );

  for (const [name, url] of Object.entries(sources)) {
    console.log(`${name} 크롤링 중...`);
    const text = await fetchCharacterText(url as string);
    addDocument(name, text);
    console.log(`${name} 저장 완료 (${text.length}자)`);
  }
}

buildIndex();