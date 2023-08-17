import { combineReducers } from "redux";
import textReducer from "./text";
import userReducer from "./user";

const rootReducer = combineReducers({
	textReducer,
	userReducer,
});

export default rootReducer;
