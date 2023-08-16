import React, { useState } from "react";
import Inputs from "../forms/Inputs";
import { getTextData, postTextData } from "../../api/TextApi";

import { InputGroup, Button } from "react-bootstrap";

function CreateText({ setTextData }) {
	const [text, setText] = useState("");

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
			<Inputs
				inputValue={text}
				setInputValue={setText}
				inputPlaceholder="Write text here"
				onSubmitInputValue={onCreateText}
			/>
			<Button variant="primary" type="submit" onClick={onCreateText}>
				Submit
			</Button>
		</InputGroup>
	);
}

export default CreateText;
