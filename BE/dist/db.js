"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "네가 설치할 때 설정한 비밀번호",
    port: 5432,
});
