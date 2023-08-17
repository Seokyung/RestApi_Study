import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AppRouter from "./routes/AppRouter";
import { getUser } from "./reducers/user";
import { getUserValidate } from "./api/UserApi";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const dispatch = useDispatch();

	const getUserDispatch = (user) => {
		dispatch(
			getUser({
				user_id: user.user_id ? user.user_id : "",
				user_set_id: user.user_set_id ? user.user_set_id : "",
				user_name: user.user_name ? user.user_name : "",
				user_age: user.user_age ? user.user_age : "",
				user_email: user.user_email ? user.user_email : "",
			})
		);
	};

	const authHandler = async () => {
		const user = await getUserValidate(setIsLoggedIn);
		if (user) {
			getUserDispatch(user);
		} else {
			dispatch(
				getUser({
					user_id: "",
					user_set_id: "",
					user_name: "",
					user_age: "",
					user_email: "",
				})
			);
		}
	};

	useEffect(() => {
		authHandler();
	}, []);

	return (
		<div>
			<AppRouter isLoggedIn={isLoggedIn} authHandler={authHandler} />
		</div>
	);
}

export default App;
