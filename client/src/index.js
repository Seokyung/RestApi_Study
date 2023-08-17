import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = legacy_createStore(rootReducer, composeWithDevTools());

root.render(
	<Provider store={store}>
		<CookiesProvider>
			<App />
		</CookiesProvider>
	</Provider>
);
