export const GET_USER = "user/GET_USER";

const initialState = {};

export const getUser = ({
	user_id,
	user_set_id,
	user_name,
	user_age,
	user_email,
}) => {
	return {
		type: GET_USER,
		user_id,
		user_set_id,
		user_name,
		user_age,
		user_email,
	};
};

function userReducer(state = initialState, action) {
	switch (action.type) {
		case GET_USER:
			return {
				user_id: action.user_id,
				user_set_id: action.user_set_id,
				user_name: action.user_name,
				user_age: action.user_age,
				user_email: action.user_email,
			};
		default:
			return state;
	}
}

export default userReducer;
