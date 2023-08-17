// import axios from "axios";

const TEXT_SERVER_URL = "http://localhost:4000/api/text";
const TEXT_SERVER_HEADERS = {
	"Content-Type": "application/json; charset=utf-8",
};

/*** fetch로 서버에서 데이터 가져오기 ***/
// GET - text 전체 조회
// const getTextData = async (setData) => {
// 	try {
// 		const response = await fetch(TEXT_SERVER_URL, {
// 			method: "GET",
// 			headers: TEXT_SERVER_HEADERS,
// 		});
// 		const jsonData = await response.json();
// 		setData(jsonData);
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

// GET - user의 text 전체 조회
const getTextData = async (userId, setData) => {
	try {
		const response = await fetch(TEXT_SERVER_URL + `/${userId}`, {
			method: "GET",
			headers: TEXT_SERVER_HEADERS,
		});
		const jsonData = await response.json();
		setData(jsonData);
	} catch (err) {
		console.log(err);
	}
};

// GET - text 데이터 검색
const getSearchedTextData = async (searchData, userId, setData) => {
	const response = await fetch(
		TEXT_SERVER_URL + `/search/${searchData}/${userId}`,
		{
			method: "GET",
			headers: TEXT_SERVER_HEADERS,
		}
	);
	const jsonData = await response.json();
	setData(jsonData);

	if (jsonData.length === 0) {
		return "empty";
	}
};

// POST - text 데이터 추가
const postTextData = async (text, userId) => {
	await fetch(TEXT_SERVER_URL, {
		method: "POST",
		headers: TEXT_SERVER_HEADERS,
		body: JSON.stringify({
			text_data: text,
			user_id: userId,
		}),
	});
};

// PUT - text 데이터 수정
const putTextData = async (id, text) => {
	await fetch(TEXT_SERVER_URL, {
		method: "PUT",
		headers: TEXT_SERVER_HEADERS,
		body: JSON.stringify({
			text_id: id,
			text_data: text,
		}),
	});
};

// DELETE - text 데이터 삭제
const deleteTextData = async (id) => {
	await fetch(TEXT_SERVER_URL + `/${id}`, {
		method: "DELETE",
		headers: TEXT_SERVER_HEADERS,
	});
};

/*** axios로 서버에서 데이터 가져오기 ***/
/*
// GET - text 전체 조회
const getTextData = async (setData) => {
	const response = await axios.get(TEXT_SERVER_URL);
	setData(response.data);
};

// POST - text 데이터 추가
const postTextData = async (text) => {
	await axios.post(TEXT_SERVER_URL, {
		text_data: text,
	});
};

// PUT - text 데이터 수정
const putTextData = async (id, text) => {
	await axios.put(TEXT_SERVER_URL, {
		text_id: id,
		text_data: text,
	});
};

// DELETE - text 데이터 삭제
const deleteTextData = async (id) => {
	await axios.delete(TEXT_SERVER_URL + `/${id}`);
};
*/

export {
	getTextData,
	getSearchedTextData,
	postTextData,
	putTextData,
	deleteTextData,
};
