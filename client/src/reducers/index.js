import { combineReducers } from "redux";
import textReducer from "./text";

const rootReducer = combineReducers({
	textReducer,
});

export default rootReducer;
