import { csrfFetch } from "./csrf";

const GET_COMMENTS = "/comments/getallcomments";

export const getComments = (payload) => ({
	type: GET_COMMENTS,
	payload,
});

export const getAllComments = (songId) => async (dispatch) => {
	const res = await csrfFetch(`/api/songs/${songId}/comments`);
	if (res.ok) {
		const payload = await res.json();
		dispatch(getComments(payload));
	}
};

export const createComment = (songId, userId, body) => async (dispatch) => {
	const res = await csrfFetch(`/api/songs/${songId}/comments`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			userId,
			songId,
			body,
		}),
	});
	if (res.ok) {
		const data = await res.json();
		dispatch(getComments(data.comments));
	}
};

export const editComment = (comment) => async (dispatch) => {
	let res = await csrfFetch(`/api/comments/${comment.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(comment),
	});
	if (res.ok) {
		const data = await res.json();
		dispatch(getComments(data.comments));
	}
};

export const removeComment = (songId, commentId) => async (dispatch) => {
	const response = await csrfFetch(`/api/comments/${commentId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			commentId,
			songId,
		}),
	});
	const data = await response.json();
	dispatch(getComments(data.comments));
};
const commentsReducer = (state = {}, action) => {
	let newState;
	switch (action.type) {
		case GET_COMMENTS:
			newState = action.payload;
			return newState;
		default:
			return state;
	}
};

export default commentsReducer;
