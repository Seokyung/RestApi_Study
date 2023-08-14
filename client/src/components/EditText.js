import React, { useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { getTextData, putTextData } from "../api/TextApi";

function EditText({ itemId, itemText, setTextData, onEditClick }) {
	const [editText, setEditText] = useState(itemText);

	const onTextChange = (e) => {
		const {
			target: { value },
		} = e;
		setEditText(value);
	};

	const onEditText = async () => {
		if (editText === itemText) {
			onEditClick();
			return;
		}

		try {
			await putTextData(itemId, editText);
			await getTextData(setTextData);
			alert("text edited!");
		} catch (err) {
			console.log(err);
		} finally {
			setEditText("");
			onEditClick();
		}
	};

	return (
		<InputGroup size="sm">
			<Form.Control
				type="text"
				name="text_data"
				placeholder="Edit Text"
				autoFocus
				value={editText}
				onChange={onTextChange}
			/>
			<Button variant="secondary" type="submit" onClick={onEditClick}>
				Cancel
			</Button>
			<Button variant="primary" type="submit" onClick={onEditText}>
				Edit
			</Button>
		</InputGroup>
	);
}

export default EditText;
