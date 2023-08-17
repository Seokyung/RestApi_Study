import React from "react";

import { Container, Row, Col, Card } from "react-bootstrap";

function ProfilePage() {
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
		</Container>
	);
}

export default ProfilePage;
