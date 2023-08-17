import React, { useState } from "react";
import { postUserLogin } from "../api/UserApi";
import { useNavigate } from "react-router-dom";
import Inputs from "../components/forms/Inputs";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

function AuthPage({ authHandler }) {
	const [userId, setUserId] = useState("");
	const [userPW, setUserPW] = useState("");

	const navigate = useNavigate();

	const onLogin = async (e) => {
		e.preventDefault();
		if (userId === "" || userPW === "") {
			alert("Input ID/PW!");
			return;
		}

		try {
			await postUserLogin(userId, userPW);
			await authHandler();
			navigate("/", { replace: true });
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Container>
			<Row>
				<Col>
					<h4>Auth</h4>
				</Col>
			</Row>
			<Row>
				<Col>
					<Form>
						<Inputs
							inputValue={userId}
							setInputValue={setUserId}
							inputType="auth"
							inputPlaceholder="Input Id"
						/>
						<Inputs
							inputValue={userPW}
							setInputValue={setUserPW}
							inputType="auth"
							inputPlaceholder="Input Password"
						/>
						<Button type="submit" onClick={onLogin}>
							Login
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}

export default AuthPage;
