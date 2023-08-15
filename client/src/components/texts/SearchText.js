import React, { useState } from "react";
import { getSearchedTextData } from "../../api/TextApi";

import { Form, Button } from "react-bootstrap";

function SearchText({ searchedTextData, setSearchedTextData }) {
	const [searchText, setSearchText] = useState("");

	const onTextChange = (e) => {
		const {
			target: { value },
		} = e;
		setSearchText(value);
	};

	const onPressEnterKey = async (e) => {
		if (e.key === "Enter") {
			await e.preventDefault();
			await onSearchText();
		}
	};

	const onSearchText = async (e) => {
		if (searchText === "") {
			setSearchedTextData([]);
			return;
		}

		try {
			const res = await getSearchedTextData(searchText, setSearchedTextData);
			if (res === "empty") {
				alert("No text viewed!");
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Form className="d-flex">
				<Form.Control
					type="search"
					placeholder="Search Texts"
					className="me-2 width-auto"
					aria-label="Search"
					value={searchText}
					onChange={onTextChange}
					onKeyDown={onPressEnterKey}
				/>
				<Button variant="outline-success" onClick={onSearchText}>
					Search
				</Button>
			</Form>
		</>
	);
}

export default SearchText;
