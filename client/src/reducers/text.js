export const GET_TEXT = "text/GET_TEXTS";
export const POST_TEXT = "text/POST_TEXT";
export const PUT_TEXT = "text/PUT_TEXT";
export const DELETE_TEXT = "text/DELETE_TEXT";

const initialState = [];

export const getText = ({ itemId, itemText }) => {
	return {
		type: GET_TEXT,
		itemId,
		itemText,
	};
};

function textReducer(state = initialState, action) {
	switch (action.type) {
		case GET_TEXT:
			return {
				itemId: action.itemId,
				itemText: action.itemText,
			};
		// case POST_TEXT:
		// 	return {};
		// case PUT_TEXT:
		// 	return {};
		// case DELETE_TEXT:
		// 	return {};
		default:
			return state;
	}
}

export default textReducer;
