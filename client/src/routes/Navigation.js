import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Container, Navbar, Nav } from "react-bootstrap";
import logo from "../img/js_icon.png";

function Navigation({ isLoggedIn }) {
	const userName = useSelector((state) => state.userReducer.user_name);
	const navigate = useNavigate();

	const gotoTextPage = () => {
		navigate("/text");
	};

	const gotoProfilePage = () => {
		navigate("/profile");
	};

	return (
		<Navbar
			expand="md"
			bg="dark"
			data-bs-theme="dark"
			sticky="top"
			collapseOnSelect
		>
			<Container fluid>
				<Navbar.Brand href="/">
					<img
						alt="app_icon"
						src={logo}
						width="30"
						height="30"
						className="d-inline-block align-top me-2"
					/>
					Text Me 😉
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				{isLoggedIn && (
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link onClick={gotoTextPage}>MyText</Nav.Link>
							<Nav.Link onClick={gotoProfilePage}>Profile</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				)}
				<Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
					<Navbar.Text>
						Signed in as:{" "}
						<a href="#profile">{userName ? userName : "Anonymous"}</a>
					</Navbar.Text>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Navigation;
