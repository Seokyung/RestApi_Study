import React, { useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { getTextData, postTextData } from "../api/TextApi";

function CreateText({ setTextData }) {
	const [text, setText] = useState("");

	const onTextChange = (e) => {
		const {
			target: { value },
		} = e;
		setText(value);
	};

	const onCreateText = async (e) => {
		e.preventDefault();
		if (text === "") {
			alert("Write text please");
			return;
		}

		try {
			await postTextData(text);
			await getTextData(setTextData);
			alert(`${text} submitted!`);
		} catch (err) {
			console.log(err);
		} finally {
			setText("");
		}
	};

	return (
		<InputGroup>
			<Form.Control
				type="text"
				name="text_data"
				placeholder="Write text here"
				value={text}
				onChange={onTextChange}
			/>
			<Button variant="primary" type="submit" onClick={onCreateText}>
				Submit
			</Button>
		</InputGroup>
	);
}

export default CreateText;
