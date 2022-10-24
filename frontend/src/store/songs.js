import { csrfFetch } from "./csrf";

const GET_SONGS = "/songs/getallsongs";
const ADD_SONG = "/songs/add_song";

export const getSongs = (payload) => ({
	type: GET_SONGS,
	payload,
});

export const addSong = (song) => ({
	type: ADD_SONG,
	song,
});

export const getAllSongs = () => async (dispatch) => {
	const res = await csrfFetch("/api/songs");

	if (res.ok) {
		const payload = await res.json();
		dispatch(getSongs(payload));
	}
};

export const createSong = (song) => async (dispatch) => {
	const res = await csrfFetch("/api/songs", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(song),
	});
	if (res.ok) {
		const addedSong = await res.json();
		dispatch(addSong(addedSong));
		return addedSong;
	}
};

export const editSong = (song) => async (dispatch) => {
	let editSong = await csrfFetch("/api/songs", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(song),
	});
	if (editSong.ok) {
		editSong = await editSong.JSON();
		dispatch(addSong(editSong));
		return editSong;
	}
};

const songsReducer = (state = {}, action) => {
	let newState = {};
	switch (action.type) {
		case GET_SONGS:
			newState = { ...state };
			action.payload.map((song) => {
				return (newState[song.id] = song);
			});
			return newState;
		case ADD_SONG:
			newState = { ...state };
			newState[action.song.id] = action.song;
			return newState;
		default:
			return state;
	}
};

export default songsReducer;
