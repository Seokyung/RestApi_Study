import express from "express";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import mysql from "mysql2/promise";
import cors from "cors";

import { userValidator } from "../middleware/auth.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// mysql과 서버 연동 (docker 사용)
let connection = await mysql.createConnection({
	host: "localhost",
	user: "root",
	database: "myapp",
	password: "root",
});

/*** 데이터 CRUD ***/

app.get("/", function (req, res) {
	res.send("Hello World from SK!");
});

// GET - 데이터베이스(texts) 전체 조회
app.get("/api/text", async function (req, res) {
	// mysql의 데이터베이스(texts)의 데이터 조회 (연결된 database의 데이터 받아옴)
	const [rows, fields] = await connection.execute("SELECT * FROM texts");
	res.send(rows);
});

// GET - 데이터베이스(texts)에서 원하는 값 조회
app.get("/api/text/:text_id", async function (req, res) {
	const text_id = req.params.text_id;
	// mysql의 데이터베이스(texts)에서 원하는 데이터 조회
	const [rows, fields] = await connection.execute(
		"SELECT * FROM texts WHERE text_id=?",
		[text_id]
	);
	if (rows[0]) {
		res.send(rows[0]);
	}
});

// GET - 데이터베이스(texts)에서 데이터 검색
app.get("/api/text/search/:text_data", async function (req, res) {
	const text_data = req.params.text_data;
	// mysql의 데이터베이스(texts)에서 원하는 데이터 조회
	const [rows, fields] = await connection.execute(
		"SELECT * FROM texts WHERE LOCATE(?, text_data) > 0",
		[text_data]
	);
	if (rows) {
		res.send(rows);
	}
});

// POST - 데이터베이스(texts)에 값 추가 (생성)
app.post("/api/text", async function (req, res) {
	const { text_data } = req.body;
	// mysql의 데이터베이스(texts)에 데이터 추가
	const [rows, fields] = await connection.execute(
		`INSERT INTO texts(text_data) VALUES(?)`,
		[text_data] // sql injection 공격을 피하기 위해 인자를 직접 sql문에 쓰지 않음
	);
	res.send(rows);
});

// PUT - 데이터베이스(texts)의 값 수정
app.put("/api/text", async function (req, res) {
	const { text_id, text_data } = req.body;
	// mysql의 데이터베이스(texts)의 데이터 수정
	const [rows, fields] = await connection.execute(
		`UPDATE texts SET text_data=? WHERE text_id=?`,
		[text_data, Number(text_id)]
	);
	res.send(rows);
});

// DELETE - 데이터베이스(texts)의 값 삭제
app.delete("/api/text/:text_id", async function (req, res) {
	const text_id = req.params.text_id;
	// mysql의 데이터베이스(texts)의 데이터 삭제
	const [rows, fields] = await connection.execute(
		`DELETE from texts WHERE text_id=?`,
		[Number(text_id)]
	);
	res.send(rows);
});

/*** user 인증 ***/

// GET - users 전체 조회
app.get("/api/users", async (req, res) => {
	// mysql의 데이터베이스(users)의 유저 조회
	const [rows, fields] = await connection.execute("SELECT * FROM users");
	res.send(rows);
});

// GET - 인증된 user인지 검증 (auth)
app.get("/api/secure_data", userValidator, (req, res) => {
	res.send("인증된 사용자입니다.");
});

// POST - users에 유저 정보 추가 (signup)
app.post("/api/signup", async (req, res) => {
	const { user_set_id, user_set_pw, user_name, user_age, user_email } =
		req.body;
	try {
		const hash = await argon2.hash(user_set_pw); // argon2로 비밀번호 암호화
		// mysql의 데이터베이스(users)에 데이터 추가
		await connection.execute(
			`INSERT INTO users(user_set_id, user_set_pw, user_name, user_age, user_email) VALUES(?, ?, ?, ?, ?)`,
			[user_set_id, hash, user_name, user_age, user_email] // sql injection 공격을 피하기 위해 인자를 직접 sql문에 쓰지 않음
		);
		res.send("POST - signup 완료!");
	} catch (err) {
		res.send("Signup Error", err);
		// res.status(403).send("Signup Error", err);
	}
});

// POST - 유저 로그인 (login)
app.post("/api/login", async (req, res) => {
	const { user_set_id, user_set_pw } = req.body;
	// mysql의 데이터베이스(users)에서 req로 받아온 유저 아이디가 있는지 조회
	const [rows, fields] = await connection.execute(
		"SELECT * FROM users WHERE user_set_id=?",
		[user_set_id]
	);

	try {
		if (!rows[0]) {
			// id did not match (해당하는 유저 아이디 없음)
			res.status(403).send("해당하는 아이디가 존재하지 않습니다.");
			return;
		}

		if (await argon2.verify(rows[0].user_set_pw, user_set_pw)) {
			// password match
			const access_token = jwt.sign({ user_set_id }, "secure");
			res.cookie("access_token", access_token, { httpOnly: true }); //쿠키를 이용해 클라이언트에 jwt를 넘겨주는 방법
			res.send("POST - login 성공!");
		} else {
			// password did not match (유저 아이디는 있지만 비밀번호가 다름)
			res.status(403).send("잘못된 비밀번호 입니다.");
			return;
		}
	} catch (err) {
		// internal failure
		res.send("Login Error: ", err);
		// res.status(403).send("Login Error", err);
	}
});

app.listen(4000, async () => {
	// 서버가 시작되기 전에 데이터베이스가 먼저 연결되어야 함
	connection = await mysql.createConnection({
		host: "localhost",
		user: "root",
		database: "myapp",
		password: "root",
	});
	console.log("server start!");
});
