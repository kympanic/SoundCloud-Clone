import { csrfFetch } from "./csrf";

export const GET_SONGS = "/songs/getallsongs";

const getSongs = (payload) => ({
	type: GET_SONGS,
	payload,
});

export const getAllSongs = () => async (dispatch) => {
	const res = await csrfFetch("/api/songs");

	if (res.ok) {
		const payload = await res.json();
		console.log(payload, "thisistheSONGS");
		dispatch(getSongs(payload));
	}
};

let newState = {};
const songsReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_SONGS:
			newState = { ...state };
			action.payload.map((song) => {
				return (newState[song.id] = song);
			});
			return newState;
		default:
			return state;
	}
};

export default songsReducer;
