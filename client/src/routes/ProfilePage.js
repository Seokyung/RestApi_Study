import React from "react";

import { Container, Row, Col, Card, Button } from "react-bootstrap";

function ProfilePage() {
	const onLogout = () => {
		const isLogout = window.confirm("Are you sure to logout?");
		if (isLogout) {
			window.localStorage.clear();
			window.location.reload();
		} else {
			return;
		}
	};

	return (
		<Container fluid className="mt-3 mb-3">
			<Row>
				<Col md={{ span: 4, offset: 4 }}>
					<Card>
						<Card.Header>
							<h4>Profile</h4>
						</Card.Header>
						<Card.Body></Card.Body>
					</Card>
				</Col>
			</Row>
			<Row>
				<Col>
					<Button onClick={onLogout}>Logout</Button>
				</Col>
			</Row>
		</Container>
	);
}

export default ProfilePage;
