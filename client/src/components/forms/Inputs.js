import React from "react";

import { Form } from "react-bootstrap";

function Inputs({
	inputValue,
	setInputValue,
	inputPlaceholder,
	onSubmitInputValue,
}) {
	const onTextChange = (e) => {
		const {
			target: { value },
		} = e;
		setInputValue(value);
	};

	const onPressEnterKey = async (e) => {
		if (e.key === "Enter") {
			await e.preventDefault();
			await onSubmitInputValue();
		}
	};

	return (
		<Form.Control
			type="text"
			placeholder={inputPlaceholder}
			value={inputValue}
			onChange={onTextChange}
			onKeyDown={onPressEnterKey}
		/>
	);
}

export default Inputs;
