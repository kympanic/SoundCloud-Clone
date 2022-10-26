import { csrfFetch } from "./csrf";

const GET_COMMENTS = "/comments/getallcomments";
const UPDATE_COMMENT = "/comments/editcomment";

export const getComments = (payload) => ({
	type: GET_COMMENTS,
	payload,
});

export const updateComment = (comment) => ({
	type: UPDATE_COMMENT,
	comment,
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
		const newComment = await res.json();
		dispatch(updateComment(newComment));
		return newComment;
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
		res = await res.json();
		dispatch(updateComment(res));
		return res;
	}
};

const commentsReducer = (state = {}, action) => {
	let newState;
	switch (action.type) {
		case GET_COMMENTS:
			newState = action.payload;
			return newState;
		case UPDATE_COMMENT:
			newState = { ...state };
			newState[action.comment.id] = action.comment;
			return newState;

		default:
			return state;
	}
};

export default commentsReducer;
