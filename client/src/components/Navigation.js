import React from "react";
import logo from "../img/js_icon.png";

import { Container, Navbar, Nav } from "react-bootstrap";

function Navigation() {
	return (
		<Navbar bg="dark" data-bs-theme="dark">
			<Container fluid>
				<Navbar.Brand href="#home">
					<img
						alt="app_icon"
						src={logo}
						width="30"
						height="30"
						className="d-inline-block align-top me-2"
					/>
					Text Me 😉
				</Navbar.Brand>
				<Nav className="me-auto">
					<Nav.Link href="#text">MyText</Nav.Link>
					<Nav.Link href="#profile">Profile</Nav.Link>
				</Nav>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
					<Navbar.Text>
						Signed in as: <a href="#profile">Anonymous</a>
					</Navbar.Text>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Navigation;
