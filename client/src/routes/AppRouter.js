import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./Navigation";
import HomePage from "./HomePage";
import TextPage from "./TextPage";
import ProfilePage from "./ProfilePage";
import AuthPage from "./AuthPage";

function AppRouter({ isLoggedIn, authHandler }) {
	return (
		<BrowserRouter>
			{isLoggedIn ? (
				<>
					<Navigation isLoggedIn={isLoggedIn} />
					<Routes>
						<Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
						<Route path="/text" element={<TextPage />} />
						<Route path="/profile" element={<ProfilePage />} />
						<Route path="*" element={<Navigate to={"/"} />} />
					</Routes>
				</>
			) : (
				<Routes>
					<Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
					<Route
						path="/auth"
						element={<AuthPage authHandler={authHandler} />}
					/>
					<Route path="*" element={<Navigate to={"/"} />} />
				</Routes>
			)}
		</BrowserRouter>
	);
}

export default AppRouter;
