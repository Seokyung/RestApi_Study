import React, { useState, useEffect } from "react";
import CreateText from "../components/texts/CreateText";
import SearchText from "./texts/SearchText";
import TextList from "../components/texts/TextList";
import { getTextData } from "../api/TextApi";

import { Container, Row, Col, Button } from "react-bootstrap";
import randomUnicodeEmoji from "random-unicode-emoji";

function TextPage() {
	const [textData, setTextData] = useState([]);
	const [searchedTextData, setSearchedTextData] = useState([]);

	useEffect(() => {
		getTextData(setTextData);
	}, []);

	return (
		<Container fluid className="mt-3">
			<Row>
				<Col>
					<h4 className="d-flex align-items-center p-1">
						{randomUnicodeEmoji.random({ count: 1 })} Write Your Texts!
					</h4>
				</Col>
			</Row>
			<Row>
				<Col>
					<CreateText setTextData={setTextData} />
				</Col>
			</Row>
			<Row className="d-flex justify-content-between p-2 mt-4">
				<Col className="d-flex align-items-end">
					<h4 className="d-flex align-items-center m-0">
						{randomUnicodeEmoji.random({ count: 1 })} My Texts
					</h4>
				</Col>
				<Col className="d-flex justify-content-end">
					<SearchText
						searchedTextData={searchedTextData}
						setSearchedTextData={setSearchedTextData}
					/>
				</Col>
			</Row>
			{searchedTextData.length > 0 && (
				<Row className="mt-1 mb-4 px-4">
					<Col>
						<h6 className="d-flex align-items-center mb-1 px-1">
							{randomUnicodeEmoji.random({ count: 1 })} Search Results
						</h6>
						<TextList textData={searchedTextData} textType="search" />
					</Col>
				</Row>
			)}
			<Row className="mt-1">
				<Col>
					<TextList
						textData={textData}
						setTextData={setTextData}
						textType="all"
					/>
				</Col>
			</Row>
		</Container>
	);
}

export default TextPage;
