import React, { useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";

function CreateText() {
	const [text, setText] = useState("");

	const onTextChange = (e) => {
		const {
			target: { value },
		} = e;
		setText(value);
	};

	const onTextSubmit = (e) => {
		e.preventDefault();
		alert(`${text} submitted!`);
		console.log(text);
		setText("");
	};

	return (
		<InputGroup>
			<Form.Control
				type="text"
				placeholder="Write text here"
				value={text}
				onChange={onTextChange}
			/>
			<Button variant="primary" type="submit" onClick={onTextSubmit}>
				Submit
			</Button>
		</InputGroup>
	);
}

export default CreateText;
