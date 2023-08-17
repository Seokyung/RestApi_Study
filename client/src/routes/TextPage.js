import React, { useState, useEffect } from "react";
import CreateText from "../components/texts/CreateText";
import SearchBar from "../components/search/SearchBar";
import SearchText from "../components/search/SearchText";
import TextList from "../components/texts/TextList";
import { useSelector } from "react-redux";
import { getTextData } from "../api/TextApi";

import { Container, Row, Col } from "react-bootstrap";
import randomUnicodeEmoji from "random-unicode-emoji";

function TextPage() {
	const userId = useSelector((state) => state.userReducer.user_id);

	const [textData, setTextData] = useState([]);
	const [searchedTextData, setSearchedTextData] = useState([]);

	useEffect(() => {
		getTextData(userId, setTextData);
	}, []);

	return (
		<Container fluid className="mt-3 mb-3">
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
			<Row className="d-flex justify-content-between align-items-end p-2 mt-4">
				<Col xs sm={4} className="d-flex align-items-end">
					<h4 className="d-flex align-items-center m-0">
						{randomUnicodeEmoji.random({ count: 1 })} My Texts
					</h4>
				</Col>
				<Col xs sm={6} lg={6} xl={4}>
					<SearchBar setSearchedTextData={setSearchedTextData} />
				</Col>
			</Row>
			{searchedTextData.length > 0 && (
				<Row className="mt-2 mb-3 px-3">
					<Col>
						<SearchText
							searchedTextData={searchedTextData}
							setSearchedTextData={setSearchedTextData}
						/>
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
