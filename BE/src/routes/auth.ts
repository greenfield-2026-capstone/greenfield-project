import express from "express";
import bcrypt from "bcrypt";
import { pool } from "../db";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, name, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users (email, name, password) VALUES ($1, $2, $3)",
    [email, name, hashedPassword]
  );

  res.json({
    message: "회원가입 성공",
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  const user = result.rows[0];

  if (!user) {
    return res.status(401).json({
      error: "사용자가 없습니다.",
    });
  }

  const isValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isValid) {
    return res.status(401).json({
      error: "비밀번호 오류",
    });
  }

  res.json({
    message: "로그인 성공",
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
});

export default router;