import axios from "axios";

const TEXT_SERVER_URL = "http://localhost:4000/api/text";
const TEXT_SERVER_HEADERS = {
	"Content-Type": "application/json; charset=utf-8",
};

/*** fetch로 서버에서 데이터 가져오기 ***/
// GET - text 전체 조회
// const getTextData = async (setTextData) => {
// 	const response = await fetch(textUrl, {
// 		method: "GET",
// 		headers: textHeaders,
// 	});
// 	const jsonData = await response.json();
// 	setTextData(jsonData);
// };

// POST - text 데이터 추가
// const postTextData = async (text) => {
// 	const response = await fetch(TEXT_SERVER_URL, {
// 		method: "POST",
// 		headers: TEXT_SERVER_HEADERS,
// 		body: JSON.stringify({
// 			text_data: text,
// 		}),
// 	});
// 	return response.json();
// };

// PUT - text 데이터 수정
// const putTextData = async (id, text) => {
// 	const response = await fetch(TEXT_SERVER_URL, {
// 		method: "PUT",
// 		headers: TEXT_SERVER_HEADERS,
// 		body: JSON.stringify({
// 			text_id: id,
// 			text_data: text,
// 		}),
// 	});
// 	return response.json();
// };

// DELETE - text 데이터 삭제
// const deleteTextData = async (id) => {
// 	const response = await fetch(TEXT_SERVER_URL + `/${id}`, {
// 		method: "DELETE",
// 		headers: TEXT_SERVER_HEADERS,
// 	});
// 	return response.json();
// };

/*** axios로 서버에서 데이터 가져오기 ***/
// GET - text 전체 조회
const getTextData = async (setTextData) => {
	const response = await axios.get(TEXT_SERVER_URL);
	setTextData(response.data);
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

export { getTextData, postTextData, putTextData, deleteTextData };
