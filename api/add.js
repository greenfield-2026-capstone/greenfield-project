import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  const a = Number(req.body?.a);
  const b = Number(req.body?.b);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    return res.status(400).json({ error: "숫자 입력" });
  }
  const result = a + b;
  await sql`
    INSERT INTO logs (a, b, result)
    VALUES (${a}, ${b}, ${result})
  `;

  return res.status(200).json({
    a,b,result});
}