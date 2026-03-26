export default function handler(req, res) {
  console.log("API 호출됨");
  console.log("req.body:", req.body);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST 요청만 가능합니다." });}
  const { num1, num2 } = req.body;
  if (typeof num1 !== "number" || typeof num2 !== "number" || isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: "숫자를 입력해주세요." });}

  const result = num1 + num2;
  console.log("계산 결과:", result);
  return res.status(200).json({ result });
}