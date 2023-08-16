import React from "react";
import TextList from "../texts/TextList";

import { Card, CloseButton } from "react-bootstrap";
import randomUnicodeEmoji from "random-unicode-emoji";

function SearchText({ searchedTextData, setSearchedTextData }) {
	const onCloseSearchResults = () => {
		setSearchedTextData([]);
	};

	return (
		<Card border="success" text="success">
			<Card.Header className="d-flex justify-content-between">
				<h5 className="d-flex align-items-center m-0">
					{randomUnicodeEmoji.random({ count: 1 })} Search Results
				</h5>
				<CloseButton onClick={onCloseSearchResults} />
			</Card.Header>
			<Card.Body>
				<TextList textData={searchedTextData} textType="search" />
			</Card.Body>
		</Card>
	);
}

export default SearchText;
