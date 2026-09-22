import axios from "axios";
import * as cheerio from "cheerio";

export async function fetchCharacterText(url: string): Promise<string> {
  const response = await axios.get(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });

  const $ = cheerio.load(response.data);
  const article = $("article.data_content");

  if (article.length === 0) {
    throw new Error(`본문을 찾지 못했습니다: ${url}`);
  }

  const sections = article.find("section.content_section");
  let fullText = "";

  sections.each((_, el) => {
    fullText += $(el).text().trim() + "\n\n";
  });

  return fullText.trim();
}