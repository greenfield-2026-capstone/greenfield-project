import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "POST만 허용됩니다." });
    }

    const a = Number(req.body?.a);
    const b = Number(req.body?.b);

    if (Number.isNaN(a) || Number.isNaN(b)) {
      return res.status(400).json({ error: "숫자를 입력해주세요." });
    }
    const result = a + b;
    await sql`
      INSERT INTO logs (a, b, result)
      VALUES (${a}, ${b}, ${result})`;

    return res.status(200).json({ a, b, result });
  } catch (error) {
    console.error("ADD API ERROR:", error);
    return res.status(500).json({ error: "DB 저장 또는 서버 처리 중 오류가 발생했습니다." });
  }
}