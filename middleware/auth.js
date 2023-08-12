import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
	host: "localhost",
	user: "root",
	database: "myapp",
	password: "root",
});

// 인증된 user인지 검증하는 함수 (미들웨어)
export const userValidator = async (req, res, next) => {
	const { access_token } = req.cookies;
	// 쿠키에 액세스 토큰이 담겨있는지 확인
	if (!access_token) {
		res.status(401).send("액세스 토큰이 없어 접근이 불가합니다.");
	}

	try {
		// 쿠키에 담겨있는 액세스 토큰이 유효한지 확인 (토큰에서 유저 아이디 추출)
		const { user_set_id } = jwt.verify(access_token, "secure");

		// mysql의 데이터베이스(users)에서 user_set_id(유저 아이디)로 유저 조회
		const [rows, fields] = await connection.execute(
			"SELECT * FROM users WHERE user_set_id=?",
			[user_set_id]
		);

		// 조회한 유저 아이디가 데이터베이스에 없는 경우
		if (!rows[0]) {
			throw "유효한 액세스 토큰이 아닙니다.";
		}

		// 유저 아이디가 데이터베이스에 있는 경우 (데이터베이스에 있는 유저 && 로그인(인증된) 유저)
		next(); // res.send("인증된 사용자입니다."); 호출
	} catch (err) {
		res.status(401).send("유효한 액세스 토큰이 아닙니다.");
	}
};
