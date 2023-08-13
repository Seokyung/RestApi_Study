import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CreateText from "./components/CreateText";
import TextList from "./components/TextList";

function App() {
	return (
		<Container fluid>
			<Row className="m-3">
				<Col>
					<CreateText />
				</Col>
			</Row>
			<Row className="m-2">
				<Col>
					<TextList />
				</Col>
			</Row>
		</Container>
	);
}

export default App;
