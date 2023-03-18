import { csrfFetch } from "./csrf";

const GET_USERS = "session/getUsers";

const getUsers = (payload) => {
	return {
		type: GET_USERS,
		payload,
	};
};

export const getAllUsers = () => async (dispatch) => {
	const res = await csrfFetch(`/api/users`);
	if (res.ok) {
		const payload = await res.json();
		dispatch(getUsers(payload));
	}
};

const usersReducer = (state = {}, action) => {
	let newState = {};
	switch (action.type) {
		case GET_USERS:
			newState = { ...state };
			action.payload.users.forEach((user) => {
				newState[user.id] = user;
			});
			return newState;
		default:
			return state;
	}
};

export default usersReducer;
