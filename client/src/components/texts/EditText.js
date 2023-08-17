import React, { useState } from "react";
import Inputs from "../forms/Inputs";
import { getTextData, putTextData } from "../../api/TextApi";

import { InputGroup, Button } from "react-bootstrap";

function EditText({ itemId, itemText, setTextData, onEditClick }) {
	const [editText, setEditText] = useState(itemText);

	const userId = 3;

	const onEditText = async () => {
		if (editText === itemText) {
			onEditClick();
			return;
		}

		try {
			await putTextData(itemId, editText);
			await getTextData(userId, setTextData);
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
			<Inputs
				inputValue={editText}
				setInputValue={setEditText}
				inputPlaceholder="Edit text"
				onSubmitInputValue={onEditText}
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
