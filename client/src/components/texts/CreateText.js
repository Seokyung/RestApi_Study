import React, { useState } from "react";
import { getTextData, postTextData } from "../../api/TextApi";

import { InputGroup, Form, Button } from "react-bootstrap";

function CreateText({ setTextData }) {
	const [text, setText] = useState("");

	const onTextChange = (e) => {
		const {
			target: { value },
		} = e;
		setText(value);
	};

	const onPressEnterKey = async (e) => {
		if (e.key === "Enter") {
			await e.preventDefault();
			await onCreateText();
		}
	};

	const onCreateText = async (e) => {
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
		<InputGroup size="lg">
			<Form.Control
				type="text"
				name="text_data"
				placeholder="Write text here"
				value={text}
				onChange={onTextChange}
				onKeyDown={onPressEnterKey}
			/>
			<Button variant="primary" type="submit" onClick={onCreateText}>
				Submit
			</Button>
		</InputGroup>
	);
}

export default CreateText;
