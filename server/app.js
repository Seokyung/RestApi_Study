import express from "express";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import mysql from "mysql2/promise";

import { userValidator } from "../middleware/auth.js";

import { text_data } from "./text_data.js";
import { users_data } from "./users_data.js";

const app = express();

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

// GET - text_data 전체 조회
app.get("/text", async function (req, res) {
	// mysql의 데이터베이스(users)의 데이터 조회 (연결된 database의 데이터 받아옴)
	const [rows, fields] = await connection.execute("SELECT * FROM users");
	res.send(rows);
});

// GET - text_data 중 원하는 값 조회
app.get("/text/:id", async function (req, res) {
	const id = req.params.id;
	// mysql의 데이터베이스(users)에서 원하는 데이터 조회
	const [rows, fields] = await connection.execute(
		"SELECT * FROM users WHERE id=?",
		[id]
	);
	if (rows[0]) {
		res.send(rows[0]);
	} else {
		res.send("조회된 결과가 없습니다.");
	}
});

// POST - text_data 값 추가 (생성)
app.post("/text", async function (req, res) {
	const { name, age } = req.body;
	// mysql의 데이터베이스(users)에 데이터 추가
	const [rows, fields] = await connection.execute(
		`INSERT INTO users(name, age) VALUES(?, ?)`,
		[name, age] // sql injection 공격을 피하기 위해 인자를 직접 sql문에 쓰지 않음
	);
	res.send("POST - 값 추가 완료!");
});

// PUT - text_data 값 수정
app.put("/text", async function (req, res) {
	const { id, name, age } = req.body;
	// mysql의 데이터베이스(users)의 데이터 수정
	const [rows, fields] = await connection.execute(
		`UPDATE users SET name=?, age=? WHERE id=?`,
		[name, age, id]
	);
	res.send("PUT - 값 수정 완료!");
});

// DELETE - text_data 값 삭제
app.delete("/text/:id", async function (req, res) {
	const id = req.params.id;
	// mysql의 데이터베이스(users)의 데이터 삭제
	const [rows, fields] = await connection.execute(
		`DELETE from users WHERE id=?`,
		[id]
	);
	res.send("DELETE - 값 삭제 완료!");
});

/*** user 인증 ***/

// GET - users 전체 조회
app.get("/users", (req, res) => {
	res.send(users_data);
});

// GET - 인증된 user인지 검증 (auth)
app.get("/secure_data", userValidator, (req, res) => {
	res.send("인증된 사용자입니다.");
});

// POST - users에 유저 정보 추가 (signup)
app.post("/signup", async (req, res) => {
	const { userId, password, userName, age, email } = req.body;
	try {
		const hash = await argon2.hash(password); // argon2로 비밀번호 암호화
		users_data.push({
			id: users_data.length + 1,
			userId,
			password: hash,
			userName,
			age,
			email,
		});
		res.send("POST - signup 완료!");
	} catch (err) {
		res.send("Signup Error", err);
	}
});

// POST - 유저 로그인 (login)
app.post("/login", async (req, res) => {
	const { userId, password } = req.body;
	const user = users_data.filter((user) => {
		return user.userId === userId;
	});

	try {
		if (user.length === 0) {
			// id did not match
			res.status(403).send("해당하는 아이디가 존재하지 않습니다.");
			return;
		}

		if (await argon2.verify(user[0].password, password)) {
			// password match
			const access_token = jwt.sign({ userId }, "secure");
			res.cookie("access_token", access_token, { httpOnly: true }); //쿠키를 이용해 클라이언트에 jwt를 넘겨주는 방법
			res.send("POST - login 성공!");
		} else {
			// password did not match
			res.status(403).send("잘못된 비밀번호 입니다.");
			return;
		}
	} catch (err) {
		// internal failure
		res.send("Login Error: ", err);
	}
});

app.listen(3000, async () => {
	// 서버가 시작되기 전에 데이터베이스가 먼저 연결되어야 함
	connection = await mysql.createConnection({
		host: "localhost",
		user: "root",
		database: "myapp",
		password: "root",
	});
	console.log("server start!");
});
