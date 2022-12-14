import { csrfFetch } from "./csrf";

const GET_SONGS = "/songs/getallsongs";
const ADD_SONG = "/songs/add_song";
const DELETE_SONG = "/songs/delete-song";

export const getSongs = (payload) => ({
	type: GET_SONGS,
	payload,
});

export const addSong = (song) => ({
	type: ADD_SONG,
	song,
});

export const deleteSong = (songId) => ({
	type: DELETE_SONG,
	songId,
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
		const newSong = await res.json();
		dispatch(addSong(newSong));
		return newSong;
	}
};

export const editSong = (song) => async (dispatch) => {
	let res = await csrfFetch(`/api/songs/${song.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(song),
	});
	if (res.ok) {
		res = await res.json();
		dispatch(addSong(res));
		return res;
	}
};

export const removeSong = (id) => async (dispatch) => {
	const res = await csrfFetch(`/api/songs/${id}`, {
		method: "DELETE",
	});

	if (res.ok) {
		dispatch(deleteSong(id));
	}
};

const songsReducer = (state = {}, action) => {
	let newState = {};
	switch (action.type) {
		case GET_SONGS:
			newState = { ...state };
			action.payload.songs.forEach((song) => {
				newState[song.id] = song;
			});
			return newState;
		case ADD_SONG:
			newState = { ...state };
			newState[action.song.id] = action.song;
			return newState;
		case DELETE_SONG:
			newState = { ...state };
			delete newState[action.songId];
			return newState;
		default:
			return state;
	}
};

export default songsReducer;
