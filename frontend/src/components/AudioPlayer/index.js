import { useSelector } from "react-redux";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useState } from "react";
import "./audioplayer.css";

const Player = () => {
	const allSongs = useSelector((state) => Object.values(state.songs));

	const [trackNumber, setTrackNumber] = useState(0);

	const handleClickPrevious = () => {
		setTrackNumber((trackNumber) => {
			if (trackNumber === 0) {
				trackNumber = allSongs.length - 1;
				return trackNumber;
			} else {
				return trackNumber - 1;
			}
		});
	};

	const handleClickNext = () => {
		setTrackNumber((trackNumber) => {
			if (trackNumber < allSongs.length - 1) {
				return trackNumber + 1;
			} else {
				return 0;
			}
		});
	};
	const song = allSongs[trackNumber];
	return (
		<div className="audio-player-container">
			<AudioPlayer
				src={allSongs[trackNumber]?.url}
				// onPlay={(e) => console.log("onPlay")}
				showSkipControls={true}
				showJumpControls={false}
				onClickPrevious={handleClickPrevious}
				onClickNext={handleClickNext}
				onEnded={handleClickNext}
				header={song?.title}
			/>
		</div>
	);
};

export default Player;
