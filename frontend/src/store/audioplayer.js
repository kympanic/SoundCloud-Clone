const PLAY_AUDIO = "player/play-audio";

export const playAudio = (song) => ({
	type: PLAY_AUDIO,
	song,
});

// let newState = {
// 	song: null,
// };

const audioPlayerReducer = (state = {}, action) => {
	let newState;
	switch (action.type) {
		case PLAY_AUDIO:
			newState = { ...state, song: action.song };

			return newState;
		default:
			return state;
	}
};

export default audioPlayerReducer;
