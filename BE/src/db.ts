import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "네가 설치할 때 설정한 비밀번호",
  port: 5432,
});