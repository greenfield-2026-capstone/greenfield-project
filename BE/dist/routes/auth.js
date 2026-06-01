"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../db");
const router = express_1.default.Router();
router.post("/signup", async (req, res) => {
    const { email, name, password } = req.body;
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    await db_1.pool.query("INSERT INTO users (email, name, password) VALUES ($1, $2, $3)", [email, name, hashedPassword]);
    res.json({
        message: "회원가입 성공",
    });
});
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const result = await db_1.pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];
    if (!user) {
        return res.status(401).json({
            error: "사용자가 없습니다.",
        });
    }
    const isValid = await bcrypt_1.default.compare(password, user.password);
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
exports.default = router;
