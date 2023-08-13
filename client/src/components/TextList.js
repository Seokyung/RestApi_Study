import React from "react";
import { ListGroup } from "react-bootstrap";
import TextItem from "./Text";

function TextList() {
	// fetch("http://localhost:3000", {
	// 	method: "GET",
	// 	headers: { "Content-Type": "application/json" },
	// });

	const text_data = [
		{ id: 1, text: "text11" },
		{ id: 2, text: "text 2 2" },
		{ id: 3, text: "33 text 33" },
	];

	return (
		<ListGroup as="ol" numbered className="p-2">
			{text_data.map((data) => (
				<TextItem key={data.id} itemId={data.id} itemText={data.text} />
			))}
		</ListGroup>
	);
}

export default TextList;
