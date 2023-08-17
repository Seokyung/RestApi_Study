import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function HomePage({ isLoggedIn }) {
	const navigate = useNavigate();
	const gotoAuth = () => {
		navigate("/auth");
	};
	return (
		<Container fluid className="mt-3 mb-3">
			<Row>
				<Col>
					<h2>Home</h2>
					<h4>Login: {isLoggedIn.toString()}</h4>
				</Col>
			</Row>
			{!isLoggedIn && (
				<Row>
					<Col>
						<button onClick={gotoAuth}>go to login</button>
					</Col>
				</Row>
			)}
		</Container>
	);
}

export default HomePage;
