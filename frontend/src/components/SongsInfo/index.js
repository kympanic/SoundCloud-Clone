import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllSongs } from "../../store/songs";

import "./SongsInfo.css";

const SongsInfo = () => {
	const { songId } = useParams();
	const dispatch = useDispatch();
	const song = useSelector((state) => state.songs[songId]);

	const audio = new Audio(song?.url);

	console.log(song, "song info");

	const start = () => {
		audio.play();
	};
	const stop = () => {
		audio.pause();
	};

	useEffect(() => {
		dispatch(getAllSongs());
	}, [dispatch]);

	return (
		<div className="song-full-container">
			<div className="solosong-card">
				<div
					className="song-img-wrapper"
					style={{ backgroundImage: "url(" + song?.previewImage + ")" }}
				></div>
				<div className="song-text">
					<p>{song?.description}</p>
					<h1>{song?.title}</h1>
					<button onClick={start}>Play</button>
					<button onClick={stop}>Stop</button>
				</div>
			</div>
		</div>
	);
};

export default SongsInfo;
