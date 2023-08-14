import React, { useState, useEffect } from "react";
import CreateText from "./components/CreateText";
import TextList from "./components/TextList";
import { getTextData } from "./api/TextApi";

import { Container, Row, Col } from "react-bootstrap";
import randomEmoji from "random-unicode-emoji";

function App() {
	const [textData, setTextData] = useState([]);

	useEffect(() => {
		getTextData(setTextData);
	}, []);

	return (
		<Container fluid>
			<Row className="m-3">
				<Col>
					<CreateText setTextData={setTextData} />
				</Col>
			</Row>
			<Row className="m-2">
				<Col>
					<h4>{randomEmoji.random({ count: 1 })} My Texts</h4>
					<TextList textData={textData} setTextData={setTextData} />
				</Col>
			</Row>
		</Container>
	);
}

export default App;
