const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const test_data = [
	{
		id: 1,
		title: "text 1",
	},
	{
		id: 2,
		title: "text 2",
	},
	{
		id: 3,
		title: "text 3",
	},
];

app.get("/", function (req, res) {
	res.send("Hello World from SK!");
});

// GET - test_data 전체 조회
app.get("/test", function (req, res) {
	res.send(test_data);
});

// GET - test_data 중 원하는 값 조회
app.get("/test/:id", function (req, res) {
	const id = req.params.id;
	const data = test_data.find((el) => el.id === Number(id));

	if (data) {
		res.send(data);
	} else {
		res.send("조회된 결과가 없습니다.");
	}
});

// POST - test_data 값 추가 (생성)
app.post("/test", function (req, res) {
	const title = req.body.title;

	test_data.push({
		id: test_data.length + 1,
		title,
	});

	res.send("POST - 값 추가 완료!");
});

// PUT - test_data 값 수정
app.put("/test", function (req, res) {
	const id = req.body.id;
	const title = req.body.title;

	test_data[id - 1].title = title;

	res.send("PUT - 값 수정 완료!");
});

// DELETE - test_data 값 삭제
app.delete("/test", function (req, res) {
	const id = req.body.id;

	test_data.splice(id - 1, 1);

	res.send("DELETE - 값 삭제 완료!");
});

app.listen(3000, () => {
	console.log("server start!");
});
