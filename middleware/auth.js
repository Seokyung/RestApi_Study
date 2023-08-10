import jwt from "jsonwebtoken";
import { users_data } from "../server/users_data.js";

// 인증된 user인지 검증하는 함수 (미들웨어)
export const userValidator = (req, res, next) => {
	const { access_token } = req.cookies;
	if (!access_token) {
		res.status(401).send("액세스 토큰이 없어 접근이 불가합니다.");
	}

	try {
		const { userId } = jwt.verify(access_token, "secure");
		const userInfo = users_data.find((data) => data.userId === userId);

		if (!userInfo) {
			throw "유효한 액세스 토큰이 아닙니다.";
		}

		next(); // res.send("인증된 사용자입니다."); 호출
	} catch (err) {
		res.status(401).send("유효한 액세스 토큰이 아닙니다.");
	}
};
