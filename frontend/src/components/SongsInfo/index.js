import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { restoreUser } from "../../store/session";
import { Link } from "react-router-dom";
import "./SongsInfo.css";
import { getAllSongs } from "../../store/songs";

const SongsInfo = () => {
	const { songId } = useParams();
	const dispatch = useDispatch();
	const song = useSelector((state) => state.songs[songId]);
	const sessionUser = useSelector((state) => state.session?.user);
	const audio = new Audio(song?.url);

	const songUserId = song?.userId;

	//audio controls
	const start = () => {
		audio.play();
	};
	const stop = () => {
		audio.pause();
	};

	useEffect(() => {
		dispatch(restoreUser());
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
				</div>
				<div>
					{songUserId === sessionUser?.user?.id && (
						<div>
							<Link to={`/songs/${songId}/edit`}>Edit</Link>;
							<Link to={`/songs/${songId}/delete`}>Delete</Link>
						</div>
					)}
				</div>
				<div>
					<button onClick={start}>Play</button>
					<button onClick={stop}>Stop</button>
				</div>
			</div>
		</div>
	);
};

export default SongsInfo;
