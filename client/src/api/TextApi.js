/** fetch로 서버에서 데이터 가져오기 **/
const textUrl = "http://localhost:4000/api/text";
const textHeaders = { "Content-Type": "application/json; charset=utf-8" };

// GET - text 전체 조회
const getTextData = async (setTextData) => {
	const response = await fetch(textUrl, {
		method: "GET",
		headers: textHeaders,
	});
	const jsonData = await response.json();
	setTextData(jsonData);
};

// POST - text 데이터 추가
const postTextData = async (text) => {
	const response = await fetch(textUrl, {
		method: "POST",
		headers: textHeaders,
		body: JSON.stringify({
			text_data: text,
		}),
	});
	return response.json();
};

// PUT - text 데이터 수정
const putTextData = async (id, text) => {
	const response = await fetch(textUrl, {
		method: "PUT",
		headers: textHeaders,
		body: JSON.stringify({
			text_id: id,
			text_data: text,
		}),
	});
	return response.json();
};

// DELETE - text 데이터 삭제
const deleteTextData = async (id) => {
	const response = await fetch(textUrl + `/${id}`, {
		method: "DELETE",
		headers: textHeaders,
	});
	return response.json();
};

export { getTextData, postTextData, putTextData, deleteTextData };
