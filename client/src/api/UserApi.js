const USER_SERVER_URL = "http://localhost:4000/api/user";
const USER_SERVER_HEADERS = {
	"Content-Type": "application/json; charset=utf-8",
};

// GET - 로그인한 user인지 확인
const getUserValidate = async (setIsLoggedIn) => {
	console.log("user validating...");
	const jwtToken = localStorage.getItem("jwtToken");
	try {
		const response = await fetch(USER_SERVER_URL + "/validate", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${jwtToken}`,
			},
		});
		const jsonData = await response.json();
		if (!jsonData) {
			setIsLoggedIn(false);
			console.log("validation failed!");
			return;
		} else {
			setIsLoggedIn(true);
			console.log("validation completed!");
			return jsonData;
		}
	} catch (err) {
		console.log(err);
	}
};

// POST - user 로그인
const postUserLogin = async (userSetId, userSetPw) => {
	const response = await fetch(USER_SERVER_URL + "/login", {
		method: "POST",
		credentials: "include",
		headers: USER_SERVER_HEADERS,
		body: JSON.stringify({
			user_set_id: userSetId,
			user_set_pw: userSetPw,
		}),
	});
	const jsonData = await response.json();
	// JWT를 로컬 스토리지나 쿠키에 저장
	localStorage.setItem("jwtToken", jsonData.access_token);
};

export { getUserValidate, postUserLogin };
