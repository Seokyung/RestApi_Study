import express from "express";
import * as argon2 from "argon2";
import { text_data } from "./text_data.js";
import { users_data } from "./users_data.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*** 데이터 CRUD ***/

app.get("/", function (req, res) {
	res.send("Hello World from SK!");
});

// GET - text_data 전체 조회
app.get("/text", function (req, res) {
	res.send(text_data);
});

// GET - text_data 중 원하는 값 조회
app.get("/text/:id", function (req, res) {
	const id = req.params.id;
	const data = text_data.find((el) => el.id === Number(id));
	if (data) {
		res.send(data);
	} else {
		res.send("조회된 결과가 없습니다.");
	}
});

// POST - text_data 값 추가 (생성)
app.post("/text", function (req, res) {
	const title = req.body.title;
	text_data.push({
		id: text_data.length + 1,
		text,
	});
	res.send("POST - 값 추가 완료!");
});

// PUT - text_data 값 수정
app.put("/text", function (req, res) {
	const id = req.body.id;
	const title = req.body.title;
	text_data[id - 1].title = title;
	res.send("PUT - 값 수정 완료!");
});

// DELETE - text_data 값 삭제
app.delete("/text", function (req, res) {
	const id = req.body.id;
	text_data.splice(id - 1, 1);
	res.send("DELETE - 값 삭제 완료!");
});

/*** user 인증 ***/

// GET - users 전체 조회
app.get("/users", (req, res) => {
	res.send(users_data);
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

app.listen(3000, () => {
	console.log("server start!");
});
