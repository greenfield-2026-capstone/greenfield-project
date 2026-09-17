interface CharacterDoc {
  character: string;
  chunks: string[];
}

const documents: CharacterDoc[] = [];

export function addDocument(character: string, text: string) {
  const chunkSize = 500;
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  documents.push({ character, chunks });
}

export function search(character: string, query: string, topK = 3): string[] {
  const doc = documents.find((d) => d.character === character);
  if (!doc) return [];

  const scored = doc.chunks.map((chunk) => {
    const score = query
      .split(" ")
      .filter((word) => chunk.includes(word)).length;
    return { chunk, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((s) => s.chunk);
}