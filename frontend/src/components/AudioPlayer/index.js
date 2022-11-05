import { useSelector } from "react-redux";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./audioplayer.css";

const Player = () => {
	let song = useSelector((state) => state.player.song);

	return (
		<div className="audio-player-container">
			<AudioPlayer
				src={song?.url}
				showSkipControls={false}
				showJumpControls={false}
				header={song?.title}
			/>
		</div>
	);
};

export default Player;
